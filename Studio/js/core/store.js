/**
 * ==============================================================
 * Module: CFGStore (Authoritative App State)
 * File:   /js/core/store.js
 * Namespace: window.CFGStore
 * Version: 1.0.0 (Studio v6)
 * Layer: Studio / State
 * --------------------------------------------------------------
 * Purpose:
 *   Single source of truth for CFG with lightweight reactive
 *   subscriptions. Bridges to CMvNext.bus and GUI.onChange if present.
 *
 * Depends on:
 *   Optional: CMvNext.bus.emit, GUI.onChange
 *
 * Public API:
 *   - get() : Object|null
 *   - set(cfg) : void
 *   - patch(mutFn) : void             // mutates current cfg then notifies
 *   - select(selector, cb) : offFn    // subscribes to derived slice
 *
 * Design Notes:
 *   - ES5-only; simple equality gate to reduce redundant callbacks.
 *   - Subscribers receive initial snapshot immediately.
 *
 * Side Effects:
 *   Notifies subscribers; may emit 'cfg:changed' and call GUI.onChange.
 *
 * Errors & Guards:
 *   Catches subscriber errors; continues notifying remaining listeners.
 *
 * Performance:
 *   O(#subs) per notify; selector equality comparison by reference.
 *
 * Testing:
 *   var off = CFGStore.select(x=>x, console.log); CFGStore.set({a:1}); off();
 *
 * Change Log:
 *   - 1.0.0 2025-10-31: Initial headerization.
 * ==============================================================
 */


/* /js/core/store.js */
(function (root) {
    'use strict';
    var subs = [];
    var state = {CFG: null};

    function get () {
        return state.CFG;
    }

    function set (next) {
        state.CFG = next;
        notify (true);
    }

    function patch (mut) {
        if (!state.CFG) return;
        mut (state.CFG);
        notify (true);
    }

    function select (sel, cb) {
        var item = {sel: sel, cb: cb, last: sel (state.CFG)};
        subs.push (item);
        try {
            cb (item.last);
        } catch (_e) {
        }
        return function () {
            var i;
            for (i = 0; i < subs.length; i++) {
                if (subs[i] === item) {
                    subs.splice (i, 1);
                    break;
                }
            }
        };
    }

    function notify () {
        var i;
        for (i = 0; i < subs.length; i++) {
            var s = subs[i];
            var cur = s.sel (state.CFG);
            if (cur !== s.last) {
                s.last = cur;
                try {
                    s.cb (cur);
                } catch (_e) {
                }
            }
        }
        if (root.CMvNext && CMvNext.bus && typeof CMvNext.bus.emit === 'function') {
            try {
                CMvNext.bus.emit ('cfg:changed', state.CFG);
            } catch (_e) {
            }
        }
        if (root.GUI && typeof GUI.onChange === 'function') {
            try {
                GUI.onChange (state.CFG);
            } catch (_e) {
            }
        }
    }

    root.CFGStore = {get: get, set: set, patch: patch, select: select};
}) (window);