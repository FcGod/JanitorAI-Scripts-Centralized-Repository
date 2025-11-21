/**
 * ==============================================================
 * Module: Local Persistence
 * File:   /js/core/persist.local.js
 * Namespace: window.PersistLocal
 * Version: 1.0.0 (Studio v6)
 * Layer: Studio / Storage
 * --------------------------------------------------------------
 * Purpose:
 *   Save/load/clear author profiles in localStorage. Optionally
 *   normalizes on load via normalizeCFG when present.
 *
 * Depends on:
 *   window.localStorage, optional window.normalizeCFG, CFGStore.get()
 *
 * Public API:
 *   - save(label) : Boolean
 *   - load()      : Object|null     // normalized if normalizeCFG present
 *   - clear()     : Boolean
 *   - info()      : {label,savedAt,version}|null
 *
 * Design Notes:
 *   - ES5-only; storage key = 'mythos.studio.profile.v6'.
 *   - Defensive: never throws; returns null/false on failure.
 *
 * Side Effects:
 *   Writes JSON to localStorage; read/clear operations are idempotent.
 *
 * Errors & Guards:
 *   All storage calls wrapped in try/catch; invalid JSON fails safely.
 *
 * Performance:
 *   O(n) JSON size; intended for single-profile persistence.
 *
 * Testing:
 *   PersistLocal.save('My Profile'); PersistLocal.info(); PersistLocal.load(); PersistLocal.clear();
 *
 * Change Log:
 *   - 1.0.0 2025-10-31: Initial headerization.
 * ==============================================================
 */


(function(root){
  'use strict';

  var KEY = 'mythos.studio.profile.v6';

  function dateISO(){ try { return new Date().toISOString(); } catch(_e){ return ''; } }

  function save(label){
    try {
      var cfg = (root.CFGStore && CFGStore.get()) || null;
      if (!cfg) return false;
      var packet = {
        version: 6,
        label: label || 'Default Profile',
        savedAt: dateISO(),
        cfg: cfg
      };
      root.localStorage.setItem(KEY, JSON.stringify(packet));
      return true;
    } catch (e) { return false; }
  }

  function load(){
    try {
      var raw = root.localStorage.getItem(KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      var cfg = data && data.cfg ? data.cfg : null;
      if (!cfg) return null;
      if (root.normalizeCFG) { cfg = normalizeCFG(cfg); }
      return cfg;
    } catch (e) { return null; }
  }

  function clear(){
    try { root.localStorage.removeItem(KEY); return true; }
    catch (e) { return false; }
  }

  function info(){
    try {
      var raw = root.localStorage.getItem(KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data) return null;
      return { label: data.label || 'Profile', savedAt: data.savedAt || '', version: data.version || 0 };
    } catch (e) { return null; }
  }

  root.PersistLocal = { save: save, load: load, clear: clear, info: info, KEY: KEY };
})(window);
