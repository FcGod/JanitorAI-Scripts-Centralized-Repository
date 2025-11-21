/**
 * ==============================================================
 * Module: Event Bus (Lightweight)
 * File:   /js/core/bus.js
 * Namespace: window.CMvNext.bus
 * Version: 1.0.1 (Studio v6)
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
 *   var off = CMvNext.bus.listen('x', console.log); CMvNext.bus.emit('x', 1); off();
 *
 * Change Log:
 *   - 1.0.0 2025-10-31: Initial headerization.
 *   - 1.0.1 2025-11-08: Refactoring
 * ==============================================================
 */


(function(root){
  'use strict';

  var map = {};       // evt -> [listener, listenrer, ...]
  var any = [];       // [fn, fn, ...] receives (event, payload)


  function listen(event, listener){
    if (!event || typeof listener !== 'function') return function(){};
    var list = map[event] = map[event] || [];
    list.push(listener);
    return function off(){ detachListener(event, listener); };
  }


  function listenOnce(event, listener){
    if (!event || typeof listener !== 'function') return function(){};

    function wrap(x){
        try{ listener(x); }
        finally { detachListener(event, wrap); }
    }

    return listen(event, wrap);
  }


  function detachListener(event, listener){
    var list = map[event]; if (!list) return;

    var i;
    for (i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener) list.splice(i, 1);
    }

    if (!list.length) delete map[event];
  }


  function emit(event, payload){
    var list = map[event];
    // snapshot arrays to avoid mutation during emit
    if (list) {
      var i, snap = list.slice(0);
      for (i = 0; i < snap.length; i++) { try { snap[i](payload); } catch(_e){} }
    }
    if (any.length){
      var j, all = any.slice(0);
      for (j = 0; j < all.length; j++) { try { all[j](event, payload); } catch(_e){} }
    }
  }

  function listenAll(fn){
    if (typeof fn !== 'function') return function(){};
    any.push(fn);
    return function off(){ detachAll(fn); };
  }

  function detachAll(fn){
    var i; for (i = any.length - 1; i >= 0; i--) { if (any[i] === fn) any.splice(i, 1); }
  }

  root.CMvNext = root.CMvNext || {};
  root.CMvNext.bus = {
      listen: listen,
      listenOnce: listenOnce,
      detachListener: detachListener,
      emit: emit,
      listenAll: listenAll,
      detachAll: detachAll
  };
})(window);
