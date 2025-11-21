/**
 * ==============================================================
 * Module: Export Packager — Token Injector
 * File:   /js/core/export.package.js
 * Namespace: window.ExportPackage
 * Version: 1.0.0 (Studio v6)
 * Layer: Studio / Packaging
 * --------------------------------------------------------------
 * Purpose:
 *   Inject engine-safe CFG JSON into template text at one of two
 *   supported tokens (preferred MythOS token first).
 *
 * Tokens:
 *   - /*__MYTHOS_CFG__* / → inserts: var MYTHOS_CFG = <json>;
 *   - /*<<CFG_JSON>>* /    → inserts: CFG = <json>; (legacy SPE)
 *
 * Depends on:
 *   Optional: ExportCore.engineSafe (falls back to raw cfg)
 *
 * Public API:
 *   - build(templateJsText, cfg) : { ok:Boolean, text?:String, error?:String }
 *
 * Design Notes:
 *   - ES5-only; returns immutable text; never writes to disk.
 *   - Stable JSON (pretty-printed) for readability in debug builds.
 *
 * Side Effects:
 *   None
 *
 * Errors & Guards:
 *   Returns {ok:false,error} when no recognized token is found.
 *
 * Performance:
 *   O(template length + JSON size).
 *
 * Testing:
 *   var r = ExportPackage.build(tplText, CFGStore.get()); console.log(r.ok, r.error);
 *
 * Change Log:
 *   - 1.0.0 2025-10-31: Initial headerization.
 * ==============================================================
 */


(function(root){
  'use strict';

  function asSafe(cfg){
    try {
      return (root.ExportCore ? ExportCore.export('engineSafe', { cfg: cfg, includeMeta:true }).result : (cfg || {}));
    } catch(_e){
      return cfg || {};
    }
  }

  function build(templateJsText, cfg){
    var src  = String(templateJsText || '');
    var safe = asSafe(cfg);

    // Token A (preferred): inject MYTHOS_CFG
    var tokenA = '/*__MYTHOS_CFG__*/';
    var iA = src.indexOf(tokenA);
    if (iA !== -1){
      var injectA = 'var MYTHOS_CFG = ' + JSON.stringify(safe, null, 2) + ';\n';
      return { ok:true, text: src.slice(0, iA) + injectA + src.slice(iA + tokenA.length) };
    }

    // Token B (legacy SPE): inject CFG
    var tokenB = '/*<<CFG_JSON>>*/';
    var iB = src.indexOf(tokenB);
    if (iB !== -1){
      var injectB = 'CFG = ' + JSON.stringify(safe, null, 2) + ';';
      return { ok:true, text: src.slice(0, iB) + injectB + src.slice(iB + tokenB.length) };
    }

    return { ok:false, error:'No recognized token found (/*__MYTHOS_CFG__*/ or /*<<CFG_JSON>>*/).' };
  }

  root.ExportPackage = { build: build };
})(window);
