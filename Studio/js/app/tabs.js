/*
 * MythOS Studio — Tabs Controller
 * Path: /js/app/tabs.js
 * Purpose: Manage tab activation and panel mounting lifecycle.
 * Public API (window.CMvNext.tabs):
 *   - show(tabName) : void
 *   - getCurrent() : string|null
 * Dependencies: panel modules exposed as window.CMPanel_<tab>.
 * Emits/Side-effects: DOM class toggling; calls CMPanel_<tab>.mount()/unmount().
 * Versioning: ES5 only; no external deps.
 */

/* /js/app/tabs.js */
(function(root){
  'use strict';

  var currentTab = null;

  function qsa(sel, el){ return (el||document).querySelectorAll(sel); }
  function qs(sel, el){ return (el||document).querySelector(sel); }

  function getApi(tab){ return root['CMPanel_' + tab]; }

function setActive(tab){
    var i, btns = qsa('nav.cm-tabs button'), panels = qsa('section[data-panel]');
    for(i=0;i<btns.length;i++){
        var b = btns[i];
        var is = (b.getAttribute('data-tab') === tab);
        if (is) { b.classList.add('active'); b.setAttribute('aria-selected','true'); }
        else    { b.classList.remove('active'); b.setAttribute('aria-selected','false'); }
    }
    for(i=0;i<panels.length;i++){
        var p = panels[i];
        if (p.getAttribute('data-panel') === tab) {
            p.classList.remove('is-hidden');
        } else {
            p.classList.add('is-hidden');
        }
    }
}


  function unmountPanel(tab){
    if (!tab) return;
    var api = getApi(tab);
    if (api && typeof api.unmount === 'function') {
      try { api.unmount(); } catch(_e){}
    }
  }



  function mountPanel(tab){
    var api = getApi(tab);
    var rootEl = qs('#panel-' + tab + ' .panel-body');
    if (api && typeof api.mount === 'function') {
      try { api.mount(rootEl); } catch(_e){}
    }
  }

  function switchTo(tab){
    if (!tab) return;
    if (tab === currentTab) return; // avoid remount flood
    unmountPanel(currentTab);
    setActive(tab);
    mountPanel(tab);
    currentTab = tab;
  }

  function bind(){
    var i, btns = qsa('nav.cm-tabs button');
    for(i=0;i<btns.length;i++){
      (function(btn){
        btn.onclick = function(){
          var tab = btn.getAttribute('data-tab');
          switchTo(tab);
        };
      })(btns[i]);
    }
    // Initial state
    switchTo('project');
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', bind); }
  else { bind(); }

  root.CMvNext = root.CMvNext || {};
  root.CMvNext.tabs = {
    show: switchTo,
    getCurrent: function(){ return currentTab; }
  };
})(window);
