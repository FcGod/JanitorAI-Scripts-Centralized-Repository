(function (root) {
    'use strict';

    // Exports: window.CMPanel_testing
    var api = {}, lastRoot = null, state = {scenarioId: 'neutral_intro', seed: 1337, turns: 6, selectedIdx: -1};

    function buildShell (el) {
        el.innerHTML =
            '<div class="test-wrap">' +
            '<div class="test-left">' +
            '<div class="card">' +
            '<h3>Scenarios</h3>' +
            '<div class="scenario-list"></div>' +
            '</div>' +
            '<div class="card">' +
            '<h3>Options</h3>' +
            '<div class="row"><label>Seed</label><input id="t-seed" type="number" value="' + state.seed + '"></div>' +
            '<div class="row"><label>Turns</label><input id="t-turns" type="number" min="3" max="24" value="' + state.turns + '"></div>' +
            '<div class="row"><button id="t-run" class="btn" type="button">Run Preview</button></div>' +
            '</div>' +
            '</div>' +
            '<div class="test-center">' +
            '<div class="card">' +
            '<h3>Transcript</h3>' +
            '<div id="t-transcript" class="transcript"></div>' +
            '</div>' +
            '</div>' +
            '<div class="test-right">' +
            '<div class="card">' +
            '<h3>Inspector</h3>' +
            '<div id="t-inspector" class="inspector muted">Select a line to inspect.</div>' +
            '</div>' +
            '<div class="card">' +
            '<h3>Audit</h3>' +
            '<div id="t-audit" class="audit-box"></div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

    function renderScenarios () {
        var node = lastRoot.querySelector ('.scenario-list');
        var items = (root.TestScenarios && TestScenarios.all && TestScenarios.all ()) || [];
        if (!items.length) {
            node.innerHTML = '<div class="muted">No scenarios.</div>';
            return;
        }
        var i, html = '';
        for (i = 0; i < items.length; i++) {
            var sc = items[i];
            html += '<div class="scenario-item' + (sc.id === state.scenarioId ? ' active' : '') + '" data-id="' + sc.id + '">' +
                '<div class="title">' + esc (sc.title) + '</div>' +
                '<div class="tone muted">Tone: ' + esc (sc.tone) + '</div>' +
                '</div>';
        }
        node.innerHTML = html;

        var cards = node.querySelectorAll ('.scenario-item');
        for (i = 0; i < cards.length; i++) {
            cards[i].onclick = (function (el) {
                return function () {
                    state.scenarioId = el.getAttribute ('data-id');
                    renderScenarios ();
                };
            }) (cards[i]);
        }
    }

    function renderTranscript (run) {
        var zone = lastRoot.querySelector ('#t-transcript');
        var i, html = '';
        for (i = 0; i < run.messages.length; i++) {
            var m = run.messages[i];
            if (m.role === 'system') {
                html += '<div class="msg sys"><span class="role">system</span> ' + esc (m.text) + ' <span class="tk">(' + m.tokens + 't)</span></div>';
            } else if (m.role === 'user') {
                html += '<div class="msg user"><span class="role">user</span> ' + esc (m.text) + ' <span class="tk">(' + m.tokens + 't)</span></div>';
            } else {
                html += '<div class="msg asst" data-idx="' + i + '"><span class="role">@' + esc (m.actor) + '</span> ' + esc (m.text) + ' <span class="tk">(' + m.tokens + 't)</span></div>';
            }
        }
        zone.innerHTML = html;

        // line select → inspector
        var lines = zone.querySelectorAll ('.msg.asst');
        for (i = 0; i < lines.length; i++) {
            lines[i].onclick = (function (el) {
                return function () {
                    var idx = parseInt (el.getAttribute ('data-idx'), 10) || -1;
                    state.selectedIdx = idx;
                    drawInspector (run);
                };
            }) (lines[i]);
        }
    }

    function drawInspector (run) {
        var ins = lastRoot.querySelector ('#t-inspector');
        var idx = state.selectedIdx;
        if (idx < 0 || !run.messages[idx] || !run.messages[idx].why) {
            ins.innerHTML = '<div class="muted">Select an actor line to inspect.</div>';
            return;
        }
        var m = run.messages[idx];
        if (root.TestInspect && TestInspect.renderWhy) {
            ins.innerHTML = TestInspect.renderWhy (m.why);
        } else {
            ins.innerHTML = '<pre>' + esc (JSON.stringify (m.why, null, 2)) + '</pre>';
        }
    }

    function drawAudit (run) {
        var box = lastRoot.querySelector ('#t-audit');
        if (root.TestInspect && TestInspect.quickAudit) {
            box.innerHTML = TestInspect.quickAudit (run.messages);
        } else {
            box.innerHTML = '<div class="muted">No audit available.</div>';
        }
    }

    function bindControls () {
        var seed = lastRoot.querySelector ('#t-seed');
        var turns = lastRoot.querySelector ('#t-turns');
        var runBtn = lastRoot.querySelector ('#t-run');

        if (seed) {
            seed.oninput = function () {
                state.seed = parseInt (seed.value, 10) || 1337;
            };
        }
        if (turns) {
            turns.oninput = function () {
                state.turns = Math.max (3, Math.min (24, parseInt (turns.value, 10) || 6));
            };
        }
        if (runBtn) {
            runBtn.onclick = executeRun;
        }

        // live subscribe to CFG changes so a re-run reflects latest data
        if (root.CFGStore && CFGStore.subscribe) {
            CFGStore.subscribe (function () {
                var s = (root.CFGStore && CFGStore.get && CFGStore.get ()) || {};
                try {
                    return JSON.stringify ({actors: s.actors || {}, params: s.params || {}});
                } catch (_e) {
                    return (new Date ()).getTime ();
                }
            }, function () {
                // keep scenario selection; just rerun silently if transcript exists
                var zone = lastRoot.querySelector ('#t-transcript');
                if (zone && zone.childNodes.length) executeRun ();
            });
        }
    }

    function executeRun () {
        var run = (root.TestRunner && TestRunner.runScenario) ? TestRunner.runScenario (state.scenarioId, {
            seed: state.seed,
            turns: state.turns
        }) : null;
        if (!run) return;
        renderTranscript (run);
        state.selectedIdx = -1;
        drawInspector (run);
        drawAudit (run);
    }

    function esc (s) {
        return String (s || '').replace (/[&<>"']/g, function (m) {
            return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[m];
        });
    }

    // lifecycle
    api.mount = function (el) {
        lastRoot = el;
        buildShell (el);
        renderScenarios ();
        bindControls ();
    };
    api.unmount = function () {
        if (lastRoot) lastRoot.innerHTML = '';
        lastRoot = null;
    };

    root.CMPanel_testing = api;

}) (window);
