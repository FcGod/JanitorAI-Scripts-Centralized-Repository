(function (root) {
    'use strict';

    // MythOS Auditor v2 — ES5, no deps
    // export: window.MythOSAuditor.validate(cfg)

    var Auditor = {};

    Auditor.validate = function (cfg) {
        var output = {errors: [], warnings: [], metrics: {}};

        if (!cfg || typeof cfg !== 'object') {
            output.errors.push ('CFG missing or not an object.');
            return output;
        }

        // === HELPER FUNCTIONS ===
        // Normalized means between 0 and 1
        function isNum (x) {
            return typeof x === 'number' && isFinite (x);
        }

        function isNormalized (x) {
            return isNum (x) && x >= 0 && x <= 1;
        }

        function normalize (x) {
            if (!isNum (x)) return 0;
            if (x < 0) return 0;
            if (x > 1) return 1;
            return x;
        }

        function wordCount (s) {
            if (!s) return 0;
            return String (s).trim ().split (/\s+/).filter (Boolean).length;
        }

        function tokenEstimate (s) {
            if (!s) return 0;
            return Math.ceil (wordCount (s) * 0.75);
        } // crude, conservative
        function logError (msg) {
            output.errors.push (msg);
        }

        function logWarning (msg) {
            output.warnings.push (msg);
        }

        // === MAX LIMIT VARIABLES ===
        var params = (cfg.params || {});
        var maxTokens = (params.token_caps || {});
        var maxActors = params.max_actors_present || 6;
        var maxQuirks = params.max_quirks_per_actor || 5;
        var maxRelantionships = ((cfg.engine && cfg.engine.constraints && cfg.engine.constraints.counts && cfg.engine.constraints.counts.relationships_per_actor_max) || 6);
        var snapshotMax = maxTokens.snapshot_max_tokens || 18;
        var cueWordMax = maxTokens.cue_word_max || 6;

        // === REQUIRED TOP LEVEL KEY ENTRIES ===
        var keyEntries = [
            'cfg_version',
            'project',
            'params',
            'actors',
            'relations',
            'lorebook',
            'templates',
            'engine',
            'export_meta'
        ];

        for (var i = 0; i < keyEntries.length; i++) {
            if (!cfg.hasOwnProperty (keyEntries[i]))
                logError ('Missing top-level key: ' + keyEntries[i]);
        }

        if (cfg.cfg_version !== 'mythos.v2')
            logError ('cfg_version must be "mythos.v2".');

        // === ACTORS ===
        var actors = cfg.actors || {};
        var actorIds = [];

        for (var key in actors)
            if (actors.hasOwnProperty (key)) actorIds.push (key);


        output.metrics.actor_count = actorIds.length;
        if (actorIds.length === 0) logWarning ('No actors defined.');
        if (actorIds.length > 6) logWarning ('Actors exceed recommended max (6).');


        for (i = 0; i < actorIds.length; i++) {
            var id = actorIds[i];
            var actor = actors[id] || {};
            // Basic REQUIREDs
            var actorProfile = actor.profile || {};
            var nameOk = !!(actorProfile.preferredName || actorProfile.fullName);

            if (!nameOk)
                logError (id + ': Missing name (preferred or full).');


            //O.C.E.A.N
            //Openness (open-minded-ness/curiosity), Conciesntiouness (discipline),
            //Extraversion (sociability), Agreeableness (cooperation, compassion)
            //Neuroticism (Emotional instability), Temperament (Behaviour tendencies, personality style)

            var ocean = (actor.personality && actor.personality.ocean) || {};
            var oceanKeys = ['O', 'C', 'E', 'A', 'N'];
            for (var j = 0; j < oceanKeys.length; j++) {
                var v = ocean[oceanKeys[j]];
                if (!isNormalized (v))
                    logError (id + ': OCEAN.' + oceanKeys[j] + ' must be between [0,1].');
            }

            // snapshot
            var snapshot = (actor.summary && actor.summary.line) || '';
            if (!snapshot)
                logWarning (id + ': No snapshot line.');

            if (tokenEstimate (snapshot) > snapshotMax)
                logWarning (id + ': Snapshot may exceed token cap (' + snapshotMax + ').');

            // cues (require 8 keys)
            var actorCues = actor.cues || {};
            var cueKeys = ['joy', 'sadness', 'anger', 'fear', 'trust', 'disgust', 'anticipation', 'surprise'];
            var activeCues = 0;
            for (j = 0; j < cueKeys.length; j++) {
                var txt = actorCues[cueKeys[j]];
                if (txt && String (txt).trim ()) {
                    activeCues++;
                    if (wordCount (txt) > cueWordMax)
                        logWarning (id + ': Cue "' + cueKeys[j] + '" exceeds ' + cueWordMax + ' words.');
                }
            }
            if (activeCues < 4)
                logWarning (id + ': Fewer than 4 cues filled.');

            // Maxium Quicks Per Actor / Quick caps
            var actorQuirks = actor.quirks || {physical: [], mental: [], emotional: []};
            var quirkClasses = ['physical', 'mental', 'emotional'];

            for (j = 0; j < quirkClasses.length; j++) {
                var quirkList = actorQuirks[quirkClasses[j]] || [];
                if (quirkList.length > maxQuirks)
                    logWarning (id + ': ' + quirkClasses[j] + ' quirks exceed cap (' + maxQuirks + ').');
            }

            // focus sanity
            var actorFocus = actor.focus || {};
            if (!isNormalized (actorFocus.alloc_pct)) logWarning (id + ': focus.alloc_pct not in [0,1].');
            if (typeof actorFocus.lock !== 'boolean') logWarning (id + ': focus.lock should be boolean.');
        }

        // focus normalization check
        var sum = 0;
        for (i = 0; i < actorIds.length; i++) {
            sum += normalize ((actors[actorIds[i]].focus || {}).alloc_pct || 0);
        }
        if (actorIds.length && Math.abs (sum - 1.0) > 0.01) {
            logWarning ('Focus allocations do not sum to 1.0 (≈' + sum.toFixed (2) + '). Exporter will renormalize.');
        }

        // -------- relations consistency, caps, ranges
        var rel = cfg.relations || {};
        for (i = 0; i < actorIds.length; i++) {
            var from = actorIds[i];
            var edges = rel[from] || {};
            var edgeCount = 0;

            for (key in edges) if (edges.hasOwnProperty (key)) {
                if (!actors[key]) logError ('Relation endpoint missing actor: ' + from + ' -> ' + key);
                var container = edges[key] || {};
                var entries = container.entries || [];
                if (!entries.length) continue;
                edgeCount++;

                for (j = 0; j < entries.length; j++) {
                    var e = entries[j];
                    var fields = ['trust', 'affinity', 'respect', 'rivalry', 'influence'];
                    for (var u = 0; u < fields.length; u++) {
                        var f = fields[u];
                        if (!isNormalized (e[f])) logError ('Relation ' + from + '->' + key + ' entry ' + j + ': ' + f + ' not in [0,1].');
                    }
                }
            }

            if (edgeCount > maxRelantionships) logWarning (from + ': relationships exceed max per actor (' + maxRelantionships + ').');
        }

        // -------- lorebook references
        var lore = (cfg.lorebook && cfg.lorebook.entries) || [];
        for (i = 0; i < lore.length; i++) {
            var lorebook = lore[i];
            if (!lorebook || lorebook.enabled === false) continue;
            if (!lorebook.id) logError ('Lorebook entry missing id at index ' + i + '.');
            if (!lorebook.title) logWarning ('Lorebook entry ' + (lorebook.id || ('#' + i)) + ': missing title.');
            if (lorebook.trigger) {
                var triggerActor = lorebook.trigger.actor;
                if (triggerActor && !actors[triggerActor]) logError ('Lorebook trigger references unknown actor: ' + triggerActor);
                var triggerEmotion = lorebook.trigger.emotion;
                if (triggerEmotion && ['joy', 'sadness', 'anger', 'fear', 'trust', 'disgust', 'anticipation', 'surprise'].indexOf (triggerEmotion) === -1) {
                    logWarning ('Lorebook trigger emotion "' + triggerEmotion + '" is not in cues legend.');
                }
            }
        }

        // -------- project/meta
        if (!cfg.project || !cfg.project.id) logError ('Project.id is required.');
        if (cfg.export_meta) {
            if (!cfg.export_meta.date) logWarning ('export_meta.date missing.');
            if (!cfg.export_meta.hash) logWarning ('export_meta.hash missing.');
        }

        // metrics
        output.metrics.focus_sum = +sum.toFixed (4);
        return output;
    };

    // expose
    root.MythOSAuditor = Auditor;
}) (window);
