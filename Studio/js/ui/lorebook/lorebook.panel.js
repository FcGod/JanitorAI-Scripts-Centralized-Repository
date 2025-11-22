/**
 * ==============================================================
 * Module: LorebookPanel — Buffered editor & list for lore entries
 * File:   65-lorebook.panel.js
 * Namespace: MythOS._modules.LorebookPanel
 * Version: 1.1.0 (MythOS v6 framework)
 * Tier: 80–97 Pipeline/Plugin
 * --------------------------------------------------------------
 * Purpose:
 *   Two-pane Lorebook authoring panel for MythOS Studio. Mirrors the
 *   schema used by lorebook.html while following Studio panel patterns.
 *   Supports buffered edits (Save/Clear), seeding, import/export, search,
 *   and per-row validation badges. Engine-safe and ES5 only.
 *
 * Depends on:
 *   CFGStore (optional), GUI.State.CFG (fallback), MythOS.Util (optional)
 *
 * Exports:
 *   window.CMPanel_lorebook.mount(el)
 *   window.CMPanel_lorebook.unmount()
 *
 * Design Notes:
 *   - ES5 only. No frameworks. All DOM built with document.createElement.
 *   - Buffered editor: UI state is separate until Save commits to CFG.
 *   - UUIDs are RFC4122-ish v4, immutable once created.
 *   - Import supports array or { entries: [] } shapes; merge by uuid.
 *   - Consolidated seeding: Descriptors + Emotion Cues (no Locations).
 *
 * Lifecycle Hooks:
 *   Fires: none (panel-local). Listens: optional CFGStore.select subscription.
 *
 * Inputs:
 *   CFG: cfg.lorebook.entries[]; also reads cfg.actors[]
 *
 * Side Effects:
 *   Writes cfg.lorebook.entries[] via CFGStore.patch (or GUI.State.CFG fallback).
 *
 * Performance:
 *   Rebuilds list on data changes; simple string filtering. Suitable for < 1k rows.
 *
 * Change Log:
 *   - 1.1.0 2025-11-07: Consolidated seeding (Descriptors + Emotion Cues), removed Locations; idempotent upsert by name.
 *   - 1.0.3 2025-11-01: Pass C — Metrics (counters) + dirty flag; prep Diff hook
 *   - 1.0.2 2025-11-01: Pass B — delegate IO (import/export) and Search to MythOS.Lore.*
 *   - 1.0.1 2025-11-01: Pass A — delegate Model/Validate/Seed to MythOS.Lore.*
 *   - 1.0.0 2025-11-01: Initial rebuild with buffered editor & parity to lorebook.html
 * ==============================================================
 */
