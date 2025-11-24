(function (root) {
  'use strict';
  // Script Debugger / Trace Viewer panel
  // ES5-only, uses ScriptDebugRunner + optional Monaco editor.

  var api = {};
  var lastRoot = null;
  var STORAGE_KEY = 'cm_scriptdebug_state_v6';

  // ---------- Small DOM helpers ----------
  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = String(txt);
    return e;
  }

  function empty(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  function makeTextarea(id, placeholder, rows) {
    var t = document.createElement('textarea');
    if (id) t.id = id;
    t.rows = rows || 4;
    t.placeholder = placeholder || '';
    t.style.width = '100%';
    t.style.boxSizing = 'border-box';
    t.style.resize = 'vertical';
    return t;
  }

  function makeOutputBox(id) {
    var p = document.createElement('pre');
    if (id) p.id = id;
    p.style.width = '100%';
    p.style.boxSizing = 'border-box';
    p.style.whiteSpace = 'pre-wrap';
    p.style.margin = '0';
    p.style.padding = '4px 6px';
    p.style.minHeight = '3em';
    p.style.borderRadius = '4px';
    p.style.border = '1px solid rgba(255,255,255,0.1)';
    p.style.background = 'rgba(0,0,0,0.2)';
    return p;
  }

  function makeCheckbox(id, labelText, checked) {
    var label = document.createElement('label');
    label.className = 'chk-inline';
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    if (id) cb.id = id;
    cb.checked = !!checked;
    label.appendChild(cb);
    label.appendChild(document.createTextNode(' ' + labelText));
    return { label: label, input: cb };
  }

  // ---------- Trace helpers ----------
  function eventVisible(ev, filters) {
    var k = ev.kind || '';
    if (k === 'if') return filters.showIf;
    if (k === 'enter-then' || k === 'enter-else' || k === 'enter-case') return filters.showBranches;
    if (k === 'loop-iter' || k === 'loop-enter' || k === 'loop-exit') return filters.showLoops;
    if (k === 'write-scenario' || k === 'write-personality') return filters.showWrites;
    if (k === 'error') return filters.showErrors;
    return true;
  }

  function eventKey(ev) {
    var k = ev.kind || '';
    var id = ev.id || '';
    var expr = ev.expr || '';
    var locStr = '';
    if (ev.loc && ev.loc.start) {
      locStr = ev.loc.start.line + ':' + ev.loc.start.column;
    }
    return k + '|' + id + '|' + expr + '|' + locStr;
  }

  function cloneEvent(ev) {
    var out = {};
    var key;
    for (key in ev) {
      if (ev.hasOwnProperty(key)) out[key] = ev[key];
    }
    return out;
  }

  function buildDisplayTrace(fullTrace, filters, collapse) {
    var out = [];
    if (!fullTrace || !fullTrace.length) return out;

    if (!collapse) {
      var i0, ev0;
      for (i0 = 0; i0 < fullTrace.length; i0++) {
        ev0 = fullTrace[i0];
        if (!eventVisible(ev0, filters)) continue;
        out.push(ev0);
      }
      return out;
    }

    var i, ev, lastKey = null, lastEv = null, count = 0;

    function flushLast() {
      if (!lastEv) return;
      var copy = cloneEvent(lastEv);
      if (count > 1) copy._repeat = count;
      out.push(copy);
      lastEv = null;
      lastKey = null;
      count = 0;
    }

    for (i = 0; i < fullTrace.length; i++) {
      ev = fullTrace[i];
      if (!eventVisible(ev, filters)) continue;
      var key = eventKey(ev);
      if (key === lastKey) {
        count++;
      } else {
        flushLast();
        lastEv = ev;
        lastKey = key;
        count = 1;
      }
    }
    flushLast();
    return out;
  }

  // ---------- Diff / HTML helpers ----------
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDiff(before, after, onlyNew) {
    before = before || '';
    after = after || '';
    if (!before && !after) return '<span class="dbg-no-change">(no value)</span>';
    if (before === after) {
      return '<span class="dbg-no-change">(no change)</span>\n' + escapeHtml(after);
    }

    if (after.indexOf(before) === 0) {
      var extra = after.slice(before.length);
      if (onlyNew) {
        return '<span class="dbg-diff-add" style="background:rgba(255,255,0,0.25);">' + escapeHtml(extra) + '</span>';
      }
      return escapeHtml(before) +
        '<span class="dbg-diff-add" style="background:rgba(255,255,0,0.25);">' + escapeHtml(extra) + '</span>';
    }

    var i = 0;
    var maxPrefix = Math.min(before.length, after.length);
    while (i < maxPrefix && before.charAt(i) === after.charAt(i)) i++;

    var jBefore = before.length - 1;
    var jAfter = after.length - 1;
    var maxSuffix = Math.min(before.length - i, after.length - i);
    var k = 0;
    while (k < maxSuffix &&
           before.charAt(jBefore - k) === after.charAt(jAfter - k)) {
      k++;
    }

    var prefix = after.slice(0, i);
    var changed = after.slice(i, after.length - k);
    var suffix = after.slice(after.length - k);

    if (!changed) {
      changed = after;
      prefix = '';
      suffix = '';
    }

    if (onlyNew) {
      return '<span class="dbg-diff-add" style="background:rgba(255,255,0,0.25);">' + escapeHtml(changed) + '</span>';
    }
    return escapeHtml(prefix) +
      '<span class="dbg-diff-add" style="background:rgba(255,255,0,0.25);">' + escapeHtml(changed) + '</span>' +
      escapeHtml(suffix);
  }

  // ---------- Error helpers ----------
  function extractErrorInfo(err) {
    if (!err) return { text: '', line: null, column: null };
    if (typeof err === 'string') return { text: err, line: null, column: null };

    var msg = String(err && err.message || err);
    var name = err && err.name ? err.name : 'Error';
    var text = name + ': ' + msg;

    var line = null, col = null;
    if (err.lineNumber != null) {
      line = err.lineNumber;
      text += ' (Line ' + err.lineNumber;
      if (err.column != null) {
        col = err.column;
        text += ', Column ' + err.column;
      }
      text += ')';
    }
    return { text: text, line: line, column: col };
  }

  // ---------- Clipboard ----------
  function copyToClipboard(str, label) {
    if (str == null) str = '';
    var text = String(str);

    function fallbackCopy(s) {
      var ta = document.createElement('textarea');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.top = '0';
      ta.value = s;
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        var ok = document.execCommand('copy');
        if (ok && root.alert) root.alert((label || 'Text') + ' copied to clipboard.');
      } catch (e) {
        if (root.alert) root.alert('Could not copy automatically. Please copy manually.');
      }
      document.body.removeChild(ta);
    }

    if (root.navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        if (root.alert) root.alert((label || 'Text') + ' copied to clipboard.');
      }, function () {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  // ---------- Rendering helpers ----------
  function locToString(ev) {
    if (ev && ev.loc && ev.loc.start) {
      return 'L' + ev.loc.start.line + ':' + ev.loc.start.column;
    }
    return '';
  }

  function summarizeEvent(ev) {
    if (root.ScriptDebugInspect &&
        root.ScriptDebugInspect.summarize &&
        typeof root.ScriptDebugInspect.summarize === 'function') {
      try {
        var s = root.ScriptDebugInspect.summarize(ev);
        if (s) return String(s);
      } catch (e) {}
    }

    var k = ev.kind || '';
    if (k === 'if') {
      var expr = ev.expr || '(expression)';
      var res = ev.result ? 'true' : 'false';
      return 'IF ' + expr + ' \u2192 ' + res;
    }
    if (k === 'enter-then') return 'enter THEN of ' + (ev.id || '');
    if (k === 'enter-else') return 'enter ELSE of ' + (ev.id || '');
    if (k === 'loop-iter') return 'loop iteration ' + (ev.id || '');
    if (k === 'write-scenario') return 'scenario = ' + String(ev.value || '');
    if (k === 'write-personality') return 'personality = ' + String(ev.value || '');
    if (k === 'error') return 'ERROR: ' + String(ev.message || '');
    try { return JSON.stringify(ev); } catch (e2) { return String(ev); }
  }

  // Style a table cell Excel-ish
  function styleCell(td, isLast) {
    td.style.padding = '3px 8px';
    td.style.borderBottom = '1px solid #333';
    if (!isLast) td.style.borderRight = '1px solid #333';
    td.style.verticalAlign = 'top';
  }

  // Render one table row
  function renderTraceRow(ev, idx, tr, displayMode) {
    // index
    var tdIdx = document.createElement('td');
    tdIdx.textContent = ev.step || idx;
    styleCell(tdIdx, false);
    tdIdx.style.textAlign = 'right';
    tdIdx.style.width = '3.5em';
    tr.appendChild(tdIdx);

    // kind
    var tdKind = document.createElement('td');
    tdKind.textContent = ev.kind || '';
    styleCell(tdKind, false);
    tdKind.style.width = '7em';
    tr.appendChild(tdKind);

    // location
    var tdLoc = document.createElement('td');
    tdLoc.textContent = locToString(ev);
    styleCell(tdLoc, false);
    tdLoc.style.width = '6em';
    tr.appendChild(tdLoc);

    // details
    var tdDetails = document.createElement('td');
    styleCell(tdDetails, true);

    var repeat = ev._repeat || 1;

    if (displayMode === 'compact') {
      var summary = summarizeEvent(ev);
      if (repeat > 1) summary += ' (x' + repeat + ' consecutive)';
      tdDetails.textContent = summary;
    } else {
      var container = document.createElement('div');

      if (ev.kind === 'if') {
        var expr = ev.expr || '(expression)';
        var res = ev.result ? 'true' : 'false';

        var line1 = document.createElement('div');
        line1.textContent = 'Condition: ' + expr;
        container.appendChild(line1);

        var line2 = document.createElement('div');
        var label = document.createElement('span');
        label.textContent = 'Result: ';
        line2.appendChild(label);
        var val = document.createElement('span');
        val.textContent = res;
        val.className = ev.result ? 'dbg-true' : 'dbg-false';
        line2.appendChild(val);
        container.appendChild(line2);

      } else if (ev.kind === 'write-scenario') {
        var s1 = document.createElement('div');
        s1.textContent = 'Set scenario:';
        container.appendChild(s1);
        var s2 = document.createElement('div');
        s2.textContent = String(ev.value || '');
        container.appendChild(s2);

      } else if (ev.kind === 'write-personality') {
        var p1 = document.createElement('div');
        p1.textContent = 'Set personality:';
        container.appendChild(p1);
        var p2 = document.createElement('div');
        p2.textContent = String(ev.value || '');
        container.appendChild(p2);

      } else {
        var base = document.createElement('div');
        base.textContent = summarizeEvent(ev);
        container.appendChild(base);
      }

      if (repeat > 1) {
        var rep = document.createElement('div');
        rep.textContent = '(x' + repeat + ' consecutive)';
        container.appendChild(rep);
      }

      tdDetails.appendChild(container);
    }

    tr.appendChild(tdDetails);
  }

  // ---------- Main build ----------
  function build(container) {
    empty(container);

    var wrap = el('div', 'card dbg-wrap');
    wrap.appendChild(el('h3', null, 'Script Debugger / Trace Viewer'));

    var row = el('div', 'row');
    row.style.display = 'flex';
    row.style.gap = '16px';
    row.style.alignItems = 'stretch';

    var monacoEditor = null;
    var scriptTextarea = null;

    var fullTrace = [];
    var filters = {
      showIf: true,
      showBranches: true,
      showLoops: true,
      showWrites: true,
      showErrors: true
    };
    var collapseEnabled = true;
    var maxTraceInput = null;
    var maxStepsInput = null;
    var runMode = 'detailed';
    var displayMode = 'compact';
    var traceVisible = true;
    var showOnlyNew = false;

    var lastInitScn = '';
    var lastFinalScn = '';
    var lastInitPer = '';
    var lastFinalPer = '';
    var lastErrorLine = null;

    function getScriptSource() {
      if (monacoEditor) return monacoEditor.getValue();
      if (scriptTextarea) return scriptTextarea.value || '';
      return '';
    }
    function setScriptSource(v) {
      var text = v || '';
      if (monacoEditor) monacoEditor.setValue(text);
      else if (scriptTextarea) scriptTextarea.value = text;
    }

    function getMaxTrace() {
      if (!maxTraceInput) return 2000;
      var v = parseInt(maxTraceInput.value, 10);
      if (isNaN(v) || v <= 0) v = 2000;
      if (v > 200000) v = 200000;
      return v;
    }
    function getMaxSteps() {
      if (!maxStepsInput) return 5000;
      var v = parseInt(maxStepsInput.value, 10);
      if (isNaN(v) || v <= 0) v = 5000;
      if (v > 500000) v = 500000;
      return v;
    }

    function updateOutputsView(outScenario, outPerson) {
      outScenario.innerHTML = formatDiff(lastInitScn, lastFinalScn, showOnlyNew);
      outPerson.innerHTML = formatDiff(lastInitPer, lastFinalPer, showOnlyNew);
    }

    function clearTraceAndOutput(tbody, outScenario, outPerson, errArea) {
      fullTrace = [];
      if (outScenario) outScenario.innerHTML = '';
      if (outPerson) outPerson.innerHTML = '';
      if (errArea) errArea.textContent = '';
      lastInitScn = '';
      lastFinalScn = '';
      lastInitPer = '';
      lastFinalPer = '';
      lastErrorLine = null;
      renderTraceView(tbody);
    }

    function renderTraceView(tbody) {
      empty(tbody);

      var display = buildDisplayTrace(fullTrace, filters, collapseEnabled);

      if (runMode === 'fast') {
        var keyKinds = {
          'if': 1,
          'enter-then': 1,
          'enter-else': 1,
          'enter-case': 1,
          'write-scenario': 1,
          'write-personality': 1,
          'error': 1
        };
        var filtered = [];
        var i, ev;
        for (i = 0; i < display.length; i++) {
          ev = display[i];
          if (keyKinds[ev.kind]) filtered.push(ev);
        }
        display = filtered;
      }

      if (!display || !display.length) {
        var trEmpty = document.createElement('tr');
        var tdEmpty = document.createElement('td');
        tdEmpty.colSpan = 4;
        tdEmpty.textContent = 'No trace events recorded.';
        tdEmpty.style.padding = '3px 8px';
        trEmpty.appendChild(tdEmpty);
        tbody.appendChild(trEmpty);
        return;
      }

      var i2, ev2, tr, isEven;
      for (i2 = 0; i2 < display.length; i2++) {
        ev2 = display[i2];
        tr = document.createElement('tr');

        // Excel-ish zebra striping
        isEven = (i2 % 2 === 0);
        tr.style.backgroundColor = isEven ? '#171717' : '#1f1f1f';

        // Hover highlight
        (function (rowEl) {
          rowEl.onmouseenter = function () {
            rowEl._oldBg = rowEl.style.backgroundColor;
            rowEl.style.backgroundColor = '#242424';
          };
          rowEl.onmouseleave = function () {
            rowEl.style.backgroundColor = rowEl._oldBg || (isEven ? '#171717' : '#1f1f1f');
          };
        })(tr);

        renderTraceRow(ev2, i2 + 1, tr, displayMode);
        tbody.appendChild(tr);
      }
    }

    // ---------- LEFT COLUMN ----------
    var colLeft = el('div', null, null);
    colLeft.style.flex = '1 1 50%';
    colLeft.style.minWidth = '0';

    var lblScript = el('label', null, 'Script (JS)');
    colLeft.appendChild(lblScript);

    var scriptHost = el('div', null, null);
    scriptHost.style.width = '100%';
    scriptHost.style.height = '260px';
    scriptHost.style.border = '1px solid rgba(255,255,255,0.15)';
    scriptHost.style.borderRadius = '4px';
    scriptHost.style.overflow = 'hidden';
    scriptHost.style.marginBottom = '4px';
    colLeft.appendChild(scriptHost);

    var lblInput = el('label', null, 'Last User Message (inputText / context.chat.last_user_message)');
    lblInput.style.marginTop = '8px';
    var taInput = makeTextarea('dbg-input', 'What the user just said to the bot', 3);

    var lblInitScn = el('label', null, 'Initial Scenario (context.character.scenario before script)');
    lblInitScn.style.marginTop = '8px';
    var taInitScn = makeTextarea('dbg-init-scenario', 'Optional: existing scenario text before this script runs', 3);

    var lblInitPer = el('label', null, 'Initial Personality (context.character.personality before script)');
    lblInitPer.style.marginTop = '8px';
    var taInitPer = makeTextarea('dbg-init-personality', 'Optional: existing personality text before this script runs', 3);

    var lblCtx = el('label', null, 'Context Overrides (JSON, optional)');
    lblCtx.style.marginTop = '8px';
    var taCtx = makeTextarea(
      'dbg-context',
      '// Advanced: override extra context fields.\n' +
      '// Example:\n' +
      '// { "chat": { "message_count": 5 }, "user": { "name": "Tester" } }',
      6
    );

    colLeft.appendChild(lblInput);
    colLeft.appendChild(taInput);
    colLeft.appendChild(lblInitScn);
    colLeft.appendChild(taInitScn);
    colLeft.appendChild(lblInitPer);
    colLeft.appendChild(taInitPer);
    colLeft.appendChild(lblCtx);
    colLeft.appendChild(taCtx);

    colLeft.appendChild(el(
      'div',
      'muted',
      'Runs the script in a local sandbox with the provided user message, starting scenario/personality and context, then shows the path it takes.'
    ));

    var btnRow = el('div', null, null);
    btnRow.style.display = 'flex';
    btnRow.style.flexWrap = 'wrap';
    btnRow.style.gap = '8px';
    btnRow.style.marginTop = '8px';

    var btnRun = document.createElement('button');
    btnRun.type = 'button';
    btnRun.className = 'btn';
    btnRun.textContent = 'Run Debug';

    var btnReset = document.createElement('button');
    btnReset.type = 'button';
    btnReset.className = 'btn';
    btnReset.textContent = 'Reset Debug';

    var btnResetAll = document.createElement('button');
    btnResetAll.type = 'button';
    btnResetAll.className = 'btn';
    btnResetAll.textContent = 'Reset ALL';

    btnRow.appendChild(btnRun);
    btnRow.appendChild(btnReset);
    btnRow.appendChild(btnResetAll);
    colLeft.appendChild(btnRow);

    // ---------- RIGHT COLUMN ----------
    var colRight = el('div', null, null);
    colRight.style.flex = '1 1 50%';
    colRight.style.minWidth = '0';

    // Output card
    var outCard = el('div', 'card', null);
    outCard.appendChild(el('h4', null, 'Simulated Output'));

    var outScenarioLbl = el('div', 'muted', 'context.character.scenario (after script, new parts highlighted)');
    var outScenario = makeOutputBox('dbg-out-scenario');

    var outPersonLbl = el('div', 'muted', 'context.character.personality (after script, new parts highlighted)');
    var outPerson = makeOutputBox('dbg-out-personality');

    outCard.appendChild(outScenarioLbl);
    outCard.appendChild(outScenario);
    outCard.appendChild(outPersonLbl);
    outCard.appendChild(outPerson);

    var chkOnlyNew = makeCheckbox('dbg-only-new', 'Show only new text', false);
    chkOnlyNew.label.style.display = 'block';
    chkOnlyNew.label.style.marginTop = '6px';
    outCard.appendChild(chkOnlyNew.label);

    var outBtnRow = el('div', null, null);
    outBtnRow.style.display = 'flex';
    outBtnRow.style.flexWrap = 'wrap';
    outBtnRow.style.gap = '8px';
    outBtnRow.style.marginTop = '6px';

    var btnCopyScn = document.createElement('button');
    btnCopyScn.type = 'button';
    btnCopyScn.className = 'btn';
    btnCopyScn.textContent = 'Copy Scenario';

    var btnCopyPer = document.createElement('button');
    btnCopyPer.type = 'button';
    btnCopyPer.className = 'btn';
    btnCopyPer.textContent = 'Copy Personality';

    outBtnRow.appendChild(btnCopyScn);
    outBtnRow.appendChild(btnCopyPer);
    outCard.appendChild(outBtnRow);

    // Trace card
    var traceCard = el('div', 'card', null);
    traceCard.appendChild(el('h4', null, 'Execution Trace'));

    var errRow = el('div', null, null);
    errRow.style.display = 'flex';
    errRow.style.alignItems = 'center';
    errRow.style.gap = '8px';
    errRow.style.marginBottom = '4px';

    var errArea = el('div', 'dbg-error', '');
    errArea.style.color = '#ff8888';
    errArea.style.whiteSpace = 'pre-wrap';
    errArea.style.fontSize = '0.85em';
    errArea.style.minHeight = '1.2em';
    errArea.style.flex = '1 1 auto';

    var btnJumpError = document.createElement('button');
    btnJumpError.type = 'button';
    btnJumpError.className = 'btn';
    btnJumpError.textContent = 'Jump to line';
    btnJumpError.style.flex = '0 0 auto';
    btnJumpError.style.display = 'none';

    errRow.appendChild(errArea);
    errRow.appendChild(btnJumpError);
    traceCard.appendChild(errRow);

    var ctrlRow = el('div', null, null);
    ctrlRow.style.display = 'flex';
    ctrlRow.style.flexWrap = 'wrap';
    ctrlRow.style.gap = '8px';
    ctrlRow.style.margin = '4px 0 8px 0';
    ctrlRow.style.alignItems = 'center';

    // max trace
    var maxLbl = document.createElement('label');
    maxLbl.className = 'chk-inline';
    maxLbl.appendChild(document.createTextNode('Max trace length '));
    maxTraceInput = document.createElement('input');
    maxTraceInput.type = 'number';
    maxTraceInput.min = '10';
    maxTraceInput.step = '10';
    maxTraceInput.value = '2000';
    maxTraceInput.style.width = '80px';
    maxLbl.appendChild(maxTraceInput);
    ctrlRow.appendChild(maxLbl);

    // max steps
    var maxStepsLbl = document.createElement('label');
    maxStepsLbl.className = 'chk-inline';
    maxStepsLbl.appendChild(document.createTextNode('Max steps '));
    maxStepsInput = document.createElement('input');
    maxStepsInput.type = 'number';
    maxStepsInput.min = '10';
    maxStepsInput.step = '10';
    maxStepsInput.value = '5000';
    maxStepsInput.style.width = '80px';
    maxStepsLbl.appendChild(maxStepsInput);
    ctrlRow.appendChild(maxStepsLbl);

    // mode select
    var modeLbl = document.createElement('label');
    modeLbl.className = 'chk-inline';
    modeLbl.appendChild(document.createTextNode('Mode '));
    var modeSelect = document.createElement('select');
    var optDet = document.createElement('option');
    optDet.value = 'detailed';
    optDet.text = 'Detailed';
    var optFast = document.createElement('option');
    optFast.value = 'fast';
    optFast.text = 'Fast (key events only)';
    modeSelect.appendChild(optDet);
    modeSelect.appendChild(optFast);
    modeSelect.value = 'detailed';
    modeLbl.appendChild(modeSelect);
    ctrlRow.appendChild(modeLbl);

    // view select
    var viewLbl = document.createElement('label');
    viewLbl.className = 'chk-inline';
    viewLbl.appendChild(document.createTextNode('View '));
    var viewSelect = document.createElement('select');
    var optComp = document.createElement('option');
    optComp.value = 'compact';
    optComp.text = 'Compact';
    var optExp = document.createElement('option');
    optExp.value = 'expanded';
    optExp.text = 'Expanded';
    viewSelect.appendChild(optComp);
    viewSelect.appendChild(optExp);
    viewSelect.value = 'compact';
    viewLbl.appendChild(viewSelect);
    ctrlRow.appendChild(viewLbl);

    var chkIf    = makeCheckbox('dbg-f-if',    'IF decisions', true);
    var chkBr    = makeCheckbox('dbg-f-br',    'Branches',      true);
    var chkLoop  = makeCheckbox('dbg-f-loop',  'Loop iterations', true);
    var chkWrite = makeCheckbox('dbg-f-write', 'Writes',        true);
    var chkErr   = makeCheckbox('dbg-f-error', 'Errors',        true);

    ctrlRow.appendChild(chkIf.label);
    ctrlRow.appendChild(chkBr.label);
    ctrlRow.appendChild(chkLoop.label);
    ctrlRow.appendChild(chkWrite.label);
    ctrlRow.appendChild(chkErr.label);

    var chkColl = makeCheckbox('dbg-collapse', 'Collapse consecutive events', true);
    ctrlRow.appendChild(chkColl.label);

    var btnCopyTrace = document.createElement('button');
    btnCopyTrace.type = 'button';
    btnCopyTrace.className = 'btn';
    btnCopyTrace.textContent = 'Copy Debug';

    var btnToggleTrace = document.createElement('button');
    btnToggleTrace.type = 'button';
    btnToggleTrace.className = 'btn';
    btnToggleTrace.textContent = 'Hide Debug';

    ctrlRow.appendChild(btnCopyTrace);
    ctrlRow.appendChild(btnToggleTrace);

    traceCard.appendChild(ctrlRow);

    // table
    var traceContainerOuter = el('div', null, null);
    traceContainerOuter.style.maxHeight = '320px';
    traceContainerOuter.style.overflowY = 'auto';

    var traceTable = document.createElement('table');
    traceTable.className = 'cm-trace-table';
    traceTable.style.width = '100%';
    traceTable.style.borderCollapse = 'collapse';
    traceTable.style.borderSpacing = '0';
    traceTable.style.fontFamily = 'Consolas, Menlo, monospace';
    traceTable.style.fontSize = '12px';
    traceTable.style.backgroundColor = '#151515';
    traceTable.style.border = '1px solid #333';

    var thead = document.createElement('thead');
    var trHead = document.createElement('tr');
    var headers = ['#', 'Kind', 'Location', 'Details'];
    var hi, th;
    for (hi = 0; hi < headers.length; hi++) {
      th = document.createElement('th');
      th.textContent = headers[hi];
      th.style.textAlign = (hi === 0 ? 'right' : 'left');
      th.style.padding = '4px 8px';
      th.style.backgroundColor = '#202020';
      th.style.color = '#f0f0f0';
      th.style.borderBottom = '1px solid #444';
      if (hi !== headers.length - 1) th.style.borderRight = '1px solid #333';
      th.style.position = 'sticky';
      th.style.top = '0';
      th.style.zIndex = '1';
      trHead.appendChild(th);
    }
    thead.appendChild(trHead);
    traceTable.appendChild(thead);

    var traceTbody = document.createElement('tbody');
    traceTable.appendChild(traceTbody);

    traceContainerOuter.appendChild(traceTable);
    traceCard.appendChild(traceContainerOuter);

    colRight.appendChild(outCard);
    colRight.appendChild(traceCard);

    row.appendChild(colLeft);
    row.appendChild(colRight);
    wrap.appendChild(row);
    container.appendChild(wrap);

    // ---------- autosave ----------
    function saveState() {
      try {
        if (!root.localStorage) return;
        var state = {
          script: getScriptSource(),
          input: taInput.value || '',
          initScn: taInitScn.value || '',
          initPer: taInitPer.value || '',
          ctx: taCtx.value || '',
          maxTrace: getMaxTrace(),
          maxSteps: getMaxSteps(),
          mode: runMode,
          view: displayMode
        };
        root.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {}
    }

    function loadState() {
      var result = {
        script: '',
        input: '',
        initScn: '',
        initPer: '',
        ctx: '',
        maxTrace: 2000,
        maxSteps: 5000,
        mode: 'detailed',
        view: 'compact'
      };
      try {
        if (!root.localStorage) return result;
        var raw = root.localStorage.getItem(STORAGE_KEY);
        if (!raw) return result;
        var state = JSON.parse(raw);
        if (!state || typeof state !== 'object') return result;
        if (state.script != null) result.script = String(state.script);
        if (state.input != null) result.input = String(state.input);
        if (state.initScn != null) result.initScn = String(state.initScn);
        if (state.initPer != null) result.initPer = String(state.initPer);
        if (state.ctx != null) result.ctx = String(state.ctx);
        if (state.maxTrace != null) result.maxTrace = state.maxTrace;
        if (state.maxSteps != null) result.maxSteps = state.maxSteps;
        if (state.mode === 'fast' || state.mode === 'detailed') result.mode = state.mode;
        if (state.view === 'compact' || state.view === 'expanded') result.view = state.view;
      } catch (e) {}
      return result;
    }

    var loaded = loadState();
    taInput.value = loaded.input;
    taInitScn.value = loaded.initScn;
    taInitPer.value = loaded.initPer;
    taCtx.value = loaded.ctx;
    maxTraceInput.value = String(loaded.maxTrace || 2000);
    maxStepsInput.value = String(loaded.maxSteps || 5000);
    runMode = loaded.mode || 'detailed';
    displayMode = loaded.view || 'compact';
    modeSelect.value = runMode;
    viewSelect.value = displayMode;

    // init editor
    if (root.monaco && root.monaco.editor) {
      monacoEditor = root.monaco.editor.create(scriptHost, {
        value: loaded.script || '',
        language: 'javascript',
        theme: 'vs-dark',
        minimap: { enabled: false },
        automaticLayout: true,
        fontSize: 13
      });
      monacoEditor.onDidChangeModelContent(function () { saveState(); });
    } else {
      scriptTextarea = makeTextarea('dbg-script', '// Paste your Janitor-style script here', 16);
      scriptTextarea.style.height = '100%';
      scriptHost.appendChild(scriptTextarea);
      scriptTextarea.value = loaded.script || '';
      scriptTextarea.onchange = saveState;
    }

    // ---------- wire controls ----------
    chkIf.input.onchange     = function () { filters.showIf       = !!chkIf.input.checked;     renderTraceView(traceTbody); saveState(); };
    chkBr.input.onchange     = function () { filters.showBranches = !!chkBr.input.checked;     renderTraceView(traceTbody); saveState(); };
    chkLoop.input.onchange   = function () { filters.showLoops    = !!chkLoop.input.checked;   renderTraceView(traceTbody); saveState(); };
    chkWrite.input.onchange  = function () { filters.showWrites   = !!chkWrite.input.checked;  renderTraceView(traceTbody); saveState(); };
    chkErr.input.onchange    = function () { filters.showErrors   = !!chkErr.input.checked;    renderTraceView(traceTbody); saveState(); };
    chkColl.input.onchange   = function () { collapseEnabled      = !!chkColl.input.checked;   renderTraceView(traceTbody); saveState(); };
    maxTraceInput.onchange   = function () { renderTraceView(traceTbody); saveState(); };
    maxStepsInput.onchange   = function () { saveState(); };
    modeSelect.onchange      = function () { runMode = modeSelect.value === 'fast' ? 'fast' : 'detailed'; renderTraceView(traceTbody); saveState(); };
    viewSelect.onchange      = function () { displayMode = viewSelect.value === 'expanded' ? 'expanded' : 'compact'; renderTraceView(traceTbody); saveState(); };
    chkOnlyNew.input.onchange= function () { showOnlyNew = !!chkOnlyNew.input.checked; updateOutputsView(outScenario, outPerson); };

    taInput.onchange   = saveState;
    taInitScn.onchange = saveState;
    taInitPer.onchange = saveState;
    taCtx.onchange     = saveState;

    btnCopyScn.onclick = function () { copyToClipboard(lastFinalScn, 'Scenario'); };
    btnCopyPer.onclick = function () { copyToClipboard(lastFinalPer, 'Personality'); };

    btnCopyTrace.onclick = function () {
      var display = buildDisplayTrace(fullTrace, filters, collapseEnabled);
      if (runMode === 'fast') {
        var keyKinds = {
          'if': 1,
          'enter-then': 1,
          'enter-else': 1,
          'enter-case': 1,
          'write-scenario': 1,
          'write-personality': 1,
          'error': 1
        };
        var filtered = [];
        var i, ev;
        for (i = 0; i < display.length; i++) {
          ev = display[i];
          if (keyKinds[ev.kind]) filtered.push(ev);
        }
        display = filtered;
      }
      if (!display || !display.length) {
        if (root.alert) root.alert('No debug trace to copy.');
        return;
      }
      var lines = [];
      lines.push('Step\tKind\tLocation\tDetails');
      var i2, ev2, locStr, summary, repeat;
      for (i2 = 0; i2 < display.length; i2++) {
        ev2 = display[i2];
        locStr = '';
        if (ev2.loc && ev2.loc.start) locStr = 'L' + ev2.loc.start.line + ':' + ev2.loc.start.column;
        summary = summarizeEvent(ev2);
        repeat = ev2._repeat || 1;
        if (repeat > 1) summary += ' (x' + repeat + ' consecutive)';
        lines.push(String(ev2.step || (i2 + 1)) + '\t' + String(ev2.kind || '') + '\t' + locStr + '\t' + summary);
      }
      copyToClipboard(lines.join('\n'), 'Debug trace');
    };

    btnToggleTrace.onclick = function () {
      traceVisible = !traceVisible;
      traceCard.style.display = traceVisible ? '' : 'none';
      btnToggleTrace.textContent = traceVisible ? 'Hide Debug' : 'Show Debug';
    };

    btnJumpError.onclick = function () {
      if (!lastErrorLine) return;
      var line = lastErrorLine;
      if (line < 1) line = 1;
      var src = getScriptSource() || '';

      if (monacoEditor && root.monaco && root.monaco.Range) {
        monacoEditor.revealLineInCenter(line);
        var range = new root.monaco.Range(line, 1, line, 1);
        monacoEditor.setSelection(range);
        monacoEditor.focus();
        return;
      }

      if (scriptTextarea) {
        var idx = 0, currentLine = 1, i;
        for (i = 0; i < src.length && currentLine < line; i++) {
          if (src.charAt(i) === '\n') currentLine++;
          idx = i + 1;
        }
        var end = idx;
        while (end < src.length && src.charAt(end) !== '\n') end++;
        try {
          scriptTextarea.focus();
          if (typeof scriptTextarea.setSelectionRange === 'function') {
            scriptTextarea.setSelectionRange(idx, end);
          }
        } catch (e) {}
      }
    };

    btnRun.onclick = function () {
      saveState();

      var src = getScriptSource();
      var userMsg = taInput.value || '';
      var initScn = taInitScn.value || '';
      var initPer = taInitPer.value || '';
      var ctxOverrides = null;

      if (!root.esprima || !root.escodegen) {
        if (root.alert) root.alert('Script debugger requires esprima + escodegen.');
        return;
      }
      if (!root.ScriptDebugRunner || !root.ScriptDebugRunner.run) {
        if (root.alert) root.alert('ScriptDebugRunner library is not loaded.');
        return;
      }

      var rawCtx = taCtx.value || '';
      if (rawCtx.replace(/\s/g, '').length) {
        try {
          ctxOverrides = JSON.parse(rawCtx);
        } catch (eJson) {
          clearTraceAndOutput(traceTbody, outScenario, outPerson, errArea);
          errArea.textContent = 'Context JSON parse error.';
          fullTrace = [{
            step: 1,
            kind: 'error',
            message: 'Context JSON parse error: ' + String(eJson && eJson.message || eJson)
          }];
          renderTraceView(traceTbody);
          return;
        }
      }

      var options = {
        maxTrace: getMaxTrace(),
        maxSteps: getMaxSteps(),
        captureLoc: true,
        contextData: ctxOverrides,
        initialScenario: initScn,
        initialPersonality: initPer,
        mode: runMode
      };

      var res = root.ScriptDebugRunner.run(src, userMsg, options);

      if (res && res.error) {
        clearTraceAndOutput(traceTbody, outScenario, outPerson, errArea);
        var info = extractErrorInfo(res.error);
        errArea.textContent = info.text;
        lastErrorLine = info.line;
        btnJumpError.style.display = info.line ? 'inline-block' : 'none';
        fullTrace = [{
          step: 1,
          kind: 'error',
          message: String(res.error && res.error.message || res.error)
        }];
        renderTraceView(traceTbody);
        return;
      }

      errArea.textContent = '';
      lastErrorLine = null;
      btnJumpError.style.display = 'none';

      lastInitScn = initScn;
      lastInitPer = initPer;
      lastFinalScn = (res && res.scenario) || '';
      lastFinalPer = (res && res.personality) || '';
      updateOutputsView(outScenario, outPerson);

      fullTrace = (res && res.trace) || [];
      renderTraceView(traceTbody);
    };

    btnReset.onclick = function () {
      clearTraceAndOutput(traceTbody, outScenario, outPerson, errArea);
    };

    btnResetAll.onclick = function () {
      setScriptSource('');
      taInput.value = '';
      taInitScn.value = '';
      taInitPer.value = '';
      taCtx.value = '';

      fullTrace = [];
      lastInitScn = '';
      lastFinalScn = '';
      lastInitPer = '';
      lastFinalPer = '';
      errArea.textContent = '';
      lastErrorLine = null;
      btnJumpError.style.display = 'none';

      filters.showIf = true;
      filters.showBranches = true;
      filters.showLoops = true;
      filters.showWrites = true;
      filters.showErrors = true;
      collapseEnabled = true;
      chkIf.input.checked = true;
      chkBr.input.checked = true;
      chkLoop.input.checked = true;
      chkWrite.input.checked = true;
      chkErr.input.checked = true;
      chkColl.input.checked = true;

      maxTraceInput.value = '2000';
      maxStepsInput.value = '5000';
      runMode = 'detailed';
      modeSelect.value = 'detailed';
      displayMode = 'compact';
      viewSelect.value = 'compact';

      traceVisible = true;
      traceCard.style.display = '';
      btnToggleTrace.textContent = 'Hide Debug';

      showOnlyNew = false;
      chkOnlyNew.input.checked = false;

      renderTraceView(traceTbody);
      saveState();
    };
  }

  api.mount = function (rootEl) {
    lastRoot = rootEl;
    build(rootEl);
  };

  api.unmount = function () {
    if (lastRoot) {
      empty(lastRoot);
      lastRoot = null;
    }
  };

  root.CMPanel_scriptdebug = api;

})(window);
