(function (root) {
    'use strict';
    // tokens.panel.js — ES5-only Token/Cost Estimator for MythOS Studio
    // Mount with: window.CMPanel_tokens.mount(el)
    // Reads: cfg.engine.token.*, cfg.engine.limits.*, cfg.lorebook.entries, cfg.lorebook.settings.honorAnatomyPresence, cfg.actors.*
    // Writes (optional): updates cfg.engine.token.*, cfg.engine.limits.* when changed via UI

    var api = {}, lastRoot = null;

    // ---- Small helpers ----
    function getCfg () {
        return (root.CFGStore && root.CFGStore.get) ? root.CFGStore.get () : (root.GUI && root.GUI.State && root.GUI.State.CFG) || {
            actors: {},
            lorebook: {entries: []}
        };
    }

    function patch (mut) {
        if (root.CFGStore && root.CFGStore.patch) return root.CFGStore.patch (mut);
        var c = getCfg ();
        var r = mut (c) || c;
        if (root.GUI && root.GUI.State) root.GUI.State.CFG = r;
        return r;
    }

    function el (tag, cls, txt) {
        var e = document.createElement (tag);
        if (cls) e.className = cls;
        if (txt != null) e.textContent = txt;
        return e;
    }

    function empty (n) {
        while (n && n.firstChild) n.removeChild (n.firstChild);
    }

    function fmtInt (n) {
        n = +n || 0;
        return n.toString ().replace (/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function estTokens (chars, cpt) {
        var ch = +chars || 0, d = +cpt || 4;
        if (d <= 0) d = 4;
        return Math.ceil (ch / d);
    }

    function textLen (s) {
        return (s || '').length;
    }

    function arr (x) {
        return Object.prototype.toString.call (x) === '[object Array]' ? x : (x == null ? [] : [x]);
    }

    // Parse \"Actor:State:Facet\" pattern; otherwise bucket as 'misc'
    function parseName (name) {
        if (!name) return null;
        var p = String (name).split (':');
        if (p.length < 3) return {actor: '(misc)', state: '', facet: 'misc'};
        return {actor: p[0], state: p[1], facet: p[2]};
    }

    function facetIsAppendage (f) {
        return f === 'Ears' || f === 'Tail' || f === 'Wings' || f === 'Horns';
    }

    function presenceMap (cfg) {
        var A = (cfg.actors || {}), id, map = {};
        for (id in A) {
            if (!A.hasOwnProperty (id)) continue;
            var ad = (A[id].appearance && A[id].appearance.appendages) || {};
            map[id] = {
                Ears: !!(ad.ears && ad.ears.present),
                Tail: !!(ad.tail && ad.tail.present),
                Wings: !!(ad.wings && ad.wings.present),
                Horns: !!(ad.horns && ad.horns.present)
            };
        }
        return map;
    }

    function filterByPresence (entries, cfg) {
        var honor = !!(((cfg || {}).lorebook || {}).settings && cfg.lorebook.settings.honorAnatomyPresence);
        if (!honor) return entries.slice ();
        var map = presenceMap (cfg), out = [], i, e, p;
        for (i = 0; i < entries.length; i++) {
            e = entries[i];
            p = parseName (e.name);
            if (!p) {
                out.push (e);
                continue;
            }
            if (!facetIsAppendage (p.facet)) {
                out.push (e);
                continue;
            }
            if (map[p.actor] && map[p.actor][p.facet]) out.push (e);
        }
        return out;
    }

    // Compute metrics
    function computeMetrics (cfg) {
        var engine = cfg.engine || {};
        var tok = engine.token || {};
        var limits = engine.limits || {};
        var cpt = +tok.chars_per_token > 0 ? +tok.chars_per_token : 4; // default 4
        var maxCues = +limits.max_cues_global > 0 ? +limits.max_cues_global : 6;

        var entries = arr (((cfg.lorebook || {}).entries) || []);
        var entriesHonored = filterByPresence (entries, cfg);

        // Totals
        var totalCharsAll = 0, totalTokAll = 0, nAll = 0;
        var totalCharsHon = 0, totalTokHon = 0, nHon = 0;

        var i, e;
        for (i = 0; i < entries.length; i++) {
            e = entries[i];
            var ch = textLen (e.content || '');
            totalCharsAll += ch;
            totalTokAll += estTokens (ch, cpt);
            nAll++;
        }
        for (i = 0; i < entriesHonored.length; i++) {
            e = entriesHonored[i];
            var ch2 = textLen (e.content || '');
            totalCharsHon += ch2;
            totalTokHon += estTokens (ch2, cpt);
            nHon++;
        }

        // Buckets per actor/state/facet
        var byActor = {}, byFacet = {}, byCategory = {};

        function bump (map, key, ch) {
            if (!map[key]) map[key] = {items: 0, chars: 0, tokens: 0};
            map[key].items++;
            map[key].chars += ch;
        }

        for (i = 0; i < entriesHonored.length; i++) {
            e = entriesHonored[i];
            var ch3 = textLen (e.content || '');
            var p = parseName (e.name);
            var actor = (p && p.actor) || '(misc)';
            var facet = (p && p.facet) || 'misc';
            var cat = (e.category || 'uncategorized');
            bump (byActor, actor, ch3);
            bump (byFacet, facet, ch3);
            bump (byCategory, cat, ch3);
        }

        // finalize token estimates for buckets
        function finalize (map) {
            var k;
            for (k in map) {
                if (!map.hasOwnProperty (k)) continue;
                map[k].tokens = estTokens (map[k].chars, cpt);
            }
        }

        finalize (byActor);
        finalize (byFacet);
        finalize (byCategory);

        // Per-turn estimate: assume each actor can contribute up to maxCues (cap by availability)
        var perTurn = {tokens: 0, cues: 0, details: []};
        var actorsKeys = [], k;
        for (k in byActor) actorsKeys.push (k);
        for (i = 0; i < actorsKeys.length; i++) {
            var aKey = actorsKeys[i];
            // Rough average tokens per cue for this actor
            var itemsForActor = 0, charsForActor = 0;
            // re-scan honored entries to compute per-actor average length
            var j;
            for (j = 0; j < entriesHonored.length; j++) {
                var ee = entriesHonored[j];
                var pp = parseName (ee.name);
                if (pp && pp.actor === aKey) {
                    itemsForActor++;
                    charsForActor += textLen (ee.content || '');
                }
            }
            var avgChars = itemsForActor > 0 ? (charsForActor / itemsForActor) : 0;
            var avgTok = estTokens (avgChars, cpt);
            var cuesAvail = itemsForActor; // how many cues exist for actor
            var cuesTake = Math.min (maxCues, cuesAvail);
            var tokThis = cuesTake * avgTok;
            perTurn.cues += cuesTake;
            perTurn.tokens += tokThis;
            perTurn.details.push ({actor: aKey, cues: cuesTake, avgTokensPerCue: avgTok, tokens: tokThis});
        }

        return {
            settings: {
                cpt: cpt,
                maxCues: maxCues,
                honor: !!(((cfg.lorebook || {}).settings || {}).honorAnatomyPresence)
            },
            totals: {
                all: {count: nAll, chars: totalCharsAll, tokens: totalTokAll},
                honored: {count: nHon, chars: totalCharsHon, tokens: totalTokHon}
            },
            buckets: {byActor: byActor, byFacet: byFacet, byCategory: byCategory},
            perTurn: perTurn
        };
    }

    // ---- UI ----
    var dom = {wrap: null};

    function build (container) {
        empty (container);
        var wrap = el ('div', 'tok-wrap');

        // Settings card
        var settings = el ('div', 'card');
        settings.appendChild (el ('h3', null, 'Token / Cost Estimator'));
        var sBody = document.createElement ('div');
        sBody.innerHTML = '' +
            '<div class="row" style="display:flex; gap:12px; align-items:center;">' +
            '<div style="flex:1;">' +
            '<label style="font-weight:600;">Chars per token</label>' +
            '<input id="tok-cpt" type="number" min="1" step="0.1" style="width:75%">' +
            '</div>' +
            '<div style="flex:1;">' +
            '<label style="font-weight:600;">Max cues per turn</label>' +
            '<input id="tok-maxcues" type="number" min="1" step="1" style="width:75%">' +
            '</div>' +
            '<div style="flex:0 0 auto; min-width: 220px;">' +
            '<label class="row-toggle"><input id="tok-honor" type="checkbox"> honor anatomy presence</label>' +
            '</div>' +
            '</div>' +
            '<div class="muted" style="margin-top:6px; font-size:12px;">Estimator reads/write engine settings; toggle \"honor presence\" mirrors Lorebook export behavior.</div>';
        settings.appendChild (sBody);

        // Totals card
        var totals = el ('div', 'card');
        totals.appendChild (el ('h3', null, 'Lorebook Totals'));
        var tBody = document.createElement ('div');
        tBody.innerHTML = '' +
            '<div class="row" style="display:flex; gap:12px;">' +
            '<div style="flex:1;">All Entries: <b id="t-all-count">0</b> • <span id="t-all-ch">0</span> chars • ~<span id="t-all-tok">0</span> tok</div>' +
            '<div style="flex:1;">Honoring Presence: <b id="t-h-count">0</b> • <span id="t-h-ch">0</span> chars • ~<span id="t-h-tok">0</span> tok</div>' +
            '</div>';
        totals.appendChild (tBody);

        // Breakdown card
        var breakdown = el ('div', 'card');
        breakdown.appendChild (el ('h3', null, 'Breakdown'));
        var bBody = document.createElement ('div');
        bBody.innerHTML = '' +
            '<div class="row" style="display:flex; gap:12px;">' +
            '  <div style="flex:1;">' +
            '    <h4 style="margin:0 0 6px 0;">By Actor</h4>' +
            '    <div id="tbl-actor" class="table small"></div>' +
            '  </div>' +
            '  <div style="flex:1;">' +
            '    <h4 style="margin:0 0 6px 0;">By Facet</h4>' +
            '    <div id="tbl-facet" class="table small"></div>' +
            '  </div>' +
            '  <div style="flex:1;">' +
            '    <h4 style="margin:0 0 6px 0;">By Category</h4>' +
            '    <div id="tbl-cat" class="table small"></div>' +
            '  </div>' +
            '</div>';
        breakdown.appendChild (bBody);

        // Per-turn estimate card
        var turn = el ('div', 'card');
        turn.appendChild (el ('h3', null, 'Per‑Turn Cue Estimate'));
        var turnBody = document.createElement ('div');
        turnBody.innerHTML = '' +
            '<div class="row" style="display:flex; gap:12px; align-items:center;">' +
            '  <div style="flex:2;">Total cues considered: <b id="pt-cues">0</b> • Estimated ~<b id="pt-tok">0</b> tokens/turn</div>' +
            '</div>' +
            '<div id="tbl-turn" class="table small" style="margin-top:8px;"></div>';
        turn.appendChild (turnBody);

        wrap.appendChild (settings);
        wrap.appendChild (totals);
        wrap.appendChild (breakdown);
        wrap.appendChild (turn);
        container.appendChild (wrap);

        dom.wrap = wrap;
        wire ();
        render ();
    }

    function render () {
        var cfg = getCfg ();
        var engine = cfg.engine || {};
        var tok = engine.token || {};
        var limits = engine.limits || {};
        var lset = ((cfg.lorebook || {}).settings) || {};
        var cpt = +tok.chars_per_token > 0 ? +tok.chars_per_token : 4;
        var maxCues = +limits.max_cues_global > 0 ? +limits.max_cues_global : 6;
        var honor = !!lset.honorAnatomyPresence;

        // fill inputs
        var iC = document.getElementById ('tok-cpt');
        if (iC) iC.value = cpt;
        var iM = document.getElementById ('tok-maxcues');
        if (iM) iM.value = maxCues;
        var iH = document.getElementById ('tok-honor');
        if (iH) iH.checked = honor;

        var m = computeMetrics (cfg);
        // Totals
        setText ('t-all-count', fmtInt (m.totals.all.count));
        setText ('t-all-ch', fmtInt (m.totals.all.chars));
        setText ('t-all-tok', fmtInt (m.totals.all.tokens));
        setText ('t-h-count', fmtInt (m.totals.honored.count));
        setText ('t-h-ch', fmtInt (m.totals.honored.chars));
        setText ('t-h-tok', fmtInt (m.totals.honored.tokens));

        // Tables
        tableFromMap ('tbl-actor', m.buckets.byActor, ['Actor', 'Items', 'Chars', '~Tokens']);
        tableFromMap ('tbl-facet', m.buckets.byFacet, ['Facet', 'Items', 'Chars', '~Tokens']);
        tableFromMap ('tbl-cat', m.buckets.byCategory, ['Category', 'Items', 'Chars', '~Tokens']);

        // Per-turn
        setText ('pt-cues', fmtInt (m.perTurn.cues));
        setText ('pt-tok', fmtInt (m.perTurn.tokens));
        tableFromList ('tbl-turn', m.perTurn.details, ['Actor', 'Cues Used', 'Avg Tok/Cue', '~Tok This Turn'], function (r) {
            return [r.actor, r.cues, r.avgTokensPerCue, r.tokens];
        });
    }

    function setText (id, txt) {
        var n = document.getElementById (id);
        if (n) n.textContent = String (txt);
    }

    function tableFromMap (id, map, headers) {
        var host = document.getElementById (id);
        if (!host) return;
        host.innerHTML = '';
        var table = document.createElement ('table');
        table.style.width = '100%';
        table.style.fontSize = '12px';
        table.style.borderCollapse = 'collapse';
        var thead = document.createElement ('thead');
        var trh = document.createElement ('tr');
        var i;
        for (i = 0; i < headers.length; i++) {
            var th = document.createElement ('th');
            th.textContent = headers[i];
            th.style.textAlign = 'left';
            th.style.borderBottom = '1px solid rgba(255,255,255,0.12)';
            th.style.padding = '4px 6px';
            trh.appendChild (th);
        }
        thead.appendChild (trh);
        table.appendChild (thead);
        var tbody = document.createElement ('tbody');
        var keys = [], k;
        for (k in map) {
            if (map.hasOwnProperty (k)) keys.push (k);
        }
        keys.sort ();
        for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            var r = map[key];
            var tr = document.createElement ('tr');
            appendTd (tr, key);
            appendTd (tr, fmtInt (r.items));
            appendTd (tr, fmtInt (r.chars));
            appendTd (tr, fmtInt (r.tokens));
            tbody.appendChild (tr);
        }
        table.appendChild (tbody);
        host.appendChild (table);
    }

    function tableFromList (id, list, headers, pick) {
        var host = document.getElementById (id);
        if (!host) return;
        host.innerHTML = '';
        var table = document.createElement ('table');
        table.style.width = '100%';
        table.style.fontSize = '12px';
        table.style.borderCollapse = 'collapse';
        var thead = document.createElement ('thead');
        var trh = document.createElement ('tr');
        var i;
        for (i = 0; i < headers.length; i++) {
            var th = document.createElement ('th');
            th.textContent = headers[i];
            th.style.textAlign = 'left';
            th.style.borderBottom = '1px solid rgba(255,255,255,0.12)';
            th.style.padding = '4px 6px';
            trh.appendChild (th);
        }
        thead.appendChild (trh);
        table.appendChild (thead);
        var tbody = document.createElement ('tbody');
        for (i = 0; i < list.length; i++) {
            var row = pick (list[i]);
            var tr = document.createElement ('tr');
            var j;
            for (j = 0; j < row.length; j++) {
                appendTd (tr, (typeof row[j] === 'number' ? fmtInt (row[j]) : row[j]));
            }
            tbody.appendChild (tr);
        }
        table.appendChild (tbody);
        host.appendChild (table);
    }

    function appendTd (tr, txt) {
        var td = document.createElement ('td');
        td.textContent = String (txt);
        td.style.padding = '4px 6px';
        td.style.borderBottom = '1px dashed rgba(255,255,255,0.06)';
        tr.appendChild (td);
    }

    function wire () {
        var cpt = document.getElementById ('tok-cpt');
        var max = document.getElementById ('tok-maxcues');
        var hon = document.getElementById ('tok-honor');

        if (cpt) {
            cpt.oninput = function () {
                var v = +cpt.value || 4;
                if (v <= 0) v = 4;
                patch (function (cfg) {
                    cfg.engine = cfg.engine || {};
                    cfg.engine.token = cfg.engine.token || {};
                    cfg.engine.token.chars_per_token = v;
                    return cfg;
                });
                render ();
            };
        }
        if (max) {
            max.oninput = function () {
                var v = +max.value || 6;
                if (v <= 0) v = 6;
                patch (function (cfg) {
                    cfg.engine = cfg.engine || {};
                    cfg.engine.limits = cfg.engine.limits || {};
                    cfg.engine.limits.max_cues_global = v;
                    return cfg;
                });
                render ();
            };
        }
        if (hon) {
            hon.onchange = function () {
                var on = !!hon.checked;
                patch (function (cfg) {
                    cfg.lorebook = cfg.lorebook || {};
                    cfg.lorebook.settings = cfg.lorebook.settings || {};
                    cfg.lorebook.settings.honorAnatomyPresence = on;
                    return cfg;
                });
                render ();
            };
        }

        // subscribe to updates
        if (root.CFGStore && CFGStore.subscribe) {
            CFGStore.subscribe (function () {
                try {
                    return JSON.stringify (getCfg ());
                } catch (_e) {
                    return String (Math.random ());
                }
            }, function () {
                if (lastRoot) render ();
            });
        }
    }

    // ---- lifecycle ----
    api.mount = function (rootEl) {
        lastRoot = rootEl;
        build (rootEl);
    };
    api.unmount = function () {
        if (lastRoot) {
            empty (lastRoot);
            lastRoot = null;
        }
    };

    root.CMPanel_tokens = api;
}) (window);
