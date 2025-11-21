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

  //querySelectorAll Shorthand
  function qsa(sel, el){ return (el||document).querySelectorAll(sel); }
  //querySelector Shorthand
  function qs(sel, el){ return (el||document).querySelector(sel); }

  function getApi(tab){ return root['CMPanel_' + tab]; }

function setActive(tab){
    var i=0,
        buttons = qsa('nav.cm-tabs button'),
        panels  = qsa('section[data-panel]');

    for(i=0;i<buttons.length;i++){
        var button = buttons[i];
        var isButton = (button.getAttribute('data-tab') === tab);

        if (isButton) {
            button.classList.add('active');
            button.setAttribute('aria-selected','true');
        }
        else {
            button.classList.remove('active');
            button.setAttribute('aria-selected','false');
        }
    }

    for(i=0;i<panels.length;i++){
        var panel = panels[i];

        if (panel.getAttribute('data-panel') === tab) {
            panel.classList.remove('is-hidden');
        }
        else {
            panel.classList.add('is-hidden');
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
    var i=0,
        buttons = qsa('nav.cm-tabs button');

    for(i=0;i<buttons.length;i++){
      (function(button){
        button.onclick = function(){
          var tab = button.getAttribute('data-tab');
          switchTo(tab);
        };
      })(buttons[i]);
    }
    // Initial state
    switchTo('project');
  }

  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bind);
  }
  else { bind(); }

  root.CMvNext = root.CMvNext || {};
  root.CMvNext.tabs = {
    show: switchTo,
    getCurrent: function(){ return currentTab; }
  };
})(window);
