(function (root) {
    'use strict';

    // =====================================================================
    // Relationships Panel v2 — "A views B as a ..."
    // ES5 only; no deps. Back-compat with legacy relations shapes.
    // Exports: window.CMPanel_relationships
    // =====================================================================

    var api = {}, lastRoot = null, activeId = null;

    // -----------------------------
    // Store helpers
    // -----------------------------
    function getStore () {
        return (root.CFGStore && CFGStore.get) ? CFGStore.get () : {actors: {}, relations: {}};
    }

    function patch (mut) {
        if (root.CFGStore && CFGStore.patch) CFGStore.patch (mut);
    }

    function subscribeActorsAndRelations (cb) {
        if (root.CFGStore && CFGStore.subscribe) {
            CFGStore.subscribe (function () {
                var s = getStore ();
                try {
                    return JSON.stringify ({a: s.actors || {}, r: s.relations || {}});
                } catch (_e) {
                    return (new Date ()).getTime ();
                }
            }, function () {
                cb && cb ();
            });
        }
    }

    // -----------------------------
    // Actor access (map shape)
    // -----------------------------
    function actorIds () {
        var A = (getStore ().actors) || {}, ids = [], k;
        for (k in A) if (A.hasOwnProperty (k)) ids.push (k);
        ids.sort ();
        return ids;
    }

    function actorName (id) {
        var a = (getStore ().actors || {})[id] || null;
        if (!a) return id || '';
        var p = a.profile || {};
        return p.preferredName || p.fullName || id || '';
    }

    // -----------------------------
    // Relations shape (v2)
    // v1 legacy:
    //   relations[from][to] = {trust, affinity, respect, rivalry, influence, role[], note, user_frame}
    // v2 current:
    //   relations[from][to] = { entries: [ {type:'ally'|..., trust, affinity, respect, rivalry, influence, note} ], user_frame:'' }
    // -----------------------------
    function ensureRelationsRoot () {
        patch (function (cfg) {
            cfg.relations = cfg.relations || {};
            return cfg;
        });
    }

    function readEdgeObj (fromId, toId) {
        var r = (getStore ().relations || {})[fromId] || {};
        return r[toId] || null;
    }

    function writeEdgeObj (fromId, toId, obj) {
        patch (function (cfg) {
            cfg.relations = cfg.relations || {};
            cfg.relations[fromId] = cfg.relations[fromId] || {};
            cfg.relations[fromId][toId] = obj;
            return cfg;
        });
    }

    function ensureV2Edge (fromId, toId) {
        var e = readEdgeObj (fromId, toId);
        // Upgrade legacy single-object into v2 entries[]
        if (e && !e.entries) {
            var legacy = e;
            var entry = {
                type: (legacy.role && legacy.role.length ? String (legacy.role[0]).toLowerCase () : 'custom'),
                trust: +legacy.trust || 0, affinity: +legacy.affinity || 0, respect: +legacy.respect || 0,
                rivalry: +legacy.rivalry || 0, influence: +legacy.influence || 0, note: legacy.note || ''
            };
            e = {entries: [entry], user_frame: legacy.user_frame || ''};
            writeEdgeObj (fromId, toId, e);
        }
        if (!e) {
            e = {entries: [], user_frame: ''};
            writeEdgeObj (fromId, toId, e);
        }
        return e;
    }

    function deleteEdge (fromId, toId, idx) {
        patch (function (cfg) {
            var r = cfg.relations || {};
            if (!r[fromId] || !r[fromId][toId]) return cfg;
            if (typeof idx === 'number') {
                var list = r[fromId][toId].entries || [];
                if (idx >= 0 && idx < list.length) {
                    list.splice (idx, 1);
                }
            } else {
                delete r[fromId][toId];
            }
            return cfg;
        });
    }

    // -----------------------------
    // Presets
    // -----------------------------
    var PRESETS = {
        ally: {trust: 0.75, affinity: 0.75, respect: 0.6, rivalry: 0.05, influence: 0.55},
        rival: {trust: 0.25, affinity: 0.35, respect: 0.8, rivalry: 0.85, influence: 0.6},
        mentor: {trust: 0.75, affinity: 0.55, respect: 0.9, rivalry: 0.1, influence: 0.75},
        family: {trust: 0.85, affinity: 0.8, respect: 0.7, rivalry: 0.2, influence: 0.6},
        enemy: {trust: 0.1, affinity: 0.1, respect: 0.25, rivalry: 0.9, influence: 0.7},
        lover: {trust: 0.7, affinity: 0.9, respect: 0.6, rivalry: 0.15, influence: 0.7},
        stranger: {trust: 0.5, affinity: 0.4, respect: 0.5, rivalry: 0.1, influence: 0.3}
    };

    function clamp01 (v) {
        v = +v || 0;
        return v < 0 ? 0 : (v > 1 ? 1 : v);
    }

    // -----------------------------
    // Graph helpers (Compass A)
    // -----------------------------
    function overallStrength (entry) {
        var pos = (entry.trust + entry.affinity + entry.respect) / 3;
        return clamp01 (0.6 * pos + 0.4 * entry.influence);
    }

    function valence (entry) {
        var pos = (entry.trust + entry.affinity + entry.respect) / 3;
        var v = pos - entry.rivalry;
        if (v < -1) v = -1;
        if (v > 1) v = 1;
        return v;
    }

    function colorFor (v) {
        var r, g, b;
        if (v >= 0) {
            r = Math.floor (130 - 130 * v);
            g = Math.floor (130 + 100 * v);
            b = Math.floor (130 - 120 * v);
        } else {
            var p = -v;
            r = Math.floor (130 + 100 * p);
            g = Math.floor (130 - 120 * p);
            b = Math.floor (130 - 120 * p);
        }
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function aggregateForGraph (fromId) {
        var s = getStore (), rel = (s.relations || {})[fromId] || {}, k, out = [];
        for (k in rel) {
            if (!rel.hasOwnProperty (k)) continue;
            var E = rel[k] && rel[k].entries || [];
            if (!E.length) continue;
            var i, acc = {trust: 0, affinity: 0, respect: 0, rivalry: 0, influence: 0}, n = E.length;
            for (i = 0; i < n; i++) {
                acc.trust += E[i].trust || 0;
                acc.affinity += E[i].affinity || 0;
                acc.respect += E[i].respect || 0;
                acc.rivalry += E[i].rivalry || 0;
                acc.influence += E[i].influence || 0;
            }
            for (i in acc) if (acc.hasOwnProperty (i)) acc[i] = acc[i] / n;
            out.push ({to: k, avg: acc});
        }
        return out;
    }

    function drawCompass (canvas, centerId) {
        if (!canvas || !canvas.getContext) return;
        var ctx = canvas.getContext ('2d'), W = canvas.width | 0, H = canvas.height | 0;
        ctx.clearRect (0, 0, W, H);
        ctx.fillStyle = '#0f1216';
        ctx.fillRect (0, 0, W, H);

        var cx = W / 2, cy = H / 2;
        var agg = aggregateForGraph (centerId);
        var N = agg.length;

        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        var Rbase = Math.min (W, H) * 0.42, i;
        for (i = 1; i <= 3; i++) {
            ctx.beginPath ();
            ctx.arc (cx, cy, Rbase * (i / 3), 0, Math.PI * 2, true);
            ctx.stroke ();
        }

        ctx.fillStyle = 'rgb(90,210,190)';
        ctx.beginPath ();
        ctx.arc (cx, cy, 10, 0, Math.PI * 2, true);
        ctx.fill ();
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText (actorName (centerId), cx, cy + 24);

        if (!N) return;

        for (i = 0; i < N; i++) {
            var a = agg[i], avg = a.avg, s = overallStrength (avg);
            var v = valence (avg);
            var color = colorFor (v);
            var angle = (Math.PI * 2) * (i / N) - Math.PI / 2;
            var R = (Rbase * (1.0 - (0.65 * s)));
            var x = cx + Math.cos (angle) * R;
            var y = cy + Math.sin (angle) * R;

            ctx.strokeStyle = color;
            ctx.lineWidth = 1 + Math.max (1, Math.round (3 * s));
            ctx.beginPath ();
            ctx.moveTo (cx, cy);
            ctx.lineTo (x, y);
            ctx.stroke ();

            var nodeSize = 4 + Math.round (8 * avg.influence);
            ctx.fillStyle = color;
            ctx.beginPath ();
            ctx.arc (x, y, nodeSize, 0, Math.PI * 2, true);
            ctx.fill ();

            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.font = '11px sans-serif';
            ctx.textAlign = (x < cx ? 'right' : 'left');
            ctx.fillText (actorName (a.to) + '  ' + Math.round (s * 100) + '%', x + (x < cx ? -8 : 8), y + 4);
        }
    }

    // -----------------------------
    // Tooltips (safe if REL_TIPS missing)
    // -----------------------------
    function applyRelationshipTooltips (rootEl) {
        if (!rootEl || !root.El || !rootEl.querySelector) { /* defensive */
        }
        if (!rootEl || !root.REL_TIPS) return;
        var REL_TIPS = root.REL_TIPS;

        // Preset buttons
        var prs = rootEl.querySelectorAll ('.btn-preset');
        var i;
        for (i = 0; i < prs.length; i++) {
            var k = prs[i].getAttribute ('data-p') || 'custom';
            prs[i].setAttribute ('title', REL_TIPS.presets[k] || REL_TIPS.presets.custom);
        }

        // Header controls
        var t = rootEl.querySelector ('#rel-target');
        if (t) t.setAttribute ('title', REL_TIPS.ui.target);
        var ty = rootEl.querySelector ('#rel-type');
        if (ty) ty.setAttribute ('title', REL_TIPS.ui.typeSelect);
        var add = rootEl.querySelector ('#rel-add');
        if (add) add.setAttribute ('title', REL_TIPS.ui.addUpdate);
        var rec = rootEl.querySelector ('#rel-recip');
        if (rec) rec.setAttribute ('title', REL_TIPS.ui.reciprocal);

        var clr = rootEl.querySelector ('#rel-clear');
        if (clr) clr.setAttribute ('title', REL_TIPS.ui.clearEdge);
        var cmp = rootEl.querySelector ('#rel-compact');
        if (cmp) cmp.setAttribute ('title', REL_TIPS.ui.compact);

        // Sliders + % labels
        function tip (id, key) {
            var row = rootEl.querySelector ('#' + id);
            if (row) {
                row.setAttribute ('title', REL_TIPS.sliders[key] || '');
                var parent = row.parentNode;
                if (parent) {
                    var labels = parent.getElementsByTagName ('label');
                    if (labels && labels.length) labels[0].setAttribute ('title', REL_TIPS.sliders[key] || '');
                }
            }
        }

        tip ('sl-trust', 'trust');
        tip ('sl-aff', 'affinity');
        tip ('sl-resp', 'respect');
        tip ('sl-riv', 'rivalry');
        tip ('sl-inf', 'influence');

        // Ledger + Graph
        var led = rootEl.querySelector ('#rel-ledger');
        if (led) led.setAttribute ('title', REL_TIPS.ui.ledger);
        var cvs = rootEl.querySelector ('#rel-compass');
        if (cvs) cvs.setAttribute ('title', REL_TIPS.graph.legend);
    }

    // -----------------------------
    // UI builders
    // -----------------------------
    function buildShell (el) {
        el.innerHTML =
            '<div class="rel-wrap">' +
            '<div class="rel-left"><div class="actor-list"></div></div>' +
            '<div class="rel-right">' +
            '<div class="rel-toolbar">' +
            '<button id="rel-compact" class="btn-mini" type="button">Compact: Off</button>' +
            '<button id="rel-clear" class="btn-mini" type="button">Clear Edge</button>' +
            '</div>' +
            '<div class="rel-editor"></div>' +
            '</div>' +
            '</div>';
    }

    function buildSidebarHTML () {
        var ids = actorIds (), h = '<h3 class="side-header">Actors</h3>', i;
        if (!ids.length) return h + '<div class="muted">No actors yet.</div>';
        for (i = 0; i < ids.length; i++) {
            var id = ids[i];
            h += '' +
                '<div class="actor-card' + (id === activeId ? ' active' : '') + '" data-id="' + id + '">' +
                '<span class="actor-name">' + actorName (id) + '</span>' +
                '<span class="actor-status ' + computeStatus (id) + '"></span>' +
                '</div>';
        }
        return h;
    }

    function computeStatus (id) {
        var s = getStore (), rel = (s.relations || {})[id] || {}, k, count = 0;
        for (k in rel) {
            if (rel.hasOwnProperty (k) && rel[k] && (rel[k].entries || []).length) count++;
        }
        if (count >= 2) return 'green';
        if (count >= 1) return 'yellow';
        return 'red';
    }

    function buildEditorHTML () {
        var ids = actorIds (), others = [], i;
        for (i = 0; i < ids.length; i++) if (ids[i] !== activeId) others.push (ids[i]);

        function sel (id, arr, ph, labeller) {
            var h = '<select id="' + id + '">';
            if (ph) h += '<option value="">' + ph + '</option>';
            for (var j = 0; j < arr.length; j++) {
                var v = arr[j];
                h += '<option value="' + v + '">' + (labeller ? labeller (v) : v) + '</option>';
            }
            h += '</select>';
            return h;
        }

        function presetBar () {
            var keys = ['ally', 'mentor', 'rival', 'family', 'enemy', 'lover', 'stranger'];
            var html = '<div class="preset-row">';
            for (var i = 0; i < keys.length; i++) {
                html += '<button type="button" class="btn-preset" data-p="' + keys[i] + '">' + cap (keys[i]) + '</button>';
            }
            html += '<label class="cb"><input type="checkbox" id="rel-recip"> Reciprocal</label>';
            html += '</div>';
            return html;
        }

        function slider (id, label, tip) {
            return '' +
                '<div class="slider-row" title="' + escapeHtml (tip || '') + '">' +
                '<label>' + label + '</label>' +
                '<input id="' + id + '" type="range" min="0" max="100" value="50">' +
                '<div class="pct" id="' + id + '-pct">50%</div>' +
                '</div>';
        }

        return '' +
            '<div class="card">' +
            '<div class="row-subj">' +
            '<div class="subj-left">' +
            '<div class="head-line">' +
            '<span class="subj-actor">' + escapeHtml (actorName (activeId)) + '</span>' +
            ' <span class="muted">views</span> ' +
            sel ('rel-target', others, 'Select target', actorName) +
            ' <span class="muted">as a</span> ' +
            sel ('rel-type', ['ally', 'mentor', 'rival', 'family', 'enemy', 'lover', 'stranger'], '', cap) +
            '</div>' +
            presetBar () +
            '<div class="sliders-compact">' +
            slider ('sl-trust', 'Trust', 'Confidence in reliability') +
            slider ('sl-aff', 'Affinity', 'Warmth / likeability') +
            slider ('sl-resp', 'Respect', 'Esteem for ability or wisdom') +
            slider ('sl-riv', 'Rivalry', 'Competitive tension') +
            slider ('sl-inf', 'Influence', 'How much A is swayed by B') +
            '</div>' +
            '</div>' +
            '<div class="subj-right">' +
            '<canvas id="rel-compass" class="graph" width="640" height="320"></canvas>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="card">' +
            '<h3>Relationship Ledger</h3>' +
            '<div id="rel-ledger" class="ledger"></div>' +
            '</div>';
    }

    function cap (s) {
        return s ? s.charAt (0).toUpperCase () + s.slice (1) : s;
    }

    function escapeHtml (str) {
        return String (str || '').replace (/[&<>"']/g, function (m) {
            return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[m];
        });
    }

    // -----------------------------
    // Renderers
    // -----------------------------
    function renderSidebar () {
        var node = lastRoot.querySelector ('.actor-list');
        node.innerHTML = buildSidebarHTML ();
        var cards = node.querySelectorAll ('.actor-card'), i;
        for (i = 0; i < cards.length; i++) {
            cards[i].onclick = (function (el) {
                return function () {
                    activeId = el.getAttribute ('data-id');
                    renderSidebar ();
                    renderEditor ();
                };
            }) (cards[i]);
        }
    }

    function renderEditor () {
        var ed = lastRoot.querySelector ('.rel-editor');
        if (!activeId) {
            ed.innerHTML = '<div class="muted">Select an actor to edit relationships.</div>';
            return;
        }
        ed.innerHTML = buildEditorHTML ();
        bindEditorEvents ();
        fillEditorFromCurrent ();
        drawCompass (lastRoot.querySelector ('#rel-compass'), activeId);
        drawLedger ();
        // Apply tooltips last so all controls (including Add/Update) exist
        applyRelationshipTooltips (lastRoot);
    }

    function drawLedger () {
        var zone = lastRoot.querySelector ('#rel-ledger');
        var s = getStore (), rel = (s.relations || {})[activeId] || {}, rows = [], k, i;
        for (k in rel) {
            var container = rel[k], E = (container && container.entries) || [], label = actorName (k);
            for (i = 0; i < E.length; i++) {
                var e = E[i];
                rows.push ({
                    to: k, idx: i, type: e.type || 'custom',
                    t: e.trust || 0, a: e.affinity || 0, r: e.respect || 0, rv: e.rivalry || 0, inf: e.influence || 0,
                    summary: 'T:' + fmt (e.trust) + ' A:' + fmt (e.affinity) + ' R:' + fmt (e.respect) + ' Ri:' + fmt (e.rivalry) + ' I:' + fmt (e.influence),
                    name: label
                });
            }
        }
        if (!rows.length) {
            zone.innerHTML = '<div class="muted">No relationships yet.</div>';
            return;
        }

        rows.sort (function (x, y) {
            if (x.name === y.name) return String (x.type).localeCompare (String (y.type));
            return String (x.name).localeCompare (String (y.name));
        });

        var html = '<div class="ledger-head"><span>To</span><span>Type</span><span>Weights</span><span></span></div>';
        for (i = 0; i < rows.length; i++) {
            var r = rows[i];
            html += '' +
                '<div class="ledger-row" data-to="' + r.to + '" data-idx="' + r.idx + '">' +
                '<span class="to">' + escapeHtml (r.name) + '</span>' +
                '<span class="type">' + cap (r.type) + '</span>' +
                '<span class="weights">' + escapeHtml (r.summary) + '</span>' +
                '<span class="act"><button class="btn-mini del">✕</button></span>' +
                '</div>';
        }
        zone.innerHTML = html;

        var items = zone.querySelectorAll ('.ledger-row'), j;
        for (j = 0; j < items.length; j++) {
            items[j].onclick = (function (row) {
                return function (ev) {
                    var to = row.getAttribute ('data-to');
                    var idx = parseInt (row.getAttribute ('data-idx'), 10);
                    loadEdgeIntoEditor (to, idx);
                };
            }) (items[j]);
            var del = items[j].querySelector ('.del');
            if (del) {
                del.onclick = (function (row) {
                    return function (ev) {
                        ev.stopPropagation ();
                        var to = row.getAttribute ('data-to');
                        var idx = parseInt (row.getAttribute ('data-idx'), 10);
                        deleteEdge (activeId, to, idx);
                        renderEditor ();
                    };
                }) (items[j]);
            }
        }
    }

    function fmt (v) {
        return (Math.round (clamp01 (v) * 100)) + '%';
    }

    // -----------------------------
    // Editor data flow
    // -----------------------------
    function getSelectedTargetId () {
        var el = lastRoot.querySelector ('#rel-target');
        return el ? el.value : '';
    }

    function setSelectedTargetId (toId) {
        var el = lastRoot.querySelector ('#rel-target');
        if (el) {
            el.value = toId || '';
        }
    }

    function setSelectedType (type) {
        var el = lastRoot.querySelector ('#rel-type');
        if (el) {
            el.value = type || '';
        }
    }

    function setSlider (id, v) {
        var el = lastRoot.querySelector ('#' + id);
        if (el) {
            el.value = Math.round (clamp01 (v) * 100);
        }
        var pct = lastRoot.querySelector ('#' + id + '-pct');
        if (pct) {
            pct.textContent = Math.round (clamp01 (v) * 100) + '%';
        }
    }

    function getSliderVal (id) {
        var el = lastRoot.querySelector ('#' + id);
        return el ? Math.max (0, Math.min (100, parseInt (el.value, 10) || 0)) / 100 : 0;
    }

    function makeEntryFromUI () {
        return {
            type: (lastRoot.querySelector ('#rel-type') || {}).value || 'custom',
            trust: getSliderVal ('sl-trust'),
            affinity: getSliderVal ('sl-aff'),
            respect: getSliderVal ('sl-resp'),
            rivalry: getSliderVal ('sl-riv'),
            influence: getSliderVal ('sl-inf'),
            note: ''
        };
    }

    function applyPreset (pkey) {
        var p = PRESETS[pkey] || null;
        if (!p) return;
        setSelectedType (pkey);
        setSlider ('sl-trust', p.trust);
        setSlider ('sl-aff', p.affinity);
        setSlider ('sl-resp', p.respect);
        setSlider ('sl-riv', p.rivalry);
        setSlider ('sl-inf', p.influence);
        drawCompass (lastRoot.querySelector ('#rel-compass'), activeId);
    }

    function loadEdgeIntoEditor (toId, idx) {
        setSelectedTargetId (toId);
        var e = ensureV2Edge (activeId, toId);
        var list = e.entries || [];
        var use = (typeof idx === 'number' && list[idx]) ? list[idx] : list[0];
        if (!use) return;
        setSelectedType (use.type || 'custom');
        setSlider ('sl-trust', use.trust || 0);
        setSlider ('sl-aff', use.affinity || 0);
        setSlider ('sl-resp', use.respect || 0);
        setSlider ('sl-riv', use.rivalry || 0);
        setSlider ('sl-inf', use.influence || 0);
        drawCompass (lastRoot.querySelector ('#rel-compass'), activeId);
    }

    function addOrUpdateEntry (reciprocal) {
        var toId = getSelectedTargetId ();
        if (!toId) return;
        var entry = makeEntryFromUI ();
        patch (function (cfg) {
            cfg.relations = cfg.relations || {};
            cfg.relations[activeId] = cfg.relations[activeId] || {};
            var e = cfg.relations[activeId][toId] = cfg.relations[activeId][toId] || {entries: [], user_frame: ''};
            e.entries.push (entry);
            return cfg;
        });

        if (reciprocal) {
            patch (function (cfg) {
                cfg.relations = cfg.relations || {};
                cfg.relations[toId] = cfg.relations[toId] || {};
                var inv = cfg.relations[toId][activeId] = cfg.relations[toId][activeId] || {
                    entries: [],
                    user_frame: ''
                };
                var mir = {
                    type: entry.type,
                    trust: entry.trust,
                    affinity: entry.affinity,
                    respect: entry.respect,
                    rivalry: entry.rivalry,
                    influence: entry.influence * 0.9
                };
                inv.entries.push (mir);
                return cfg;
            });
        }

        drawCompass (lastRoot.querySelector ('#rel-compass'), activeId);
        drawLedger ();
        renderSidebar ();
    }

    function fillEditorFromCurrent () {
        var ids = actorIds (), i, firstOther = '';
        for (i = 0; i < ids.length; i++) {
            if (ids[i] !== activeId) {
                firstOther = ids[i];
                break;
            }
        }
        setSelectedTargetId (firstOther);

        setSelectedType ('ally');
        setSlider ('sl-trust', 0.5);
        setSlider ('sl-aff', 0.5);
        setSlider ('sl-resp', 0.5);
        setSlider ('sl-riv', 0.1);
        setSlider ('sl-inf', 0.5);
    }

    // -----------------------------
    // Event wiring
    // -----------------------------
    function bindEditorEvents () {
        var ed = lastRoot.querySelector ('.rel-editor');

        var comp = lastRoot.querySelector ('#rel-compact');
        if (comp) {
            comp.onclick = function () {
                var rr = lastRoot.querySelector ('.rel-right');
                var has = ((' ' + rr.className + ' ').indexOf (' compact ') > -1);
                rr.className = has ? rr.className.replace (/\bcompact\b/g, '').replace (/\s+/g, ' ').trim ()
                    : rr.className + ' compact';
                comp.textContent = 'Compact: ' + (has ? 'Off' : 'On');
            };
        }

        var clr = lastRoot.querySelector ('#rel-clear');
        if (clr) {
            clr.onclick = function () {
                var to = getSelectedTargetId ();
                if (!to) return;
                deleteEdge (activeId, to);
                renderEditor ();
                renderSidebar ();
            };
        }

        var presets = ed.querySelectorAll ('.btn-preset'), i;
        for (i = 0; i < presets.length; i++) {
            presets[i].onclick = (function (btn) {
                return function () {
                    applyPreset (btn.getAttribute ('data-p'));
                };
            }) (presets[i]);
        }

        var sids = ['sl-trust', 'sl-aff', 'sl-resp', 'sl-riv', 'sl-inf'], j;
        for (j = 0; j < sids.length; j++) {
            (function (id) {
                var el = ed.querySelector ('#' + id);
                if (el) {
                    el.oninput = function () {
                        var pct = ed.querySelector ('#' + id + '-pct');
                        if (pct) pct.textContent = (parseInt (el.value, 10) || 0) + '%';
                        drawCompass (lastRoot.querySelector ('#rel-compass'), activeId);
                    };
                }
            }) (sids[j]);
        }

        var addBtn = document.createElement ('button');
        addBtn.className = 'btn';
        addBtn.id = 'rel-add';
        addBtn.type = 'button';
        addBtn.textContent = 'Add / Update';
        var recip = lastRoot.querySelector ('#rel-recip');
        var headLine = ed.querySelector ('.head-line');
        if (headLine) {
            headLine.appendChild (addBtn);
        }
        addBtn.onclick = function () {
            addOrUpdateEntry (recip && recip.checked);
        };
    }

    // -----------------------------
    // Lifecycle
    // -----------------------------
    api.mount = function (rootEl) {
        if (!rootEl) return;
        lastRoot = rootEl;
        ensureRelationsRoot ();

        var ids = actorIds ();
        activeId = activeId || (ids.length ? ids[0] : null);

        buildShell (rootEl);
        renderSidebar ();
        renderEditor ();

        subscribeActorsAndRelations (function () {
            if (!lastRoot) return;
            if (!activeId) {
                var now = actorIds ();
                if (now.length) activeId = now[0];
            }
            renderSidebar ();
            if (activeId) renderEditor ();
        });
    };

    api.unmount = function () {
        if (lastRoot) lastRoot.innerHTML = '';
        lastRoot = null;
    };
    root.CMPanel_relationships = api;

}) (window);
