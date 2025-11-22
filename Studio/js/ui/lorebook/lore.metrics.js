/* =======================================================================
 * FILE: js/lore/lore.metrics.js (optional)
 * -----------------------------------------------------------------------
 */
(function(root){
  'use strict';
  root.MythOS = root.MythOS || {}; root.MythOS.Lore = root.MythOS.Lore || {};
  if (!root.MythOS.Lore.Metrics) root.MythOS.Lore.Metrics = {};
  var Metrics = root.MythOS.Lore.Metrics;

  /**
   * ==============================================================
   * Module: MythOS.Lore.Metrics
   * Purpose: Lightweight content counters for UI display.
   * Version: 1.0.0
   * Tier: 40 — Library
   * Depends: (none)
   * Exports:
   *   count(text) : { words:Number, estTokens:Number }
   * ==============================================================
   */

  function count(text){
    var t = String(text||'');
    var words = t.trim() ? t.trim().split(/\s+/).length : 0;
    var estTokens = Math.round(words * 1.3);
    return { words: words, estTokens: estTokens };
  }

  // API
  Metrics.count = count;
})(window);
