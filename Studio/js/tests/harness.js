/*
 * MythOS Studio — Validation Harness
 * Path: /js/tests/harness.js
 * Purpose: Run integrity checks on current CFGStore state and emit structured validation results.
 *
 * Public API (window.Harness):
 *   - run()              : void         // executes validation; emits via CMvNext.bus
 *   - validate(cfg)      : array        // returns list of issues (does not emit)
 *
 * Dependencies: CFGStore, ExportCore, CMvNext.bus
 * Emits/Side-effects: bus.emit('harness:validation', resultArray)
 * Versioning: ES5 only; Phase-6+ ready.
 * Notes:
 *   - Checks schema normalization, engine-safe export validity, and Studio-only residues.
 *   - Intended for use from Debug panel or automated probes.
 */

(function (root) {
    'use strict';

    var api = {};

    // ---- internal util ----
    //Input: list, severity, message, path
    function pushIssue (list, sev, msg, path) {
        list.push ({
            severity: sev || 'info',
            message: msg || '',
            path: path || ''
        });
    }

    // ---- validation core ----
    api.validate = function (cfg) {
        var issues = [];
        if (!cfg) {
            pushIssue (issues, 'error', 'No configuration loaded');
            return issues;
        }

        // 1. World section
        if (!cfg.world) pushIssue (issues, 'error', 'Missing world object', 'world');
        else {
            if (!cfg.world.id) pushIssue (issues, 'warn', 'World id missing', 'world.id');
            if (!cfg.world.name) pushIssue (issues, 'warn', 'World name missing', 'world.name');
        }

        // 2. Actors
        var actorsData = cfg.actors || [];
        if (!actorsData.length) pushIssue (issues, 'warn', 'No actors defined', 'actors');
        else {
            var i;
            for (i = 0; i < actorsData.length; i++) {
                var actor = actorsData[i] || {};
                if (!actor.id) pushIssue (issues, 'error', 'Actor missing id', 'actors[' + i + ']');
                if (!actor.displayName) pushIssue (issues, 'warn', 'Actor missing displayName', 'actors[' + i + ']');
                if (!actor.defaults || !actor.defaults.emotion) pushIssue (issues, 'error', 'Missing emotion defaults', 'actors[' + i + '].defaults');
            }
        }

        // 3. Locations
        var L = cfg.locations || [];
        if (!L.length) pushIssue (issues, 'warn', 'No locations defined', 'locations');

        // 4. Engine-safe export parity
        try {
            var out = root.ExportCore ? ExportCore.export ('engineSafe', {cfg: cfg}) : {result: cfg};
            if (!out || !out.result) pushIssue (issues, 'error', 'ExportCore returned no result', 'ExportCore');
            else {
                var res = out.result;
                if (res.features && res.features.axisMode)
                    pushIssue (issues, 'info', 'Axis mode present: ' + res.features.axisMode, 'features.axisMode');
            }
        } catch (e) {
            pushIssue (issues, 'error', 'ExportCore export failed: ' + (e && e.message), 'ExportCore');
        }

        // 5. Studio-only residues in engine-safe export
        try {
            var safe = (root.ExportCore ? ExportCore.export ('engineSafe', {cfg: cfg}).result : {});
            if (safe.studio) pushIssue (issues, 'warn', 'Studio fields not stripped', 'studio');
        } catch (_e) {
        }

        // 6. Feature flags sanity
        if (cfg.features && cfg.features.debug) pushIssue (issues, 'info', 'Debug mode active', 'features.debug');

        return issues;
    };

    // ---- run + emit ----
    api.run = function () {
        try {
            var cfg = (root.CFGStore && CFGStore.get && CFGStore.get ()) || null;
            var result = api.validate (cfg);
            if (root.CMvNext && CMvNext.bus && CMvNext.bus.emit)
                CMvNext.bus.emit ('harness:validation', result);
            if (root.console && console.log) console.log ('[Harness] validation', result);
            return result;
        } catch (e) {
            if (root.console && console.error) console.error ('[Harness] failed:', e);
            return [];
        }
    };

    // expose
    root.Harness = api;

    // auto-run once on load (optional)
    try {
        if (document.readyState !== 'loading') api.run ();
        else document.addEventListener ('DOMContentLoaded', function () {
            api.run ();
        });
    } catch (_e) {
    }
}) (window);
