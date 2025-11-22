/*
 * MythOS Studio — Local Harness Bridge
 * Path: /js/tests/harness.bridge.js
 * Purpose: Open /tests/LocalHarness.html and push current engine-safe CFG via postMessage.
 * Public API (window.HarnessBridge):
 *   - open(opts) : Window|null   // { url?:string } default '/tests/LocalHarness.html'
 *   - push(win?) : void          // pushes engine-safe CFG to given window (or last opened)
 * Dependencies: ExportCore, CFGStore.
 * Versioning: ES5 only.
 */
(function(root){
  'use strict';
  var lastWin = null;

  function safeCfg(){
    var cfg = (root.CFGStore && CFGStore.get && CFGStore.get()) || {};
    try { return root.ExportCore ? ExportCore.export('engineSafe', { cfg: cfg, includeMeta:true }).result : cfg; }
    catch(_e){ return cfg; }
  }

  function open(opts){
    opts = opts || {};
    var url = opts.url || '/tests/LocalHarness.html';
    try { lastWin = window.open(url, '_blank'); } catch(_e){ lastWin = null; }
    return lastWin;
  }

  function push(w){
    var target = w || lastWin;
    if (!target) return;
    try { target.postMessage({ type:'cm:cfg:push', cfg: safeCfg() }, '*'); } catch(_e){}
  }

  root.HarnessBridge = { open: open, push: push };
})(window);
