(function (root) {
  'use strict';
  // scriptdebug.panel.js — Monaco + Native Execution + Refined Tracing
  // Mount with: window.CMPanel_scriptdebug.mount(el)

  var STORAGE_KEY = 'cm_scriptdebug_state_v2';

  // ---------- Small DOM helpers ----------
  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = String(txt);
    return e;
  }
  function empty(n) {
    while (n && n.firstChild) n.removeChild(n.firstChild);
  }

  function makeTextarea(id, placeholder, rows) {
    var t = document.createElement('textarea');
    if (id) t.id = id;
    t.rows = rows || 8;
    t.placeholder = placeholder || '';
    t.style.width = '100%';
    t.style.boxSizing = 'border-box';
    t.style.resize = 'vertical';
    t.style.background = '#252526';
    t.style.color = '#d4d4d4';
    t.style.border = '1px solid #3c3c3c';
    t.style.fontFamily = 'Consolas, "Courier New", monospace';
    t.style.padding = '8px';
    return t;
  }

  function makeOutputBox(id) {
    var p = document.createElement('div'); // Changed to div for table
    if (id) p.id = id;
    p.style.width = '100%';
    p.style.boxSizing = 'border-box';
    p.style.margin = '0';
    p.style.padding = '0';
    p.style.minHeight = '3em';
    p.style.borderRadius = '4px';
    p.style.border = '1px solid rgba(255,255,255,0.08)';
    p.style.background = 'rgba(0,0,0,0.2)';
    p.style.color = '#ccc';
    p.style.overflow = 'auto';
    return p;
  }

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDiff(before, after) {
    before = before || '';
    after = after || '';
    if (!before && !after) return '<div style="padding:8px; color:#666">(no value)</div>';
    if (before === after) return '<div style="padding:8px; white-space:pre-wrap"><span style="color:#666">(no change)</span>\n' + escapeHtml(after) + '</div>';

    // Simple append check
    if (after.indexOf(before) === 0) {
      var extra = after.slice(before.length);
      return '<div style="padding:8px; white-space:pre-wrap">' + escapeHtml(before) + '<span style="background:rgba(255,255,0,0.2); color:#fff;">' + escapeHtml(extra) + '</span></div>';
    }
    // Fallback: just show new content
    return '<div style="padding:8px; white-space:pre-wrap">' + escapeHtml(after) + '</div>';
  }

  // ---------- Tracing Helpers ----------

  // Try to capture line number from stack trace
  function getCallerLine() {
    try { throw new Error(); } catch (e) {
      // Stack format (V8): Error\n at Object.set (<anonymous>:2:15) ...
      // The user script is usually the second or third frame in the stack
      var stack = e.stack.split('\n');
      // Look for the anonymous function created by new Function
      for (var i = 1; i < stack.length; i++) {
        var line = stack[i];
        if (line.indexOf('anonymous') !== -1) {
          // Extract line:col
          var match = line.match(/:(\d+):(\d+)/);
          if (match) {
            // Adjust line number (new Function wrapper adds ~2 lines)
            return 'L' + (parseInt(match[1]) - 2);
          }
        }
      }
    }
    return '';
  }

  function createTraceProxy(target, path, logFn) {
    return new Proxy(target, {
      get: function (obj, prop) {
        var val = obj[prop];
        if (typeof val === 'object' && val !== null) {
          return createTraceProxy(val, path + '.' + String(prop), logFn);
        }
        return val;
      },
      set: function (obj, prop, value) {
        var old = obj[prop];
        // Deduplicate: only log if value changed
        if (old !== value) {
          obj[prop] = value;
          logFn({
            kind: 'write',
            path: path + '.' + String(prop),
            oldValue: old,
            newValue: value,
            loc: getCallerLine()
          });
        }
        return true;
      }
    });
  }

  function renderTraceTable(logs, container, filters) {
    var table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.fontFamily = 'Consolas, monospace';
    table.style.fontSize = '12px';

    var thead = document.createElement('thead');
    thead.style.background = '#252526';
    thead.style.position = 'sticky';
    thead.style.top = '0';
    thead.innerHTML = '<tr>' +
      '<th style="text-align:left; padding:4px; width:30px; border-bottom:1px solid #333">#</th>' +
      '<th style="text-align:left; padding:4px; width:50px; border-bottom:1px solid #333">Kind</th>' +
      '<th style="text-align:left; padding:4px; width:50px; border-bottom:1px solid #333">Loc</th>' +
      '<th style="text-align:left; padding:4px; border-bottom:1px solid #333">Details</th>' +
      '</tr>';
    table.appendChild(thead);

    var tbody = document.createElement('tbody');

    if (!logs || !logs.length) {
      tbody.innerHTML = '<tr><td colspan="4" style="padding:8px; color:#666; text-align:center">(no trace events)</td></tr>';
    } else {
      logs.forEach(function (entry, idx) {
        // Filtering
        if (entry.kind === 'write' && !filters.showWrites) return;
        if (entry.kind === 'log' && !filters.showLogs) return;

        var tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid #333';

        // #
        var tdNum = document.createElement('td');
        tdNum.style.padding = '4px';
        tdNum.style.color = '#569cd6';
        tdNum.textContent = idx + 1;
        tr.appendChild(tdNum);

        // Kind
        var tdKind = document.createElement('td');
        tdKind.style.padding = '4px';
        if (entry.kind === 'log') {
          tdKind.style.color = '#ce9178';
          tdKind.textContent = 'LOG';
        } else {
          tdKind.style.color = '#c586c0';
          tdKind.textContent = 'WRITE';
        }
        tr.appendChild(tdKind);

        // Loc
        var tdLoc = document.createElement('td');
        tdLoc.style.padding = '4px';
        tdLoc.style.color = '#888';
        tdLoc.textContent = entry.loc || '';
        tr.appendChild(tdLoc);

        // Details
        var tdDet = document.createElement('td');
        tdDet.style.padding = '4px';
        tdDet.style.whiteSpace = 'pre-wrap';
        tdDet.style.wordBreak = 'break-all';

        if (entry.kind === 'log') {
          tdDet.textContent = entry.args.join(' ');
        } else {
          var valStr = '';
          try { valStr = JSON.stringify(entry.newValue); } catch (e) { valStr = String(entry.newValue); }
          // Truncate long values
          if (valStr.length > 200) valStr = valStr.slice(0, 200) + '...';

          tdDet.innerHTML = '<span style="color:#9cdcfe">' + entry.path + '</span> = ' +
            '<span style="color:#ce9178">' + escapeHtml(valStr) + '</span>';
        }
        tr.appendChild(tdDet);

        tbody.appendChild(tr);
      });
    }

    table.appendChild(tbody);
    empty(container);
    container.appendChild(table);
  }

  root.CMPanel_scriptdebug = {
    mount: function (rootEl) {
      empty(rootEl);

      var container = el('div', 'cm-panel-content');
      container.style.display = 'flex';
      container.style.flexDirection = 'row';
      container.style.height = '100%';
      container.style.gap = '15px';
      container.style.padding = '15px';
      container.style.boxSizing = 'border-box';
      rootEl.appendChild(container);

      // LEFT: Editor + Inputs
      var colLeft = el('div');
      colLeft.style.flex = '1 1 60%';
      colLeft.style.display = 'flex';
      colLeft.style.flexDirection = 'column';
      colLeft.style.gap = '10px';
      colLeft.style.overflowY = 'auto';
      colLeft.style.minWidth = '300px';

      // Editor Container
      var lblScript = el('label', null, 'Script (JS) - Native Execution');
      lblScript.style.fontWeight = 'bold';
      lblScript.style.color = '#aaa';

      var editorContainer = el('div');
      editorContainer.style.height = '400px';
      editorContainer.style.border = '1px solid #3c3c3c';

      // Inputs
      var lblInput = el('label', null, 'Last User Message');
      lblInput.style.color = '#aaa';
      var taInput = makeTextarea('dbg-input', 'User message...', 2);

      var lblInitScn = el('label', null, 'Initial Scenario');
      lblInitScn.style.color = '#aaa';
      var taInitScn = makeTextarea('dbg-init-scenario', 'Scenario...', 3);

      var lblInitPer = el('label', null, 'Initial Personality');
      lblInitPer.style.color = '#aaa';
      var taInitPer = makeTextarea('dbg-init-personality', 'Personality...', 3);

      var btnRun = el('button', 'btn', 'Run Script');
      btnRun.style.alignSelf = 'flex-start';
      btnRun.style.padding = '10px 20px';
      btnRun.style.background = '#0e639c';
      btnRun.style.color = 'white';
      btnRun.style.border = 'none';
      btnRun.style.cursor = 'pointer';
      btnRun.style.fontSize = '14px';
      btnRun.style.borderRadius = '2px';
      btnRun.onmouseover = function () { btnRun.style.background = '#1177bb'; };
      btnRun.onmouseout = function () { btnRun.style.background = '#0e639c'; };

      colLeft.appendChild(lblScript);
      colLeft.appendChild(editorContainer);
      colLeft.appendChild(lblInput);
      colLeft.appendChild(taInput);
      colLeft.appendChild(lblInitScn);
      colLeft.appendChild(taInitScn);
      colLeft.appendChild(lblInitPer);
      colLeft.appendChild(taInitPer);
      colLeft.appendChild(btnRun);

      // RIGHT: Output
      var colRight = el('div');
      colRight.style.flex = '1 1 40%';
      colRight.style.display = 'flex';
      colRight.style.flexDirection = 'column';
      colRight.style.gap = '10px';
      colRight.style.overflowY = 'auto';
      colRight.style.minWidth = '250px';
      colRight.style.background = '#1e1e1e';
      colRight.style.padding = '10px';
      colRight.style.borderRadius = '4px';

      var lblOutScn = el('label', null, 'Result Scenario');
      lblOutScn.style.color = '#aaa';
      var outScenario = makeOutputBox('dbg-out-scenario');

      var lblOutPer = el('label', null, 'Result Personality');
      lblOutPer.style.color = '#aaa';
      var outPerson = makeOutputBox('dbg-out-personality');

      var lblErr = el('label', null, 'Errors');
      lblErr.style.color = '#ff6b6b';
      var outErr = el('div');
      outErr.style.color = '#ff6b6b';
      outErr.style.fontFamily = 'monospace';
      outErr.style.whiteSpace = 'pre-wrap';
      outErr.style.background = 'rgba(255,0,0,0.1)';
      outErr.style.padding = '5px';
      outErr.style.borderRadius = '4px';
      outErr.style.minHeight = '20px';

      // Trace Header + Toggles
      var traceHeader = el('div');
      traceHeader.style.display = 'flex';
      traceHeader.style.justifyContent = 'space-between';
      traceHeader.style.alignItems = 'center';
      traceHeader.style.marginTop = '10px';

      var lblTrace = el('label', null, 'Execution Trace');
      lblTrace.style.color = '#4ec9b0';

      var toggles = el('div');
      toggles.style.display = 'flex';
      toggles.style.gap = '10px';
      toggles.style.fontSize = '12px';

      var chkWrites = document.createElement('input'); chkWrites.type = 'checkbox'; chkWrites.checked = true;
      var lblWrites = el('label', null, ' Writes'); lblWrites.prepend(chkWrites);

      var chkLogs = document.createElement('input'); chkLogs.type = 'checkbox'; chkLogs.checked = true;
      var lblLogs = el('label', null, ' Logs'); lblLogs.prepend(chkLogs);

      toggles.appendChild(lblWrites);
      toggles.appendChild(lblLogs);
      traceHeader.appendChild(lblTrace);
      traceHeader.appendChild(toggles);

      var outTrace = makeOutputBox('dbg-out-trace');
      outTrace.style.maxHeight = '300px';

      colRight.appendChild(lblOutScn);
      colRight.appendChild(outScenario);
      colRight.appendChild(lblOutPer);
      colRight.appendChild(outPerson);
      colRight.appendChild(lblErr);
      colRight.appendChild(outErr);
      colRight.appendChild(traceHeader);
      colRight.appendChild(outTrace);

      container.appendChild(colLeft);
      container.appendChild(colRight);

      // State for filters
      var filters = { showWrites: true, showLogs: true };
      var lastLogs = []; // Store logs for re-rendering

      function updateTrace() {
        renderTraceTable(lastLogs, outTrace, filters);
      }

      chkWrites.onchange = function () { filters.showWrites = chkWrites.checked; updateTrace(); };
      chkLogs.onchange = function () { filters.showLogs = chkLogs.checked; updateTrace(); };

      // Monaco Init
      var editor = null;
      if (window.require) {
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs' } });
        require(['vs/editor/editor.main'], function () {
          if (!document.body.contains(editorContainer)) return;

          editor = monaco.editor.create(editorContainer, {
            value: '// Write your script here\n// context.character.personality += "...";\n// console.log("Debug info");\n',
            language: 'javascript',
            theme: 'vs-dark',
            minimap: { enabled: false },
            automaticLayout: true,
            fontSize: 14
          });

          try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
              var s = JSON.parse(saved);
              if (s.script) editor.setValue(s.script);
              if (s.input) taInput.value = s.input;
              if (s.initScn) taInitScn.value = s.initScn;
              if (s.initPer) taInitPer.value = s.initPer;
            }
          } catch (e) { }
        });
      } else {
        editorContainer.textContent = 'Error: Monaco loader not found.';
        editorContainer.style.color = 'red';
        editorContainer.style.padding = '20px';
      }

      // Run Handler
      btnRun.onclick = function () {
        if (!editor) return;

        var code = editor.getValue();
        var input = taInput.value;
        var scn = taInitScn.value || '';
        var per = taInitPer.value || '';

        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          script: code,
          input: input,
          initScn: scn,
          initPer: per
        }));

        outErr.textContent = '';
        lastLogs = []; // Clear logs

        function logEntry(entry) { lastLogs.push(entry); }

        // Context Setup
        var rawContext = {
          character: {
            personality: per,
            scenario: scn,
            name: "Bot"
          },
          chat: {
            message_count: 1,
            last_message: input,
            last_messages: [{ message: input }]
          }
        };

        // Wrap context in Proxy
        var context = createTraceProxy(rawContext, 'context', logEntry);

        // Custom Console
        var customConsole = {
          log: function () {
            var args = Array.prototype.slice.call(arguments);
            logEntry({ kind: 'log', args: args, loc: getCallerLine() });
            console.log.apply(console, args);
          },
          error: function () {
            var args = Array.prototype.slice.call(arguments);
            logEntry({ kind: 'log', args: ['[ERROR]'].concat(args), loc: getCallerLine() });
            console.error.apply(console, args);
          },
          warn: function () {
            var args = Array.prototype.slice.call(arguments);
            logEntry({ kind: 'log', args: ['[WARN]'].concat(args), loc: getCallerLine() });
            console.warn.apply(console, args);
          }
        };

        try {
          // Wrap code to ensure line numbers are offset consistently
          // We add a few newlines so the user code starts at a predictable line
          var wrappedCode = '\n\n' + code;
          var run = new Function('context', 'console', wrappedCode);
          run(context, customConsole);

          outScenario.innerHTML = formatDiff(scn, rawContext.character.scenario);
          outPerson.innerHTML = formatDiff(per, rawContext.character.personality);
        } catch (e) {
          outErr.textContent = e.toString();
          console.error(e);
          logEntry({ kind: 'log', args: ['[RUNTIME ERROR]', e.toString()], loc: getCallerLine() });
        }

        updateTrace();
      };

      return rootEl;
    }
  };

})(this);
