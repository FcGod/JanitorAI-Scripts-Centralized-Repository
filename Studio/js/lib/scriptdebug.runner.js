(function (root) {
  'use strict';

  var Runner = {};

  // ----------------- Small helpers -----------------
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

  function cloneLoc(obj) {
    if (!obj) return null;
    return {
      start: { line: obj.start && obj.start.line, column: obj.start && obj.start.column },
      end:   { line: obj.end && obj.end.line,   column: obj.end && obj.end.column }
    };
  }

  function locToLiteralValue(loc, captureLoc) {
    if (!captureLoc) return null;
    if (!loc) return null;
    try {
      return JSON.stringify(cloneLoc(loc));
    } catch (_e) {
      return null;
    }
  }

  function parseLocJSON(str) {
    if (!str) return null;
    try {
      var obj = JSON.parse(str);
      return cloneLoc(obj);
    } catch (_e) {
      return null;
    }
  }

  // ----------------- Instrumentation helpers -----------------

  function instrumentIfStatement(node, src, idx, captureLoc) {
    var id = 'if_' + idx;
    var test = node.test;
    var exprText = '';

    if (test && test.range && test.range.length === 2) {
      exprText = src.slice(test.range[0], test.range[1]);
    }

    node.test = {
      type: 'CallExpression',
      callee: { type: 'Identifier', name: '__TRACE_IF' },
      arguments: [
        { type: 'Literal', value: id },
        { type: 'Literal', value: exprText },
        test,
        { type: 'Literal', value: locToLiteralValue(node.loc, captureLoc) }
      ]
    };

    // Consequent
    if (node.consequent) {
      if (node.consequent.type !== 'BlockStatement') {
        node.consequent = {
          type: 'BlockStatement',
          body: [ node.consequent ],
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
            { type: 'Literal', value: locToLiteralValue(node.consequent.loc || node.loc, captureLoc) }
          ]
        }
      });
    }

    // Alternate
    if (node.alternate) {
      if (node.alternate.type !== 'BlockStatement') {
        node.alternate = {
          type: 'BlockStatement',
          body: [ node.alternate ],
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
            { type: 'Literal', value: locToLiteralValue(node.alternate.loc || node.loc, captureLoc) }
          ]
        }
      });
    }
  }

  function instrumentLoop(node, idx, captureLoc) {
    var id = 'loop_' + idx;

    if (!node.body) return;
    if (node.body.type !== 'BlockStatement') {
      node.body = {
        type: 'BlockStatement',
        body: [ node.body ],
        loc: node.body.loc
      };
    }

    // loop-iter marker inside the loop body
    node.body.body.unshift({
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: { type: 'Identifier', name: '__TRACE_LOOP' },
        arguments: [
          { type: 'Literal', value: 'loop-iter' },
          { type: 'Literal', value: id },
          { type: 'Literal', value: locToLiteralValue(node.loc, captureLoc) }
        ]
      }
    });
  }

  function instrumentSwitchStatement(node, idx, captureLoc) {
    var id = 'switch_' + idx;
    var cases = node.cases || [];
    var i, c;

    for (i = 0; i < cases.length; i++) {
      c = cases[i];
      if (!c.consequent || !c.consequent.length) continue;

      c.consequent.unshift({
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: { type: 'Identifier', name: '__TRACE_BRANCH' },
          arguments: [
            { type: 'Literal', value: 'enter-case' },
            { type: 'Literal', value: id + '_case_' + i },
            { type: 'Literal', value: locToLiteralValue(c.loc || node.loc, captureLoc) }
          ]
        }
      });
    }
  }

  function instrumentScript(src, options) {
    if (!root.esprima || !root.escodegen) {
      return { error: new Error('esprima + escodegen are required for script debugging.') };
    }

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

    var opts = options || {};
    var captureLoc = !!opts.captureLoc;

    var ifCounter = 0;
    var loopCounter = 0;
    var switchCounter = 0;

    walkAst(ast, function (node) {
      if (node.type === 'IfStatement') {
        instrumentIfStatement(node, src, ++ifCounter, captureLoc);
      } else if (node.type === 'ForStatement' ||
                 node.type === 'WhileStatement' ||
                 node.type === 'DoWhileStatement') {
        instrumentLoop(node, ++loopCounter, captureLoc);
      } else if (node.type === 'SwitchStatement') {
        instrumentSwitchStatement(node, ++switchCounter, captureLoc);
      }
    });

    var code = root.escodegen.generate(ast);
    return { code: code };
  }

  // ----------------- CONTEXT SETUP -----------------

  function createBaseContext() {
    var ctx = { character: {} };

    // Simple Janitor-style-ish surfaces (local-only simulation)
    ctx.chat = {
      message_count: 0,
      messages: [],
      last_message: '',
      last_user_message: '',
      last_speaker: ''
    };

    ctx.user = {
      id: '',
      name: ''
    };

    ctx.state = {};
    ctx.env = {};

    return ctx;
  }

  function applyContextOverrides(baseCtx, overrides) {
    if (!overrides || typeof overrides !== 'object') return baseCtx;
    var key, sub, k2;

    for (key in overrides) {
      if (!overrides.hasOwnProperty(key)) continue;
      if (key === 'character') {
        sub = overrides.character;
        if (sub && typeof sub === 'object') {
          for (k2 in sub) {
            if (!sub.hasOwnProperty(k2)) continue;
            // Do NOT allow overrides of scenario/personality tracking slots
            if (k2 === 'scenario' || k2 === 'personality') continue;
            baseCtx.character[k2] = sub[k2];
          }
        }
      } else {
        baseCtx[key] = overrides[key];
      }
    }

    return baseCtx;
  }

  // ----------------- SANDBOX EXECUTION -----------------

  function runInstrumented(code, inputText, options) {
    var opts = options || {};

    // maxTrace: how many events we keep in the trace (for UI)
    var maxTrace = typeof opts.maxTrace === 'number' && opts.maxTrace > 0 ? opts.maxTrace : 2000;

    // maxSteps: safety cap; default to maxTrace if not provided
    var maxSteps = typeof opts.maxSteps === 'number' && opts.maxSteps > 0 ? opts.maxSteps : maxTrace;

    var captureLoc = !!opts.captureLoc;

    var trace = [];
    var step = 0;

    // Initial scenario/personality (before script runs)
    var scenario = '';
    var personality = '';

    if (opts.initialScenario != null) {
      scenario = String(opts.initialScenario);
    }
    if (opts.initialPersonality != null) {
      personality = String(opts.initialPersonality);
    }

    // Build base context
    var context = createBaseContext();

    function pushEvent(ev) {
      step++;
      if (step > maxSteps) {
        throw new Error('Debug run aborted: exceeded maxSteps (' + maxSteps + ')');
      }
      if (trace.length < maxTrace) {
        ev.step = step;
        trace.push(ev);
      }
    }

    Object.defineProperty(context.character, 'scenario', {
      configurable: true,
      enumerable: true,
      get: function () { return scenario; },
      set: function (v) {
        scenario = String(v);
        pushEvent({
          kind: 'write-scenario',
          value: scenario,
          loc: null
        });
      }
    });

    Object.defineProperty(context.character, 'personality', {
      configurable: true,
      enumerable: true,
      get: function () { return personality; },
      set: function (v) {
        personality = String(v);
        pushEvent({
          kind: 'write-personality',
          value: personality,
          loc: null
        });
      }
    });

    // Apply user-provided context overrides AFTER defineProperty,
    // without clobbering scenario/personality accessors.
    if (opts.contextData && typeof opts.contextData === 'object') {
      context = applyContextOverrides(context, opts.contextData);
    }

    // Map inputText into typical chat surfaces if not already set
    var rawMsg = inputText || '';
    if (!context.chat) {
      context.chat = {
        message_count: 0,
        messages: [],
        last_message: '',
        last_user_message: '',
        last_speaker: ''
      };
    }
    if (typeof context.chat.last_user_message === 'undefined') {
      context.chat.last_user_message = rawMsg;
    }
    if (typeof context.chat.last_message === 'undefined') {
      context.chat.last_message = rawMsg;
    }

    function __TRACE_IF(id, exprSrc, result, locJson) {
      var bool = !!result;
      pushEvent({
        kind: 'if',
        id: id,
        expr: exprSrc,
        result: bool,
        loc: captureLoc ? parseLocJSON(locJson) : null
      });
      return bool;
    }

    function __TRACE_BRANCH(kind, id, locJson) {
      pushEvent({
        kind: kind,
        id: id,
        loc: captureLoc ? parseLocJSON(locJson) : null
      });
    }

    function __TRACE_LOOP(kind, id, locJson) {
      pushEvent({
        kind: kind, // 'loop-iter'
        id: id,
        loc: captureLoc ? parseLocJSON(locJson) : null
      });
    }

    function __TRACE_GENERIC(kind, info, locJson) {
      pushEvent({
        kind: kind,
        info: info || null,
        loc: captureLoc ? parseLocJSON(locJson) : null
      });
    }

    var fn, err = null;
    try {
      fn = new Function(
        'inputText',
        'context',
        '__TRACE_IF',
        '__TRACE_BRANCH',
        '__TRACE_LOOP',
        '__TRACE_GENERIC',
        '"use strict";\n' +
        'var DEBUG = false;\n' +
        'var ctx = context;\n' +
        code
      );
    } catch (e) {
      return {
        scenario: scenario,
        personality: personality,
        trace: trace,
        error: e
      };
    }

    try {
      fn(inputText, context, __TRACE_IF, __TRACE_BRANCH, __TRACE_LOOP, __TRACE_GENERIC);
    } catch (eRun) {
      err = eRun;
      if (trace.length < maxTrace) {
        trace.push({
          step: step + 1,
          kind: 'error',
          message: String(eRun && eRun.message || eRun),
          loc: null
        });
      }
    }

    return {
      scenario: scenario,
      personality: personality,
      trace: trace,
      error: err
    };
  }

  // ----------------- PUBLIC API -----------------

  // options may contain:
  //  - maxTrace           : max events stored for UI (default 2000)
  //  - maxSteps           : safety cap for execution (default = maxTrace)
  //  - captureLoc         : include loc info when available
  //  - contextData        : overrides merged into simulated context
  //  - initialScenario    : starting context.character.scenario
  //  - initialPersonality : starting context.character.personality
  Runner.run = function (script, inputText, options) {
    var src = script || '';
    var inst = instrumentScript(src, options);
    if (inst.error) {
      return {
        scenario: '',
        personality: '',
        trace: [],
        error: inst.error
      };
    }
    return runInstrumented(inst.code, inputText || '', options);
  };

  root.ScriptDebugRunner = Runner;

})(window);
