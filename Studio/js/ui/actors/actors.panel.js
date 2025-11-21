(function(root){
  'use strict';
  var api = {}, lastRoot = null, activeId = null;

  function card(title, bodyHtml){
    return ''+
      '<div class="card" style="padding:12px; margin-bottom:12px;">'+
      (title ? '<h3 style="margin:0 0 8px 0;">'+title+'</h3>' : '')+
      bodyHtml+
      '</div>';
  }
  function row2(aHtml,bHtml){
    return ''+
      '<div class="row" style="display:flex; gap:10px; align-items:center; margin-bottom:8px;">'+
      '<div style="flex:1;">'+aHtml+'</div>'+
      '<div style="flex:1;">'+bHtml+'</div>'+
      '</div>';
  }
  function inputL(id,label,type,placeholder){
    return ''+
      '<label for="'+id+'" style="display:block; font-weight:600;">'+label+'</label>'+
      '<input id="'+id+'" type="'+type+'" placeholder="'+(placeholder||'')+'" style="width:100%;">';
  }
  function selectL(id,label,options){
    var html = '<label for="'+id+'" style="display:block; font-weight:600;">'+label+'</label>';
    html += '<select id="'+id+'" style="width:100%;">';
    for (var i=0;i<options.length;i++){
      var v = options[i];
      var val = (typeof v==='string')? v : v.value;
      var txt = (typeof v==='string')? v : v.label;
      html += '<option value="'+val+'">'+txt+'</option>';
    }
    html += '</select>';
    return html;
  }
  function sliderL(id,label,min,max,step){
    return ''+
      '<label for="'+id+'" style="display:block; font-weight:600;">'+label+'</label>'+
      '<input id="'+id+'" type="range" min="'+min+'" max="'+max+'" step="'+step+'" style="width:100%;">'+
      '<div id="'+id+'-val" class="muted" style="font-size:12px; margin-top:4px;"></div>';
  }

  // --- Appendages mini-helpers (compact grid) ---
  function apRow(label, innerHtml){
    return ''+
      '<div class="apg-row" style="display:flex; align-items:center; justify-content:space-between; gap:8px; margin:6px 0;">'+
        '<label class="muted" style="font-size:12px;">'+label+'</label>'+
        '<div style="flex:1; max-width:62%;">'+innerHtml+'</div>'+
      '</div>';
  }
  function apCheck(id, label){
    return ''+
      '<label class="row-toggle" style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">'+
        '<input id="'+id+'" type="checkbox"> <span style="font-weight:600;">'+label+'</span>'+
      '</label>';
  }
  function apCol(title, bodyHtml){
    return ''+
      '<div class="apg-col" style="border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:10px;">'+
        '<div class="apg-head" style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">'+
          '<h4 style="margin:0; font-size:14px;">'+title+'</h4>'+
        '</div>'+
        bodyHtml+
      '</div>';
  }

  function getStore(){ return (root.CFGStore && root.CFGStore.get) ? root.CFGStore.get() : { actors:{}, meta:{} }; }
  function patch(fn){ if (root.CFGStore && root.CFGStore.patch) root.CFGStore.patch(fn); }
  function ensureActor(id){
    patch(function(cfg){
      cfg.actors = cfg.actors || {};
      if (!cfg.actors[id]){
        cfg.actors[id] = {
          id: id,
          profile:    { fullName:'', preferredName:'', role:'', age:'', gender:'', pronouns:'' },
          appearance: { hair:'', eyes:'', height_display:'', height_cm:0, build:'Average', postureCue:'' },
          personality:{ ocean:{O:0.5,C:0.5,E:0.5,A:0.5,N:0.5}, temperament:'Calm' }
        };
      }
      return cfg; // ← REQUIRED
    });
  }

  function buildUI(){
    var sidebar = ''+
      '<div id="act-list" class="list" style="display:flex; flex-direction:column; gap:6px;"></div>'+
      '<div style="margin-top:8px;"><button id="act-add" class="btn primary">Add Actor</button></div>';

    var heightBlock = ''+
      '<div>'+selectL('a-height','Height',[])+'<div style="margin-top:6px; font-size:12px;">'+
      '<label style="margin-right:12px;"><input type="radio" name="units" id="unit-us"> US</label>'+
      '<label><input type="radio" name="units" id="unit-metric"> Metric</label>'+
      '</div></div>';

    var identity = ''+
      row2(inputL('a-full','Full Name','text','Jane Doe'), inputL('a-pref','Preferred Name','text','Jane'))+
      row2(inputL('a-role','Role/Archetype','text','Mediator'), inputL('a-age','Age','text','32'))+
      row2(inputL('a-gender','Gender','text','Female'), inputL('a-pron','Pronouns','text','She/Her'))+
      row2(inputL('a-hair','Hair','text','Chestnut'), inputL('a-eyes','Eyes','text','Gray-green'))+
      row2(heightBlock, selectL('a-build','Build',['Lean','Average','Fit','Muscular','Heavyset']))+
      inputL('a-posture','Posture Cue','text','Upright, contained')+

      // --- Appendages row (inline, under Posture) ---
      (function(){
        var ears =
          apCheck('ap-ears-on','Ears')+
          apRow('Style',    '<select id="ap-ears-style" style="width:100%;"><option></option><option>Feline</option><option>Canine</option><option>Leporine</option><option>Fox</option><option>Pointed</option><option>Round</option></select>')+
          apRow('Position', '<select id="ap-ears-pos" style="width:100%;"><option>top</option><option>side</option></select>')+
          apRow('Mobility', '<input id="ap-ears-mob" type="range" min="0" max="1" step="0.05" style="width:100%;">')+
          apRow('Sensitivity','<input id="ap-ears-sens" type="range" min="0" max="1" step="0.05" style="width:100%;">');

        var tail =
          apCheck('ap-tail-on','Tail')+
          apRow('Style',    '<select id="ap-tail-style" style="width:100%;"><option></option><option>Feline</option><option>Canine</option><option>Fox</option><option>Wolf</option><option>Dragon</option><option>Bovine</option></select>')+
          apRow('Length',   '<select id="ap-tail-len" style="width:100%;"><option>short</option><option>medium</option><option>long</option></select>')+
          apRow('Fluff',    '<input id="ap-tail-fluff" type="range" min="0" max="1" step="0.05" style="width:100%;">')+
          apRow('Mobility', '<input id="ap-tail-mob"  type="range" min="0" max="1" step="0.05" style="width:100%;">')+
          apRow('Prehensile','<input id="ap-tail-pre" type="checkbox">');

        var wings =
          apCheck('ap-wings-on','Wings')+
          apRow('Style',    '<select id="ap-wings-style" style="width:100%;"><option></option><option>Feathered</option><option>Leathery</option><option>Insect</option></select>')+
          apRow('Span (cm)','<input id="ap-wings-span" type="number" min="0" max="2000" step="1" style="width:100%;">')+
          apRow('Mobility', '<input id="ap-wings-mob" type="range" min="0" max="1" step="0.05" style="width:100%;">')+
          apRow('Strength', '<input id="ap-wings-str" type="range" min="0" max="1" step="0.05" style="width:100%;">')+
          apRow('Fold',     '<select id="ap-wings-fold" style="width:100%;"><option>back</option><option>cloak</option></select>');

        var horns =
          apCheck('ap-horns-on','Horns')+
          apRow('Style',    '<select id="ap-horns-style" style="width:100%;"><option></option><option>Straight</option><option>Curved</option><option>Spiral</option><option>Antlers</option></select>')+
          apRow('Length (cm)','<input id="ap-horns-len" type="number" min="0" max="200" step="1" style="width:100%;">');

        var grid = ''+
          '<div class="appendages-grid" style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:10px;">'+
            apCol('Ears',  ears)+
            apCol('Tail',  tail)+
            apCol('Wings', wings)+
            apCol('Horns', horns)+
          '</div>';
        return grid;
      })();

    var sliders = ''+
      row2(sliderL('o-o','Openness (O)',0,100,1), sliderL('o-c','Conscientiousness (C)',0,100,1))+
      row2(sliderL('o-e','Extraversion (E)',0,100,1), sliderL('o-a','Agreeableness (A)',0,100,1))+
      row2(sliderL('o-n','Neuroticism (N)',0,100,1), selectL('a-temp','Temperament',['Calm','Reactive','Volatile','Cheerful']));

    var personality = ''+
      '<div class="row" style="display:flex; gap:16px; align-items:flex-start;">'+
        '<div style="flex:1;">'+sliders+'</div>'+
        '<div style="width:240px;">'+
          '<canvas id="ocean-radar" width="220" height="220" style="background:transparent;"></canvas>'+
        '</div>'+
      '</div>';

    var actions = '<button id="act-delete" class="btn danger">Delete Actor</button>';

    return ''+
      '<div class="row" style="display:flex; gap:12px;">'+
        '<div id="act-sidebar" style="width:260px;">'+ card('Actors', sidebar) +'</div>'+
        '<div id="act-detail" style="flex:1;">'+
          card('Identity', identity)+
          card('Personality (OCEAN)', personality)+
          card('Actions', actions)+
        '</div>'+
      '</div>';
  }

  function renderSidebar(rootEl){
    var listEl = rootEl.querySelector('#act-list'); if (!listEl) return;
    var c = getStore(), keys = [], k;
    for (k in (c.actors||{})) keys.push(k);
    keys.sort();
    var html = '';
    for (var i=0;i<keys.length;i++){
      var id = keys[i], a = c.actors[id];
      var name = (a && a.profile && (a.profile.preferredName || a.profile.fullName)) || id;
      html += '<button class="btn'+(id===activeId?' primary':'')+'" data-act="'+id+'" style="justify-content:flex-start;">'+name+'</button>';
    }
    if (!keys.length) html += '<div class="muted">No actors yet.</div>';
    listEl.innerHTML = html;
    var btns = listEl.querySelectorAll('button[data-act]'); var j;
    for (j=0;j<btns.length;j++){
      btns[j].onclick = (function(b){ return function(){ setActive(b.getAttribute('data-act')); }; })(btns[j]);
    }
  }

  function setActive(id){ ensureActor(id); activeId = id; if (lastRoot){ renderSidebar(lastRoot); fillDetailFromStore(); } }

  function sliderSet(id, val01){
    var s = lastRoot.querySelector('#'+id);
    var v = lastRoot.querySelector('#'+id+'-val');
    if (s) s.value = Math.round((val01||0)*100);
    if (v) v.textContent = (Math.round((val01||0)*100)/100).toFixed(2);
  }
  function wireSliders(){
    var ids = ['o-o','o-c','o-e','o-a','o-n'];
    var keyMap = {'o-o':'O','o-c':'C','o-e':'E','o-a':'A','o-n':'N'};
    for (var i=0;i<ids.length;i++){
      (function(id){
        var el = lastRoot.querySelector('#'+id); if (!el) return;
        el.oninput = function(){
          var fv = Math.max(0, Math.min(100, parseInt(el.value,10)||0))/100;
          var out = lastRoot.querySelector('#'+id+'-val'); if (out) out.textContent = fv.toFixed(2);
          patch(function(c){
            var a = c.actors[activeId]; if (!a.personality) a.personality = { ocean:{O:0,C:0,E:0,A:0,N:0}, temperament:'Calm' };
            a.personality.ocean[keyMap[id]] = fv;
          });
          drawRadar();
        };
      })(ids[i]);
    }
  }

  function drawRadar(){
    var c = getStore(), a = c.actors[activeId];
    var canvas = lastRoot.querySelector('#ocean-radar');
    if (root.ActorsRadar && ActorsRadar.drawOcean) ActorsRadar.drawOcean(canvas, a && a.personality && a.personality.ocean);
  }

  function fillDetailFromStore(){
    if (!lastRoot || !activeId) return;
    var c = getStore(); var a = (c.actors && c.actors[activeId]) || {};
    function setVal(id, v){ var n = lastRoot.querySelector('#'+id); if(n) n.value = v||''; }
    function setChk(id, v){ var n = lastRoot.querySelector('#'+id); if(n) n.checked = !!v; }
    function setNum(id, v){ var n = lastRoot.querySelector('#'+id); if(n) n.value = (+v||0); }
    function setRange(id, v){ var n = lastRoot.querySelector('#'+id); if(n) n.value = (+v||0); }

    setVal('a-full', a.profile && a.profile.fullName);
    setVal('a-pref', a.profile && a.profile.preferredName);
    setVal('a-role', a.profile && a.profile.role);
    setVal('a-age', a.profile && a.profile.age);
    setVal('a-gender', a.profile && a.profile.gender);
    setVal('a-pron', a.profile && a.profile.pronouns);
    setVal('a-hair', a.appearance && a.appearance.hair);
    setVal('a-eyes', a.appearance && a.appearance.eyes);

    // units + height options
    var units = (root.ActorsUnits && ActorsUnits.getPref(c)) || 'us';
    var rUS = lastRoot.querySelector('#unit-us');
    var rM  = lastRoot.querySelector('#unit-metric');
    if (rUS) rUS.checked = (units==='us');
    if (rM)  rM.checked  = (units==='metric');

    var hSel = lastRoot.querySelector('#a-height');
    if (hSel){
      var opts = (units==='metric') ? (ActorsUnits && ActorsUnits.buildHeightOptionsMetric && ActorsUnits.buildHeightOptionsMetric()) : (ActorsUnits && ActorsUnits.buildHeightOptionsUS && ActorsUnits.buildHeightOptionsUS());
      var i, html=''; for (i=0;i<opts.length;i++){ html += '<option value="'+opts[i]+'">'+opts[i]+'</option>'; }
      hSel.innerHTML = html;
      var display = a.appearance && a.appearance.height_display;
      if (display){ hSel.value = display; } else { hSel.selectedIndex = Math.floor(opts.length/2); }
    }

    var bSel = lastRoot.querySelector('#a-build'); if (bSel) bSel.value = (a.appearance && a.appearance.build) || 'Average';
    setVal('a-height', a.appearance && a.appearance.height_display);
    setVal('a-build', a.appearance && a.appearance.build);
    setVal('a-height_cm', a.appearance && a.appearance.height_cm);

    setVal('a-posture', a.appearance && a.appearance.postureCue);

    // --- Appendages fill ---
    var ap = a.appearance || {}; var ad = ap.appendages || {};
    setChk('ap-ears-on',  ad.ears && !!ad.ears.present);
    setChk('ap-tail-on',  ad.tail && !!ad.tail.present);
    setChk('ap-wings-on', ad.wings && !!ad.wings.present);
    setChk('ap-horns-on', ad.horns && !!ad.horns.present);

    // ears
    setVal('ap-ears-style', ad.ears && ad.ears.style);
    setVal('ap-ears-pos',   ad.ears && ad.ears.position);
    setRange('ap-ears-mob', ad.ears && ad.ears.mobility);
    setRange('ap-ears-sens',ad.ears && ad.ears.sensitivity);

    // tail
    setVal('ap-tail-style', ad.tail && ad.tail.style);
    setVal('ap-tail-len',   ad.tail && ad.tail.length);
    setRange('ap-tail-fluff', ad.tail && ad.tail.fluff);
    setRange('ap-tail-mob',   ad.tail && ad.tail.mobility);
    setChk('ap-tail-pre',   ad.tail && !!ad.tail.prehensile);

    // wings
    setVal('ap-wings-style', ad.wings && ad.wings.style);
    setNum('ap-wings-span',  ad.wings && ad.wings.span_cm);
    setRange('ap-wings-mob', ad.wings && ad.wings.mobility);
    setRange('ap-wings-str', ad.wings && ad.wings.strength);
    setVal('ap-wings-fold',  ad.wings && ad.wings.fold);

    // horns
    setVal('ap-horns-style', ad.horns && ad.horns.style);
    setNum('ap-horns-len',   ad.horns && ad.horns.length_cm);

    var temp = lastRoot.querySelector('#a-temp'); if (temp) temp.value = (a.personality && a.personality.temperament) || 'Calm';

    sliderSet('o-o', a.personality && a.personality.ocean && a.personality.ocean.O || 0);
    sliderSet('o-c', a.personality && a.personality.ocean && a.personality.ocean.C || 0);
    sliderSet('o-e', a.personality && a.personality.ocean && a.personality.ocean.E || 0);
    sliderSet('o-a', a.personality && a.personality.ocean && a.personality.ocean.A || 0);
    sliderSet('o-n', a.personality && a.personality.ocean && a.personality.ocean.N || 0);

    drawRadar();
  }

  function bindDetailInputs(){
    function bind(id, path){
      var n = lastRoot.querySelector('#'+id);
      if (!n) return;
      n.oninput = function(){
        var v = n.value;
        patch(function(c){
          var a = c.actors[activeId]; var segs = path.split('.'); var obj = a;
          var i; for (i=0;i<segs.length-1;i++){ if (!obj[segs[i]]) obj[segs[i]] = {}; obj = obj[segs[i]]; }
          obj[segs[segs.length-1]] = v;
        });
        if (id==='a-full' || id==='a-pref'){ renderSidebar(lastRoot); }
      };
    }
    bind('a-full', 'profile.fullName'); bind('a-pref', 'profile.preferredName');
    bind('a-role', 'profile.role');     bind('a-age', 'profile.age');
    bind('a-gender','profile.gender');  bind('a-pron','profile.pronouns');
    bind('a-hair','appearance.hair');   bind('a-eyes','appearance.eyes');
    bind('a-build','appearance.build'); bind('a-posture','appearance.postureCue');

    // --- Appendages binds ---
    function write(path, value){
      patch(function(c){ var a=c.actors[activeId]; var segs=path.split('.'); var o=a; var i; for(i=0;i<segs.length-1;i++){ if(!o[segs[i]]) o[segs[i]]={}; o=o[segs[i]]; } o[segs[segs.length-1]]=value; return c; });
    }
    function onSel(id, path){ var e=lastRoot.querySelector('#'+id); if(e) e.onchange=function(){ write(path, String(e.value||'')); }; }
    function onNum(id, path){ var e=lastRoot.querySelector('#'+id); if(e) e.oninput=function(){ var v=+e.value||0; if(v<0)v=0; write(path, v); }; }
    function onRange(id, path){ var e=lastRoot.querySelector('#'+id); if(e) e.oninput=function(){ var v=parseFloat(e.value); if(isNaN(v)) v=0; if(v<0)v=0; if(v>1)v=1; write(path, v); }; }
    function onChk(id, cb){ var e=lastRoot.querySelector('#'+id); if(e) e.onchange=function(){ cb(!!e.checked); }; }

    // presence toggles
    onChk('ap-ears-on',  function(on){ patch(function(c){ var a=c.actors[activeId]; a.appearance=a.appearance||{}; a.appearance.appendages=a.appearance.appendages||{}; if(on){ a.appearance.appendages.ears=a.appearance.appendages.ears||{}; a.appearance.appendages.ears.present=true; } else { if(a.appearance.appendages.ears) delete a.appearance.appendages.ears; } }); });
    onChk('ap-tail-on',  function(on){ patch(function(c){ var a=c.actors[activeId]; a.appearance=a.appearance||{}; a.appearance.appendages=a.appearance.appendages||{}; if(on){ a.appearance.appendages.tail=a.appearance.appendages.tail||{}; a.appearance.appendages.tail.present=true; } else { if(a.appearance.appendages.tail) delete a.appearance.appendages.tail; } }); });
    onChk('ap-wings-on', function(on){ patch(function(c){ var a=c.actors[activeId]; a.appearance=a.appearance||{}; a.appearance.appendages=a.appearance.appendages||{}; if(on){ a.appearance.appendages.wings=a.appearance.appendages.wings||{}; a.appearance.appendages.wings.present=true; } else { if(a.appearance.appendages.wings) delete a.appearance.appendages.wings; } }); });
    onChk('ap-horns-on', function(on){ patch(function(c){ var a=c.actors[activeId]; a.appearance=a.appearance||{}; a.appearance.appendages=a.appearance.appendages||{}; if(on){ a.appearance.appendages.horns=a.appearance.appendages.horns||{}; a.appearance.appendages.horns.present=true; } else { if(a.appearance.appendages.horns) delete a.appearance.appendages.horns; } }); });

    // ears
    onSel('ap-ears-style','appearance.appendages.ears.style');
    onSel('ap-ears-pos',  'appearance.appendages.ears.position');
    onRange('ap-ears-mob','appearance.appendages.ears.mobility');
    onRange('ap-ears-sens','appearance.appendages.ears.sensitivity');

    // tail
    onSel('ap-tail-style','appearance.appendages.tail.style');
    onSel('ap-tail-len',  'appearance.appendages.tail.length');
    onRange('ap-tail-fluff','appearance.appendages.tail.fluff');
    onRange('ap-tail-mob',  'appearance.appendages.tail.mobility');
    onChk('ap-tail-pre', function(on){ write('appearance.appendages.tail.prehensile', !!on); });

    // wings
    onSel('ap-wings-style','appearance.appendages.wings.style');
    onNum('ap-wings-span', 'appearance.appendages.wings.span_cm');
    onRange('ap-wings-mob','appearance.appendages.wings.mobility');
    onRange('ap-wings-str','appearance.appendages.wings.strength');
    onSel('ap-wings-fold', 'appearance.appendages.wings.fold');

    // horns
    onSel('ap-horns-style','appearance.appendages.horns.style');
    onNum('ap-horns-len',  'appearance.appendages.horns.length_cm');

    var hSel = lastRoot.querySelector('#a-height');
    if (hSel){
      hSel.onchange = function(){
        var cfg = getStore();
        var units = (root.ActorsUnits && ActorsUnits.getPref(cfg)) || 'us';
        var norm = (ActorsUnits && ActorsUnits.normalizeHeight) ? ActorsUnits.normalizeHeight(hSel.value, units) : { display: hSel.value, cm: 0 };
        patch(function(c){
          var a = c.actors[activeId]; a.appearance = a.appearance || {};
          a.appearance.height_display = norm.display;
          a.appearance.height_cm = norm.cm;
        });
      };
    }

    var rUS = lastRoot.querySelector('#unit-us');
    var rM  = lastRoot.querySelector('#unit-metric');
    function updateUnits(units){
      patch(function(c){ if (root.ActorsUnits && ActorsUnits.setPref) ActorsUnits.setPref(c, units); });
      fillDetailFromStore();
    }
    if (rUS){ rUS.onchange = function(){ if (rUS.checked) updateUnits('us'); }; }
    if (rM){  rM.onchange  = function(){ if (rM.checked)  updateUnits('metric'); }; }

    var temp = lastRoot.querySelector('#a-temp');
    if (temp){
      temp.onchange = function(){
        patch(function(c){
          var a = c.actors[activeId]; if (!a.personality) a.personality = { ocean:{O:0,C:0,E:0,A:0,N:0}, temperament:'Calm' };
          a.personality.temperament = temp.value;
        });
      };
    }
    // sliders last
    (function(){ var ids=['o-o','o-c','o-e','o-a','o-n']; var i; for (i=0;i<ids.length;i++){ /* wired in wireSliders */ } })();
    wireSliders();

    var del = lastRoot.querySelector('#act-delete');
    if (del){
      del.onclick = function(){
        if (!activeId) return;
        if (!root.confirm || root.confirm('Delete this actor?')){
          patch(function(c){ if (c.actors) delete c.actors[activeId]; });
          activeId = null; renderSidebar(lastRoot);
          var c = getStore(), k; for (k in (c.actors||{})) { activeId = k; break; }
          fillDetailFromStore();
        }
      };
    }
  }

  // ---------- lifecycle ----------
  api.mount = function(rootEl){
    lastRoot = rootEl; rootEl.innerHTML = buildUI();

   var addBtn = rootEl.querySelector('#act-add');
if (addBtn){
  addBtn.onclick = function(){
    var c = getStore() || {};
    var used = {};
    var k;

    // collect used actor numbers (actor_#)
    var actors = c.actors || {};
    for (k in actors){
      if (actors.hasOwnProperty(k)) {
        var m = /^actor_(\d+)$/.exec(k);
        if (m) used[parseInt(m[1], 10)] = true;
      }
    }

    // find first free number starting at 1
    var nextId = 1;
    while (used[nextId]) nextId++;

    var id = 'actor_' + nextId;
    ensureActor(id);
    setActive(id);
  };
}


    // pick first actor or seed one
    var c = getStore(), k; for (k in (c.actors||{})) { activeId = k; break; }
    if (!activeId){ ensureActor('actor_1'); activeId = 'actor_1'; }

    renderSidebar(rootEl);
    bindDetailInputs();
    fillDetailFromStore();

    // subscribe: re-render when actors change
    if (root.CFGStore && CFGStore.subscribe){
      CFGStore.subscribe(
        function(){
          var a = (CFGStore.get() || {}).actors || {};
          try { return JSON.stringify(a); } catch(_e){ return String(Object.keys(a).length); }
        },
        function(){
          if (!lastRoot) return;
          renderSidebar(lastRoot);
          fillDetailFromStore();
        }
      );
    }
  };

  api.unmount = function(){ if (lastRoot) lastRoot.innerHTML=''; activeId=null; lastRoot=null; };

  root.CMPanel_actors = api;
})(window);
