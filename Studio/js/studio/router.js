/**
 * MythOS Studio — Router (ES5)
 * Path: js/studio/router.js
 * Purpose: Minimal UI routing for parent + child tab navigation without external deps.
 *          Designed to be safe/idempotent and to run before any data-binding logic.
 * Conventions:
 *   - Parent bar:  <nav id="cm-parent-tabs"> with buttons [data-parent="basic|advanced|experimental"]
 *   - Wraps:       #wrap-basic, #wrap-advanced, #wrap-experimental
 *   - Child tabs:  within each wrap, first .cm-tabs with buttons [data-tab]
 *   - Panels:      within each wrap, .cm-main contains elements [data-panel]
 * Behavior:
 *   - No localStorage in this file (structure-first). We can add persistence later.
 *   - Sets only the first child panel visible by default in each wrap.
 *   - Advanced & Experimental wrappers can remain hidden by host CSS; the router tolerates this.
 * ES level: ES5-only (no arrow functions, no let/const, no class syntax).
 */
(function (W) {
  'use strict';

  var DOC = W.document;
  if (!W.MythOS) { W.MythOS = {}; }

  /* --------------------------------------------------------------
   * tiny utils
   * -------------------------------------------------------------- */
  function addClass(el, name) {
    if (!el) return; if ((' ' + el.className + ' ').indexOf(' ' + name + ' ') !== -1) return;
    el.className = el.className ? (el.className + ' ' + name) : name;
  }
  function removeClass(el, name) {
    if (!el) return;
    el.className = (' ' + (el.className || '') + ' ').replace(new RegExp('\\s+' + name + '\\b', 'g'), ' ').replace(/^\s+|\s+$/g, '');
  }
  function qsa(root, sel) { return (root || DOC).querySelectorAll(sel); }
  function qs(root, sel) { return (root || DOC).querySelector(sel); }

  /* --------------------------------------------------------------
   * child router: toggles panels within a single wrapper
   * -------------------------------------------------------------- */
  function ChildRouter(wrapperId) {
    this.root  = DOC.getElementById(wrapperId);
    this.tabs  = this.root ? qs(this.root, '.cm-tabs') : null;
    this.main  = this.root ? qs(this.root, '.cm-main') : null;
    this.btns  = this.tabs ? qsa(this.tabs, 'button[data-tab]') : [];
    this.panels= this.main ? qsa(this.main, '[data-panel]') : [];
  }
  ChildRouter.prototype.activate = function (id, btn) {
    var i, p, b;
    for (i = 0; i < this.btns.length; i++) {
      b = this.btns[i];
      if (b === btn) { addClass(b, 'is-active-btn'); }
      else { removeClass(b, 'is-active-btn'); }
    }
    for (i = 0; i < this.panels.length; i++) {
      p = this.panels[i];
      if (p.getAttribute('data-panel') === id) { removeClass(p, 'is-hidden'); p.setAttribute('aria-hidden', 'false'); }
      else { addClass(p, 'is-hidden'); p.setAttribute('aria-hidden', 'true'); }
    }
  };
  ChildRouter.prototype.bind = function () {
    var self = this; if (!this.root || !this.tabs || !this.main) return;
    this.tabs.addEventListener('click', function (ev) {
      var t = ev.target || ev.srcElement; if (!t || !t.getAttribute) return;
      var id = t.getAttribute('data-tab'); if (!id) return;
      self.activate(id, t);
    }, false);
    // default to first tab if available
    if (this.btns.length) {
      this.activate(this.btns[0].getAttribute('data-tab'), this.btns[0]);
    }
  };

  /* --------------------------------------------------------------
   * parent router: toggles top-level wraps
   * -------------------------------------------------------------- */
  function ParentRouter() {
    this.bar = DOC.getElementById('cm-parent-tabs');
    this.wraps = {
      basic: DOC.getElementById('wrap-basic'),
      advanced: DOC.getElementById('wrap-advanced'),
      experimental: DOC.getElementById('wrap-experimental')
    };
  }
  ParentRouter.prototype.activate = function (name) {
    var k; for (k in this.wraps) if (this.wraps.hasOwnProperty(k)) {
      if (this.wraps[k]) { this.wraps[k].className = (k === name) ? 'wrap' : 'wrap hidden'; }
    }
    if (!this.bar) return;
    var btns = qsa(this.bar, 'button[data-parent]');
    var i, b, is;
    for (i = 0; i < btns.length; i++) {
      b = btns[i]; is = (b.getAttribute('data-parent') === name);
      if (is) addClass(b, 'active'); else removeClass(b, 'active');
    }
  };
  ParentRouter.prototype.bind = function () {
    var self = this; if (!this.bar) return;
    this.bar.addEventListener('click', function (ev) {
      var t = ev.target || ev.srcElement; if (!t || !t.getAttribute) return;
      var which = t.getAttribute('data-parent'); if (!which) return;
      self.activate(which);
    }, false);
    // default selection: basic
    self.activate('basic');
  };

  /* --------------------------------------------------------------
   * public facade
   * -------------------------------------------------------------- */
  var StudioRouter = {
    version: '1.0.0',
    initAll: function () {
      // Parent
      var P = new ParentRouter(); P.bind();
      // Children (safe to bind even if wrapper is hidden)
      new ChildRouter('wrap-basic').bind();
      new ChildRouter('wrap-advanced').bind();
      new ChildRouter('wrap-experimental').bind();
      return true;
    },
    _ChildRouter: ChildRouter,
    _ParentRouter: ParentRouter
  };

  // Export
  W.MythOS.StudioRouter = StudioRouter;

  // Auto-init when DOM is ready
  (function domReady(fn){
    if (DOC.readyState === 'complete' || DOC.readyState === 'interactive') { try { fn(); } catch (e) {} return; }
    DOC.addEventListener('DOMContentLoaded', function(){ try { fn(); } catch (e) {} }, false);
  }(function(){ StudioRouter.initAll(); }));

}(window));
