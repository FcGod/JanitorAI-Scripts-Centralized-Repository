(function (root) {
  'use strict';

  var Runner = {};

  // ----------------- AST WALKER -----------------
  function walkAst(node, visitor, parent) {
    if (!node || typeof node.type !== 'string') return;
    visitor(node, parent);
    var key, child, i;
    for (key in node) {
      if (!node.hasOwnProperty(key)) continue;
      child = node[key];
      if (!child) continue;
      if (Object.prototype.toString.call(child) === '[object Array]') {
        for (i = 0; i < child.length; i++) {
          if (child[i] && typeof child[i].type === 'string') {
            walkAst(child[i], visitor, node);
          }
        }
      } else if (child && typeof child.type === 'string') {
        walkAst(child, visitor, node);
      }
    }
  }

  // ----------------- LOC LITERAL HELPERS -----------------
  function makePointObject(p) {
    return {
      type: 'ObjectExpression',
      properties: [
        {
          type: 'Property',
          key: { type: 'Identifier', name: 'line' },
          value: { type: 'Literal', value: p && typeof p.line === 'number' ? p.line : null },
          kind: 'init'
        },
        {
          type: 'Property',
          key: { type: 'Identifier', name: 'column' },
          value: { type: 'Literal', value: p && typeof p.column === 'number' ? p.column : null },
          kind: 'init'
        }
      ]
    };
  }

  function makeLocLiteral(loc) {
    if (!loc || !loc.start || !loc.end) {
      return { type: 'Literal', value: null };
    }
    return {
      type: 'ObjectExpression',
      properties: [
        {
          type: 'Property',
          key: { type: 'Identifier', name: 'start' },
          value: makePointObject(loc.start),
          kind: 'init'
        },
        {
          type: 'Property',
          key: { type: 'Identifier', name: 'end' },
          value: makePointObject(loc.end),
          kind: 'init'
        }
      ]
    };
  }

  // ----------------- INSTRUMENTATION -----------------
  function instrumentIfStatement(node, src, idx) {
    var id = 'if_' + idx;
    var test = node.test;

    var exprText = '';
    if (test.range && test.range.length === 2) {
      exprText = src.slice(test.range[0], test.range[1]);
    }

    node.test = {
      type: 'CallExpression',
      callee: { type: 'Identifier', name: '__TRACE_IF' },
      arguments: [
        { type: 'Literal', value: id },
        { type: 'Literal', value: exprText },
        test,
        makeLocLiteral(node.loc)
      ]
    };

    // Consequent
    if (node.consequent.type !== 'BlockStatement') {
      node.consequent = {
        type: 'BlockStatement',
        body: [node.consequent],
        loc: node.consequent.loc
      };
    }
    node.consequent.body.unshift({
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: { type: 'Identifier', name: '__TRACE_BRANCH' },
        arguments: [
          { type: 'Literal', value: 'enter-then' },
          { type: 'Literal', value: id },
          makeLocLiteral(node.loc)
        ]
      }
    });

    // Alternate (else)
    if (node.alternate) {
      if (node.alternate.type !== 'BlockStatement') {
        node.alternate = {
          type: 'BlockStatement',
          body: [node.alternate],
          loc: node.alternate.loc
        };
      }
      node.alternate.body.unshift({
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: { type: 'Identifier', name: '__TRACE_BRANCH' },
          arguments: [
            { type: 'Literal', value: 'enter-else' },
            { type: 'Literal', value: id },
            makeLocLiteral(node.loc)
          ]
        }
      });
    }
  }

  function instrumentLoopStatement(node, idx) {
    var id = 'loop_' + idx;
    var body = node.body;

    if (!body) return;

    if (body.type !== 'BlockStatement') {
      body = {
        type: 'BlockStatement',
        body: [body],
        loc: body.loc
      };
      node.body = body;
    }

    body.body.unshift({
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: { type: 'Identifier', name: '__TRACE_LOOP_ITER' },
        arguments: [
          { type: 'Literal', value: id },
          makeLocLiteral(node.loc)
        ]
      }
    });
  }

  function instrumentScript(src) {
    var ast;
    try {
      ast = root.esprima.parse(src, {
        loc: true,
        range: true,
        tolerant: true
      });
    } catch (e) {
      return { error: e };
    }

    var counter = 0;
    walkAst(ast, function (node) {
      if (node.type === 'IfStatement') {
        instrumentIfStatement(node, src, ++counter);
      } else if (
        node.type === 'ForStatement' ||
        node.type === 'ForInStatement' ||
        node.type === 'WhileStatement' ||
        node.type === 'DoWhileStatement'
      ) {
        instrumentLoopStatement(node, ++counter);
      }
    });

    var code = root.escodegen.generate(ast);
    return { code: code };
  }

  // ----------------- CONTEXT MERGE -----------------
  function mergeObjects(target, source) {
    if (!target || !source) return;
    var k, sv, tv, isObj;
    for (k in source) {
      if (!source.hasOwnProperty(k)) continue;
      sv = source[k];
      tv = target[k];
      isObj =
        sv &&
        typeof sv === 'object' &&
        Object.prototype.toString.call(sv) === '[object Object]';
      if (isObj) {
        if (!tv || Object.prototype.toString.call(tv) !== '[object Object]') {
          target[k] = {};
          tv = target[k];
        }
        mergeObjects(tv, sv);
      } else {
        target[k] = sv;
      }
    }
  }

  // ----------------- SANDBOX EXECUTION -----------------
  function runInstrumented(code, inputText, options) {
    options = options || {};

    var maxTrace = typeof options.maxTrace === 'number' && options.maxTrace > 0 ?
      options.maxTrace : 2000;
    var maxSteps = typeof options.maxSteps === 'number' && options.maxSteps > 0 ?
      options.maxSteps : 5000;

    var trace = [];
    var step = 0;

    function pushTrace(ev) {
      if (!ev) return;
      if (trace.length >= maxTrace) return;
      ev.step = ++step;
      trace.push(ev);
      if (step > maxSteps) {
        throw new Error('Max steps exceeded (' + maxSteps + ')');
      }
    }

    var scenario = options.initialScenario != null ?
      String(options.initialScenario) : '';
    var personality = options.initialPersonality != null ?
      String(options.initialPersonality) : '';

    var context = {
      character: {},
      chat: {},
      user: {},
      meta: {}
    };

    // Merge overrides first
    if (options.contextData && typeof options.contextData === 'object') {
      mergeObjects(context, options.contextData);
    }

    // Instrument scenario/personality writes
    Object.defineProperty(context.character, 'scenario', {
      get: function () { return scenario; },
      set: function (v) {
        scenario = String(v);
        pushTrace({
          kind: 'write-scenario',
          value: scenario
        });
      }
    });

    Object.defineProperty(context.character, 'personality', {
      get: function () { return personality; },
      set: function (v) {
        personality = String(v);
        pushTrace({
          kind: 'write-personality',
          value: personality
        });
      }
    });

    // Initial chat fields
    context.chat = context.chat || {};
    context.chat.last_user_message = inputText || '';
    if (!context.chat.last_message) {
      context.chat.last_message = inputText || '';
    }
    if (typeof context.chat.message_count !== 'number') {
      context.chat.message_count = 1;
    }
    if (!context.chat.last_messages) {
      context.chat.last_messages = [{ message: inputText || '' }];
    }

    // Trace helpers
    function __TRACE_IF(id, exprSrc, result, loc) {
      pushTrace({
        kind: 'if',
        id: id,
        expr: exprSrc,
        result: !!result,
        loc: loc || null
      });
      return !!result;
    }

    function __TRACE_BRANCH(kind, id, loc) {
      pushTrace({
        kind: kind,
        id: id,
        loc: loc || null
      });
    }

    function __TRACE_LOOP_ITER(id, loc) {
      pushTrace({
        kind: 'loop-iter',
        id: id,
        loc: loc || null
      });
    }

    var fn;
    try {
      fn = new Function(
        'inputText',
        'context',
        '__TRACE_IF',
        '__TRACE_BRANCH',
        '__TRACE_LOOP_ITER',
        '"use strict";\n' + code
      );
    } catch (e) {
      return {
        scenario: '',
        personality: '',
        trace: [],
        error: e
      };
    }

    var err = null;
    try {
      fn(inputText, context, __TRACE_IF, __TRACE_BRANCH, __TRACE_LOOP_ITER);
    } catch (e2) {
      err = e2;
      pushTrace({
        kind: 'error',
        message: String(e2 && e2.message || e2)
      });
    }

    return {
      scenario: scenario,
      personality: personality,
      trace: trace,
      error: err
    };
  }

  // ----------------- PUBLIC API -----------------
  Runner.run = function (src, inputText, options) {
    options = options || {};
    if (!root.esprima || !root.escodegen) {
      return {
        scenario: '',
        personality: '',
        trace: [],
        error: new Error('esprima / escodegen not loaded')
      };
    }

    var inst = instrumentScript(src);
    if (inst.error) {
      return {
        scenario: '',
        personality: '',
        trace: [],
        error: inst.error
      };
    }

    return runInstrumented(inst.code, inputText, options);
  };

  root.ScriptDebugRunner = Runner;

})(window);
