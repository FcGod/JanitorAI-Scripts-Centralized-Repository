(function(root){
  'use strict';

  var Alloc = {};

  // ----- helpers -----
  function sumValues(list){
    var s=0,i; for(i=0;i<list.length;i++) s += Math.max(0, list[i].value|0);
    return s;
  }
  function unlockedOthers(list, skipId){
    var out=[], i, a;
    for(i=0;i<list.length;i++){ a=list[i]; if (!a.locked && a.id!==skipId) out.push(a); }
    return out;
  }
  function clamp01(x){ return x<0?0:(x>1?1:x); }

  // ----- core -----
  // state = { total, actors:[{id,name,value,locked}] }
  Alloc.setValueAndRebalance = function(state, actorId, newValue){
    var total = state.total|0, A = state.actors, i, target=null, oldValue=0;
    for (i=0;i<A.length;i++){ if (A[i].id===actorId){ target=A[i]; break; } }
    if (!target) return;
    oldValue = target.value|0;
    newValue = Math.max(0, Math.min(total, newValue|0));
    target.value = newValue;

    var sum = sumValues(A);
    if (sum === total) return;

    var delta = sum - total; // + => remove from others; - => add to others
    var others = unlockedOthers(A, actorId);
    if (!others.length){
      // no one to rebalance; clamp target
      target.value = Math.max(0, Math.min(total, oldValue + (total - (sum - newValue))));
      return;
    }

    var pool=0; for (i=0;i<others.length;i++) pool += Math.max(0, others[i].value|0);

    if (delta > 0){
      // remove 'delta' from others
      if (pool === 0){
        target.value = Math.max(0, target.value - delta);
      } else {
        var removed=0;
        for (i=0;i<others.length;i++){
          var share = Math.floor(delta * ((others[i].value|0)/pool));
          var take  = Math.min(others[i].value|0, share);
          others[i].value -= take; removed += take;
        }
        var remain = delta - removed, idx=0, guard=10000;
        while (remain>0 && guard--){
          if ((others[idx].value|0) > 0){ others[idx].value -= 1; remain--; }
          idx = (idx+1) % others.length;
        }
      }
    } else if (delta < 0){
      var need = -delta, added=0;
      if (pool === 0){
        var base = Math.floor(need / others.length), j;
        for (j=0;j<others.length;j++){ others[j].value += base; added += base; }
      } else {
        for (i=0;i<others.length;i++){
          var give = Math.floor(need * ((others[i].value|0)/pool));
          others[i].value += give; added += give;
        }
      }
      var remain2 = need - added, k=0, guard2=10000;
      while (remain2>0 && guard2--){ others[k].value += 1; remain2--; k=(k+1)%others.length; }
    }

    // drift fix to hit exact total
    var s2 = sumValues(A), drift=s2-total, L = unlockedOthers(A, null), t=0, guard3=10000;
    if (!L.length) L=[target];
    while (drift!==0 && guard3--){
      if (drift>0 && (L[t].value|0)>0){ L[t].value-=1; drift--; }
      else if (drift<0){ L[t].value+=1; drift++; }
      t=(t+1)%L.length;
    }
  };

  Alloc.onSliderPercent = function(state, actorId, pct){
    pct = clamp01(pct);
    var newVal = Math.round((state.total|0) * pct);
    Alloc.setValueAndRebalance(state, actorId, newVal);
  };

  Alloc.equalize = function(state){
    var list = state.actors, unlocked = [], i;
    for(i=0;i<list.length;i++) if (!list[i].locked) unlocked.push(list[i]);
    if (!unlocked.length) return;
    var base = Math.floor((state.total|0) / list.length);
    for(i=0;i<list.length;i++) if (!list[i].locked) list[i].value = base;
    // distribute remainder to unlocked round-robin
    var used = base*list.length, rem = (state.total|0)-used, idx=0, guard=10000;
    while (rem>0 && guard--){
      if (!list[idx].locked){ list[idx].value+=1; rem--; }
      idx = (idx+1)%list.length;
    }
  };

  Alloc.biasActive = function(state, activeId, bias){
    var i, A=state.actors, target=null;
    for(i=0;i<A.length;i++) if (A[i].id===activeId){ target=A[i]; break; }
    if (!target) return;
    var boosted = Math.round((target.value|0) * (bias || 1.15));
    Alloc.setValueAndRebalance(state, activeId, boosted);
  };

  Alloc.toPercentModel = function(state){
    var i, out=[], total=state.total|0;
    for (i=0;i<state.actors.length;i++){
      var a = state.actors[i];
      out.push({ id:a.id, name:a.name, pct: total? (a.value/total) : 0, value:a.value, locked:!!a.locked });
    }
    return out;
  };

  root.FocusAlloc = Alloc;

})(window);
