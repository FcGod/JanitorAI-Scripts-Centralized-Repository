(function(root){
  'use strict';

  // MythOS Auditor v2 — ES5, no deps
  // export: window.MythOSAuditor.validate(cfg)

  var Auditor = {};

  Auditor.validate = function(cfg){
    var out = { errors: [], warnings: [], metrics: {} };

    if (!cfg || typeof cfg !== 'object') {
      out.errors.push('CFG missing or not an object.');
      return out;
    }

    // -------- helpers
    function isNum(x){ return typeof x === 'number' && isFinite(x); }
    function in01(x){ return isNum(x) && x >= 0 && x <= 1; }
    function clamp01(x){ if (!isNum(x)) return 0; if (x<0) return 0; if (x>1) return 1; return x; }
    function words(s){ if (!s) return 0; return String(s).trim().split(/\s+/).filter(Boolean).length; }
    function tokenEstimate(s){ if (!s) return 0; return Math.ceil(words(s) * 0.75); } // crude, conservative
    function pushE(msg){ out.errors.push(msg); }
    function pushW(msg){ out.warnings.push(msg); }

    var params = (cfg.params || {});
    var caps = (params.token_caps || {});
    var maxActors = params.max_actors_present || 6;
    var quirkCap = params.max_quirks_per_actor || 5;
    var relCap = ((cfg.engine && cfg.engine.constraints && cfg.engine.constraints.counts && cfg.engine.constraints.counts.relationships_per_actor_max) || 6);
    var snapshotMax = caps.snapshot_max_tokens || 18;
    var cueWordMax = caps.cue_word_max || 6;

    // -------- required top-level
    var requiredTop = ['cfg_version','project','params','actors','relations','lorebook','templates','engine','export_meta'];
    for (var i=0;i<requiredTop.length;i++){
      if (!cfg.hasOwnProperty(requiredTop[i])) pushE('Missing top-level key: '+requiredTop[i]);
    }
    if (cfg.cfg_version !== 'mythos.v2') pushE('cfg_version must be "mythos.v2".');

    // -------- actors
    var actors = cfg.actors || {};
    var actorIds = [];
    for (var k in actors) if (actors.hasOwnProperty(k)) actorIds.push(k);
    out.metrics.actor_count = actorIds.length;

    if (actorIds.length === 0) pushW('No actors defined.');
    if (actorIds.length > 6) pushW('Actors exceed recommended max (6).');

    for (i=0;i<actorIds.length;i++){
      var id = actorIds[i];
      var a = actors[id] || {};
      // basic requireds
      var prof = a.profile || {};
      var nameOk = !!(prof.preferredName || prof.fullName);
      if (!nameOk) pushE(id+': Missing name (preferred or full).');

      // OCEAN
      var oc = (a.personality && a.personality.ocean) || {};
      var ocKeys = ['O','C','E','A','N'];
      for (var j=0;j<ocKeys.length;j++){
        var v = oc[ocKeys[j]];
        if (!in01(v)) pushE(id+': OCEAN.'+ocKeys[j]+' must be in [0,1].');
      }

      // snapshot
      var snap = (a.summary && a.summary.line) || '';
      if (!snap) pushW(id+': No snapshot line.');
      if (tokenEstimate(snap) > snapshotMax) pushW(id+': Snapshot may exceed token cap ('+snapshotMax+').');

      // cues (require 8 keys)
      var cues = a.cues || {};
      var cueKeys = ['joy','sadness','anger','fear','trust','disgust','anticipation','surprise'];
      var nonEmpty = 0;
      for (j=0;j<cueKeys.length;j++){
        var txt = cues[cueKeys[j]];
        if (txt && String(txt).trim()) {
          nonEmpty++;
          if (words(txt) > cueWordMax) pushW(id+': Cue "'+cueKeys[j]+'" exceeds '+cueWordMax+' words.');
        }
      }
      if (nonEmpty < 4) pushW(id+': Fewer than 4 cues filled.');

      // quirks caps
      var q = a.quirks || { physical:[], mental:[], emotional:[] };
      var classes = ['physical','mental','emotional'];
      for (j=0;j<classes.length;j++){
        var arr = q[classes[j]] || [];
        if (arr.length > quirkCap) pushW(id+': '+classes[j]+' quirks exceed cap ('+quirkCap+').');
      }

      // focus sanity
      var foc = a.focus || {};
      if (!in01(foc.alloc_pct)) pushW(id+': focus.alloc_pct not in [0,1].');
      if (typeof foc.lock !== 'boolean') pushW(id+': focus.lock should be boolean.');
    }

    // focus normalization check
    var sum = 0;
    for (i=0;i<actorIds.length;i++){
      sum += clamp01((actors[actorIds[i]].focus||{}).alloc_pct || 0);
    }
    if (actorIds.length && Math.abs(sum - 1.0) > 0.01) {
      pushW('Focus allocations do not sum to 1.0 (≈'+sum.toFixed(2)+'). Exporter will renormalize.');
    }

    // -------- relations consistency, caps, ranges
    var rel = cfg.relations || {};
    for (i=0;i<actorIds.length;i++){
      var from = actorIds[i];
      var edges = rel[from] || {};
      var edgeCount = 0;

      for (k in edges) if (edges.hasOwnProperty(k)) {
        if (!actors[k]) pushE('Relation endpoint missing actor: '+from+' -> '+k);
        var container = edges[k] || {};
        var entries = container.entries || [];
        if (!entries.length) continue;
        edgeCount++;

        for (j=0;j<entries.length;j++){
          var e = entries[j];
          var fields = ['trust','affinity','respect','rivalry','influence'];
          for (var u=0;u<fields.length;u++){
            var f = fields[u];
            if (!in01(e[f])) pushE('Relation '+from+'->'+k+' entry '+j+': '+f+' not in [0,1].');
          }
        }
      }

      if (edgeCount > relCap) pushW(from+': relationships exceed max per actor ('+relCap+').');
    }

    // -------- lorebook references
    var lore = (cfg.lorebook && cfg.lorebook.entries) || [];
    for (i=0;i<lore.length;i++){
      var lb = lore[i];
      if (!lb || lb.enabled === false) continue;
      if (!lb.id) pushE('Lorebook entry missing id at index '+i+'.');
      if (!lb.title) pushW('Lorebook entry '+(lb.id||('#'+i))+': missing title.');
      if (lb.trigger){
        var ta = lb.trigger.actor;
        if (ta && !actors[ta]) pushE('Lorebook trigger references unknown actor: '+ta);
        var em = lb.trigger.emotion;
        if (em && ['joy','sadness','anger','fear','trust','disgust','anticipation','surprise'].indexOf(em) === -1){
          pushW('Lorebook trigger emotion "'+em+'" is not in cues legend.');
        }
      }
    }

    // -------- project/meta
    if (!cfg.project || !cfg.project.id) pushE('Project.id is required.');
    if (cfg.export_meta){
      if (!cfg.export_meta.date) pushW('export_meta.date missing.');
      if (!cfg.export_meta.hash) pushW('export_meta.hash missing.');
    }

    // metrics
    out.metrics.focus_sum = +sum.toFixed(4);
    return out;
  };

  // expose
  root.MythOSAuditor = Auditor;
})(window);
