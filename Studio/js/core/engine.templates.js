/**
 * ==============================================================
 * Module: Engine Template Registry
 * File:   /js/core/engine.templates.js
 * Namespace: window.EngineTemplates
 * Version: 1.0.0 (Studio v6)
 * Layer: Studio / Packaging
 * --------------------------------------------------------------
 * Purpose:
 *   Register and retrieve MythOS engine template sources by name.
 *   Templates are raw text with injection tokens (e.g., /*__MYTHOS_CFG__* /).
 *
 * Depends on:
 *   XMLHttpRequest (for local template fetch)
 *
 * Public API:
 *   - register(name, getterFn) : void      // getterFn(cb) -> cb(err, text)
 *   - get(name, cb)            : void
 *   - list()                   : string[]
 *
 * Design Notes:
 *   - ES5-only; file paths are Studio-relative (/engine/...).
 *   - Keeps raw text; ExportPackage performs injection later.
 *
 * Side Effects:
 *   None
 *
 * Errors & Guards:
 *   XHR failures surfaced via callback error; no throws.
 *
 * Performance:
 *   O(template size); single XHR per get().
 *
 * Testing:
 *   EngineTemplates.get('mythos-engine-v5-janitorai', console.log);
 *
 * Change Log:
 *   - 1.0.0 2025-10-31: Initial headerization.
 * ==============================================================
 */


(function(root){
  'use strict';
  var map = {};

  // ---- internal helper: simple XHR loader (ES5-safe) ----
  function xhrGet(url, callback){
    try{
      var x = new XMLHttpRequest();
      x.onreadystatechange = function(){
        if (x.readyState === 4){
          if (x.status >= 200 && x.status < 300) callback(null, x.responseText);
          else callback(new Error('HTTP ' + x.status + ' for ' + url));
        }
      };
      x.open('GET', url, true);
      x.send(null);
    }catch(e){ callback(e); }
  }

  // ---- registry methods ----
  function register(name, getter){ map[name] = getter; }
  function get(name, callback){
    if (!map[name]) return callback(new Error('template not found: ' + name));
    try { map[name](callback); } catch(e){ callback(e); }
  }
  function list(){
    var k, a = [];
    for (k in map) if (map.hasOwnProperty(k)) a.push(k);
    return a;
  }

  // ---- built-in MythOS Engine templates ----
  // v5 JanitorAI skeleton (rebranded from SPE)
  register('mythos-engine-v5-janitorai', function(cb){
    xhrGet('/engine/mythos-engine-v5-janitorai-skeleton.js', cb);
  });

  // placeholder for future engines (example)
  // register('mythos-engine-v6-alpha', function(cb){ xhrGet('/engine/mythos-engine-v6-alpha.js', cb); });

  // ---- export public API ----
  root.EngineTemplates = {
    register: register,
    get: get,
    list: list
  };
})(window);
