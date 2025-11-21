/**
 * ==============================================================
 * Module: Schema Normalizer (CFG)
 * File:   /js/core/schema.normalize.js
 * Namespace: window.normalizeCFG
 * Version: 1.0.0 (Studio v6)
 * Layer: Studio / Schema
 * --------------------------------------------------------------
 * Purpose:
 *   Normalize author CFG objects into a consistent, engine-ready
 *   structure (non-mutating return; fills defaults, mirrors
 *   world.validLocations ↔ locations[]).
 *
 * Depends on:
 *   None
 *
 * Public API:
 *   - normalizeCFG(cfg) -> cfg        // returns a new/normalized object
 *
 * Design Notes:
 *   - ES5-only; minimal policy—does not validate semantics.
 *   - Creates arrays/objects as needed; deduplicates IDs.
 *
 * Side Effects:
 *   None (pure transform).
 *
 * Errors & Guards:
 *   Defensive against null/undefined; safe on partial CFGs.
 *
 * Performance:
 *   O(|locations|) with tiny constant factors.
 *
 * Testing:
 *   var c = normalizeCFG({ world:{validLocations:['L1']}}); console.assert(c.locations.length===1);
 *
 * Change Log:
 *   - 1.0.0 2025-10-31: Initial headerization.
 * ==============================================================
 */


/* /js/core/schema.normalize.js */
(function(root){
'use strict';
// --- Anatomy & Body Cues normalizers (ES5) ---
function ensureAnatomyDefaults(actor){
  actor.appearance = actor.appearance || {};
  var actorAppearance = actor.appearance;

  // Only create appendages container if *something* is present later
  if (!actorAppearance.appendages) actorAppearance.appendages = {}; // lightweight, empty object is fine

  var actorAppendages = actorAppearance.appendages;
  // Create sub-objects only if toggled by UI later; start minimal.
  if (actorAppendages.ears == null && actorAppendages.tail == null && actorAppendages.wings == null && actorAppendages.horns == null){
    // stay empty; "empty ⇒ absent" semantics
  }

  // Markings/texture are optional; create lazily if author uses them
  if (!actorAppearance.markings) actorAppearance.markings = [];          // ok to be empty list
  if (!actorAppearance.texture)  actorAppearance.texture  = { fur:false, scales:false, feathers:false, notes:"" };
}

function ensureBodyCuesDefaults(actor, cueKeys){
  var i, key;
  actor.cues_body = actor.cues_body || {};
  for (i=0;i<cueKeys.length;i++){
    key = cueKeys[i];
    if (actor.cues_body[key] == null) actor.cues_body[key] = ""; // empty string means "no authored body cue"
  }
}

// Call these from your existing normalize pass after actors load:
//   for each actor: ensureAnatomyDefaults(actor); ensureBodyCuesDefaults(actor, SpeechCues.keys)

function uniq(arr) {
    var m={},
        o=[],
        i;

    for(i=0;i<(arr||[]).length;i++) {
        var v=arr[i];
        if(v && !m[v]){
            m[v]=1; o.push(v);
        }
    }
    return o;
}

function normalize(cfg) {
    cfg = cfg || {};
    cfg.version = cfg.version || 1;
    cfg.world = cfg.world || {
        id:'world',
        name:'World',
        validLocations:[],
        allowOutside:false
    };
    cfg.features = cfg.features || {
        debug:false,
        axisMode:'VADF'
    };
    cfg.emotions = cfg.emotions || {
        schema:['V','A','D','F'],
        caps:{min:-1,max:1},
        decayPerTurn:{
            V:0.02,
            A:0.02,
            D:0.02,
            F:0.02
        }
    };
    cfg.locations = cfg.locations || [];
    cfg.actors = cfg.actors || [];
    cfg.studio = cfg.studio || {};
    cfg.studio.axisPresets = cfg.studio.axisPresets || {};

    if((!cfg.locations || !cfg.locations.length) && cfg.world && cfg.world.validLocations && cfg.world.validLocations.length) {
        var i;
        cfg.locations=[];
        for(i=0;i<cfg.world.validLocations.length;i++){
            var id=cfg.world.validLocations[i];
            if(id){
                cfg.locations.push({ id:id, name:id });
            }
        }
    }
    var ids=[], j;
    for(j=0;j<cfg.locations.length;j++){
        var L=cfg.locations[j];
        if(L && L.id){ ids.push(L.id); }
    }
    cfg.world.validLocations = uniq(ids);
    return cfg;
}
root.normalizeCFG = normalize;
})(window);