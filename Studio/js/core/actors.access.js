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
      var A = cfg.actors || [];
      var out = [], i, k, a, id, nm;

      if (typeof A.length === 'number') {
        // ARRAY shape
        for (i=0;i<A.length;i++){
          a = A[i]; if (!a) continue;
          id = a.id || ('actor_'+i);
          nm = AA.nameOf(a, id);
          out.push({ id:id, ref:a, name:nm });
        }
      } else {
        // MAP shape
        for (k in A){
          a = A[k]; if (!a) continue;
          id = a.id || k;
          nm = AA.nameOf(a, id);
          out.push({ id:id, ref:a, name:nm });
        }
      }

      out.sort(function(x,y){ return String(x.name).toLowerCase().localeCompare(String(y.name).toLowerCase()); });
      return out;
    },

    // IDs only (sorted by display name)
    ids: function(){
      var E = AA.entries(), i, out=[];
      for (i=0;i<E.length;i++) out.push(E[i].id);
      return out;
    },

    // Fast lookup by id → actor object or null (works on both shapes)
    byId: function(id){
      var cfg = AA.snapshot();
      var A = cfg.actors || [];
      var i;

      if (!id) return null;

      if (typeof A.length === 'number') {
        // ARRAY
        for (i=0;i<A.length;i++){
          if (!A[i]) continue;
          if (A[i].id === id) return A[i];
        }
        return null;
      }
      // MAP
      return A[id] || null;
    },

    // Display-safe name from object or fallback id
    nameOf: function(actorObj, fallbackId){
      var a = actorObj || {};
      var p = a.profile || {};
      var nm = p.preferredName || p.fullName || a.name || '';
      if (!nm) nm = fallbackId || a.id || '(unnamed)';
      return nm;
    },

    // Convenience: label from id (reads & resolves)
    label: function(id){
      var a = AA.byId(id);
      return AA.nameOf(a, id);
    },

    // Utility: produce [{id,name,weight}] from an accessor function
    toWeightedList: function(getWeightFn){
      var E = AA.entries(), i, out=[];
      for (i=0;i<E.length;i++){
        out.push({ id:E[i].id, name:E[i].name, weight: (getWeightFn ? getWeightFn(E[i].id, E[i].ref) : 0) });
      }
      return out;
    }
  };

  // Optional: notify listeners when actors change (thin wrapper over CFGStore.subscribe)
  AA.onChange = function(cb){
    if (root.CFGStore && CFGStore.subscribe){
      CFGStore.subscribe(function(){ return (new Date()).getTime(); }, function(){ cb && cb(); });
    }
  };

  root.ActorAccess = AA;

})(window);
