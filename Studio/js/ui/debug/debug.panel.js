/*
 * MythOS Studio — Debug Panel
 * Path: /js/ui/debug.panel.js
 * Purpose: Live CFG viewer; dump to console; trigger Harness validation.
 * Public API (window.CMPanel_debug):
 *   - mount(rootEl) : void
 * Dependencies: CFGStore, CMvNext.bus, Harness.
 * Emits/Side-effects:
 *   - Subscribes to CFGStore; console logging on dump.
 *   - Listens for bus 'harness:validation' events.
 *   - Calls Harness.run() when requested.
 * Versioning: ES5 only; panel lifecycle compliant.
 */

(function (root) {
    'use strict';

    var api = {}, unsub = null;

    api.mount = function (el) {
        if (!el) return;
        var html = ''
            + '<div class="row" style="display:flex; gap:8px; margin-bottom:8px;">'
            + '<button id="debug-dump" class="btn">Dump CFG to Console</button>'
            + '<button id="debug-run-harness" class="btn">Run Validation</button>'
            + '</div>'
            + '<pre id="debug-log" class="cm-log">Debug output will appear here…</pre>';
        el.innerHTML = html;

        var host = el.querySelector ('#debug-log');
        var dumpBtn = el.querySelector ('#debug-dump');
        var runBtn = el.querySelector ('#debug-run-harness');

        // Render current CFG
        function print () {
            try {
                host.textContent = JSON.stringify (CFGStore.get (), null, 2);
            } catch (_e) {
            }
        }

        // Keep live view updated
        if (unsub) unsub ();
        unsub = CFGStore.select (function (c) {
            return JSON.stringify (c || {});
        }, print);

        // Dump to console
        if (dumpBtn) {
            dumpBtn.onclick = function () {
                print ();
                if (root.console && console.log)
                    console.log ('[CFG]', CFGStore.get ());
            };
        }

        // Run Harness Validation
        if (runBtn) {
            runBtn.onclick = function () {
                if (root.Harness && typeof Harness.run === 'function') Harness.run ();
                else if (root.console && console.warn)
                    console.warn ('[DebugPanel] Harness not available.');
            };
        }

        // Display harness results via bus
        if (root.CMvNext && CMvNext.bus && typeof CMvNext.bus.listen === 'function') {
            CMvNext.bus.listen ('harness:validation', function (r) {
                try {
                    host.textContent = 'Harness Validation Results:\n' +
                        JSON.stringify (r, null, 2);
                } catch (_e) {
                }
            });
        }

        print ();
    };

    root.CMPanel_debug = api;

}) (window);
