(function(root){
  'use strict';
  // scriptdebug.panel.js — ES5-only Script Debugger for MythOS Studio
  // Mount with: window.CMPanel_scriptdebug(el)
  // Uses ScriptDebugRunner (core) + ScriptDebugInspect (formatter)

  var api = {}, lastRoot = null;
  var STORAGE_KEY = 'cm_scriptdebug_state_v1';

  // ---------- Small DOM helpers ----------
  function el(tag, cls, txt){
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = String(txt);
    return e;
  }
  function empty(n){
    while (n && n.firstChild) n.removeChild(n.firstChild);
  }

function makeTextarea(id, placeholder, rows){
  var t = document.createElement('textarea');
  if (id) t.id = id;
  t.rows = rows || 8;
  t.placeholder = placeholder || '';
  t.style.width = '100%';
  t.style.boxSizing = 'border-box';
  t.style.resize = 'none';

  return t;
}


  function makeOutputBox(id){
    var p = document.createElement('pre');
    if (id) p.id = id;
    p.style.width = '100%';
    p.style.boxSizing = 'border-box';
    p.style.whiteSpace = 'pre-wrap';
    p.style.margin = '0';
    p.style.padding = '4px 6px';
    p.style.minHeight = '3em';
    p.style.borderRadius = '4px';
    p.style.border = '1px solid rgba(255,255,255,0.08)';
    p.style.background = 'rgba(0,0,0,0.2)';
    return p;
  }

  function makeTraceTable(){
    var table = document.createElement('table');
    table.className = 'cm-trace-table';

    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var cols = ['#', 'Kind', 'Location', 'Details'];
    var i, th;
    for (i = 0; i < cols.length; i++){
      th = document.createElement('th');
      th.textContent = cols[i];
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    return table;
  }

  function makeCheckbox(id, labelText, checked){
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

  // ---------- Filtering / collapsing helpers ----------

  function eventVisible(ev, filters){
    var k = ev.kind || '';
    if (k === 'if') return filters.showIf;
    if (k === 'enter-then' || k === 'enter-else' || k === 'enter-case') return filters.showBranches;
    if (k === 'loop-iter' || k === 'loop-enter' || k === 'loop-exit') return filters.showLoops;
    if (k === 'write-scenario' || k === 'write-personality') return filters.showWrites;
    if (k === 'error') return filters.showErrors;
    // default: show unknown kinds
    return true;
  }

  function eventKey(ev){
    var k = ev.kind || '';
    var id = ev.id || '';
    var expr = ev.expr || '';
    var locStr = '';
    if (ev.loc && ev.loc.start){
      locStr = ev.loc.start.line + ':' + ev.loc.start.column;
    }
    return k + '|' + id + '|' + expr + '|' + locStr;
  }

  function cloneEvent(ev){
    var out = {};
    var key;
    for (key in ev){
      if (ev.hasOwnProperty(key)) out[key] = ev[key];
    }
    return out;
  }

  function buildDisplayTrace(fullTrace, filters, collapseEnabled){
    var out = [];
    if (!fullTrace || !fullTrace.length) return out;

    if (!collapseEnabled){
      var i0, ev0;
      for (i0 = 0; i0 < fullTrace.length; i0++){
        ev0 = fullTrace[i0];
        if (!eventVisible(ev0, filters)) continue;
        out.push(ev0);
      }
      return out;
    }

    var i, ev, lastKey = null, lastEv = null, count = 0;

    function flushLast(){
      if (!lastEv) return;
      var copy = cloneEvent(lastEv);
      if (count > 1) copy._repeat = count;
      out.push(copy);
      lastEv = null;
      lastKey = null;
      count = 0;
    }

    for (i = 0; i < fullTrace.length; i++){
      ev = fullTrace[i];
      if (!eventVisible(ev, filters)) continue;
      var key = eventKey(ev);
      if (key === lastKey){
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

  // ---------- Diff / highlight helpers ----------

  function escapeHtml(str){
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Returns HTML with new/changed bits highlighted.
  // onlyNew === false -> show full "after" with highlighted changed part
  // onlyNew === true  -> show only the changed part (still highlighted)
  function formatDiff(before, after, onlyNew){
    before = before || '';
    after = after || '';

    if (!before && !after){
      return '<span class="dbg-no-change">(no value)</span>';
    }
    if (before === after){
      return '<span class="dbg-no-change">(no change)</span>\n' + escapeHtml(after);
    }

    // Simple "append" case
    if (after.indexOf(before) === 0){
      var extra = after.slice(before.length);
      if (onlyNew){
        return '<span class="dbg-diff-add" style="background:rgba(255,255,0,0.25);">' +
          escapeHtml(extra) +
          '</span>';
      }
      return escapeHtml(before) +
        '<span class="dbg-diff-add" style="background:rgba(255,255,0,0.25);">' +
        escapeHtml(extra) +
        '</span>';
    }

    // General case: find first/last common ranges
    var i = 0;
    var maxPrefix = Math.min(before.length, after.length);
    while (i < maxPrefix && before.charAt(i) === after.charAt(i)) i++;

    var jBefore = before.length - 1;
    var jAfter  = after.length - 1;
    var maxSuffix = Math.min(before.length - i, after.length - i);
    var k = 0;
    while (k < maxSuffix &&
           before.charAt(jBefore - k) === after.charAt(jAfter - k)) {
      k++;
    }

    var prefix = after.slice(0, i);
    var changed = after.slice(i, after.length - k);
    var suffix = after.slice(after.length - k);

    if (!changed){
      // fallback: treat whole "after" as changed
      changed = after;
      prefix = '';
      suffix = '';
    }

    if (onlyNew){
      return '<span class="dbg-diff-add" style="background:rgba(255,255,0,0.25);">' +
        escapeHtml(changed) +
        '</span>';
    }

    return (
      escapeHtml(prefix) +
      '<span class="dbg-diff-add" style="background:rgba(255,255,0,0.25);">' +
      escapeHtml(changed) +
      '</span>' +
      escapeHtml(suffix)
    );
  }

  // ---------- Error helpers ----------

  function extractErrorInfo(err){
    if (!err) {
      return { text: '', line: null, column: null };
    }
    if (typeof err === 'string') {
      return { text: err, line: null, column: null };
    }

    var msg = String(err && err.message || err);
    var name = err && err.name ? err.name : 'Error';
    var text = name + ': ' + msg;

    var line = null;
    var col = null;

    if (err.lineNumber != null){
      line = err.lineNumber;
      text += ' (Line ' + err.lineNumber;
      if (err.column != null){
        col = err.column;
        text += ', Column ' + err.column;
      }
      text += ')';
    }

    return { text: text, line: line, column: col };
  }

  // ---------- UI Rendering helpers ----------

  function renderTrace(table, trace){
    var tbody = table.getElementsByTagName('tbody')[0];
    empty(tbody);

    if (!trace || !trace.length){
      var trEmpty = document.createElement('tr');
      var tdEmpty = document.createElement('td');
      tdEmpty.colSpan = 4;
      tdEmpty.textContent = 'No trace events recorded.';
      trEmpty.appendChild(tdEmpty);
      tbody.appendChild(trEmpty);
      return;
    }

    var i, ev, tr, td, locStr, summary, repeatCount;
    for (i = 0; i < trace.length; i++){
      ev = trace[i];
      tr = document.createElement('tr');

      // step #
      td = document.createElement('td');
      td.textContent = ev.step || (i + 1);
      tr.appendChild(td);

      // kind
      td = document.createElement('td');
      td.textContent = ev.kind || '';
      tr.appendChild(td);

      // location
      td = document.createElement('td');
      locStr = '';
      if (ev.loc && ev.loc.start){
        locStr = 'L' + ev.loc.start.line + ':' + ev.loc.start.column;
      }
      td.textContent = locStr;
      tr.appendChild(td);

      // details
      td = document.createElement('td');
      summary = '';

      if (root.ScriptDebugInspect &&
          root.ScriptDebugInspect.summarize &&
          typeof root.ScriptDebugInspect.summarize === 'function') {
        try {
          summary = root.ScriptDebugInspect.summarize(ev);
        } catch (_e) {
          summary = '';
        }
      }

      if (!summary){
        try { summary = JSON.stringify(ev); }
        catch (_e2) { summary = String(ev); }
      }

      repeatCount = ev._repeat || 1;
      if (repeatCount > 1){
        summary += ' (x' + repeatCount + ' consecutive)';
      }

      td.textContent = summary;
      tr.appendChild(td);

      tbody.appendChild(tr);
    }
  }

  // ---------- Main build() ----------

  function build(container){
    empty(container);

    var wrap = el('div','card dbg-wrap');

    // Title
    wrap.appendChild(el('h3', null, 'Script Debugger / Trace Viewer'));

    // Layout: 2 columns
    var row = el('div','row');
    row.style.display = 'flex';
    row.style.gap = '16px';
    row.style.alignItems = 'stretch';

    // State used for filters/collapse
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
    var traceVisible = true;
    var runMode = 'detailed'; // 'detailed' | 'fast'

    // State for diff rendering
    var lastInitScn = '';
    var lastFinalScn = '';
    var lastInitPer = '';
    var lastFinalPer = '';
    var showOnlyNew = false;

    // State for error jump
    var lastErrorLine = null;

    function getMaxTrace(){
      if (!maxTraceInput) return 2000;
      var v = parseInt(maxTraceInput.value, 10);
      if (isNaN(v) || v <= 0) v = 2000;
      if (v > 200000) v = 200000; // hard cap
      return v;
    }

    function getMaxSteps(){
      if (!maxStepsInput) return 5000;
      var v = parseInt(maxStepsInput.value, 10);
      if (isNaN(v) || v <= 0) v = 5000;
      if (v > 500000) v = 500000; // hard cap
      return v;
    }

    function refreshTraceView(traceTable){
      var display = buildDisplayTrace(fullTrace, filters, collapseEnabled);

      // Fast mode: only show key events (IF/branches/writes/errors)
      if (runMode === 'fast'){
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
        for (i = 0; i < display.length; i++){
          ev = display[i];
          if (keyKinds[ev.kind]) filtered.push(ev);
        }
        display = filtered;
      }

      renderTrace(traceTable, display);
    }

    function clearTraceAndOutput(traceTable, outScenario, outPerson, errArea){
      fullTrace = [];
      if (outScenario) outScenario.innerHTML = '';
      if (outPerson) outPerson.innerHTML = '';
      if (errArea) errArea.textContent = '';
      lastInitScn = '';
      lastFinalScn = '';
      lastInitPer = '';
      lastFinalPer = '';
      lastErrorLine = null;
      refreshTraceView(traceTable);
    }

    // LEFT: script + message + initial scenario/personality + context overrides
    var colLeft = el('div');
    colLeft.style.flex = '1 1 50%';

    var lblScript = el('label', null, 'Script (JS)');
    var taScript = makeTextarea('dbg-script', '// Paste your Janitor-style script here', 16);

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

    // Buttons: Run, Reset Debug, Reset ALL
    var btnRow = el('div', 'dbg-btn-row');
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

    colLeft.appendChild(lblScript);
    colLeft.appendChild(taScript);
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
    colLeft.appendChild(btnRow);

    // RIGHT: output + trace
    var colRight = el('div');
    colRight.style.flex = '1 1 50%';

    // Output card
    var outCard = el('div','card');
    outCard.appendChild(el('h4',null,'Simulated Output'));

    var outScenarioLbl = el('div','muted','context.character.scenario (after script, new parts highlighted)');
    var outScenario = makeOutputBox('dbg-out-scenario');

    var outPersonLbl = el('div','muted','context.character.personality (after script, new parts highlighted)');
    var outPerson = makeOutputBox('dbg-out-personality');

    outCard.appendChild(outScenarioLbl);
    outCard.appendChild(outScenario);
    outCard.appendChild(outPersonLbl);
    outCard.appendChild(outPerson);

    // Show-only-new toggle
    var chkOnlyNew = makeCheckbox('dbg-only-new', 'Show only new text', false);
    chkOnlyNew.label.style.display = 'block';
    chkOnlyNew.label.style.marginTop = '6px';
    outCard.appendChild(chkOnlyNew.label);

    // Copy output buttons
    var outBtnRow = el('div', 'dbg-output-btn-row');
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
    var traceCard = el('div','card');
    traceCard.appendChild(el('h4',null,'Execution Trace'));

    // Error row (inline)
    var errRow = el('div','dbg-error-row','');
    errRow.style.display = 'flex';
    errRow.style.alignItems = 'center';
    errRow.style.gap = '8px';
    errRow.style.marginBottom = '4px';

    var errArea = el('div','dbg-error','');
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

    // Controls row: filters + max trace + max steps + mode + collapse + copy + hide/show
    var ctrlRow = el('div','trace-controls');
    ctrlRow.style.display = 'flex';
    ctrlRow.style.flexWrap = 'wrap';
    ctrlRow.style.gap = '8px';
    ctrlRow.style.marginBottom = '8px';
    ctrlRow.style.marginTop = '4px';
    ctrlRow.style.alignItems = 'center';

    // Max trace length
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

    // Max steps
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

    // Mode select (Fast / Detailed)
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

    // Filters
    var chkIf    = makeCheckbox('dbg-f-if', 'IF decisions', true);
    var chkBr    = makeCheckbox('dbg-f-branch', 'Branches', true);
    var chkLoop  = makeCheckbox('dbg-f-loop', 'Loop iterations', true);
    var chkWrite = makeCheckbox('dbg-f-write', 'Writes', true);
    var chkErr   = makeCheckbox('dbg-f-error', 'Errors', true);

    ctrlRow.appendChild(chkIf.label);
    ctrlRow.appendChild(chkBr.label);
    ctrlRow.appendChild(chkLoop.label);
    ctrlRow.appendChild(chkWrite.label);
    ctrlRow.appendChild(chkErr.label);

    // Collapse toggle
    var chkColl = makeCheckbox('dbg-collapse', 'Collapse consecutive events', true);
    ctrlRow.appendChild(chkColl.label);

    // Copy + Hide/Show debug buttons
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

    // Trace table itself, inside a scrollable container
    var traceTable = makeTraceTable();
    var traceInner = el('div', 'trace-inner');
    traceInner.style.maxHeight = '320px';
    traceInner.style.overflowY = 'auto';
    traceInner.appendChild(traceTable);

    traceCard.appendChild(ctrlRow);
    traceCard.appendChild(traceInner);

    colRight.appendChild(outCard);
    colRight.appendChild(traceCard);

    row.appendChild(colLeft);
    row.appendChild(colRight);

    wrap.appendChild(row);
    container.appendChild(wrap);

    // ---------- Output view refresh helper ----------
    function updateOutputsView(){
      outScenario.innerHTML = formatDiff(lastInitScn, lastFinalScn, showOnlyNew);
      outPerson.innerHTML   = formatDiff(lastInitPer, lastFinalPer, showOnlyNew);
    }

    // ---------- Clipboard helper ----------
    function copyToClipboard(str, label){
      if (str == null) str = '';
      var text = String(str);

      function fallbackCopy(s){
        var taTmp = document.createElement('textarea');
        taTmp.style.position = 'fixed';
        taTmp.style.left = '-9999px';
        taTmp.style.top = '0';
        taTmp.value = s;
        document.body.appendChild(taTmp);
        taTmp.focus();
        taTmp.select();
        try {
          var ok = document.execCommand('copy');
          if (ok && root.alert) root.alert((label || 'Text') + ' copied to clipboard.');
        } catch (_err) {
          if (root.alert) root.alert('Could not copy. You can select and copy manually.');
        }
        document.body.removeChild(taTmp);
      }

      if (root.navigator && navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(function(){
          if (root.alert) root.alert((label || 'Text') + ' copied to clipboard.');
        }, function(){
          fallbackCopy(text);
        });
      } else {
        fallbackCopy(text);
      }
    }

    // ---------- Autosave helpers ----------
    function saveState(){
      try {
        if (!root.localStorage) return;
        var state = {
          script: taScript.value || '',
          input: taInput.value || '',
          initScn: taInitScn.value || '',
          initPer: taInitPer.value || '',
          ctx: taCtx.value || '',
          maxTrace: getMaxTrace(),
          maxSteps: getMaxSteps(),
          mode: runMode
        };
        root.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (_e) {
        // ignore
      }
    }

    function loadState(){
      try {
        if (!root.localStorage) return;
        var raw = root.localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        var state = JSON.parse(raw);
        if (!state || typeof state !== 'object') return;

        if (state.script != null) taScript.value = String(state.script);
        if (state.input != null) taInput.value = String(state.input);
        if (state.initScn != null) taInitScn.value = String(state.initScn);
        if (state.initPer != null) taInitPer.value = String(state.initPer);
        if (state.ctx != null) taCtx.value = String(state.ctx);

        if (state.maxTrace != null && maxTraceInput){
          maxTraceInput.value = String(state.maxTrace);
        }
        if (state.maxSteps != null && maxStepsInput){
          maxStepsInput.value = String(state.maxSteps);
        }
        if (state.mode && (state.mode === 'fast' || state.mode === 'detailed')){
          runMode = state.mode;
          if (modeSelect) modeSelect.value = runMode;
        }
      } catch (_e) {
        // ignore
      }
    }

    // Load any saved state
    loadState();

    // -------- Wire filter controls --------
    chkIf.input.onchange = function(){
      filters.showIf = !!chkIf.input.checked;
      refreshTraceView(traceTable);
      saveState();
    };
    chkBr.input.onchange = function(){
      filters.showBranches = !!chkBr.input.checked;
      refreshTraceView(traceTable);
      saveState();
    };
    chkLoop.input.onchange = function(){
      filters.showLoops = !!chkLoop.input.checked;
      refreshTraceView(traceTable);
      saveState();
    };
    chkWrite.input.onchange = function(){
      filters.showWrites = !!chkWrite.input.checked;
      refreshTraceView(traceTable);
      saveState();
    };
    chkErr.input.onchange = function(){
      filters.showErrors = !!chkErr.input.checked;
      refreshTraceView(traceTable);
      saveState();
    };
    chkColl.input.onchange = function(){
      collapseEnabled = !!chkColl.input.checked;
      refreshTraceView(traceTable);
      saveState();
    };
    maxTraceInput.onchange = function(){
      refreshTraceView(traceTable);
      saveState();
    };
    maxStepsInput.onchange = function(){
      saveState();
    };
    modeSelect.onchange = function(){
      runMode = modeSelect.value === 'fast' ? 'fast' : 'detailed';
      refreshTraceView(traceTable);
      saveState();
    };

    chkOnlyNew.input.onchange = function(){
      showOnlyNew = !!chkOnlyNew.input.checked;
      updateOutputsView();
    };

    // Autosave on main textarea changes (on blur)
    taScript.onchange = saveState;
    taInput.onchange = saveState;
    taInitScn.onchange = saveState;
    taInitPer.onchange = saveState;
    taCtx.onchange = saveState;

    // -------- Copy buttons handlers --------
    btnCopyTrace.onclick = function(){
      var display = buildDisplayTrace(fullTrace, filters, collapseEnabled);

      if (runMode === 'fast'){
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
        for (i = 0; i < display.length; i++){
          ev = display[i];
          if (keyKinds[ev.kind]) filtered.push(ev);
        }
        display = filtered;
      }

      if (!display || !display.length){
        if (root.alert) root.alert('No debug trace to copy.');
        return;
      }

      var lines = [];
      lines.push('Step\tKind\tLocation\tDetails');

      var i2, ev2, locStr, summary, repeatCount;
      for (i2 = 0; i2 < display.length; i2++){
        ev2 = display[i2];

        locStr = '';
        if (ev2.loc && ev2.loc.start){
          locStr = 'L' + ev2.loc.start.line + ':' + ev2.loc.start.column;
        }

        summary = '';
        if (root.ScriptDebugInspect &&
            root.ScriptDebugInspect.summarize &&
            typeof root.ScriptDebugInspect.summarize === 'function') {
          try {
            summary = root.ScriptDebugInspect.summarize(ev2);
          } catch (_e) {
            summary = '';
          }
        }
        if (!summary){
          try { summary = JSON.stringify(ev2); }
          catch (_e2) { summary = String(ev2); }
        }

        repeatCount = ev2._repeat || 1;
        if (repeatCount > 1){
          summary += ' (x' + repeatCount + ' consecutive)';
        }

        lines.push(
          String(ev2.step || (i2 + 1)) + '\t' +
          String(ev2.kind || '') + '\t' +
          locStr + '\t' +
          summary
        );
      }

      var text = lines.join('\n');
      copyToClipboard(text, 'Debug trace');
    };

    btnCopyScn.onclick = function(){
      copyToClipboard(lastFinalScn, 'Scenario');
    };
    btnCopyPer.onclick = function(){
      copyToClipboard(lastFinalPer, 'Personality');
    };

    // -------- Hide/Show Debug handler --------
    btnToggleTrace.onclick = function(){
      traceVisible = !traceVisible;
      if (traceVisible){
        traceCard.style.display = '';
        btnToggleTrace.textContent = 'Hide Debug';
      } else {
        traceCard.style.display = 'none';
        btnToggleTrace.textContent = 'Show Debug';
      }
    };

    // -------- Jump-to-line handler --------
    btnJumpError.onclick = function(){
      if (!lastErrorLine || !taScript) return;

      var line = lastErrorLine;
      if (line < 1) line = 1;

      var text = taScript.value || '';
      var idx = 0;
      var currentLine = 1;
      var i3;
      for (i3 = 0; i3 < text.length && currentLine < line; i3++){
        if (text.charAt(i3) === '\n'){
          currentLine++;
        }
        idx = i3 + 1;
      }
      var end = idx;
      while (end < text.length && text.charAt(end) !== '\n') end++;

      try {
        taScript.focus();
        if (typeof taScript.setSelectionRange === 'function'){
          taScript.setSelectionRange(idx, end);
        } else if (taScript.createTextRange){
          var range = taScript.createTextRange();
          range.collapse(true);
          range.moveStart('character', idx);
          range.moveEnd('character', end - idx);
          range.select();
        }
      } catch (_e) {
        // ignore
      }
    };

    // -------- Run button handler (delegate to ScriptDebugRunner) --------
    btnRun.onclick = function(){
      saveState(); // save current inputs/options

      var src = taScript.value || '';
      var userMsg = taInput.value || '';
      var initScn = taInitScn.value || '';
      var initPer = taInitPer.value || '';
      var ctxOverrides = null;

      if (!root.esprima || !root.escodegen){
        alert('Script debugger requires esprima + escodegen to be loaded.');
        return;
      }

      if (!root.ScriptDebugRunner || !root.ScriptDebugRunner.run){
        alert('ScriptDebugRunner library is not loaded.');
        return;
      }

      // Parse context overrides JSON if present
      var rawCtx = taCtx.value || '';
      if (rawCtx.replace(/\s/g, '').length) {
        try {
          ctxOverrides = JSON.parse(rawCtx);
        } catch (eJson) {
          clearTraceAndOutput(traceTable, outScenario, outPerson, errArea);
          errArea.textContent = 'Context JSON parse error.';
          renderTrace(traceTable, [{
            step: 1,
            kind: 'error',
            message: 'Context JSON parse error: ' + String(eJson && eJson.message || eJson)
          }]);
          return;
        }
      }

      var maxTrace = getMaxTrace();
      var maxSteps = getMaxSteps();

      var options = {
        maxTrace: maxTrace,
        maxSteps: maxSteps,
        captureLoc: true,
        contextData: ctxOverrides,
        initialScenario: initScn,
        initialPersonality: initPer,
        mode: runMode
      };

      // Older runners ignore the 3rd arg, newer ones can use it.
      var res = root.ScriptDebugRunner.run(src, userMsg, options);

      if (res && res.error){
        clearTraceAndOutput(traceTable, outScenario, outPerson, errArea);
        var info = extractErrorInfo(res.error);
        errArea.textContent = info.text;
        lastErrorLine = info.line;
        btnJumpError.style.display = info.line ? 'inline-block' : 'none';
        renderTrace(traceTable, [{
          step: 1,
          kind: 'error',
          message: String(res.error && res.error.message || res.error)
        }]);
        return;
      }

      errArea.textContent = '';
      lastErrorLine = null;
      btnJumpError.style.display = 'none';

      lastInitScn = initScn;
      lastInitPer = initPer;
      lastFinalScn = (res && res.scenario) || '';
      lastFinalPer = (res && res.personality) || '';

      updateOutputsView();

      fullTrace = (res && res.trace) || [];
      refreshTraceView(traceTable);
    };

    // -------- Reset buttons --------
    btnReset.onclick = function(){
      clearTraceAndOutput(traceTable, outScenario, outPerson, errArea);
    };

    btnResetAll.onclick = function(){
      resetAllControls(
        traceTable,
        outScenario,
        outPerson,
        taScript,
        taInput,
        taInitScn,
        taInitPer,
        taCtx,
        errArea,
        chkIf, chkBr, chkLoop, chkWrite, chkErr, chkColl,
        btnToggleTrace,
        traceCard
      );
      saveState();
    };

    // Reset-all helper uses current closures
    function resetAllControls(
      traceTable,
      outScenario,
      outPerson,
      taScript,
      taInput,
      taInitScn,
      taInitPer,
      taCtx,
      errArea,
      chkIf, chkBr, chkLoop, chkWrite, chkErr, chkColl,
      btnToggleTrace,
      traceCard
    ){
      // Clear text inputs
      taScript.value = '';
      taInput.value = '';
      taInitScn.value = '';
      taInitPer.value = '';
      taCtx.value = '';

      // Clear trace + outputs + error
      fullTrace = [];
      lastInitScn = '';
      lastFinalScn = '';
      lastInitPer = '';
      lastFinalPer = '';
      if (outScenario) outScenario.innerHTML = '';
      if (outPerson) outPerson.innerHTML = '';
      if (errArea) errArea.textContent = '';
      lastErrorLine = null;
      btnJumpError.style.display = 'none';

      // Reset filters
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

      // Reset max trace/steps
      if (maxTraceInput) {
        maxTraceInput.value = '2000';
      }
      if (maxStepsInput) {
        maxStepsInput.value = '5000';
      }

      // Reset mode
      runMode = 'detailed';
      if (modeSelect) modeSelect.value = 'detailed';

      // Ensure debug/trace is visible again
      traceVisible = true;
      if (traceCard) traceCard.style.display = '';
      if (btnToggleTrace) btnToggleTrace.textContent = 'Hide Debug';

      // Reset "show only new"
      showOnlyNew = false;
      chkOnlyNew.input.checked = false;

      refreshTraceView(traceTable);
    }
  }

  // ---------- Public API ----------
  api.mount = function(rootEl){
    lastRoot = rootEl;
    build(rootEl);
  };

  api.unmount = function(){
    if (lastRoot){
      empty(lastRoot);
      lastRoot = null;
    }
  };

  root.CMPanel_scriptdebug = api;

})(window);
