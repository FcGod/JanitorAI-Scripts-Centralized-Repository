/*=== EMCE :: Expressive Micro-Cue Engine (ES5, single-file) ===================
   Paste this entire script into JanitorAI's Advanced Script box.
   Optional globals the host may set BEFORE execution:
     - EMCE_EXPORT     : full GUI export object (authoring CFG)
     - EMCE_TRANSCRIPT : [{role:"user|assistant|system", text:"..."}], newest last
     - EMCE_PLAN       : assistant's raw draft reply (before styling)
   The script is stateless and appends tiny fragments to:
     - context.character.scenario
     - context.character.personality
=============================================================================*/
(function EMCE () {
    // --- Feature flags (leave PROD:true in production) -------------------------
    var F = {PROD: true, LOG: false};

    // --- Janitor context guards ------------------------------------------------
    if (!context || !context.character) {
        return;
    }
    context.character.personality = context.character.personality || "";
    context.character.scenario = context.character.scenario || "";

    // --- Safe helpers (ES5) ----------------------------------------------------
    function safeStr (x) {
        return (x == null ? "" : String (x));
    }

    function clamp (x, lo, hi) {
        return x < lo ? lo : (x > hi ? hi : x);
    }

    function has (o, k) {
        return o && Object.prototype.hasOwnProperty.call (o, k);
    }

    function h32 (s) {
        var i, h = 2166136261 >>> 0;
        s = safeStr (s);
        for (i = 0; i < s.length; i++) {
            h ^= s.charCodeAt (i);
            h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0;
        }
        return h >>> 0;
    }

    // --- Host inputs -----------------------------------------------------------
    var lastRaw = safeStr (context.chat && context.chat.last_message);
    var msgCount = (context.chat && context.chat.message_count) || 0;
    var transcript = (typeof EMCE_TRANSCRIPT !== "undefined" && EMCE_TRANSCRIPT) || [];
    var assistantPlan = safeStr ((typeof EMCE_PLAN !== "undefined" ? EMCE_PLAN : ""));

    // --- 0) Runtime Transformer: GUI Export -> engineExpressive + limits -------
    // Provide EMCE_EXPORT externally, or inline your GUI export object below:
    var EXPORT = (typeof EMCE_EXPORT !== "undefined" && EMCE_EXPORT) || null;
    // If you want to inline during testing, uncomment and fill:
    // var EXPORT = {/* <<< paste GUI export here in dev if needed >>> */};

    function _norm01 (x) {
        x = +x;
        if (x !== x) x = 0;
        return clamp (x, 0, 1);
    }

    function _str (x) {
        return safeStr (x);
    }

    function buildEngineExpressiveFromExport (EX) {
        var ee = {
            actors: {},
            social: {},
            focus: {total: 240, biasActive: true, actors: {}},
            nrc: {},
            loreCues: [],
            limits: {}
        };
        if (!EX) return ee;

        // 1) Limits from params.token_caps (fallbacks if missing)
        var caps = (EX.params && EX.params.token_caps) || {};
        var mode = (EX.params && EX.params.mode) || "standard";
        ee.limits = {
            mode: mode,
            totalTokens: (caps.pool_total != null ? caps.pool_total : (mode === "compact" ? 160 : mode === "rich" ? 400 : mode === "ultra" ? 800 : 240)),
            charsPerToken: (caps.chars_per_token > 0 ? caps.chars_per_token : 4),
            fieldSplit: {
                scenario: (caps.split_scenario != null ? caps.split_scenario : 0.35),
                personality: (caps.split_personality != null ? caps.split_personality : 0.65)
            },
            transcriptDepth: (EX.params && EX.params.history_window > 0 ? Math.min (10, EX.params.history_window) : 10),
            cuesPerActor: (EX.params && EX.params.max_quirks_per_actor > 0 ? Math.min (3, EX.params.max_quirks_per_actor) : 2),
            cuesGlobal: (EX.params && EX.params.max_cues_global > 0 ? EX.params.max_cues_global : 6),
            perActorMaxTokens: (caps.actor_line_max > 0 ? caps.actor_line_max : 120)
        };

        // 2) NRC lexicon (optionally sparse); expect EX.lexicon.nrc.{joy..}
        if (EX.lexicon && EX.lexicon.nrc) {
            var keys = ["joy", "sadness", "anger", "fear", "trust", "disgust", "anticipation", "surprise"];
            var i, k;
            for (i = 0; i < keys.length; i++) {
                k = keys[i];
                if (EX.lexicon.nrc[k]) ee.nrc[k] = EX.lexicon.nrc[k];
            }
        }

        // 3) Actors
        var A = EX.actors || [];
        var iA, a;
        for (iA = 0; iA < A.length; iA++) {
            a = A[iA] || {};
            var id = _str (a.id || a.key || ("a" + iA));
            var ocean = a.ocean || a.personality && a.personality.ocean || {};
            var speech = a.speech || a.voicing || {};
            var quirks = a.quirks || {physical: [], mental: [], emotional: []};
            var cues = a.cues || a.cueText || {};
            ee.actors[id] = {
                id: id,
                name: _str (a.name || a.display || id),
                ocean: {
                    O: _norm01 (ocean.O),
                    C: _norm01 (ocean.C),
                    E: _norm01 (ocean.E),
                    A: _norm01 (ocean.A),
                    N: _norm01 (ocean.N)
                },
                temperament: _str (a.temperament || ""),
                speech: {
                    tone: _str (speech.tone || "Neutral"),
                    pacing: _str (speech.pacing || "Medium"),
                    verbosity: _str (speech.verbosity || "Balanced"),
                    diction: _str (speech.diction || "Plain")
                },
                quirks: {
                    physical: (quirks.physical || []).slice (0, 5),
                    mental: (quirks.mental || []).slice (0, 5),
                    emotional: (quirks.emotional || []).slice (0, 5)
                },
                cueText: {
                    joy: _str (cues.joy || ""),
                    sadness: _str (cues.sadness || ""),
                    anger: _str (cues.anger || ""),
                    fear: _str (cues.fear || ""),
                    trust: _str (cues.trust || ""),
                    disgust: _str (cues.disgust || ""),
                    anticipation: _str (cues.anticipation || ""),
                    surprise: _str (cues.surprise || "")
                },
                oneLine: _str ((a.summary && a.summary.line) || a.oneLine || "")
            };
            // Focus allocation: EX.focus.actors[id].value or EX.actors[i].focus.alloc_pct
            var fa = (EX.focus && EX.focus.actors && EX.focus.actors[id]) || (a.focus || {});
            var v = fa.value != null ? fa.value : (fa.alloc_pct != null ? Math.round (fa.alloc_pct * 100) : 0);
            var locked = !!fa.locked;
            ee.focus.actors[id] = {value: Math.max (0, v | 0), locked: locked};
        }
        // focus pool total
        if (EX.params && EX.params.token_caps && EX.params.token_caps.pool_total != null) {
            ee.focus.total = EX.params.token_caps.pool_total | 0;
        }

        // 4) Social relations: EX.relations v2 -> map[from][to]
        ee.social = {};
        var R = EX.relations || {};
        var from, to;
        for (from in R) if (has (R, from)) {
            ee.social[from] = ee.social[from] || {};
            var edges = R[from] || {};
            for (to in edges) if (has (edges, to)) {
                var entry = edges[to] || {};
                // derive valence/strength/influence; fallbacks if array of entries exists
                var e = entry;
                var type = _str (e.type || (e.entries && e.entries[0] && e.entries[0].type) || "ally");
                var trust = +((e.trust != null) ? e.trust : (e.entries && e.entries[0] && e.entries[0].trust) || 0);
                var affinity = +((e.affinity != null) ? e.affinity : (e.entries && e.entries[0] && e.entries[0].affinity) || 0);
                var respect = +((e.respect != null) ? e.respect : (e.entries && e.entries[0] && e.entries[0].respect) || 0);
                var rivalry = +((e.rivalry != null) ? e.rivalry : (e.entries && e.entries[0] && e.entries[0].rivalry) || 0);
                var influence = +((e.influence != null) ? e.influence : (e.entries && e.entries[0] && e.entries[0].influence) || 0);
                // normalize 0..1 where needed
                var pos = (_norm01 (trust) + _norm01 (affinity) + _norm01 (respect)) / 3.0;
                var neg = _norm01 (rivalry);
                var valence = clamp (pos - neg, -1, 1);
                var strength = clamp (0.6 * pos + 0.4 * _norm01 (influence), 0, 1);
                ee.social[from][to] = {
                    type: type,
                    valence: valence,
                    strength: strength,
                    influence: _norm01 (influence)
                };
            }
        }

        // 5) Lore cues (fast slice): keep enabled, map to {tags, actors[], when?, text}
        var L = (EX.lorebook && EX.lorebook.entries) || [];
        var iL;
        for (iL = 0; iL < L.length; iL++) {
            var lc = L[iL] || {};
            if (lc.enabled === false) continue;
            var tags = lc.tags || lc.category || [];
            if (typeof tags === "string") tags = [tags];
            var trig = lc.trigger || {};
            var actorsArr = trig.actor ? (typeof trig.actor === "string" ? [trig.actor] : trig.actor) : [];
            var when = trig.emotion || {}; // may include V/A/D ranges; keep as-is
            var text = (lc.action && lc.action.inject) || lc.text || lc.content || "";
            if (text) {
                ee.loreCues.push ({tags: tags, actors: actorsArr, when: when, text: safeStr (text)});
            }
        }

        return ee;
    }

    // --- 1) Limits & budgeting -----------------------------------------------
    function getLimits (ee) {
        var L = (ee && ee.limits) || {};
        var mode = L.mode || "standard";
        var tkn = (L.totalTokens != null) ? L.totalTokens :
            (mode === "compact" ? 160 : mode === "rich" ? 400 : mode === "ultra" ? 800 : 240);
        var cpt = L.charsPerToken > 0 ? L.charsPerToken : 4;
        var split = L.fieldSplit || {scenario: 0.35, personality: 0.65};
        var s = +split.scenario || 0, p = +split.personality || 0;
        var sum = s + p;
        if (!sum) {
            s = 0.35;
            p = 0.65;
            sum = 1;
        }
        s /= sum;
        p /= sum;
        return {
            totalTokens: tkn, charsPerToken: cpt,
            scenarioShare: s, personalityShare: p,
            transcriptDepth: (L.transcriptDepth > 0 ? Math.min (10, L.transcriptDepth) : 10),
            cuesPerActor: (L.cuesPerActor > 0 ? L.cuesPerActor : 2),
            cuesGlobal: (L.cuesGlobal > 0 ? L.cuesGlobal : 6),
            perActorMaxTokens: (L.perActorMaxTokens > 0 ? L.perActorMaxTokens : 120)
        };
    }

    function computeFieldBudgets (ee) {
        var lim = getLimits (ee);
        var totalChars = Math.max (40, Math.round (lim.totalTokens * lim.charsPerToken));
        return {
            limits: lim,
            totalChars: totalChars,
            scenarioChars: Math.max (20, Math.floor (totalChars * lim.scenarioShare)),
            personalityChars: Math.max (20, Math.floor (totalChars * lim.personalityShare))
        };
    }

    function allocateActorCharBudgets (ee, ids, personalityChars) {
        var focus = ee.focus || {total: 240, biasActive: true, actors: {}};
        var i, id, sum = 0, out = {}, lockedSum = 0, free = [];
        for (i = 0; i < ids.length; i++) {
            id = ids[i];
            var slot = (focus.actors && focus.actors[id]) || {value: 0, locked: false};
            if (slot.locked) {
                out[id] = slot.value;
                lockedSum += slot.value;
            } else {
                free.push (id);
                sum += slot.value;
            }
        }
        var lim = getLimits (ee);
        var remaining = Math.max (0, personalityChars - Math.round (lockedSum * lim.charsPerToken));
        for (i = 0; i < free.length; i++) {
            id = free[i];
            var v = (focus.actors[id] && focus.actors[id].value) || 0;
            out[id] = (sum > 0) ? Math.round (remaining * (v / sum)) : Math.round (remaining / free.length);
        }
        var perMaxChars = lim.perActorMaxTokens * lim.charsPerToken;
        for (id in out) if (has (out, id)) {
            if (out[id] > perMaxChars) out[id] = perMaxChars;
        }
        return out;
    }

    function appendCapped (fieldName, addition, fieldCapChars) {
        if (!addition) return 0;
        var cur = safeStr (context.character[fieldName]);
        var sep = cur ? " " : "";
        var room = Math.max (0, fieldCapChars - cur.length);
        if (room <= 0) return 0;
        var chunk = (sep + addition);
        if (chunk.length > room) {
            chunk = chunk.slice (0, Math.max (0, room - 1)) + "…";
        }
        context.character[fieldName] = cur + chunk;
        return chunk.length;
    }

    // --- 2) Lexicon & mappings -------------------------------------------------
    function scoreNRC (text, nrc) {
        var emo = {joy: 0, sadness: 0, anger: 0, fear: 0, trust: 0, disgust: 0, anticipation: 0, surprise: 0};
        var w = safeStr (text).toLowerCase ().replace (/[^a-z0-9\s']/g, " ").split (/\s+/);
        var i, t;
        for (i = 0; i < w.length; i++) {
            t = w[i];
            if (!t) continue;
            if (nrc.joy && nrc.joy[t]) emo.joy += nrc.joy[t];
            if (nrc.sadness && nrc.sadness[t]) emo.sadness += nrc.sadness[t];
            if (nrc.anger && nrc.anger[t]) emo.anger += nrc.anger[t];
            if (nrc.fear && nrc.fear[t]) emo.fear += nrc.fear[t];
            if (nrc.trust && nrc.trust[t]) emo.trust += nrc.trust[t];
            if (nrc.disgust && nrc.disgust[t]) emo.disgust += nrc.disgust[t];
            if (nrc.anticipation && nrc.anticipation[t]) emo.anticipation += nrc.anticipation[t];
            if (nrc.surprise && nrc.surprise[t]) emo.surprise += nrc.surprise[t];
        }
        return emo;
    }

    function emo8toVAD (e) {
        var pos = (e.joy + e.trust + e.anticipation + e.surprise);
        var neg = (e.sadness + e.anger + e.fear + e.disgust);
        var V = (pos - neg) / Math.max (1, pos + neg);
        var A = (e.anger + e.fear + e.surprise + e.anticipation) / Math.max (1, pos + neg) * 0.8;
        var D = (e.trust - e.fear - e.disgust) / Math.max (1, pos + neg);
        if (!isFinite (V)) V = 0;
        if (!isFinite (A)) A = 0;
        if (!isFinite (D)) D = 0;
        return {V: clamp (V, -1, 1), A: clamp (A, -1, 1), D: clamp (D, -1, 1)};
    }

    function oceanToVAD (o, temp) {
        var O = o && o.O || 0, C = o && o.C || 0, E = o && o.E || 0, A = o && o.A || 0, N = o && o.N || 0;
        var V = (0.55 * A) + (0.35 * E) - (0.25 * N);
        var Ar = (0.60 * E) + (0.20 * O) - (0.10 * C);
        var D = (0.50 * C) + (0.35 * E) - (0.25 * N);
        if (temp === "Choleric") {
            Ar += 0.10;
            D += 0.10;
        } else if (temp === "Melancholic") {
            V -= 0.10;
            Ar -= 0.05;
        } else if (temp === "Phlegmatic") {
            Ar -= 0.05;
        } else if (temp === "Sanguine") {
            V += 0.05;
            Ar += 0.05;
        }
        return {V: clamp (V, -1, 1), A: clamp (Ar, -1, 1), D: clamp (D, -1, 1)};
    }

    // --- 3) Transcript & tempo -------------------------------------------------
    function sceneTempo (trans) {
        var i, txt, turns = Math.min (10, trans && trans.length || 0), chars = 0, exc = 0, q = 0;
        for (i = Math.max (0, (trans ? trans.length : 0) - turns); i < (trans ? trans.length : 0); i++) {
            txt = (trans[i] && trans[i].text) || "";
            chars += txt.length;
            exc += (txt.match (/!/g) || []).length;
            q += (txt.match (/\?/g) || []).length;
        }
        var density = chars / Math.max (1, turns), excite = exc / Math.max (1, turns), inquis = q / Math.max (1, turns);
        var score = (density > 220 ? 1 : (density > 140 ? 0.6 : 0.3)) + (excite * 0.5) + (inquis * 0.2);
        return score > 1.0 ? "Fast" : (score > 0.6 ? "Medium" : "Slow");
    }

    function foldVADFromTranscript (trans, nrc, depth) {
        var i, base = {V: 0, A: 0, D: 0}, start = Math.max (0, (trans ? trans.length : 0) - Math.max (1, depth || 10));
        var w = 1.0;
        for (i = start; i < (trans ? trans.length : 0); i++) {
            var emo = scoreNRC (trans[i].text || "", nrc);
            var v = emo8toVAD (emo);
            base.V += v.V * w;
            base.A += v.A * w;
            base.D += v.D * w;
            w *= 0.8;
        }
        return {V: clamp (base.V, -1, 1), A: clamp (base.A, -1, 1), D: clamp (base.D, -1, 1)};
    }

    // --- 4) Relations & diction ----------------------------------------------
    function applyRelationBias (vad, tie) {
        if (!tie) return vad;
        var V = vad.V + 0.25 * (tie.valence || 0) * (tie.strength || 0);
        var D = vad.D + 0.20 * (tie.influence || 0) * ((tie.valence || 0) >= 0 ? 1 : -1);
        return {V: clamp (V, -1, 1), A: vad.A, D: clamp (D, -1, 1)};
    }

    function vadToKnobs (preset, vad) {
        var k = {ellipsis: 0, exclam: 0, hedges: 0, verbosity: 0.5, pacing: (preset && preset.pacing) || "Medium"};
        var V = vad.V, A = vad.A, D = vad.D;
        var baseVerb = preset && preset.verbosity === "Chatty" ? 0.7 : preset && preset.verbosity === "Terse" ? 0.3 : 0.5;
        k.ellipsis = Math.max (0, 0.6 - 0.4 * A);
        k.exclam = Math.max (0, 0.4 * V + 0.3 * A);
        k.hedges = Math.max (0, (0.5 - D) * 0.8);
        k.verbosity = clamp (baseVerb + 0.15 * V - 0.10 * D, 0, 1);
        return k;
    }

    // --- 5) Cues & selection ---------------------------------------------------
    function seedPick (list, seed, maxN) {
        var m = list.slice (0), out = [], i, j;
        for (i = 0; i < m.length; i++) {
            seed = (seed * 1664525 + 1013904223) >>> 0;
            j = seed % m.length;
            var t = m[i];
            m[i] = m[j];
            m[j] = t;
        }
        for (i = 0; i < m.length && out.length < maxN; i++) {
            if (out.indexOf (m[i]) < 0) out.push (m[i]);
        }
        return out;
    }

    function cueMatchByVADRange (vad, when) {
        if (!when) return true;

        function inRange (val, rng) {
            if (!rng || rng.length < 2) return true;
            return val >= rng[0] && val <= rng[1];
        }

        return inRange (vad.V, when.V) && inRange (vad.A, when.A) && inRange (vad.D, when.D);
    }

    function buildCueBag (actorId, actorCfg, vad, loreCues) {
        var bag = [], i;

        function pushIf (x) {
            x = safeStr (x);
            if (x && bag.indexOf (x) < 0) bag.push (x);
        }

        // actor emotion text (simple sign mapping)
        if (actorCfg.cueText) {
            if (vad.V > 0.15 && actorCfg.cueText.joy) pushIf (actorCfg.cueText.joy);
            if (vad.V < -0.15 && actorCfg.cueText.sadness) pushIf (actorCfg.cueText.sadness);
            if (vad.A > 0.35 && actorCfg.cueText.anticipation) pushIf (actorCfg.cueText.anticipation);
            if (vad.A < 0.0 && actorCfg.cueText.fear) pushIf (actorCfg.cueText.fear);
            if (vad.D > 0.35 && actorCfg.cueText.trust) pushIf (actorCfg.cueText.trust);
            if (vad.D < -0.35 && actorCfg.cueText.disgust) pushIf (actorCfg.cueText.disgust);
        }
        // lore cues filtered by actor match and VAD window
        for (i = 0; i < loreCues.length; i++) {
            var lc = loreCues[i];
            var actorOK = !lc.actors || !lc.actors.length || lc.actors.indexOf (actorId) >= 0 || (actorCfg.name && lc.actors.indexOf (actorCfg.name) >= 0);
            if (!actorOK) continue;
            if (!cueMatchByVADRange (vad, lc.when)) continue;
            pushIf (lc.text);
        }
        // quirks
        var q = actorCfg.quirks || {};

        function addArr (a) {
            var j;
            for (j = 0; j < (a && a.length || 0); j++) pushIf (a[j]);
        }

        addArr (q.physical);
        addArr (q.mental);
        addArr (q.emotional);
        return bag;
    }

    // --- 6) Compose (light touch for now) -------------------------------------
    function toneWord (v) {
        return v > 0.25 ? "warm" : (v < -0.25 ? "cool" : "neutral");
    }

    function composePlan (plan, knobs) {
        // Reserved for optional punctuation/hedge tweaks. Keep as passthrough for now.
        return plan;
    }

    // === MAIN RUN ==============================================================
    // Build runtime engine block
    var EE = buildEngineExpressiveFromExport (EXPORT);
    // Field budgets
    var B = computeFieldBudgets (EE);
    // Transcript depth
    var depth = B.limits.transcriptDepth;
    var trans = transcript && transcript.length ? transcript.slice (Math.max (0, transcript.length - depth)) : [];
    // Actors list
    var ids = [];
    var id;
    for (id in EE.actors) if (has (EE.actors, id)) ids.push (id);

    // Baselines
    var baselines = {}, i;
    for (i = 0; i < ids.length; i++) {
        var aCfg = EE.actors[ids[i]];
        baselines[ids[i]] = oceanToVAD (aCfg.ocean || {}, aCfg.temperament || "");
    }

    // Trajectory & tempo
    var traj = foldVADFromTranscript (trans, EE.nrc, depth);
    var tempo = sceneTempo (trans);

    // Per-actor fused VAD and diction knobs
    var now = {}, knobs = {};
    for (i = 0; i < ids.length; i++) {
        var aid = ids[i], base = baselines[aid];
        // Add a small portion of scene trajectory
        var fused = {
            V: clamp (base.V + 0.30 * traj.V, -1, 1),
            A: clamp (base.A + 0.30 * traj.A, -1, 1),
            D: clamp (base.D + 0.30 * traj.D, -1, 1)
        };
        // If you later want dyad-aware bias, pick a current target here; placeholder null for now
        fused = applyRelationBias (fused, null);
        now[aid] = fused;
        knobs[aid] = vadToKnobs (EE.actors[aid].speech || {}, fused);
    }

    // Per-actor cues (deterministic selection)
    var seed = h32 (assistantPlan || lastRaw || "");
    var chosen = {};
    var globalLeft = B.limits.cuesGlobal;
    for (i = 0; i < ids.length; i++) {
        var aid2 = ids[i];
        var bag = buildCueBag (aid2, EE.actors[aid2], now[aid2], EE.loreCues);
        chosen[aid2] = seedPick (bag, seed, Math.min (B.limits.cuesPerActor, globalLeft));
    }

    // Compose (optional plan rewrite)
    var finalReply = composePlan (assistantPlan, knobs);

    // Budgets & emission
    var actorBudgets = allocateActorCharBudgets (EE, ids, B.personalityChars);
    var usedByActor = {};
    var cuesGlobalLeft = B.limits.cuesGlobal;

    // scenario: one short tempo/ambient fragment
    var tempoNote = tempo === "Fast" ? "Brisk rhythm." : tempo === "Slow" ? "Gentle pace." : "Even tempo.";
    appendCapped ("scenario", tempoNote, B.scenarioChars);

    // personality: ≤2 actor lines or until out of budget
    var appendedActors = 0, maxActorLines = Math.min (2, ids.length);
    for (i = 0; i < ids.length && appendedActors < maxActorLines && cuesGlobalLeft > 0; i++) {
        var id3 = ids[i], v = now[id3], cueArr = chosen[id3] || [];
        var maxForActor = actorBudgets[id3] || 0;
        var leftForActor = maxForActor - (usedByActor[id3] || 0);
        if (leftForActor <= 0) continue;

        var note = EE.actors[id3].name + ": " + toneWord (v.V) + (cueArr[0] ? (" " + cueArr[0]) : "");
        var added = appendCapped ("personality", note, B.personalityChars);
        if (added > 0) {
            usedByActor[id3] = (usedByActor[id3] || 0) + added;
            cuesGlobalLeft--;
            appendedActors++;
        }
    }

    // Optional: expose finalReply to host (if they bind a mutable object)
    if (typeof EMCE_REPLY !== "undefined" && EMCE_REPLY && typeof EMCE_REPLY === "object") {
        EMCE_REPLY.value = finalReply;
    }

    if (F.LOG) { /* minimal debug hook – off by default */
        // eslint-disable-next-line no-console
        try {
            console.log ("[EMCE] ids=%s tempo=%s scenario.len=%d personality.len=%d",
                ids.join (","), tempo, context.character.scenario.length, context.character.personality.length);
        } catch (_e) {
        }
    }
} ());
