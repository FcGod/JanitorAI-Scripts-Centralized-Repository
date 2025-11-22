/*
 * MythOS Studio — Lorebook Import/Export & Validation
 * Path: /js/lore/lore.io.js
 * Purpose: Round-trip Lorebook entries via JSON; validate minimal schema; toggle overwrite on import.
 * Public API (window.LoreIO):
 *   - export(cfg)                  : { json:string, count:number }
 *   - validateEntry(entry)         : { ok:boolean, errors:string[] }
 *   - import(cfg, text, opts)      : { added:number, updated:number, skipped:number, errors:string[] }
 *       opts.overwrite (bool)      : replace existing entries with same UUID when true
 * Dependencies: none (operates on cfg.lorebook.entries).
 * Emits/Side-effects: mutates cfg.lorebook.entries in-place.
 * Versioning: ES5 only; Studio-only fields are NOT persisted in exported JSON.
 */
(function(root){
  'use strict';

  function ensure(cfg){
    cfg = cfg || {};
    cfg.lorebook = cfg.lorebook || {};
    cfg.lorebook.entries = cfg.lorebook.entries || [];
    return cfg;
  }

  function byUUID(cfg, uuid){
    var E = (cfg.lorebook && cfg.lorebook.entries) || [];
    var i; for(i=0;i<E.length;i++){ if(E[i] && E[i].uuid === uuid) return E[i]; }
    return null;
  }

  function validateEntry(e){
    var errs = [];
    if(!e || typeof e !== 'object') errs.push('not an object');
    if(!e || !e.uuid) errs.push('uuid missing');
    if(!e || !e.category) errs.push('category missing');
    if(!e || !String(e.content || '').trim()) errs.push('content missing');
    return { ok: !errs.length, errors: errs };
  }

  function exportJSON(cfg){
    ensure(cfg);
    var list = (cfg.lorebook && cfg.lorebook.entries) || [];
    return { json: JSON.stringify(list, null, 2), count: list.length };
  }

  function importJSON(cfg, text, opts){
    ensure(cfg); opts = opts || {};
    var overwrite = !!opts.overwrite;
    var added = 0, updated = 0, skipped = 0, errors = [];
    var arr;

    try { arr = JSON.parse(String(text || '')); }
    catch(_e){ return { added:0, updated:0, skipped:0, errors:['invalid JSON'] }; }

    if (Object.prototype.toString.call(arr) !== '[object Array]'){
      return { added:0, updated:0, skipped:0, errors:['expected array of entries'] };
    }

    var i; for(i=0;i<arr.length;i++){
      var e = arr[i];
      var v = validateEntry(e);
      if(!v.ok){ errors.push('row '+i+': '+v.errors.join(', ')); continue; }

      var existing = byUUID(cfg, e.uuid);
      if (existing){
        if (overwrite){
          // Replace entry (shallow)
          cfg.lorebook.entries[cfg.lorebook.entries.indexOf(existing)] = e;
          updated++;
        } else {
          skipped++;
        }
      } else {
        cfg.lorebook.entries.push(e);
        added++;
      }
    }
    return { added:added, updated:updated, skipped:skipped, errors:errors };
  }

  root.LoreIO = { export: exportJSON, import: importJSON, validateEntry: validateEntry };
})(window);
