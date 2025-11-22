(function(root){
  'use strict';

  var api = {}, lastRoot=null;

  // ---- store helpers ----
  function getStore(){ return (root.CFGStore && CFGStore.get) ? CFGStore.get() : { actors:{}, params:{} }; }
  function patch(mut){ if (root.CFGStore && CFGStore.patch) CFGStore.patch(mut); }

  // ---- local state ----
  var Local = { total: 240, actors: [], bias_active: 1.15 }; // {id,name,value,locked}

  // ---- migration / read helpers (handles old & new keys) ----
  function readCaps(){
    var cfg = getStore();
    var p   = cfg.params || {};
    var caps = p.token_caps || {};
    var alloc = p.token_allocation || {};

    // canonical pool (prefer new)
    var pool = (caps.pool_total!=null ? +caps.pool_total : null);
    if (pool==null && alloc.total_limit!=null) pool = +alloc.total_limit;

    // chars per token (optional label usage)
    var cpt  = (caps.chars_per_token!=null ? +caps.chars_per_token : null);

    return {
      pool_total: (pool!=null ? pool : 240),
      chars_per_token: (cpt!=null ? cpt : 4),
      perActor: (caps.actors || {})
    };
  }

  // one-time self-heal: if legacy exists and new is empty, copy forward
  function migrateToCapsIfNeeded(){
    var cfg = getStore();
    var p   = cfg.params || {};
    var caps = p.token_caps || {};
    var alloc = p.token_allocation || {};
    var need = (caps == null) || (caps.pool_total == null && alloc.total_limit != null);

    if (!need) return;

    patch(function(c){
      c.params = c.params || {};
      c.params.token_caps = c.params.token_caps || {};
      // migrate pool_total
      if (c.params.token_caps.pool_total == null && c.params.token_allocation && c.params.token_allocation.total_limit != null){
        c.params.token_caps.pool_total = +c.params.token_allocation.total_limit;
      }
      // migrate per-actor map if you ever stored there (back-compat: skip if not present)
      if (!c.params.token_caps.actors && c.params.token_allocation && c.params.token_allocation.actors){
        c.params.token_caps.actors = JSON.parse(JSON.stringify(c.params.token_allocation.actors));
      }
      return c;
    });
  }

  // ---- build UI ----
  function buildShell(el){
    el.innerHTML =
      '<div class="focus-wrap">'+
        '<div class="focus-left">'+
          '<div class="focus-toolbar">'+
            '<label>Total Tokens</label>'+
            '<input id="fa-total" type="number" min="0" step="10">'+
            '<button id="fa-equalize" class="btn-mini" type="button">Equalize</button>'+
            '<label class="chk"><input id="fa-bias-active" type="checkbox"> Bias active</label>'+
          '</div>'+
          '<div class="focus-rows"></div>'+
        '</div>'+
        '<div class="focus-right">'+
          '<div id="focus-radar-mount"></div>'+
        '</div>'+
      '</div>';
  }

  // ---- model <-> CFGStore (canonical: params.token_caps.*) ----
  function readFromCFG(){
    var cfg = getStore();
    var caps = readCaps(); // back-compat aware

    var total = +caps.pool_total || 0;
    var out = [];
    var A = (cfg.actors||{});
    var keys = [];
    var k;
    for (k in A) if (A.hasOwnProperty(k)) keys.push(k);
    var fallbackEach = keys.length ? Math.floor(total/keys.length) : 0;

    var per = caps.perActor || {};
    for (k in A){
      if (!A.hasOwnProperty(k)) continue;
      var a = A[k];
      var name = (a.profile && (a.profile.preferredName||a.profile.fullName)) || k;
      var slot = per[k] || {};
      out.push({
        id: k,
        name: name,
        value: (slot.value|0) || fallbackEach,
        locked: !!slot.locked
      });
    }

    Local.total = total|0;
    Local.actors = out;
  }

  function writeToCFG(){
    patch(function(cfg){
      cfg.params = cfg.params || {};
      cfg.params.token_caps = cfg.params.token_caps || {};
      cfg.params.token_caps.pool_total = Local.total|0;

      var per={}, i;
      for (i=0;i<Local.actors.length;i++){
        per[Local.actors[i].id] = { value: Local.actors[i].value|0, locked: !!Local.actors[i].locked };
      }
      cfg.params.token_caps.actors = per;
      return cfg;
    });
  }

  // ---- UI render helpers ----
  function buildRowsHTML(){
    var i, html='';
    for (i=0;i<Local.actors.length;i++){
      var a=Local.actors[i];
      var pct = (Local.total? Math.round((a.value/Local.total)*100):0);
      html += ''+
        '<div class="focus-row" data-id="'+a.id+'">'+
          '<div class="r-hdr">'+
            '<span class="r-name" title="'+a.id+'">'+a.name+'</span>'+
            '<label class="r-lock"><input type="checkbox" class="fa-lock" '+(a.locked?'checked':'')+'> lock</label>'+
          '</div>'+
          '<div class="r-mid">'+
            '<span class="r-pct">'+pct+'%</span>'+
            '<input class="fa-slider" type="range" min="0" max="100" value="'+pct+'">'+
            '<input class="fa-num" type="number" min="0" step="10" value="'+(a.value|0)+'">'+
          '</div>'+
        '</div>';
    }
    return html || '<div class="muted">No actors defined yet.</div>';
  }

  // ---- radar glue ----
  function mountRadar(){
    var el = lastRoot.querySelector('#focus-radar-mount');
    var list = toRadarActors();
    if (root.FocusRadar && FocusRadar.mount){
      FocusRadar.mount(el, { width: 560, height: 340, rings: 6, minRadiusRatio: 0.12, actors: list });
    }
  }
  function updateRadar(){
    var el = lastRoot.querySelector('#focus-radar-mount');
    if (el && el.__focusRadar && root.FocusRadar && FocusRadar.update){
      FocusRadar.update(el, toRadarActors());
    }
  }
  function toRadarActors(){
    var i, out=[];
    for(i=0;i<Local.actors.length;i++){
      var a=Local.actors[i];
      var pct = (Local.total? (a.value/Local.total) : 0);
      out.push({ id:a.id, name:a.name, weight:pct });
    }
    return out;
  }

  // ---- wiring ----
  function render(){
    var rows = lastRoot.querySelector('.focus-rows');
    rows.innerHTML = buildRowsHTML();

    var totalInput = lastRoot.querySelector('#fa-total');
    totalInput.value = Local.total|0;

    // Total tokens -> write new path, rescale values proportionally
    totalInput.oninput = function(){
      var v = parseInt(totalInput.value, 10);
      if (isNaN(v) || v<0) v=0;
      var oldTotal = Local.total|0;
      Local.total = v|0;

      var i, sum=0; for(i=0;i<Local.actors.length;i++) sum+=(Local.actors[i].value|0);
      if (sum>0){
        for(i=0;i<Local.actors.length;i++){
          Local.actors[i].value = Math.round((Local.actors[i].value|0)/sum * Local.total);
        }
      } else if (oldTotal>0 && Local.actors.length){
        var each = Math.floor(Local.total/Local.actors.length);
        for(i=0;i<Local.actors.length;i++) Local.actors[i].value = each;
      }

      writeToCFG();
      render();
      updateRadar();
    };

    // Equalize
    var eq = lastRoot.querySelector('#fa-equalize');
    if (eq) eq.onclick = function(){
      if (root.FocusAlloc && FocusAlloc.equalize){
        FocusAlloc.equalize(Local);
        writeToCFG();
        render();
        updateRadar();
      }
    };

    // One-shot "bias active"
    var bias = lastRoot.querySelector('#fa-bias-active');
    if (bias){
      bias.checked = false;
      bias.onchange = function(){
        if (!bias.checked) return;
        var activeId = (root.CMPanel_speech && CMPanel_speech.getActiveId && CMPanel_speech.getActiveId()) || (Local.actors[0] && Local.actors[0].id);
        if (root.FocusAlloc && FocusAlloc.biasActive){
          FocusAlloc.biasActive(Local, activeId, Local.bias_active||1.15);
        }
        bias.checked = false;
        writeToCFG(); render(); updateRadar();
      };
    }

    // per-row events
    var rowsEl = lastRoot.querySelectorAll('.focus-row');

    function __syncRowDom(rowEl, aObj){
      if (!rowEl || !aObj) return;
      var sl = rowEl.querySelector('.fa-slider');
      var nm = rowEl.querySelector('.fa-num');
      var pc = rowEl.querySelector('.r-pct');
      var p  = (Local.total? Math.round((aObj.value/Local.total)*100) : 0);
      if (sl) sl.value = p;
      if (nm) nm.value = aObj.value|0;
      if (pc) pc.textContent = p + '%';
    }
    function __syncOthersExcept(exId){
      var j, r, id2, a2, rowsNow = lastRoot.querySelectorAll('.focus-row');
      for (j=0;j<rowsNow.length;j++){
        r = rowsNow[j]; id2 = r.getAttribute('data-id');
        if (id2 === exId) continue;
        a2 = findLocal(id2);
        __syncRowDom(r, a2);
      }
    }

    var i;
    for (i=0;i<rowsEl.length;i++){
      (function(row){
        var id = row.getAttribute('data-id');
        var a = findLocal(id);
        var lock = row.querySelector('.fa-lock');
        var slider = row.querySelector('.fa-slider');
        var num = row.querySelector('.fa-num');
        var pctEl = row.querySelector('.r-pct');

        function applyDisabled(){ var dis = !!a.locked; if (slider) slider.disabled = dis; if (num) num.disabled = dis; }
        applyDisabled();

        if (lock){
          lock.onchange = function(){
            a.locked = !!lock.checked;
            applyDisabled();
            writeToCFG();
          };
        }

        if (slider){
          slider.oninput = function(){
            if (a.locked) return;
            var pct = (parseInt(slider.value,10) || 0)/100;
            if (root.FocusAlloc && FocusAlloc.onSliderPercent){
              FocusAlloc.onSliderPercent(Local, id, pct);
            } else {
              var newVal = Math.round(Local.total * pct);
              a.value = Math.max(0, newVal|0);
            }
            var aNow = findLocal(id);
            if (aNow){ num.value = aNow.value|0; pctEl.textContent = (Local.total? Math.round((aNow.value/Local.total)*100):0) + '%'; }
            __syncOthersExcept(id);
            writeToCFG();
            updateRadar();
          };
        }

        if (num){
          num.oninput = function(){
            if (a.locked) return;
            var val = parseInt(num.value,10); if (isNaN(val)||val<0) val=0;
            if (root.FocusAlloc && FocusAlloc.setValueAndRebalance){
              FocusAlloc.setValueAndRebalance(Local, id, val);
            } else {
              a.value = val|0;
            }
            var aNow = findLocal(id);
            if (aNow){ pctEl.textContent = (Local.total? Math.round((aNow.value/Local.total)*100):0) + '%'; slider.value = (Local.total? Math.round((aNow.value/Local.total)*100):0); }
            __syncOthersExcept(id);
            writeToCFG();
            updateRadar();
          };
        }
      })(rowsEl[i]);
    }
  }

  function findLocal(id){
    var i; for(i=0;i<Local.actors.length;i++) if (Local.actors[i].id===id) return Local.actors[i];
    return null;
  }

  // ---- live sync (listen to both old and new paths) ----
  function subscribeCaps(){
    if (!(root.CFGStore && CFGStore.subscribe)) return;
    CFGStore.subscribe(function(){
      var s = getStore();
      var tc  = (s.params && s.params.token_caps) || {};
      var old = (s.params && s.params.token_allocation) || {};
      return JSON.stringify({
        actors: Object.keys(s.actors||{}),
        pool:   (tc.pool_total|0),
        pool_old: (old.total_limit|0),
        cpt:    (tc.chars_per_token|0)
      });
    }, function(){
      if (!lastRoot) return;
      var beforeLen = Local.actors.length;
      var beforeTotal = Local.total|0;

      readFromCFG();

      if (Local.actors.length !== beforeLen || Local.total !== beforeTotal){
        render();
      }
      updateRadar();
    });
  }

  // ---- lifecycle ----
  api.mount = function(el){
    if (!el) return;   
    lastRoot = el;

    // self-heal legacy -> new
    migrateToCapsIfNeeded();

    buildShell(el);
    readFromCFG();
    render();
    mountRadar();
    subscribeCaps();
  };

  api.unmount = function(){
    if (lastRoot) lastRoot.innerHTML = '';
    lastRoot = null;
  };

  root.CMPanel_focus = api;

})(window);
