
/**
 * ==============================================================
 * Module: ExportCore — Engine-Safe Exporter
 * File:   /js/core/export.core.js
 * Namespace: window.ExportCore
 * Version: 1.0.0 (Studio v6)
 * Layer: Studio / Packaging
 * --------------------------------------------------------------
 * Purpose:
 *   Produce engine-safe JSON from Studio CFGs:
 *   - engineSafe: whitelist-driven filter + meta passthrough
 *   - devFull: full CFG for development
 *   - diffPatch: JSON diff vs. baseline ({"__delete__":true} markers)
 *
 * Depends on:
 *   Optional: normalizeCFG for pre-normalization
 *
 * Public API:
 *   - export(mode, opts) → { result, mode, report }
 *   - engineSafe(cfg, inventory, includeMeta)
 *   - devFull(cfg)
 *   - diffPatch(cfg, base)
 *   - defaultInventory()
 *   - print(mode, opts)
 *
 * Design Notes:
 *   - ES5-only; no external deps; deterministic output.
 *   - Inventory supports wildcard paths ([], .*, *).
 *
 * Side Effects:
 *   None (pure transforms).
 *
 * Errors & Guards:
 *   Defensive JSON cloning; regex compilation guarded.
 *
 * Performance:
 *   O(size(cfg)) flatten + filter + reconstruct; suitable for UI export.
 *
 * Testing:
 *   ExportCore.print('engineSafe', { cfg: CFGStore.get() });
 *
 * Change Log:
 *   - 1.0.0 2025-10-31: Initial headerization.
 * ==============================================================
 */
