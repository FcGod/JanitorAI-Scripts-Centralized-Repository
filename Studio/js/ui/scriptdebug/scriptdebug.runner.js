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

  function cloneLoc(loc) {
    if (!loc) return null;
    return {
      start: { line: loc.start.line, column: loc.start.column },
      end:   { line: loc.end.line,   column: loc.end.column }
    };
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
        captureLoc ? { type: 'Literal', value: node.loc || null } : { type: 'Literal', value: null }
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
            captureLoc ? { type: 'Literal', value: node.consequent.loc || null } : { type: 'Literal', value: null }
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
            captureLoc ? { type: 'Literal', value: node.alternate.loc || null } : { type: 'Literal', value: null }
          ]
        }
      });
    }
  }

  function instrumentLoop(node, idx, captureLoc) {
    var id = 'loop_' + idx;

    // Ensure body is a block
    if (!node.body) return;
    if (node.body.type !== 'BlockStatement') {
      node.body = {
        type: 'BlockStatement',
        body: [ node.body ],
        loc: node.body.loc
      };
    }

    // Prepend loop-iter marker (fires each iteration)
    node.body.body.unshift({
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: { type: 'Identifier', name: '__TRACE_LOOP' },
        arguments: [
          { type: 'Literal', value: 'loop-iter' },
          { type: 'Literal', value: id },
          captureLoc ? { type: 'Literal', value: node.loc || null } : { type: 'Literal', value: null }
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

      // Insert an enter-case marker at the start of the case body
      c.consequent.unshift({
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: { type: 'Identifier', name: '__TRACE_BRANCH' },
          arguments: [
            { type: 'Literal', value: 'enter-case' },
            { type: 'Literal', value: id + '_case_' + i },
            captureLoc ? { type: 'Literal', value: c.loc || node.loc || null } : { type: 'Literal', value: null }
          ]
        }
      });
    }
  }

  function instrumentScript(src, options) {
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

  // ----------------- SANDBOX -----------------

  function runInstrumented(code, inputText, options) {
    var opts = options || {};
    var maxSteps = typeof opts.maxSteps === 'number' && opts.maxSteps > 0 ? opts.maxSteps : 2000;
    var captureLoc = !!opts.captureLoc;

    var trace = [];
    var step = 0;

    var scenario = '';
    var personality = '';

    var context = { character: {} };

    function pushEvent(ev) {
      step++;
      if (step > maxSteps) {
        // Hard abort: too many steps, possible infinite loop
        trace.push({
          step: step,
          kind: 'error',
          message: 'Aborted: exceeded maxSteps (' + maxSteps + '), possible infinite loop.',
          loc: null
        });
        throw new Error('Debug run aborted: exceeded maxSteps');
      }
      ev.step = step;
      trace.push(ev);
    }

    Object.defineProperty(context.character, 'scenario', {
      configurable: true,
      enumerable: true,
      get: function () { return scenario; },
      set: function (v) {
        scenario = String(v);
        pushEvent({
          kind: 'write-scenario',
          value: scenario
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
          value: personality
        });
      }
    });

    function __TRACE_IF(id, exprSrc, result, loc) {
      var bool = !!result;
      pushEvent({
        kind: 'if',
        id: id,
        expr: exprSrc,
        result: bool,
        loc: captureLoc && loc ? cloneLoc(loc) : null
      });
      return bool;
    }

    function __TRACE_BRANCH(kind, id, loc) {
      pushEvent({
        kind: kind, // 'enter-then', 'enter-else', 'enter-case'
        id: id,
        loc: captureLoc && loc ? cloneLoc(loc) : null
      });
    }

    function __TRACE_LOOP(kind, id, loc) {
      pushEvent({
        kind: kind, // 'loop-iter'
        id: id,
        loc: captureLoc && loc ? cloneLoc(loc) : null
      });
    }

    function __TRACE_GENERIC(kind, info, loc) {
      pushEvent({
        kind: kind,
        info: info || null,
        loc: captureLoc && loc ? cloneLoc(loc) : null
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
        '"use strict";\n' + code
      );
    } catch (e) {
      return {
        scenario: '',
        personality: '',
        trace: trace,
        error: e
      };
    }

    try {
      fn(inputText, context, __TRACE_IF, __TRACE_BRANCH, __TRACE_LOOP, __TRACE_GENERIC);
    } catch (eRun) {
      err = eRun;
      pushEvent({
        kind: 'error',
        message: String(eRun && eRun.message || eRun),
        loc: null
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

  Runner.run = function (script, inputText, options) {
    var inst = instrumentScript(script || '', options);
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
