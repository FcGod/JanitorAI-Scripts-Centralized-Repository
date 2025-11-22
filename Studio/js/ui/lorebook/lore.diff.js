/* =======================================================================
 * FILE: js/lore/lore.diff.js
 * -----------------------------------------------------------------------
 */
(function(root){
  'use strict';
  root.MythOS = root.MythOS || {}; root.MythOS.Lore = root.MythOS.Lore || {};
  if (!root.MythOS.Lore.Diff) root.MythOS.Lore.Diff = {};
  var Diff = root.MythOS.Lore.Diff;

  /**
   * ==============================================================
   * Module: MythOS.Lore.Diff
   * Purpose: Compare buffered vs committed entries for dirty state.
   * Version: 1.0.0
   * Tier: 40 — Library
   * Depends: (none)
   * Exports:
   *   isDirty(committed, buffer) : Boolean
   * Notes:
   *   - Ignores uuid; coerces numeric fields before compare.
   * ==============================================================
   */

  function clone(o){ return JSON.parse(JSON.stringify(o||{})); }
  function coerceNumerics(x){
    x.groupWeight = +x.groupWeight; x.insertion_order = +x.insertion_order; x.priority = +x.priority;
    x.probability = +x.probability; x.minMessages = +x.minMessages; x.selectiveLogic = +x.selectiveLogic;
    return x;
  }

  function isDirty(committed, buffer){
    if (!committed || !buffer) return false;
    var a = clone(committed); var b = clone(buffer);
    delete a.uuid; delete b.uuid;
    a = coerceNumerics(a); b = coerceNumerics(b);
    return JSON.stringify(a) !== JSON.stringify(b);
  }

  // API
  Diff.isDirty = isDirty;
})(window);
