(function (root) {
    'use strict';

    // =============================================================
    // Speech & Expression Panel — Compact Cue Table (ES5)
    // Replaces the two separate cue grids with a single table:
    // [Emotion] [Basic] [Ears] [Tail] [Wings] [Horns]
    // Keeps storage back-compat and exports: window.CMPanel_speech
    // =============================================================

    var api = {}, lastRoot = null, activeId = null;

    // -----------------------------
    // Store helpers
    // -----------------------------
    function getStore () {
        return (root.CFGStore && root.CFGStore.get) ? root.CFGStore.get () : {actors: {}};
    }

    function patch (mut) {
        if (root.CFGStore && root.CFGStore.patch) CFGStore.patch (mut);
    }

    // -----------------------------
    // Small utils
    // -----------------------------
    function cap (s) {
        return s ? s.charAt (0).toUpperCase () + s.slice (1) : s;
    }

    function has (v) {
        return v != null && v !== '';
    }

    // -----------------------------
    // Status computation (for sidebar dots)
    // -----------------------------
    function computeStatus (a) {
        if (!a) return 'red';
        var score = 0;
        if (a.speech && (a.speech.tone || a.speech.pacing || a.speech.verbosity || a.speech.diction)) score++;
        if (a.quirks && ((a.quirks.physical || []).length + (a.quirks.mental || []).length + (a.quirks.emotional || []).length) > 0) score++;
        if (a.cues && a.cues.joy) score++;
        if (a.cues_body && a.cues_body.joy) score++;
        // new per-part body cues increment if any part is filled
        if (a.cues_body_parts) {
            var kk = cuesKeys (), i2;
            for (i2 = 0; i2 < kk.length; i2++) {
                var p = a.cues_body_parts[kk[i2]];
                if (p && (p.ears || p.tail || p.wings || p.horns)) {
                    score++;
                    break;
                }
            }
        }
        if (a.summary && a.summary.line) score++;
        if (score >= 5) return 'green';
        if (score >= 3) return 'yellow';
        return 'red';
    }

    // -----------------------------
    // Compact mode preference
    // -----------------------------
    function getCompactPref () {
        try {
            return localStorage.getItem ('MYTHOS_SPEECH_COMPACT') === '1';
        } catch (_e) {
        }
        return false;
    }

    function setCompactPref (on) {
        try {
            localStorage.setItem ('MYTHOS_SPEECH_COMPACT', on ? '1' : '0');
        } catch (_e) {
        }
    }

    // -----------------------------
    // Libraries / defaults
    // -----------------------------
    function cuesKeys () {
        return (root.SpeechCues && SpeechCues.keys) ? SpeechCues.keys.slice () :
            ['joy', 'sadness', 'anger', 'fear', 'trust', 'disgust', 'anticipation', 'surprise'];
    }

    function cuesDefaults () {
        if (root.SpeechCues && SpeechCues.defaults) return SpeechCues.defaults;
        return {
            joy: 'Smiles softly, eyes bright.',
            sadness: 'Voice trembles, words slow down.',
            anger: 'Speaks sharply, shoulders tense.',
            fear: 'Glances around, tone unsteady.',
            trust: 'Leans in slightly, relaxed tone.',
            disgust: 'Wrinkles nose, slight recoil.',
            anticipation: 'Quickens speech, leans forward.',
            surprise: 'Brows lift, pauses mid-sentence.'
        };
    }

    function quirkLib () {
        var L = (root.SpeechQuirks && SpeechQuirks.library) ? SpeechQuirks.library : null;
        if (L) return L;
        return {
            physical: ['Taps fingers', 'Adjusts glasses', 'Leans forward', 'Fidgets', 'Tilts head', 'Paces while talking'],
            mental: ['Overanalyzes', 'Distracted by details', 'Second-guesses', 'Rehearses mentally', 'Fixates on word choice'],
            emotional: ['Laughs nervously', 'Avoids eye contact', 'Raises voice when anxious', 'Goes silent when angry', 'Gestures when excited']
        };
    }

    // -----------------------------
    // Ensure defaults (once per actor)
    // -----------------------------
    function ensureCueDefaultsFor (aId) {
        patch (function (cfg) {
            var a = (cfg.actors && cfg.actors[aId]) || null;
            if (!a) return;
            if (!a.cues) a.cues = {};
            var keys = cuesKeys (), defs = cuesDefaults (), i, k;
            for (i = 0; i < keys.length; i++) {
                k = keys[i];
                if (!a.cues[k]) a.cues[k] = defs[k] || '';
            }
            if (!a.speech) a.speech = {};
            if (!a.quirks) a.quirks = {physical: [], mental: [], emotional: []};
            if (!a.summary) a.summary = {line: ''};
            return cfg;
        });
    }

    function ensureBodyCueDefaultsFor (aId) {
        patch (function (cfg) {
            var a = (cfg.actors && cfg.actors[aId]) || null;
            if (!a) return;
            if (!a.cues_body) a.cues_body = {};
            var keys = cuesKeys (), i, k;
            for (i = 0; i < keys.length; i++) {
                k = keys[i];
                if (a.cues_body[k] == null) a.cues_body[k] = '';
            }
            return cfg;
        });
    }

    // NEW granular body parts {ears,tail,wings,horns} per emotion
    function ensureBodyPartsDefaultsFor (aId) {
        patch (function (cfg) {
            var a = (cfg.actors && cfg.actors[aId]) || null;
            if (!a) return;
            var keys = cuesKeys (), i, k;
            a.cues_body_parts = a.cues_body_parts || {};
            for (i = 0; i < keys.length; i++) {
                k = keys[i];
                if (!a.cues_body_parts[k]) a.cues_body_parts[k] = {ears: '', tail: '', wings: '', horns: ''};
            }
            return cfg;
        });
    }

    // -----------------------------
    // UI builders
    // -----------------------------
    function buildShell (el) {
        el.innerHTML = '' +
            '<div class="speech-wrap">' +
            '<div class="speech-col speech-col-left"><div class="actor-list"></div></div>' +
            '<div class="speech-col speech-col-right">' +
            '<div class="speech-editor"></div>' +
            '</div>' +
            '</div>';
    }

    function initCompactToolbar (rootEl) {
        var right = rootEl.querySelector ('.speech-col-right');
        if (!right) return;
        var bar = document.createElement ('div');
        bar.className = 'speech-toolbar';
        bar.innerHTML = '<div style="display:flex; justify-content:flex-end; margin-bottom:8px;"><button id="sp-compact-toggle" class="btn-mini" type="button">Compact: Off</button></div>';
        right.insertBefore (bar, right.firstChild);

        var editor = rootEl.querySelector ('.speech-editor');
        var compactOn = getCompactPref ();
        if (compactOn) {
            editor.className += ' compact';
        }
        var tBtn = rootEl.querySelector ('#sp-compact-toggle');
        if (tBtn) {
            tBtn.textContent = 'Compact: ' + (compactOn ? 'On' : 'Off');
            tBtn.onclick = function () {
                var has = ((' ' + editor.className + ' ').indexOf (' compact ') > -1);
                if (has) editor.className = editor.className.replace (/\bcompact\b/g, '').replace (/\s+/g, ' ').trim ();
                else editor.className += ' compact';
                var nowOn = !has;
                setCompactPref (nowOn);
                tBtn.textContent = 'Compact: ' + (nowOn ? 'On' : 'Off');
            };
        }
    }

    function buildSidebarHTML () {
        var c = getStore (), ids = [], k;
        for (k in (c.actors || {})) ids.push (k);
        ids.sort ();
        var html = '<h3 class="side-header">Actors</h3>';
        if (!ids.length) return html + '<div class="muted">No actors yet.</div>';
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i], a = c.actors[id];
            var name = (a && a.profile && (a.profile.preferredName || a.profile.fullName)) || id;
            var st = computeStatus (a);
            html += '<div class="actor-card' + (id === activeId ? ' active' : '') + '" data-id="' + id + '">' +
                '<span class="actor-name">' + name + '</span>' +
                '<span class="actor-status ' + st + '"></span>' +
                '</div>';
        }
        return html;
    }

    // Base editors (tone/pacing/verbosity/diction) + Quirks + Compact Cue Table
    function buildEditorHTML () {
        var tones = ['Neutral', 'Warm', 'Irritable', 'Playful', 'Formal', 'Commanding'];
        var pacings = ['Slow', 'Even', 'Quick', 'Erratic'];
        var verbosities = ['Terse', 'Balanced', 'Verbose'];
        var lib = quirkLib ();

        function sel (id, arr, promptText) {
            var h = '<select id="' + id + '">';
            var ph = promptText || 'Select...';
            h += '<option value="">' + ph + '</option>';
            for (var i = 0; i < arr.length; i++) {
                h += '<option value="' + arr[i] + '">' + arr[i] + '</option>';
            }
            h += '</select>';
            return h;
        }

        function qBlock (kind) {
            return '' +
                '<div class="quirk-block">' +
                '<label class="quirk-label">' + cap (kind) + ' Quirks</label>' +
                sel ('q-' + kind + '-sel', lib[kind] || [], 'Select or add custom') +
                '<div class="row-inline" style="margin-top:6px;">' +
                '<input id="q-' + kind + '-custom" placeholder="Add custom quirk">' +
                '<button id="q-' + kind + '-add" class="btn-mini" type="button">Add</button>' +
                '</div>' +
                '<div id="q-' + kind + '-list" class="chip-zone"></div>' +
                '</div>';
        }

        return '' +
            '<div class="card">' +
            '<h3>How do they sound?</h3>' +
            '<div class="field-row" data-tip="General emotional coloring">' +
            '<label class="left">Tone</label>' +
            '<div class="field">' + sel ('sp-tone', tones, 'Select tone…') + '</div>' +
            '<div class="meter"><div id="m-tone" class="meter-fill"></div></div>' +
            '</div>' +
            '<div class="field-row" data-tip="Rhythm / speed of speech">' +
            '<label class="left">Pacing</label>' +
            '<div class="field">' + sel ('sp-pacing', pacings, 'Select pacing…') + '</div>' +
            '<div class="meter"><div id="m-pacing" class="meter-fill"></div></div>' +
            '</div>' +
            '<div class="field-row" data-tip="Amount of words / density">' +
            '<label class="left">Verbosity</label>' +
            '<div class="field">' + sel ('sp-verbosity', verbosities, 'Select verbosity…') + '</div>' +
            '<div class="meter"><div id="m-verbosity" class="meter-fill"></div></div>' +
            '</div>' +
            '<div class="field-row">' +
            '<label class="left">Diction</label>' +
            '<div class="field"><input id="sp-diction" placeholder="e.g., clipped, ornate, technical"></div>' +
            '</div>' +
            '</div>' +

            '<div class="card">' +
            '<h3>Quirks & Mannerisms</h3>' +
            '<div class="quirk-grid">' + qBlock ('physical') + qBlock ('mental') + qBlock ('emotional') + '</div>' +
            '</div>' +

            buildCueTableHTML () +

            '<div class="card">' +
            '<h3>Snapshot</h3>' +
            '<textarea id="sp-snapshot" rows="2" placeholder="A tight one-line capture of their voice & presence."></textarea>' +
            '</div>';
    }

    // Compact cue table HTML (one row per emotion)
    function buildCueTableHTML () {
        var keys = cuesKeys (), i;
        var h = '' +
            '<div class="card">' +
            '<h3>Emotional & Body Cues</h3>' +
            '<div class="cue-table-wrap">' +
            '<table class="cue-table">' +
            '<thead><tr>' +
            '<th>Emotion</th><th>Basic</th><th>Ears</th><th>Tail</th><th>Wings</th><th>Horns</th>' +
            '</tr></thead><tbody>';
        for (i = 0; i < keys.length; i++) {
            var k = keys[i], K = cap (k);
            h += '' +
                '<tr data-em="' + k + '">' +
                '<td class="em">' + K + '</td>' +
                '<td><input id="cue-' + k + '" class="cue-in" type="text" placeholder="short, tight cue"></td>' +
                '<td><input id="cpart-ears-' + k + '"  class="cue-in" type="text" placeholder="e.g., perk up"></td>' +
                '<td><input id="cpart-tail-' + k + '"  class="cue-in" type="text" placeholder="e.g., wags"></td>' +
                '<td><input id="cpart-wings-' + k + '" class="cue-in" type="text" placeholder="e.g., flare"></td>' +
                '<td><input id="cpart-horns-' + k + '" class="cue-in" type="text" placeholder="e.g., lower"></td>' +
                '</tr>';
        }
        h += '</tbody></table></div></div>';
        return h;
    }

    // -----------------------------
    // Sidebar wiring
    // -----------------------------
    function renderSidebar () {
        var el = lastRoot.querySelector ('.actor-list');
        if (!el) return;
        el.innerHTML = buildSidebarHTML ();
        var cards = el.querySelectorAll ('.actor-card');
        var i;
        for (i = 0; i < cards.length; i++) {
            (function (card) {
                card.onclick = function () {
                    var id = card.getAttribute ('data-id');
                    if (id) {
                        setActive (id);
                    }
                };
            }) (cards[i]);
        }
    }

    function setActive (id) {
        activeId = id;
        ensureCueDefaultsFor (id);
        ensureBodyCueDefaultsFor (id);
        ensureBodyPartsDefaultsFor (id);
        renderSidebar ();
        renderEditor ();
    }

    // -----------------------------
    // Editor wiring
    // -----------------------------
    function renderEditor () {
        var editor = lastRoot.querySelector ('.speech-editor');
        if (!editor) return;
        editor.innerHTML = buildEditorHTML ();

        var s = getStore ();
        var a = (s.actors || {})[activeId] || null;
        if (!a) return;

        // Fill base selectors/inputs
        var toneSel = editor.querySelector ('#sp-tone');
        var pacSel = editor.querySelector ('#sp-pacing');
        var verSel = editor.querySelector ('#sp-verbosity');
        var dicIn = editor.querySelector ('#sp-diction');
        var snapIn = editor.querySelector ('#sp-snapshot');

        if (toneSel) toneSel.value = (a.speech && a.speech.tone) || '';
        if (pacSel) pacSel.value = (a.speech && a.speech.pacing) || '';
        if (verSel) verSel.value = (a.speech && a.speech.verbosity) || '';
        if (dicIn) dicIn.value = (a.speech && a.speech.diction) || '';
        if (snapIn) snapIn.value = (a.summary && a.summary.line) || '';

        // Fill Quirks
        fillQuirks (editor, a);

        // Fill cue table
        fillCueTable (editor, a);

        // Bind
        bindBase (editor);
        bindQuirks (editor);
        bindCueTable (editor);

        // Update meters
        updateMeters (editor);
    }

    function bindBase (editor) {
        var toneSel = editor.querySelector ('#sp-tone');
        var pacSel = editor.querySelector ('#sp-pacing');
        var verSel = editor.querySelector ('#sp-verbosity');
        var dicIn = editor.querySelector ('#sp-diction');
        var snapIn = editor.querySelector ('#sp-snapshot');

        if (toneSel) toneSel.onchange = function () {
            patch (function (cfg) {
                var a = cfg.actors[activeId];
                a.speech = a.speech || {};
                a.speech.tone = String (toneSel.value || '');
                return cfg;
            });
            updateMeters (editor);
        };
        if (pacSel) pacSel.onchange = function () {
            patch (function (cfg) {
                var a = cfg.actors[activeId];
                a.speech = a.speech || {};
                a.speech.pacing = String (pacSel.value || '');
                return cfg;
            });
            updateMeters (editor);
        };
        if (verSel) verSel.onchange = function () {
            patch (function (cfg) {
                var a = cfg.actors[activeId];
                a.speech = a.speech || {};
                a.speech.verbosity = String (verSel.value || '');
                return cfg;
            });
            updateMeters (editor);
        };
        if (dicIn) dicIn.oninput = function () {
            patch (function (cfg) {
                var a = cfg.actors[activeId];
                a.speech = a.speech || {};
                a.speech.diction = String (dicIn.value || '');
                return cfg;
            });
        };
        if (snapIn) snapIn.oninput = function () {
            patch (function (cfg) {
                var a = cfg.actors[activeId];
                a.summary = a.summary || {};
                a.summary.line = String (snapIn.value || '');
                return cfg;
            });
        };
    }

    function updateMeters (editor) {
        function fill (id, v) {
            var el = editor.querySelector ('#' + id);
            if (!el) return;
            el.style.width = (has (v) ? 100 : 12) + '%';
        }

        var s = getStore (), a = (s.actors || {})[activeId] || {}, sp = a.speech || {};
        fill ('m-tone', sp.tone);
        fill ('m-pacing', sp.pacing);
        fill ('m-verbosity', sp.verbosity);
    }

    // ---- Quirks ----
    function fillQuirks (editor, a) {
        a.quirks = a.quirks || {physical: [], mental: [], emotional: []};
        renderQuirkList (editor, 'physical', a.quirks.physical || []);
        renderQuirkList (editor, 'mental', a.quirks.mental || []);
        renderQuirkList (editor, 'emotional', a.quirks.emotional || []);
    }

    function renderQuirkList (editor, kind, list) {
        var zone = editor.querySelector ('#q-' + kind + '-list');
        if (!zone) return;
        var i, h = '';
        for (i = 0; i < list.length; i++) {
            h += '<span class="chip" data-kind="' + kind + '" data-idx="' + i + '">' + list[i] + ' <b class="x">×</b></span>';
        }
        zone.innerHTML = h || '<div class="muted">No ' + kind + ' quirks.</div>';
    }

    function bindQuirks (editor) {
        var kinds = ['physical', 'mental', 'emotional'], i;
        for (i = 0; i < kinds.length; i++) {
            (function (kind) {
                var addBtn = editor.querySelector ('#q-' + kind + '-add');
                var sel = editor.querySelector ('#q-' + kind + '-sel');
                var custom = editor.querySelector ('#q-' + kind + '-custom');
                if (addBtn) {
                    addBtn.onclick = function () {
                        var val = (custom && has (custom.value)) ? custom.value : (sel ? sel.value : '');
                        val = (val || '').replace (/^\s+|\s+$/g, '');
                        if (!val) return;
                        patch (function (cfg) {
                            var a = cfg.actors[activeId];
                            a.quirks = a.quirks || {physical: [], mental: [], emotional: []};
                            var arr = a.quirks[kind] || (a.quirks[kind] = []);
                            if (arr.indexOf (val) < 0) arr.push (val);
                            return cfg;
                        });
                        renderEditor ();
                    };
                }
            }) (kinds[i]);
        }
        editor.addEventListener ('click', function (ev) {
            var t = ev.target || ev.srcElement;
            if (!t) return;
            if (t.className === 'x' && t.parentNode && t.parentNode.className.indexOf ('chip') > -1) {
                var chip = t.parentNode;
                var kind = chip.getAttribute ('data-kind');
                var idx = parseInt (chip.getAttribute ('data-idx'), 10);
                if (isNaN (idx)) return;
                patch (function (cfg) {
                    var a = cfg.actors[activeId];
                    a.quirks = a.quirks || {physical: [], mental: [], emotional: []};
                    var arr = a.quirks[kind] || [];
                    if (idx >= 0 && idx < arr.length) arr.splice (idx, 1);
                    return cfg;
                });
                renderEditor ();
            }
        }, false);
    }

    // ---- Compact cue table: fill + bind ----
    function fillCueTable (editor, a) {
        var keys = cuesKeys (), i, k;
        a.cues = a.cues || {};
        a.cues_body_parts = a.cues_body_parts || {};
        for (i = 0; i < keys.length; i++) {
            k = keys[i];
            var row = editor.querySelector ('tr[data-em="' + k + '"]');
            if (!row) continue;
            var basic = row.querySelector ('#cue-' + k);
            if (basic) basic.value = a.cues[k] || '';
            var parts = a.cues_body_parts[k] || {ears: '', tail: '', wings: '', horns: ''};
            var eIn = row.querySelector ('#cpart-ears-' + k);
            var tIn = row.querySelector ('#cpart-tail-' + k);
            var wIn = row.querySelector ('#cpart-wings-' + k);
            var hIn = row.querySelector ('#cpart-horns-' + k);
            if (eIn) eIn.value = parts.ears || '';
            if (tIn) tIn.value = parts.tail || '';
            if (wIn) wIn.value = parts.wings || '';
            if (hIn) hIn.value = parts.horns || '';
        }
    }

    function bindCueTable (editor) {
        var keys = cuesKeys (), i, k;
        // Basic column → a.cues[k]
        for (i = 0; i < keys.length; i++) {
            (function (em) {
                var el = editor.querySelector ('#cue-' + em);
                if (!el) return;
                el.oninput = function () {
                    patch (function (cfg) {
                        var a = cfg.actors[activeId];
                        a.cues = a.cues || {};
                        a.cues[em] = String (el.value || '');
                        return cfg;
                    });
                };
            }) (keys[i]);
        }

        // Parts columns → a.cues_body_parts[k].(ears|tail|wings|horns)
        function bindPart (em, part) {
            var id = '#cpart-' + part + '-' + em, el = editor.querySelector (id);
            if (!el) return;
            el.oninput = function () {
                patch (function (cfg) {
                    var a = cfg.actors[activeId];
                    a.cues_body_parts = a.cues_body_parts || {};
                    a.cues_body_parts[em] = a.cues_body_parts[em] || {ears: '', tail: '', wings: '', horns: ''};
                    a.cues_body_parts[em][part] = String (el.value || '');
                    return cfg;
                });
            };
        }

        for (i = 0; i < keys.length; i++) {
            k = keys[i];
            bindPart (k, 'ears');
            bindPart (k, 'tail');
            bindPart (k, 'wings');
            bindPart (k, 'horns');
        }
    }

    // -----------------------------
    // Public API
    // -----------------------------
    api.mount = function (el) {
        if (!el) return;
        lastRoot = el;
        buildShell (el);
        initCompactToolbar (el);
        renderSidebar ();
        var s = getStore (), ids = [], k;
        for (k in (s.actors || {})) ids.push (k);
        if (ids.length) {
            setActive (ids[0]);
        } else {
            var ed = el.querySelector ('.speech-editor');
            if (ed) ed.innerHTML = '<div class="muted">Create an actor in the Actors panel to begin.</div>';
        }
    };

    api.update = function () {
        if (!lastRoot) return;
        renderSidebar ();
        if (activeId) {
            ensureCueDefaultsFor (activeId);
            ensureBodyCueDefaultsFor (activeId);
            ensureBodyPartsDefaultsFor (activeId);
            renderEditor ();
        }
    };

    // Export namespace
    root.CMPanel_speech = api;

}) (this);
