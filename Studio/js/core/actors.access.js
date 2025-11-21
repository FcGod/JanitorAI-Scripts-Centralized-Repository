(function(root){
  'use strict';

  // Public API
  var AA = {
    // Reads the current CFGStore snapshot (no mutation)
    snapshot: function(){
      return (root.CFGStore && CFGStore.get) ? CFGStore.get() : { actors:[] };
    },

    // Returns stable array of { id, ref } for iteration (order: name ASC, fallback id)
    entries: function(){
      var cfg = AA.snapshot();
      var actorsData = cfg.actors || [];
      //Expected output: index, key, actor, actorID, actorName
      var output = [], i, key, actor, actorId, actorName;

      if (typeof actorsData.length === 'number') {
        // ARRAY shape
        for (i=0;i<actorsData.length;i++) {
          actor = actorsData[i];
          if (!actor) continue;

          actorId = actor.id || ('actor_'+i);
          actorName = AA.nameOf(actor, actorId);
          output.push({ id:actorId, ref:actor, name:actorName });
        }
      } else {
        // MAP shape
        for (key in actorsData){
          actor = actorsData[key]; if (!actor) continue;
          actorId = actor.id || key;
          actorName = AA.nameOf(actor, actorId);
          output.push({ id:actorId, ref:actor, name:actorName });
        }
      }

      output.sort(function(x,y){ return String(x.name).toLowerCase().localeCompare(String(y.name).toLowerCase()); });
      return output;
    },

    // IDs only (sorted by display name)
    ids: function(){
      var entryData = AA.entries(), i, output=[];
      for (i=0;i<entryData.length;i++) output.push(entryData[i].id);
      return output;
    },

    // Fast lookup by id → actor object or null (works on both shapes)
    byId: function(id){
      var cfg = AA.snapshot();
      var actorsData = cfg.actors || [];
      var i;

      if (!id) return null;

      if (typeof actorsData.length === 'number') {
        // ARRAY
        for (i=0;i<actorsData.length;i++){
          if (!actorsData[i]) continue;
          if (actorsData[i].id === id) return actorsData[i];
        }
        return null;
      }
      // MAP
      return actorsData[id] || null;
    },

    // Display-safe name from object or fallback id
    nameOf: function(actorObj, fallbackId){
      var actor = actorObj || {};
      var actorProfile = actor.profile || {};
      var actorName = actorProfile.preferredName || actorProfile.fullName || actor.name || '';
      if (!actorName) actorName = fallbackId || actor.id || '(unnamed)';
      return actorName;
    },

    // Convenience: label from id (reads & resolves)
    label: function(id){
      var a = AA.byId(id);
      return AA.nameOf(a, id);
    },

    // Utility: produce [{id,name,weight}] from an accessor function
    toWeightedList: function(getWeightFn) {
      var entriesData = AA.entries(), i, output=[];
      for (i=0;i<entriesData.length;i++) {
        output.push({
            id:entriesData[i].id,
            name:entriesData[i].name,
            weight: (getWeightFn ? getWeightFn(entriesData[i].id, entriesData[i].ref) : 0)
        });
      }
      return output;
    }
  };

  // Optional: notify listeners when actors change (thin wrapper over CFGStore.subscribe)
    AA.onChange = function(callback) {
        if (root.CFGStore && CFGStore.subscribe) {
            CFGStore.subscribe(
                function(){ return (new Date()).getTime(); },
                function(){ callback && callback(); }
            );
        }
    };


    root.ActorAccess = AA;

})(window);
