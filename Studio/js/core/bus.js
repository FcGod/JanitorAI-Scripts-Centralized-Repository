/**
 * ==============================================================
 * Module: Event Bus (Lightweight)
 * File:   /js/core/bus.js
 * Namespace: window.CMvNext.bus
 * Version: 1.0.0 (Studio v6)
 * Layer: Studio / Messaging
 * --------------------------------------------------------------
 * Purpose:
 *   Local pub/sub for Studio modules: on/once/off/emit + onAny/offAny.
 *
 * Depends on:
 *   None
 *
 * Public API:
 *   - on(evt, fn)    : offFn
 *   - once(evt, fn)  : offFn
 *   - off(evt, fn)   : void
 *   - emit(evt, pay) : void
 *   - onAny(fn)      : offFn
 *   - offAny(fn)     : void
 *
 * Design Notes:
 *   - ES5-only; captures snapshot arrays on emit to avoid mutation issues.
 *
 * Side Effects:
 *   In-memory listener tables only.
 *
 * Errors & Guards:
 *   Listener exceptions are caught; bus remains stable.
 *
 * Performance:
 *   O(#listeners for evt) + O(#onAny) per emit.
 *
 * Testing:
 *   var off = CMvNext.bus.on('x', console.log); CMvNext.bus.emit('x', 1); off();
 *
 * Change Log:
 *   - 1.0.0 2025-10-31: Initial headerization.
 * ==============================================================
 */


(function(root){
  'use strict';

  var map = {};       // evt -> [fn, fn, ...]
  var any = [];       // [fn, fn, ...] receives (evt, payload)

  function on(evt, fn){
    if (!evt || typeof fn !== 'function') return function(){};
    var list = map[evt] = map[evt] || [];
    list.push(fn);
    return function off(){ offEvt(evt, fn); };
  }

  function once(evt, fn){
    if (!evt || typeof fn !== 'function') return function(){};
    function wrap(x){ try{ fn(x); } finally { offEvt(evt, wrap); } }
    return on(evt, wrap);
  }

  function offEvt(evt, fn){
    var list = map[evt]; if (!list) return;
    var i; for (i = list.length - 1; i >= 0; i--) { if (list[i] === fn) list.splice(i, 1); }
    if (!list.length) delete map[evt];
  }

  function emit(evt, payload){
    var list = map[evt]; 
    // snapshot arrays to avoid mutation during emit
    if (list) {
      var i, snap = list.slice(0);
      for (i = 0; i < snap.length; i++) { try { snap[i](payload); } catch(_e){} }
    }
    if (any.length){
      var j, all = any.slice(0);
      for (j = 0; j < all.length; j++) { try { all[j](evt, payload); } catch(_e){} }
    }
  }

  function onAny(fn){
    if (typeof fn !== 'function') return function(){};
    any.push(fn);
    return function off(){ offAny(fn); };
  }

  function offAny(fn){
    var i; for (i = any.length - 1; i >= 0; i--) { if (any[i] === fn) any.splice(i, 1); }
  }

  root.CMvNext = root.CMvNext || {};
  root.CMvNext.bus = { on: on, once: once, off: offEvt, emit: emit, onAny: onAny, offAny: offAny };
})(window);
