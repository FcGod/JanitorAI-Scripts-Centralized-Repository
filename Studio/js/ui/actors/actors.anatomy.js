(function(root){
  'use strict';
  var Mod = {}, lastRoot=null, activeId=null;

  function getStore(){ return (root.CFGStore && CFGStore.get) ? CFGStore.get() : { actors:{} }; }
  function patch(mut){ if (root.CFGStore && CFGStore.patch) CFGStore.patch(mut); }

  // tiny helpers
  function q(id){ return lastRoot ? lastRoot.querySelector('#'+id) : null; }
  function setVal(id,v){ var e=q(id); if(e) e.value=(v==null?'':v); }
  function setNum(id,v){ var e=q(id); if(e) e.value=(+v||0); }
  function setChk(id,v){ var e=q(id); if(e) e.checked=!!v; }
  function setSel(id,v){ var e=q(id); if(e) e.value=(v==null?'':v); }
  function clamp01(x){ x=parseFloat(x); if(isNaN(x)) x=0; if(x<0)x=0; if(x>1)x=1; return x; }

  function deepWrite(path, val){
    patch(function(cfg){
      var a = (cfg.actors||{})[activeId]; if(!a) return cfg;
      var i, o=a;
      for(i=0;i<path.length-1;i++){ o[path[i]] = o[path[i]] || {}; o = o[path[i]]; }
      o[path[path.length-1]] = val;
      return cfg;
    });
  }

  function buildHTML(){
    var P = root.AxisPresets || {};
    function sel(id,label,opts){ var i,h='<label>'+label+'</label><select id="'+id+'">'; for(i=0;i<opts.length;i++){ h+='<option value="'+opts[i]+'">'+opts[i]+'</option>'; } h+='</select>'; return h; }
    function chk(id,txt){ return '<label><input id="'+id+'" type="checkbox"> '+txt+'</label>'; }
    function num(id,label,min,max,step){ return '<label>'+label+'</label><input id="'+id+'" type="number" min="'+min+'" max="'+max+'" step="'+step+'">'; }
    function rng01(id,label){ return '<label>'+label+'</label><input id="'+id+'" type="range" min="0" max="1" step="0.05">'; }

    var ears =
      chk('ap-ears-on','Ears present')+
      sel('ap-ears-style','Ear Style', P.EAR_STYLES||[""]) +
      sel('ap-ears-pos','Ear Position', P.EAR_POS||["top","side"]) +
      rng01('ap-ears-mob','Ear Mobility')+
      rng01('ap-ears-sens','Ear Sensitivity');

    var tail =
      chk('ap-tail-on','Tail present')+
      sel('ap-tail-style','Tail Style', P.TAIL_STYLES||[""]) +
      sel('ap-tail-len','Tail Length', P.TAIL_LENGTHS||["short","medium","long"]) +
      rng01('ap-tail-fluff','Fluffiness')+
      rng01('ap-tail-mob','Tail Mobility')+
      chk('ap-tail-pre','Prehensile');

    var wings =
      chk('ap-wings-on','Wings present')+
      sel('ap-wings-style','Wing Style', P.WING_STYLES||[""]) +
      num('ap-wings-span','Span (cm)',0,2000,1)+
      rng01('ap-wings-mob','Wing Mobility')+
      rng01('ap-wings-str','Wing Strength')+
      sel('ap-wings-fold','Fold', P.WING_FOLD||["back","cloak"]);

    var horns =
      chk('ap-horns-on','Horns present')+
      sel('ap-horns-style','Horn Style', P.HORN_STYLES||[""]) +
      num('ap-horns-len','Length (cm)',0,200,1);

    var markings =
      '<label>Markings</label>'+
      '<div class="row-inline"><input id="ap-marking-in" placeholder="Add marking"><button id="ap-marking-add" class="btn-mini" type="button">Add</button></div>'+
      '<div id="ap-markings" class="chip-zone"></div>'+
      '<div class="row-inline" style="margin-top:6px;">'+
         '<label><input id="ap-tex-fur" type="checkbox"> Fur</label>'+
         '<label><input id="ap-tex-scales" type="checkbox"> Scales</label>'+
         '<label><input id="ap-tex-feathers" type="checkbox"> Feathers</label>'+
      '</div>'+
      '<textarea id="ap-tex-notes" rows="2" placeholder="Texture notes…"></textarea>';

    return ''+
      '<div class="card"><h3>Anatomy</h3>'+
        '<div class="anatomy-grid">'+
          '<div class="anatomy-col">'+ears+'</div>'+
          '<div class="anatomy-col">'+tail+'</div>'+
          '<div class="anatomy-col">'+wings+'</div>'+
          '<div class="anatomy-col">'+horns+'</div>'+
        '</div>'+
      '</div>'+
      '<div class="card"><h3>Markings & Texture</h3>'+markings+'</div>';
  }

  function readFromStore(){
    var a = (getStore().actors||{})[activeId]; if(!a) return;
    var ap = a.appearance||{}, ad = (ap.appendages||{});
    // ears
    setChk('ap-ears-on',  ad.ears && !!ad.ears.present);
    setSel('ap-ears-style', ad.ears ? ad.ears.style : "");
    setSel('ap-ears-pos',   ad.ears ? ad.ears.position : "top");
    setVal('ap-ears-mob',   ad.ears ? ad.ears.mobility : 0);
    setVal('ap-ears-sens',  ad.ears ? ad.ears.sensitivity : 0);
    // tail
    setChk('ap-tail-on',  ad.tail && !!ad.tail.present);
    setSel('ap-tail-style', ad.tail ? ad.tail.style : "");
    setSel('ap-tail-len',   ad.tail ? ad.tail.length : "medium");
    setVal('ap-tail-fluff', ad.tail ? ad.tail.fluff : 0);
    setVal('ap-tail-mob',   ad.tail ? ad.tail.mobility : 0);
    setChk('ap-tail-pre',   ad.tail && !!ad.tail.prehensile);
    // wings
    setChk('ap-wings-on',   ad.wings && !!ad.wings.present);
    setSel('ap-wings-style',ad.wings ? ad.wings.style : "");
    setNum('ap-wings-span', ad.wings ? ad.wings.span_cm : 0);
    setVal('ap-wings-mob',  ad.wings ? ad.wings.mobility : 0);
    setVal('ap-wings-str',  ad.wings ? ad.wings.strength : 0);
    setSel('ap-wings-fold', ad.wings ? ad.wings.fold : "back");
    // horns
    setChk('ap-horns-on',   ad.horns && !!ad.horns.present);
    setSel('ap-horns-style',ad.horns ? ad.horns.style : "");
    setNum('ap-horns-len',  ad.horns ? ad.horns.length_cm : 0);
    // markings/texture
    var m = ap.markings||[];
    var zone = q('ap-markings'); if(zone){ var i,h=''; for(i=0;i<m.length;i++){ h+='<span class="chip">'+m[i]+'</span>'; } zone.innerHTML=h||'<div class="muted">No markings.</div>'; }
    setChk('ap-tex-fur',       ap.texture && !!ap.texture.fur);
    setChk('ap-tex-scales',    ap.texture && !!ap.texture.scales);
    setChk('ap-tex-feathers',  ap.texture && !!ap.texture.feathers);
    setVal('ap-tex-notes',     (ap.texture && ap.texture.notes) || '');
  }

  function wireHandlers(){
    function onToggle(id, slot){ var e=q(id); if(!e) return;
      e.onchange = function(){ var on = !!e.checked;
        patch(function(cfg){
          var a=(cfg.actors||{})[activeId]; if(!a) return cfg;
          a.appearance=a.appearance||{}; a.appearance.appendages=a.appearance.appendages||{};
          a.appearance.appendages[slot]=a.appearance.appendages[slot]||{};
          a.appearance.appendages[slot].present = on;
          // If toggled OFF, drop the object to respect "empty ⇒ absent"
          if(!on){ delete a.appearance.appendages[slot]; }
          return cfg;
        });
        readFromStore();
      };
    }
    function onSel(id, path){ var e=q(id); if(!e) return; e.onchange=function(){ deepWrite(path, String(e.value||'')); }; }
    function onRange01(id, path){ var e=q(id); if(!e) return; e.oninput=function(){ deepWrite(path, clamp01(e.value)); }; }
    function onNum(id, path){ var e=q(id); if(!e) return; e.oninput=function(){ var v=+e.value||0; if(v<0)v=0; deepWrite(path, v); }; }

    // toggles
    onToggle('ap-ears-on',  'ears');
    onToggle('ap-tail-on',  'tail');
    onToggle('ap-wings-on', 'wings');
    onToggle('ap-horns-on', 'horns');

    // ears
    onSel('ap-ears-style',['appearance','appendages','ears','style']);
    onSel('ap-ears-pos',  ['appearance','appendages','ears','position']);
    onRange01('ap-ears-mob',['appearance','appendages','ears','mobility']);
    onRange01('ap-ears-sens',['appearance','appendages','ears','sensitivity']);

    // tail
    onSel('ap-tail-style',['appearance','appendages','tail','style']);
    onSel('ap-tail-len',  ['appearance','appendages','tail','length']);
    onRange01('ap-tail-fluff',['appearance','appendages','tail','fluff']);
    onRange01('ap-tail-mob',  ['appearance','appendages','tail','mobility']);
    (function(){ var e=q('ap-tail-pre'); if(e){ e.onchange=function(){ deepWrite(['appearance','appendages','tail','prehensile'], !!e.checked); }; } })();

    // wings
    onSel('ap-wings-style',['appearance','appendages','wings','style']);
    onNum('ap-wings-span', ['appearance','appendages','wings','span_cm']);
    onRange01('ap-wings-mob',['appearance','appendages','wings','mobility']);
    onRange01('ap-wings-str',['appearance','appendages','wings','strength']);
    onSel('ap-wings-fold',['appearance','appendages','wings','fold']);

    // horns
    onSel('ap-horns-style',['appearance','appendages','horns','style']);
    onNum('ap-horns-len',  ['appearance','appendages','horns','length_cm']);

    // markings + texture
    var add=q('ap-marking-add'), input=q('ap-marking-in');
    if(add && input){ add.onclick=function(){ var v=(input.value||'').replace(/^\s+|\s+$/g,''); if(!v) return;
      patch(function(cfg){ var a=cfg.actors[activeId]; a.appearance.markings=a.appearance.markings||[]; if(a.appearance.markings.indexOf(v)<0) a.appearance.markings.push(v); return cfg; });
      input.value=''; readFromStore(); };
    }
    (function(id,key){ var e=q(id); if(e) e.onchange=function(){ patch(function(cfg){ var a=cfg.actors[activeId]; a.appearance.texture=a.appearance.texture||{}; a.appearance.texture[key]=!!e.checked; return cfg; }); }; })('ap-tex-fur','fur');
    (function(id,key){ var e=q(id); if(e) e.onchange=function(){ patch(function(cfg){ var a=cfg.actors[activeId]; a.appearance.texture=a.appearance.texture||{}; a.appearance.texture[key]=!!e.checked; return cfg; }); }; })('ap-tex-scales','scales');
    (function(id,key){ var e=q(id); if(e) e.onchange=function(){ patch(function(cfg){ var a=cfg.actors[activeId]; a.appearance.texture=a.appearance.texture||{}; a.appearance.texture[key]=!!e.checked; return cfg; }); }; })('ap-tex-feathers','feathers');
    var note=q('ap-tex-notes'); if(note){ note.oninput=function(){ patch(function(cfg){ var a=cfg.actors[activeId]; a.appearance.texture=a.appearance.texture||{}; a.appearance.texture.notes=String(note.value||''); return cfg; }); }; }
  }

  Mod.mount = function(el, actorId){
    lastRoot = el; activeId = actorId;
    el.innerHTML = buildHTML();
    readFromStore();
    wireHandlers();
  };

  Mod.update = function(actorId){
    activeId = actorId;
    readFromStore();
  };

  root.ActorsAnatomy = Mod;
})(this);