(function (root) {
  'use strict';

  // -------------------------------------------------------------
  // Small ES5 helpers (no external deps)
  // -------------------------------------------------------------
  function assign(t, s) { var k; if (!t) t = {}; if (!s) return t; for (k in s) if (s.hasOwnProperty(k)) t[k] = s[k]; return t; }
  function clone(o) { return JSON.parse(JSON.stringify(o || {})); }
  function arr(x) { return Object.prototype.toString.call(x) === '[object Array]' ? x : (x == null ? [] : [x]); }
  function clamp(n, lo, hi) { n = +n; if (isNaN(n)) n = lo; if (n < lo) n = lo; if (n > hi) n = hi; return n; }
  function byId(id) { return document.getElementById(id); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function empty(n) { while (n && n.firstChild) n.removeChild(n.firstChild); }
  function on(elm, ev, fn) { elm.addEventListener(ev, fn, false); }
  function off(elm, ev, fn) { elm.removeEventListener(ev, fn, false); }
  function nowIso() { return new Date().toISOString(); }

  // RFC4122-ish v4 UUID (ES5, time+random)
  function uuidv4() {
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0; d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // -------------------------------------------------------------
  // CFG access shim (prefers CFGStore; falls back to GUI.State.CFG)
  // -------------------------------------------------------------
  var Store = (function () {
    var sub = null;
    function get() {
      if (root.CFGStore && typeof root.CFGStore.get === 'function') return root.CFGStore.get();
      return (root.GUI && root.GUI.State && root.GUI.State.CFG) || {};
    }
    function patch(delta) {
      var cfg;
      if (root.CFGStore && typeof root.CFGStore.patch === 'function') {
        try {
          return root.CFGStore.patch(function (c) {
            cfg = c || {};
            var k; for (k in delta) if (delta.hasOwnProperty(k)) cfg[k] = delta[k];
            return cfg;
          });
        } catch (_e) {
          try { return root.CFGStore.patch(delta); } catch (_e2) { }
        }
      }
      cfg = get();
      var k2; for (k2 in delta) if (delta.hasOwnProperty(k2)) cfg[k2] = delta[k2];
      if (root.GUI && root.GUI.State) root.GUI.State.CFG = cfg;
      return cfg;
    }
    function subscribe(selectorFn, cb) {
      if (root.CFGStore && typeof root.CFGStore.select === 'function') {
        sub = root.CFGStore.select(selectorFn, cb);
        return function () { try { if (sub) sub(); } catch (_e) { } sub = null; };
      }
      return function () { };
    }
    return { get: get, patch: patch, subscribe: subscribe };
  }());

  // -------------------------------------------------------------
  // MythOS Lore library handles (delegations)
  // -------------------------------------------------------------
  var Lore = (root.MythOS && root.MythOS.Lore) || {};
  var LoreModel = Lore.Model || {};
  var LoreValidate = Lore.Validate || {};
  var LoreSeed = Lore.Seed || {};
  var LoreIO = Lore.IO || {};
  var LoreSearch = Lore.Search || {};
  var LoreDiff = Lore.Diff || {};
  var LoreMetrics = Lore.Metrics || {};

  var Categories = (LoreModel.categories ? LoreModel.categories() : ['character','faction','item','theme','custom','uncategorized']);
  var Activation = (LoreModel.activationModes ? LoreModel.activationModes() : ['standard','immediate','cooldown']);

  // -------------------------------------------------------------
  // Normalization helpers (delegated with safe fallbacks)
  // -------------------------------------------------------------
  function normalizeEntry(raw, usedUuids) {
    if (LoreModel && LoreModel.normalizeEntry) return LoreModel.normalizeEntry(raw, usedUuids);
    var e = clone(raw || {});
    if (!e.uuid || typeof e.uuid !== 'string') { e.uuid = genUniqueUuid(usedUuids); }
    if (!e.category) e.category = 'uncategorized';
    if (typeof e.enabled === 'undefined') e.enabled = true;
    if (typeof e.priority === 'undefined') e.priority = 1;
    if (typeof e.probability === 'undefined') e.probability = 100;
    return e;
  }
  function normalizeAll(list) {
    if (LoreModel && LoreModel.normalizeAll) return LoreModel.normalizeAll(list || []);
    var uu = {}; var out = []; var i; list = list || [];
    for (i = 0; i < list.length; i++) { var n = normalizeEntry(list[i], uu); out.push(n); uu[n.uuid] = 1; }
    return out;
  }
  function genUniqueUuid(used) { var u = uuidv4(); while (used && used[u]) u = uuidv4(); return u; }
  function validUuid(u) { return typeof u === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(u); }
  function validateEntry(e, seen) {
    if (LoreValidate && LoreValidate.entry) return LoreValidate.entry(e, seen || {});
    var status = 'ok'; var notes = []; seen = seen || {};
    if (!validUuid(e.uuid)) { status = 'err'; notes.push('invalid-uuid'); }
    if (seen[e.uuid]) { status = 'err'; notes.push('duplicate-uuid'); }
    if (!e.content || !String(e.content).trim()) { if (status !== 'err') status = 'warn'; notes.push('empty-content'); }
    if (Categories.indexOf(e.category) === -1) { if (status !== 'err') status = 'warn'; notes.push('unknown-category'); }
    return { status: status, notes: notes };
  }
  function makeIndexByUuid(list) { var m = {}, i; for (i = 0; i < list.length; i++) m[list[i].uuid] = i; return m; }

  // -------------------------------------------------------------
  // Compact seeding (local fallbacks) — ES5 idempotent upsert by name
  // -------------------------------------------------------------
  function cuesKeys(){
    return (root.SpeechCues && root.SpeechCues.keys) ? root.SpeechCues.keys.slice() :
      ['joy','sadness','anger','fear','trust','disgust','anticipation','surprise'];
  }
  function cap(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }
  function exists(x){ return x!=null && x!==''; }

  function lbEntries(cfg){ var lb = (cfg.lorebook||{}); if (!lb.entries) lb.entries = []; return lb.entries; }
  function upsertByName(entries, name, patchObj){
    var i; for (i=0;i<entries.length;i++){ if ((entries[i].name||'')===name){ assign(entries[i], patchObj); return entries[i]; } }
    var used = {}; for (i=0;i<entries.length;i++){ used[entries[i].uuid]=1; }
    var e = normalizeEntry(assign({ uuid: genUniqueUuid(used), name: name }, patchObj), used);
    entries.push(e); return e;
  }

  function summarizeAppearance(actor){
    var ap = actor.appearance||{}, out=[], parts=[];
    if (exists(ap.hair)) out.push('hair:'+ap.hair);
    if (exists(ap.eyes)) out.push('eyes:'+ap.eyes);
    if (exists(ap.build)) out.push('build:'+ap.build);
    var ad = ap.appendages||{};
    if (ad.ears)  parts.push('ears:'+(ad.ears.style||''));
    if (ad.tail)  parts.push('tail:'+(ad.tail.style||''));
    if (ad.wings) parts.push('wings:'+(ad.wings.style||''));
    if (ad.horns) parts.push('horns:'+(ad.horns.style||''));
    if (parts.length) out.push(parts.join(', '));
    return out.join(' • ');
  }

  // Local fallback: Descriptor seeding (Base:Appearance, Base:Voice)
  function seedDescriptorsLocal(cfg){
    var A = cfg.actors||{}, id, entries = lbEntries(cfg), added=[];
    for (id in A){ if (!A.hasOwnProperty(id)) continue; (function(aid, a){
      var baseCat = 'character';
      var e1 = upsertByName(entries, aid+':Base:Appearance', { category: baseCat, content: summarizeAppearance(a), priority: 50, probability: 100, enabled: true });
      var sp=a.speech||{}, bits=[]; if (exists(sp.tone)) bits.push('tone:'+sp.tone); if (exists(sp.pacing)) bits.push('pacing:'+sp.pacing); if (exists(sp.verbosity)) bits.push('verbosity:'+sp.verbosity); if (exists(sp.diction)) bits.push('diction:'+sp.diction);
      var e2 = upsertByName(entries, aid+':Base:Voice', { category: baseCat, content: bits.join(' • '), priority: 50, probability: 100, enabled: true });
      added.push(e1, e2);
    })(id, A[id]); }
    return added;
  }

  // Local fallback: Emotion cue seeding (Emotions + Ears/Tail/Wings/Horns)
  function seedEmotionCuesLocal(cfg){
    var A = cfg.actors||{}, id, entries = lbEntries(cfg), keys=cuesKeys(), i, added=[];
    for (id in A){ if (!A.hasOwnProperty(id)) continue; (function(aid, a){
      var ad = (a.appearance && a.appearance.appendages) || {};
      a.cues = a.cues || {}; a.cues_body = a.cues_body || {}; a.cues_body_parts = a.cues_body_parts || {};
      for (i=0;i<keys.length;i++){
        var em = keys[i], Em = cap(em);
        // Basic (face/voice/general)
        if (exists(a.cues[em])){
          added.push(upsertByName(entries, aid+':'+Em+':Emotions', { category:'character', content: a.cues[em], priority:60, probability:100, enabled:true }));
        }
        var parts = a.cues_body_parts[em] || { ears:'', tail:'', wings:'', horns:'' };
        var fallback = a.cues_body[em] || '';

        // FRIENDLIER RULE: if any text exists for a part, seed it even if Anatomy "present" isn't toggled yet
        var txtE = exists(parts.ears)  ? parts.ears  : fallback;
        var txtT = exists(parts.tail)  ? parts.tail  : fallback;
        var txtW = exists(parts.wings) ? parts.wings : fallback;
        var txtH = exists(parts.horns) ? parts.horns : fallback;

        if ((ad.ears  && ad.ears.present)  || exists(txtE)) { if (exists(txtE)) added.push(upsertByName(entries, aid+':'+Em+':Ears',  { category:'character', content: txtE, priority:55, probability:100, enabled:true })); }
        if ((ad.tail  && ad.tail.present)  || exists(txtT)) { if (exists(txtT)) added.push(upsertByName(entries, aid+':'+Em+':Tail',  { category:'character', content: txtT, priority:55, probability:100, enabled:true })); }
        if ((ad.wings && ad.wings.present) || exists(txtW)) { if (exists(txtW)) added.push(upsertByName(entries, aid+':'+Em+':Wings', { category:'character', content: txtW, priority:55, probability:100, enabled:true })); }
        if ((ad.horns && ad.horns.present) || exists(txtH)) { if (exists(txtH)) added.push(upsertByName(entries, aid+':'+Em+':Horns', { category:'character', content: txtH, priority:55, probability:100, enabled:true })); }
      }
    })(id, A[id]); }
    return added;
  }

  // Delegated wrappers (prefer MythOS.Lore.Seed if present)
  function seedDescriptors(cfg){ return (LoreSeed && LoreSeed.seedActorDescriptors) ? LoreSeed.seedActorDescriptors(cfg) : seedDescriptorsLocal(cfg); }
  function seedEmotionCues(cfg){ return (LoreSeed && LoreSeed.seedEmotionCues) ? LoreSeed.seedEmotionCues(cfg) : seedEmotionCuesLocal(cfg); }

  // -------------------------------------------------------------
  // Import/Export (delegated to Lore.IO with fallback)
  // -------------------------------------------------------------
  function importEntries(rawText, existing, overwrite) {
    var list; var added = 0, overwritten = 0, skipped = 0, errors = 0; var msg = '';
    try {
      var parsed = JSON.parse(rawText);
      if (Object.prototype.toString.call(parsed) === '[object Array]') list = parsed; else list = parsed && parsed.entries || [];
    } catch (e) {
      return { entries: existing, report: { added: 0, overwritten: 0, skipped: 0, errors: 1, note: 'invalid JSON' } };
    }
    var byUuid = makeIndexByUuid(existing); var used = {}; var i;
    for (i = 0; i < existing.length; i++) used[existing[i].uuid] = 1;
    for (i = 0; i < list.length; i++) {
      var item = normalizeEntry(list[i], used);
      var idx = byUuid[item.uuid];
      if (typeof idx === 'number') { if (overwrite) { existing[idx] = item; overwritten++; } else { skipped++; } }
      else { existing.push(item); added++; byUuid[item.uuid] = existing.length - 1; used[item.uuid] = 1; }
    }
    return { entries: existing, report: { added: added, overwritten: overwritten, skipped: skipped, errors: errors, note: msg } };
  }
  function exportEntries(entries, compact) { var blob = { entries: arr(entries) }; return compact ? JSON.stringify(blob) : JSON.stringify(blob, null, 2); }

  // -------------------------------------------------------------
  // UI — Panel
  // -------------------------------------------------------------
  var elRoot = null, unsub = null;
  var state = {
    entries: [],
    selectedUuid: null,
    buffer: null,
    searchBy: 'name',
    searchQuery: '',
    overwrite: false,
    compact: false,
    dirty: false
  };

  function readEntriesFromCfg(cfg) { var list = (((cfg || {}).lorebook || {}).entries) || []; return (LoreModel && LoreModel.normalizeAll) ? LoreModel.normalizeAll(arr(list)) : normalizeAll(arr(list)); }
  function writeEntriesToCfg(entries) { var cfg = Store.get(); var lb = cfg.lorebook || {}; lb.entries = arr(entries); Store.patch({ lorebook: lb }); }
  function signature(cfg) { var n = (cfg && cfg.lorebook && cfg.lorebook.entries && cfg.lorebook.entries.length) || 0; return [n, state.selectedUuid, state.searchBy, state.searchQuery, state.compact].join('|'); }

  // ---- DOM skeleton ----
  var dom = { toolbar: null, list: null, editor: null };
  function buildSkeleton(container) {
    empty(container);
    var wrap = el('div', 'lb-wrap');
    var toolbar = el('div', 'lb-toolbar');
    var body = el('div', 'lb-body');
    var colL = el('div', 'lb-col lb-col-left');
    var colR = el('div', 'lb-col lb-col-right');

    // Toolbar controls (Locations removed)
    var btnAdd = el('button', 'btn', 'Add');
    var btnSeedDesc = el('button', 'btn', 'Seed Descriptors');
    var btnSeedEmo = el('button', 'btn', 'Seed Emotion Cues');
    var btnImpF = el('button', 'btn', 'Import (File)');
    var btnImpP = el('button', 'btn', 'Import (Paste)');
    var chkOverwriteLbl = el('label', 'lb-check'); var chkOverwrite = document.createElement('input'); chkOverwrite.type = 'checkbox'; chkOverwriteLbl.appendChild(chkOverwrite); chkOverwriteLbl.appendChild(document.createTextNode(' overwrite'));
    var btnExport = el('button', 'btn acc', 'Export JSON');
    var chkCompactLbl = el('label', 'lb-check'); var chkCompact = document.createElement('input'); chkCompact.type = 'checkbox'; chkCompactLbl.appendChild(chkCompact); chkCompactLbl.appendChild(document.createTextNode(' compact'));

    // NEW: presence filter toggle (defaults ON)
    var chkPresenceLbl = el('label', 'lb-check');
    var chkPresence = document.createElement('input'); chkPresence.type = 'checkbox'; chkPresence.checked = true;
    chkPresenceLbl.appendChild(chkPresence); chkPresenceLbl.appendChild(document.createTextNode(' honor anatomy presence'));

    var searchWrap = el('span', 'lb-search');
    var selField = document.createElement('select');
    var opts = (LoreSearch && LoreSearch.fields) ? LoreSearch.fields() : ['name','content','keysRaw','keysecondaryRaw','uuid'];
    var i; for (i = 0; i < opts.length; i++) { var o = document.createElement('option'); o.value = opts[i]; o.text = opts[i]; selField.appendChild(o); }
    var txtSearch = document.createElement('input'); txtSearch.type = 'text'; txtSearch.placeholder = 'Search…';
    searchWrap.appendChild(selField); searchWrap.appendChild(txtSearch);

    toolbar.appendChild(btnAdd);
    toolbar.appendChild(btnSeedDesc);
    toolbar.appendChild(btnSeedEmo);
    toolbar.appendChild(btnImpF);
    toolbar.appendChild(btnImpP);
    toolbar.appendChild(chkOverwriteLbl);
    toolbar.appendChild(btnExport);
    toolbar.appendChild(chkCompactLbl);
    // NEW: add presence toggle to toolbar
    toolbar.appendChild(chkPresenceLbl);
    toolbar.appendChild(searchWrap);

    var list = el('div', 'lb-list');
    var editor = el('div', 'lb-editor');

    colL.appendChild(list);
    colR.appendChild(editor);
    body.appendChild(colL); body.appendChild(colR);

    wrap.appendChild(toolbar);
    wrap.appendChild(body);
    container.appendChild(wrap);

    dom.toolbar = toolbar; dom.list = list; dom.editor = editor;

    // Events
    on(btnAdd, 'click', onAdd);
    on(btnSeedDesc, 'click', onSeedDescriptors);
    on(btnSeedEmo, 'click', onSeedEmotionCues);
    on(btnImpF, 'click', function(){ pickFile(function(text){ doImport(text); }); });
    on(btnImpP, 'click', function(){ var t = prompt('Paste lorebook JSON (array or {entries})'); if (typeof t === 'string') doImport(t); });
    on(btnExport, 'click', function(){
      var cfg = Store.get();
      var honor = chkPresence && !!chkPresence.checked;
      var entries = honor ? filterByAnatomyPresence(state.entries, cfg) : state.entries;
      var payload = (LoreIO && LoreIO.export) ? LoreIO.export(entries, { compact: state.compact }) : exportEntries(entries, state.compact);
      downloadText('lorebook.json', payload);
    });
    on(chkOverwrite, 'change', function(){ state.overwrite = !!chkOverwrite.checked; });
    on(chkCompact, 'change', function(){ state.compact = !!chkCompact.checked; });
    on(selField, 'change', function(){ state.searchBy = selField.value || 'name'; renderList(); });
    on(txtSearch, 'input', function(){ state.searchQuery = txtSearch.value || ''; renderList(); });
  }

  // ---- Toolbar handlers ----
  function onAdd() {
    var used = {}; var i; for (i = 0; i < state.entries.length; i++) used[state.entries[i].uuid] = 1;
    var e = normalizeEntry({ uuid: genUniqueUuid(used), category: 'uncategorized', name: 'New Entry', content: '' }, used);
    state.entries.push(e); state.selectedUuid = e.uuid; state.buffer = clone(e); commitRender();
  }
  function onSeedDescriptors(){
    var cfg = Store.get(); var adds = seedDescriptors(cfg) || [];
    // Merge by name (idempotent):
    var i; for (i=0;i<adds.length;i++){ upsertByName(state.entries, adds[i].name || ('seed-'+i), adds[i]); }
    persistAndRender();
  }
  function onSeedEmotionCues(){
    var cfg = Store.get(); var adds = seedEmotionCues(cfg) || [];
    var i; for (i=0;i<adds.length;i++){ upsertByName(state.entries, adds[i].name || ('seed-'+i), adds[i]); }
    persistAndRender();
  }
  function doImport(text){
    var res = (LoreIO && LoreIO.import) ? LoreIO.import(text, state.entries.slice(), { overwrite: state.overwrite }) : importEntries(text, state.entries.slice(), state.overwrite);
    state.entries = res.entries;
    if (state.entries.length && !state.selectedUuid) state.selectedUuid = state.entries[0].uuid;
    state.buffer = state.selectedUuid ? clone(findByUuid(state.entries, state.selectedUuid)) : null;
    persistAndRender();
    if (res.report) alert('Import summary: added=' + res.report.added + ' overwritten=' + res.report.overwritten + ' skipped=' + res.report.skipped + ' errors=' + res.report.errors);
  }

  // ---- List rendering ----
  function renderList() {
    var listEl = dom.list; empty(listEl);
    var filtered = (LoreSearch && LoreSearch.filterByField) ? LoreSearch.filterByField(state.entries, state.searchBy, state.searchQuery) : filterEntries(state.entries, state.searchBy, state.searchQuery);
    var seen = {}; var i; for (i = 0; i < filtered.length; i++) {
      var e = filtered[i]; var v = validateEntry(e, seen); seen[e.uuid] = 1;
      var row = el('div', 'lb-row' + (e.uuid === state.selectedUuid ? ' active' : ''));
      var a = el('div', 'lb-row-main');
      var b = el('div', 'lb-row-right');
      var name = el('div', 'lb-name', e.name || '(unnamed)');
      if (state.selectedUuid === e.uuid && state.dirty) { var dot = el('span','lb-pill','\u25CF'); dot.title='Unsaved changes'; name.appendChild(dot); }
      var meta = el('div', 'lb-meta', '[' + (e.category || 'uncategorized') + ']');
      var stat = el('span', 'lb-pill status ' + v.status, v.status.toUpperCase());
      a.appendChild(name); a.appendChild(meta);
      b.appendChild(stat);
      // NEW: show OFF pill for appendage facets when not enabled in Actors → Anatomy
      var pres = presenceMap(Store.get());
      var parsed = parseAKey(e && e.name);
      if (parsed && facetIsAppendage(parsed.facet)){
        var isOn = pres[parsed.actor] && pres[parsed.actor][parsed.facet];
        if (!isOn){ var off = el('span','lb-pill warn','OFF'); off.title='Appendage not enabled in Actors → Anatomy'; b.appendChild(off); }
      }
      row.appendChild(a); row.appendChild(b);
      (function (uuid) { on(row, 'click', function () { onSelect(uuid); }); })(e.uuid);
      listEl.appendChild(row);
    }
  }
  function filterEntries(list, field, q) { q = String(q || '').toLowerCase(); if (!q) return list.slice(); var out = []; var i; for (i = 0; i < list.length; i++) { var e = list[i]; var v = String(field === 'keysRaw' ? e.keysRaw : field === 'keysecondaryRaw' ? e.keysecondaryRaw : e[field] || '').toLowerCase(); if (!v) continue; if (field === 'uuid') { if (v.indexOf(q) === 0) out.push(e); } else if (v.indexOf(q) !== -1) out.push(e); } return out; }

  // NEW: presence helpers for export filtering and row hint
  function presenceMap(cfg){
    var A = (cfg.actors||{}), id, map = {};
    for (id in A){ if (!A.hasOwnProperty(id)) continue;
      var ad = (A[id].appearance && A[id].appearance.appendages) || {};
      map[id] = {
        Ears:  !!(ad.ears  && ad.ears.present),
        Tail:  !!(ad.tail  && ad.tail.present),
        Wings: !!(ad.wings && ad.wings.present),
        Horns: !!(ad.horns && ad.horns.present)
      };
    }
    return map;
  }
  function facetIsAppendage(f){ return f==='Ears' || f==='Tail' || f==='Wings' || f==='Horns'; }
  function parseAKey(name){ if (!name) return null; var parts = String(name).split(':'); if (parts.length < 3) return null; return { actor: parts[0], state: parts[1], facet: parts[2] }; }
  function filterByAnatomyPresence(entries, cfg){
    var map = presenceMap(cfg); var out = [], i, e, parsed, actor, facet, ok;
    for (i=0;i<entries.length;i++){
      e = entries[i]; parsed = parseAKey(e && e.name);
      if (!parsed){ out.push(e); continue; }
      actor = parsed.actor; facet = parsed.facet;
      if (!facetIsAppendage(facet)){ out.push(e); continue; }
      ok = map[actor] && map[actor][facet];
      if (ok) out.push(e);
    }
    return out;
  }

  function onSelect(uuid) { state.selectedUuid = uuid; state.buffer = clone(findByUuid(state.entries, uuid)); state.dirty = false; renderList(); renderEditor(); }
  function findByUuid(list, uuid) { var i; for (i = 0; i < list.length; i++) if (list[i].uuid === uuid) return list[i]; return null; }

  // ---- Editor (buffered) ----
  function renderEditor() {
    var ed = dom.editor; empty(ed);
    if (!state.buffer) { ed.appendChild(el('div', 'lb-empty', 'No entry selected.')); return; }
    var e = state.buffer;

    var form = el('div', 'lb-form');

    // Row helpers
    function row(label, inputEl) { var r = el('div', 'lb-field'); var L = el('label', 'lb-label', label); r.appendChild(L); r.appendChild(inputEl); return r; }
    function input(type, val) { var x = document.createElement('input'); x.type = type; if (val != null) x.value = val; return x; }
    function textarea(val) { var t = document.createElement('textarea'); t.value = val || ''; return t; }
    function select(arr, val) { var s = document.createElement('select'); var i; for (i = 0; i < arr.length; i++) { var o = document.createElement('option'); o.value = arr[i]; o.text = arr[i]; if (arr[i] === val) o.selected = true; s.appendChild(o); } return s; }
    function checkbox(val) { var c = document.createElement('input'); c.type = 'checkbox'; c.checked = !!val; return c; }

    // Immutable UUID
    var uuidRO = input('text', e.uuid); uuidRO.readOnly = true; form.appendChild(row('UUID', uuidRO));

    var selCat = select(Categories, e.category); form.appendChild(row('Category', selCat));
    var name = input('text', e.name); form.appendChild(row('Name', name));
    var content = textarea(e.content); form.appendChild(row('Content', content));

    // Counters (via Metrics when available)
    var counter = el('div', 'lb-counter', '0 words • ~0 tokens'); form.appendChild(counter);

    var keys = input('text', e.keysRaw); form.appendChild(row('Keys', keys));
    var key2 = input('text', e.keysecondaryRaw); form.appendChild(row('Fallback Keys', key2));
    var keyPri = checkbox(e.keyMatchPriority); form.appendChild(row('Key Priority', keyPri));
    var whole = checkbox(e.matchWholeWords); form.appendChild(row('Match Whole Words', whole));
    var csens = checkbox(e.case_sensitive); form.appendChild(row('Case Sensitive', csens));

    var actMode = select(Activation, e.activationMode); form.appendChild(row('Activation Mode', actMode));
    var actScript = textarea(e.activationScript); form.appendChild(row('Activation Script', actScript));

    var grp = input('text', e.inclusionGroupRaw); form.appendChild(row('Group (raw)', grp));
    var grpW = input('number', e.groupWeight); form.appendChild(row('Group Weight', grpW));
    var ins = input('number', e.insertion_order); form.appendChild(row('Insertion Order', ins));

    var prio = input('number', e.priority); form.appendChild(row('Priority', prio));
    var prob = input('number', e.probability); prob.min = 0; prob.max = 100; form.appendChild(row('Probability %', prob));

    var en = checkbox(e.enabled); form.appendChild(row('Enabled', en));
    var co = checkbox(e.constant); form.appendChild(row('Constant', co));

    var minM = input('number', e.minMessages); form.appendChild(row('Min Messages', minM));
    var selL = input('number', e.selectiveLogic); form.appendChild(row('Selective Logic', selL));

    var cmt = input('text', e.comment); form.appendChild(row('Comment', cmt));

    var ext = textarea(JSON.stringify(e.extensions || {}, null, 2)); form.appendChild(row('Extensions (JSON)', ext));

    // Buttons
    var btns = el('div', 'lb-buttons');
    var btnSave = el('button', 'btn acc', 'Save');
    var btnClear = el('button', 'btn', 'Clear');
    var btnRemove = el('button', 'btn err', 'Remove');
    btns.appendChild(btnSave); btns.appendChild(btnClear); btns.appendChild(btnRemove);

    form.appendChild(btns);
    ed.appendChild(form);

    // Live counters (Metrics w/ fallback)
    function updateCounter(){
      var words, tokens;
      if (LoreMetrics && LoreMetrics.count) { var c = LoreMetrics.count(content.value || ''); words = c.words; tokens = c.estTokens; }
      else { var text = content.value || ''; words = text.trim() ? text.trim().split(/\s+/).length : 0; tokens = Math.round(words * 1.3); }
      counter.textContent = words + ' words • ~' + tokens + ' tokens';
    }
    on(content, 'input', updateCounter); updateCounter();

    // Minimal dirty tracking (flag + list indicator)
    (function(){
      var watch = [selCat,name,content,keys,key2,keyPri,whole,csens,actMode,actScript,grp,grpW,ins,prio,prob,en,co,minM,selL,cmt,ext];
      var i; for (i=0;i<watch.length;i++){ on(watch[i],'input', function(){ state.dirty = true; renderList(); }); on(watch[i],'change', function(){ state.dirty = true; renderList(); }); }
    })();

    // Wire buttons
    on(btnSave, 'click', function(){
      e.category = selCat.value; e.name = name.value; e.content = content.value;
      e.keysRaw = keys.value; e.keysecondaryRaw = key2.value;
      e.keyMatchPriority = !!keyPri.checked; e.matchWholeWords = !!whole.checked; e.case_sensitive = !!csens.checked;
      e.activationMode = actMode.value; e.activationScript = actScript.value;
      e.inclusionGroupRaw = grp.value; e.groupWeight = clamp(+grpW.value, 0, 1000000);
      e.insertion_order = clamp(+ins.value, 0, 1000000);
      e.priority = clamp(+prio.value, 0, 1000000);
      e.probability = clamp(+prob.value, 0, 100);
      e.enabled = !!en.checked; e.constant = !!co.checked;
      e.minMessages = clamp(+minM.value, 0, 1000000); e.selectiveLogic = clamp(+selL.value, 0, 1000000);
      e.comment = cmt.value;
      try { e.extensions = JSON.parse(ext.value || '{}'); } catch (_e) { alert('Extensions JSON is invalid.'); return; }
      var idx = -1, i; for (i = 0; i < state.entries.length; i++) if (state.entries[i].uuid === e.uuid) { idx = i; break; }
      if (idx >= 0) state.entries[idx] = normalizeEntry(e, null);
      state.dirty = false; persistAndRender();
    });

    on(btnClear, 'click', function(){
      selCat.value = 'uncategorized'; name.value = ''; content.value = ''; keys.value = ''; key2.value = '';
      keyPri.checked = false; whole.checked = true; csens.checked = false;
      actMode.value = 'standard'; actScript.value = '';
      grp.value = ''; grpW.value = 100; ins.value = 100; prio.value = 1; prob.value = 100;
      en.checked = true; co.checked = false; minM.value = 0; selL.value = 0; cmt.value = ''; ext.value = '{}'; updateCounter();
    });

    on(btnRemove, 'click', function(){
      if (!state.selectedUuid) return; if (!confirm('Delete this entry?')) return;
      var next = pickNeighborUuid(state.entries, state.selectedUuid);
      var i2, out = []; for (i2 = 0; i2 < state.entries.length; i2++) if (state.entries[i2].uuid !== state.selectedUuid) out.push(state.entries[i2]);
      state.entries = out; state.selectedUuid = next; state.buffer = next ? clone(findByUuid(state.entries, next)) : null; persistAndRender();
    });
  }

  function pickNeighborUuid(list, uuid) { var i, idx = -1; for (i = 0; i < list.length; i++) if (list[i].uuid === uuid) { idx = i; break; } if (idx === -1) return null; if (list.length <= 1) return null; return list[idx + 1] ? list[idx + 1].uuid : list[idx - 1].uuid; }

  // ---- File helpers ----
  function pickFile(cb){ var inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json,application/json'; on(inp, 'change', function(){ var f = inp.files && inp.files[0]; if(!f) return; var r = new FileReader(); r.onload = function(){ cb(String(r.result || '')); }; r.readAsText(f); }); inp.click(); }
  function downloadText(name, text){ var blob=new Blob([text],{type:'application/json'}); var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; a.click(); setTimeout(function(){URL.revokeObjectURL(a.href);},500); }

  // ---- Orchestration ----
  function commitRender(){ renderList(); renderEditor(); writeEntriesToCfg(state.entries); }
  function persistAndRender(){ try { writeEntriesToCfg(state.entries); } catch (_e) { } renderList(); renderEditor(); }
  function rerender(){ var cfg = Store.get(); state.entries = readEntriesFromCfg(cfg); if (state.entries.length) { if (!state.selectedUuid) state.selectedUuid = state.entries[0].uuid; if (!findByUuid(state.entries, state.selectedUuid)) state.selectedUuid = state.entries[0].uuid; state.buffer = clone(findByUuid(state.entries, state.selectedUuid)); } else { state.selectedUuid = null; state.buffer = null; } renderList(); renderEditor(); }
  function makeSignature(c){ var n = (c && c.lorebook && c.lorebook.entries && c.lorebook.entries.length) || 0; return [n, state.selectedUuid, state.searchBy, state.searchQuery, state.compact].join('|'); }

  // ---- Public API ----
  var api = {};
  api.mount = function (containerEl) { if (!containerEl) return; elRoot = containerEl; buildSkeleton(containerEl); state.entries = readEntriesFromCfg(Store.get()); if (state.entries.length) { state.selectedUuid = state.entries[0].uuid; state.buffer = clone(state.entries[0]); } renderList(); renderEditor(); if (unsub) { try { unsub(); } catch (_e) { } unsub = null; } unsub = Store.subscribe(function (c) { return makeSignature(c); }, function () { rerender(); }); };
  api.unmount = function () { if (!elRoot) return; empty(elRoot); elRoot = null; if (unsub) { try { unsub(); } catch (_e) { } unsub = null; } };

  // expose
  root.CMPanel_lorebook = api;

})(window);