/* /js/core/export.core.js */
(function (root) {
  'use strict';

  // ----- tiny utils -----
  function isObj(x) { return x && typeof x === 'object' && Object.prototype.toString.call(x) === '[object Object]'; }
  function isArr(x) { return Object.prototype.toString.call(x) === '[object Array]'; }
  function clone(x) { try { return JSON.parse(JSON.stringify(x)); } catch (_e) { return x; } }
  function own(o, k) { return o && Object.prototype.hasOwnProperty.call(o, k); }

  // ----- default engine inventory (minimal, safe) -----
  // You can replace at runtime by passing options.inventory
  function defaultInventory() {
    return {
      schemaId: 'mythos.schema.cfg.v1',
      engineVersion: '1.0',
      paths: [
        { path: 'version' },
        { path: 'world.id' },
        { path: 'world.name' },
        { path: 'world.validLocations' },
        { path: 'world.allowOutside' },

        { path: 'locations[]' },
        { path: 'locations[].id' },
        { path: 'locations[].name' },
        { path: 'locations[].exits' },
        { path: 'locations[].tags' },
        { path: 'locations[].loreKeys' },

        { path: 'actors[]' },
        { path: 'actors[].id' },
        { path: 'actors[].displayName' },
        { path: 'actors[].startLocation' },
        { path: 'actors[].defaults' },
        { path: 'actors[].defaults.emotion' },
        { path: 'actors[].defaults.emotion.V' },
        { path: 'actors[].defaults.emotion.A' },
        { path: 'actors[].defaults.emotion.D' },
        { path: 'actors[].defaults.emotion.F' },
        { path: 'actors[].defaults.diction' },
        { path: 'actors[].defaults.diction.formality' },
        { path: 'actors[].defaults.diction.quirks' },
        { path: 'actors[].defaults.loreKeys' },

        { path: 'emotions.schema' },
        { path: 'emotions.caps.min' },
        { path: 'emotions.caps.max' },
        { path: 'emotions.decayPerTurn.V' },
        { path: 'emotions.decayPerTurn.A' },
        { path: 'emotions.decayPerTurn.D' },
        { path: 'emotions.decayPerTurn.F' },

        { path: 'lore' },
        { path: 'lore.autoPull' },
        { path: 'lore.triggers' },
        { path: 'lore.triggers.location' },
        { path: 'lore.triggers.actor' },
        { path: 'lore.triggers.emotion' },
        { path: 'lore.triggers.beat' },

        { path: 'features' },
        { path: 'features.events' },
        { path: 'features.events.stay' },
        { path: 'features.events.enter' },
        { path: 'features.events.exit' },
        // NOTE: features.schedules is deprecated (blocked below)
        // NOTE: features.routines exists in some builds but is engine-optional

        // meta.* always allowed (studio + future engine handshake)
        { path: 'meta.*' }
      ]
    };
  }

  // ----- flattener (dot-path) -----
  // Produces paths like:
  //   a.b, a.c[], a.c[].d, a.c[2].d  (we also keep the array wildcard form for allow-list matching)
  function flatten(obj, prefix, output, shape) {
    if (!output) output = {};
    if (!shape) shape = {};
    var key, i;

    if (obj === null || typeof obj !== 'object') {
      output[prefix || ''] = obj;
      return { flat: output, shape: shape };
    }

    // arrays
    if (isArr(obj)) {
      output[prefix || ''] = obj;
      // record wildcard shape
      shape[(prefix || '') + '[]'] = true;
      for (i = 0; i < obj.length; i++) {
        flatten(obj[i], (prefix ? prefix + '[' + i + ']' : '[' + i + ']'), output, shape);
        // also store wildcard-like convenience key for matching
        flatten(obj[i], (prefix ? prefix + '[]' : '[]'), {}, shape); // shape only
      }
      return { flat: output, shape: shape };
    }

    // objects
    output[prefix || ''] = obj;
    for (key in obj) if (own(obj, key)) {
      flatten(obj[key], prefix ? (prefix + '.' + key) : key, output, shape);
    }
    return { flat: output, shape: shape };
  }

  // ----- reconstruct from flat (using bracket indices) -----
  function reconstruct(flat) {
    var root = {}, keys = [];
    var key;
    for (key in flat) if (own(flat, key)) keys.push(key);
    keys.sort();

    for (var i = 0; i < keys.length; i++) {
      var path = keys[i];
      if (!path) continue;
      var val = flat[path];

      // split on dots, but keep [n] suffixes
      var parts = splitPath(path);
      var node = root;

      for (var j = 0; j < parts.length; j++) {
        var part = parts[j];
        var m = part.match(/^(.*)\[(\d+)\]$/); // name[index]
        if (m) {
          var arrName = m[1];
          var idx = parseInt(m[2], 10);

          if (arrName) {
            if (!own(node, arrName)) node[arrName] = [];
            if (!isArr(node[arrName])) node[arrName] = [];
            if (!own(node[arrName], idx)) node[arrName][idx] = {};
            if (j === parts.length - 1) node[arrName][idx] = val;
            else node = node[arrName][idx];
          } else {
            // path starts with [n]
            if (!isArr(node)) node = [];
            if (!own(node, idx)) node[idx] = {};
            if (j === parts.length - 1) node[idx] = val;
            else node = node[idx];
          }
        } else {
          if (j === parts.length - 1) {
            node[part] = val;
          } else {
            if (!own(node, part) || typeof node[part] !== 'object' || node[part] === null) node[part] = {};
            node = node[part];
          }
        }
      }
    }
    return root;
  }

  function splitPath(p) {
    // split "a.b[0].c" into ["a","b[0]","c"]
    var out = [], buf = '', i, ch;
    for (i = 0; i < p.length; i++) {
      ch = p.charAt(i);
      if (ch === '.') {
        if (buf) { out.push(buf); buf = ''; }
      } else {
        buf += ch;
      }
    }
    if (buf) out.push(buf);
    return out;
  }

  // ----- pattern matching for engine inventory -----
  // Supported inventory patterns:
  //  "actors[].id"  → wildcard array segment
  //  "meta.*"       → wildcard tail under meta
  //  "lore.*"       → wildcard tail under lore (for future)
  function makeTester(paths) {
    var re = [];
    for (var i = 0; i < paths.length; i++) {
      var pat = String(paths[i].path || '');
      if (!pat) continue;
      // Escape dots, then convert special tokens:
      //  [].  -> (\[\d+\]\.)?
      //  []   -> (\[\d+\])?
      //  .*   -> (\..+)?
      //  *    -> .+
      var s = pat.replace(/\./g, '\\.');
      s = s.replace(/\[\]\./g, '\\[(\\d+)\\]\\.');
      s = s.replace(/\[\]/g, '\\[(\\d+)\\]');
      s = s.replace(/\\\.\\\*/g, '(\\..+)?');
      s = s.replace(/\\\*/g, '.+');
      re.push(new RegExp('^' + s + '$'));
    }
    return function (path) {
      var j;
      for (j = 0; j < re.length; j++) {
        if (re[j].test(path)) return true;
      }
      return false;
    };
  }

  // ----- studio-only field filters (strip in engineSafe) -----
  function isStudioOnlyPath(path) {
    // strip entire studio.* namespace
    if (path.indexOf('studio.') === 0) return true;

    // specific known studio-side fields
    if (path.indexOf('features.axisMode') === 0) return true;
    if (path.indexOf('actors[') === 0 && path.indexOf('defaults.altAxes') !== -1) return true;

    return false;
  }

  // ----- deprecated/blocked fields (hard block) -----
  function isBlockedPath(path) {
    // Phase-5 Addendum explicitly blocks schedules
    if (path.indexOf('features.schedules') === 0) return true;
    return false;
  }

  // ----- filter by inventory + meta allowance -----
  function filterFlatByInventory(flat, inventory, includeMeta) {
    var out = {};
    var allow = makeTester(inventory.paths || []);

    for (var k in flat) if (own(flat, k)) {
      if (isBlockedPath(k)) continue;
      if (isStudioOnlyPath(k)) continue;

      // allow meta.* if opted in
      if (includeMeta && (k === 'meta' || k.indexOf('meta.') === 0)) {
        out[k] = flat[k];
        continue;
      }

      // engine-inventory paths only
      if (allow(k)) out[k] = flat[k];
    }
    return out;
  }

  // ----- diff/patch (deep, ES5) -----
  function diffJSON(base, next) {
    // returns a minimal object with only changed keys (add/update/remove)
    // Removes are recorded as { "__delete__": true } to stay JSON-compatible.
    var patch = {};
    walk('', base, next, patch);
    return patch;

    function walk(prefix, a, b, out) {
      if (a === b) return;

      // type changes or primitives
      var aIsObj = isObj(a) || isArr(a);
      var bIsObj = isObj(b) || isArr(b);
      if (!aIsObj || !bIsObj || objType(a) !== objType(b)) {
        set(out, prefix, clone(b));
        return;
      }

      // both objects/arrays → compare keys/indices
      var aKeys = keysOf(a), bKeys = keysOf(b), i, k;

      // additions & updates
      for (i = 0; i < bKeys.length; i++) {
        k = bKeys[i];
        var p = pathJoin(prefix, k);
        walk(p, a != null ? a[k] : undefined, b[k], out);
      }

      // deletions
      for (i = 0; i < aKeys.length; i++) {
        k = aKeys[i];
        if (!own(b, k)) {
          set(out, pathJoin(prefix, k), { "__delete__": true });
        }
      }
    }

    function objType(x) { return isArr(x) ? 'array' : (isObj(x) ? 'object' : typeof x); }
    function keysOf(x) {
      if (isArr(x)) { var idx = [], i; for (i = 0; i < x.length; i++) idx.push(String(i)); return idx; }
      var arr = [], k; for (k in x) if (own(x, k)) arr.push(k); return arr;
    }
    function pathJoin(a, b) { return a ? (a + '.' + b) : b; }
    function set(node, path, val) {
      if (!path) { // root replacement
        if (isObj(val) || isArr(val)) {
          var k;
          for (k in node) if (own(node, k)) delete node[k];
          for (k in val) if (own(val, k)) node[k] = val[k];
        } else {
          // primitive at root is not expected; ignore
        }
        return;
      }
      var parts = splitPath(path), i, cur = node;
      for (i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (i === parts.length - 1) { cur[part] = val; }
        else {
          if (!own(cur, part) || !isObj(cur[part])) cur[part] = {};
          cur = cur[part];
        }
      }
    }
  }

  // ----- public API -----
  function exportEngineSafe(cfg, inventory, includeMeta) {
    cfg = cfg || {};
    if (root.normalizeCFG) cfg = normalizeCFG(cfg);

    var flat = flatten(cfg, '', null, null).flat;
    var filtered = filterFlatByInventory(flat, inventory || defaultInventory(), includeMeta !== false);
    var result = reconstruct(filtered);

    // Attach minimal version handshake under meta.version if includeMeta
    if (includeMeta !== false) {
      result.meta = result.meta || {};
      result.meta.version = result.meta.version || {};
      result.meta.version.cm = (cfg.meta && cfg.meta.version && cfg.meta.version.cm) || '2025.10';
      result.meta.version.spe = (cfg.meta && cfg.meta.version && cfg.meta.version.spe) || '5.2';
    }

    return {
      result: result,
      mode: 'engineSafe',
      report: {
        schemaId: (inventory && inventory.schemaId) || defaultInventory().schemaId,
        kept: Object.keys(filtered).length
      }
    };
  }

  function exportDevFull(cfg) {
    cfg = cfg || {};
    if (root.normalizeCFG) cfg = normalizeCFG(cfg);
    return {
      result: clone(cfg),
      mode: 'devFull',
      report: { note: 'Includes studio-only and experimental fields. For development only.' }
    };
  }

  function exportDiffPatch(cfg, base) {
    if (root.normalizeCFG) {
      cfg = normalizeCFG(cfg || {});
      base = normalizeCFG(base || {});
    } else {
      cfg = cfg || {};
      base = base || {};
    }
    return {
      result: diffJSON(base, cfg),
      mode: 'diffPatch',
      report: { note: 'Patch uses {"__delete__":true} markers for removals.' }
    };
  }

  function run(mode, opts) {
    opts = opts || {};
    var cfg = opts.cfg || (root.CFGStore && CFGStore.get()) || {};
    if (mode === 'devFull') return exportDevFull(cfg);
    if (mode === 'diffPatch') return exportDiffPatch(cfg, opts.base || {});
    // default
    return exportEngineSafe(cfg, opts.inventory, opts.includeMeta !== false);
  }

  // minimal console helpers for Tools panel integration
  function print(mode, opts) {
    var out = run(mode, opts);
    try { console.log('[Export:'+ out.mode +']', JSON.stringify(out.result, null, 2)); }
    catch (_e) { /* ignore */ }
    return out;
  }

  root.ExportCore = {
    export: run,
    engineSafe: exportEngineSafe,
    devFull: exportDevFull,
    diffPatch: exportDiffPatch,
    defaultInventory: defaultInventory,
    print: print
  };
})(window);
