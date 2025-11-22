/*
 * MythOS Studio — Bootstrap CFG Binding
 * Path: /js/app/bootstrap.cfg.js
 * Purpose: Initialize CFGStore from GUI.State.CFG (legacy) and keep them bound/reactive.
 * Public API: none (module side-effect).
 * Dependencies: CFGStore, normalizeCFG; optional GUI.State (legacy compatibility).
 * Emits/Side-effects: Defines a getter/setter on GUI.State.CFG to proxy CFGStore.
 * Versioning: ES5 only.
 */

/* /js/app/bootstrap.cfg.js */
(function(root){
'use strict';
root.GUI = root.GUI || {}; GUI.State = GUI.State || {}; GUI.State.CFG = GUI.State.CFG || {};
var initial = (root.normalizeCFG) ? normalizeCFG(GUI.State.CFG) : (GUI.State.CFG || {});
if(root.CFGStore){ CFGStore.set(initial); }
// Keep GUI.State.CFG bound to the store for legacy consumers
try {
Object.defineProperty(GUI.State, 'CFG', {
get: function(){ return CFGStore.get(); },
set: function(next){ CFGStore.set(normalizeCFG?normalizeCFG(next):next); }
});
} catch(_e) { GUI.State.CFG = initial; }
})(window);