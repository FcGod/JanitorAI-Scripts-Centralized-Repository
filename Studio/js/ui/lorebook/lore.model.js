/* =======================================================================
 * FILE: js/lore/lore.model.js
 * -----------------------------------------------------------------------
 */
(function (root) {
  'use strict';
  // Namespace root
  root.MythOS = root.MythOS || {}; root.MythOS.Lore = root.MythOS.Lore || {};
  if (!root.MythOS.Lore.Model) root.MythOS.Lore.Model = {};
  var Model = root.MythOS.Lore.Model;

  /**
   * ==============================================================
   * Module: MythOS.Lore.Model
   * Purpose: Entry shape, defaults, UUIDs, normalization helpers.
   * Version: 1.0.0
   * Tier: 40 — Library
   * Depends: (none)
   * Exports:
   *   categories() : Array<String>
   *   normalizeEntry(raw, usedUuids) : Object
   *   normalizeAll(list) : Array<Object>
   *   uuid() : String (rfc4122-ish v4)
   *   ensureUniqueUuid(usedMap) : String
   * Notes:
   *   - Pure; no DOM or CFGStore access.
   *   - ES5 only.
   * ==============================================================
   */

  var CATEGORIES = ['place','character','faction','item','theme','custom','uncategorized'];
  var ACTIVATION = ['standard','immediate','cooldown'];

  function clone(o){ return JSON.parse(JSON.stringify(o||{})); }
  function clamp(n, lo, hi){ n = +n; if (isNaN(n)) n = lo; if (n < lo) n = lo; if (n > hi) n = hi; return n; }

  function uuid(){
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
      var r = (d + Math.random()*16) % 16 | 0; d = Math.floor(d/16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  function ensureUniqueUuid(used){ var u = uuid(); while(used && used[u]) u = uuid(); return u; }

  function normalizeEntry(raw, usedUuids){
    var e = clone(raw||{});
    if (!e.uuid || typeof e.uuid !== 'string') e.uuid = ensureUniqueUuid(usedUuids||{});
    if (CATEGORIES.indexOf(e.category) === -1) e.category = 'uncategorized';
    e.name = (e.name||'').trim();
    e.content = e.content || '';
    e.keysRaw = (e.keysRaw||'').trim();
    e.keysecondaryRaw = (e.keysecondaryRaw||'').trim();
    e.keyMatchPriority = !!e.keyMatchPriority;
    e.matchWholeWords = (typeof e.matchWholeWords === 'boolean') ? e.matchWholeWords : true;
    e.case_sensitive = !!e.case_sensitive;
    e.activationMode = ACTIVATION.indexOf(e.activationMode) !== -1 ? e.activationMode : 'standard';
    e.activationScript = e.activationScript || '';
    e.inclusionGroupRaw = e.inclusionGroupRaw || '';
    e.groupWeight = clamp(e.groupWeight, 0, 1000000);
    e.insertion_order = clamp(e.insertion_order, 0, 1000000);
    e.priority = clamp(e.priority, 0, 1000000);
    e.probability = clamp(e.probability, 0, 100);
    e.enabled = (typeof e.enabled === 'boolean') ? e.enabled : true;
    e.constant = !!e.constant;
    e.minMessages = clamp(e.minMessages, 0, 1000000);
    e.selectiveLogic = clamp(e.selectiveLogic, 0, 1000000);
    e.comment = e.comment || '';
    if (e.extensions == null) e.extensions = {};
    e.meta = e.meta || {};
    return e;
  }

  function normalizeAll(list){
    var out = []; var used = {}; var i;
    for (i=0;i<(list||[]).length;i++){ var n = normalizeEntry(list[i], used); out.push(n); used[n.uuid] = 1; }
    return out;
  }

  // API
  Model.categories = function(){ return CATEGORIES.slice(); };
  Model.activationModes = function(){ return ACTIVATION.slice(); };
  Model.normalizeEntry = normalizeEntry;
  Model.normalizeAll = normalizeAll;
  Model.uuid = uuid;
  Model.ensureUniqueUuid = ensureUniqueUuid;
})(window);