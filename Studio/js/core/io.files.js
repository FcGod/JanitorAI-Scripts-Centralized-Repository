/**
 * ==============================================================
 * Module: File I/O Helpers (Browser)
 * File:   /js/core/io.files.js
 * Namespace: window.IOFiles
 * Version: 1.0.0 (Studio v6)
 * Layer: Studio / Core Utilities
 * --------------------------------------------------------------
 * Purpose:
 *   Minimal helpers to download text blobs and read uploaded files
 *   as text in the browser (ES5-only; no deps).
 *
 * Depends on:
 *   Native Blob, URL.createObjectURL, FileReader, DOM <a> element
 *
 * Public API:
 *   - downloadText(filename, text) : Boolean
 *   - readFileAsText(file, cb)     : void       // cb(err, text)
 *
 * Design Notes:
 *   - Never throws across public surface; returns false or cb(err).
 *   - Creates a temporary <a> to trigger download; revokes URL async.
 *
 * Side Effects:
 *   Transient DOM node insertion; object URL allocation/revocation.
 *
 * Errors & Guards:
 *   Catches browser API errors; readFileAsText always invokes cb.
 *
 * Performance:
 *   O(n) in text size; suitable for small–medium JSON/text exports.
 *
 * Testing:
 *   IOFiles.downloadText('cfg.json', '{ }');
 *   IOFiles.readFileAsText(input.files[0], console.log);
 *
 * Change Log:
 *   - 1.0.0 2025-10-31: Initial headerization.
 * ==============================================================
 */

(function(root){
  'use strict';
  function downloadText(filename, text){
    try{
      var blob = new Blob([String(text || '')], { type:'application/json;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename || 'download.txt';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function(){ try{ URL.revokeObjectURL(a.href); }catch(_e){} }, 0);
      return true;
    }catch(_e){ return false; }
  }
  function readFileAsText(file, cb){
    try{
      var r = new FileReader();
      r.onload  = function(){ cb(null, String(r.result || '')); };
      r.onerror = function(){ cb(new Error('read failed')); };
      r.readAsText(file);
    }catch(e){ cb(e); }
  }
  root.IOFiles = { downloadText: downloadText, readFileAsText: readFileAsText };
})(window);
