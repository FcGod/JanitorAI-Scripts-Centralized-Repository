(function (root) {
    'use strict';
    var Seed = root.LoreSeed || (root.LoreSeed = {});

    function arr (x) {
        return Object.prototype.toString.call (x) === '[object Array]' ? x : (x == null ? [] : [x]);
    }

    function exists (x) {
        return x != null && x !== '';
    }

    function formatAppearance (a) {
        // Keep token-light; include species-ish hints if present
        var ap = a.appearance || {}, bits = [];
        if (exists (ap.hair)) bits.push ('hair: ' + ap.hair);
        if (exists (ap.eyes)) bits.push ('eyes: ' + ap.eyes);
        if (exists (ap.build)) bits.push ('build: ' + ap.build);
        // appendages summary
        var ad = (ap.appendages || {}), parts = [];
        if (ad.ears) parts.push ('ears:' + (ad.ears.style || ''));
        if (ad.tail) parts.push ('tail:' + (ad.tail.style || ''));
        if (ad.wings) parts.push ('wings:' + (ad.wings.style || ''));
        if (ad.horns) parts.push ('horns:' + (ad.horns.style || ''));
        if (parts.length) bits.push (parts.join (', '));
        return bits.join (' • ');
    }

    function upsertEntry (entries, key) {
        // key: {actor,state,facet}
        var i, id = key.actor + ':' + key.state + ':' + key.facet;
        for (i = 0; i < entries.length; i++) {
            if (entries[i].id === id) {
                return entries[i];
            }
        }
        var e = {
            id: id,
            title: id,
            tags: [key.actor, key.state, key.facet],
            trigger: {actor: key.actor, emotion: key.state},
            action: {inject: ""},
            enabled: true,
            priority: 50,
            notes: ""
        };
        entries.push (e);
        return e;
    }

    // --- Seeder 1: Base descriptors
    Seed.seedActorDescriptors = function (cfg) {
        var A = cfg.actors || {}, k,
            entries = (cfg.lorebook && cfg.lorebook.entries) || (cfg.lorebook = {entries: []}, cfg.lorebook.entries);
        for (k in A) {
            if (!A.hasOwnProperty (k)) continue;
            var a = A[k];
            // Appearance
            var e1 = upsertEntry (entries, {actor: k, state: 'Base', facet: 'Appearance'});
            e1.action.inject = formatAppearance (a);
            // Voice (from speech)
            var sp = (a.speech || {}), voiceParts = [];
            if (exists (sp.tone)) voiceParts.push ('tone: ' + sp.tone);
            if (exists (sp.pacing)) voiceParts.push ('pacing: ' + sp.pacing);
            if (exists (sp.verbosity)) voiceParts.push ('verbosity: ' + sp.verbosity);
            if (exists (sp.diction)) voiceParts.push ('diction: ' + sp.diction);
            var e2 = upsertEntry (entries, {actor: k, state: 'Base', facet: 'Voice'});
            e2.action.inject = voiceParts.join (' • ');
        }
        return cfg;
    };

    // --- Seeder 2: Emotion cues (Emotions + appendages)
    Seed.seedEmotionCues = function (cfg) {
        var A = cfg.actors || {},
            keys = (root.SpeechCues && SpeechCues.keys) ? SpeechCues.keys.slice () : ['joy', 'sadness', 'anger', 'fear', 'trust', 'disgust', 'anticipation', 'surprise'];
        var k, i, state,
            entries = (cfg.lorebook && cfg.lorebook.entries) || (cfg.lorebook = {entries: []}, cfg.lorebook.entries);
        for (k in A) {
            if (!A.hasOwnProperty (k)) continue;
            var a = A[k], ad = (a.appearance && a.appearance.appendages) || {};
            for (i = 0; i < keys.length; i++) {
                state = keys[i];

                // 2a) Emotions (face/voice cues)
                if (a.cues && a.cues[state]) {
                    var eEmo = upsertEntry (entries, {actor: k, state: cap (state), facet: 'Emotions'});
                    eEmo.action.inject = a.cues[state];
                }

                // 2b) Appendage facets — only if present *and* text exists
                if (ad.wings && ad.wings.present && a.cues_body && a.cues_body[state]) {
                    var ew = upsertEntry (entries, {actor: k, state: cap (state), facet: 'Wings'});
                    ew.action.inject = a.cues_body[state];
                }
                if (ad.ears && ad.ears.present && a.cues_body && a.cues_body[state]) {
                    var ee = upsertEntry (entries, {actor: k, state: cap (state), facet: 'Ears'});
                    ee.action.inject = a.cues_body[state];
                }
                if (ad.tail && ad.tail.present && a.cues_body && a.cues_body[state]) {
                    var et = upsertEntry (entries, {actor: k, state: cap (state), facet: 'Tail'});
                    et.action.inject = a.cues_body[state];
                }
                if (ad.horns && ad.horns.present && a.cues_body && a.cues_body[state]) {
                    var eh = upsertEntry (entries, {actor: k, state: cap (state), facet: 'Horns'});
                    eh.action.inject = a.cues_body[state];
                }
            }
        }
        return cfg;

        function cap (s) {
            return s ? s.charAt (0).toUpperCase () + s.slice (1) : s;
        }
    };
}) (this);
