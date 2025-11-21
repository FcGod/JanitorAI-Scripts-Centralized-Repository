(function(root){
  'use strict';

  var api = {}, lastRoot = null;

  // ---------- helpers ----------
  function getCfg(){ return (root.CFGStore && CFGStore.get) ? CFGStore.get() : (root.GUI && root.GUI.State && root.GUI.State.CFG) || {}; }
  function patch(mut){ if (root.CFGStore && CFGStore.patch) return CFGStore.patch(mut); var c=getCfg(); var r=mut(c)||c; if(root.GUI&&root.GUI.State) root.GUI.State.CFG=r; return r; }
  function el(tag, cls, txt){ var e=document.createElement(tag); if(cls) e.className=cls; if(txt!=null) e.textContent=txt; return e; }
  function labelCtl(text, inputEl){ var L=document.createElement('label'); L.className='ctl'; L.appendChild(document.createTextNode(text+' ')); L.appendChild(inputEl); return L; }
  function empty(n){ while(n && n.firstChild) n.removeChild(n.firstChild); }
  function setVal(id, v){ var n=document.getElementById(id); if(n){ n.value=v; } }
  function setChk(id, v){ var n=document.getElementById(id); if(n){ n.checked=!!v; } }
  function setText(id, t){ var n=document.getElementById(id); if(n){ n.textContent=String(t); } }
  function num(v,d){ v=parseFloat(v); return isNaN(v)? d : v; }
  function clamp(v,lo,hi){ v=num(v,lo); if(v<lo) v=lo; if(v>hi) v=hi; return v; }

  // ---------- profile bundles (unchanged) ----------
  function profilePresets(name){
    if (name === 'slim') return { cpt:5, maxCues:4, pool_total:180, actor_line_max:100, split_scenario:0.40, bias_emotion_intensity:0.45, bias_speech_drift:0.40 };
    if (name === 'design') return { cpt:4, maxCues:8, pool_total:360, actor_line_max:160, split_scenario:0.30, bias_emotion_intensity:0.60, bias_speech_drift:0.55 };
    return { cpt:4, maxCues:6, pool_total:240, actor_line_max:120, split_scenario:0.35, bias_emotion_intensity:0.50, bias_speech_drift:0.50 };
  }

  // ---------- model token profiles ----------
  function modelProfiles(){
    // cpt values are practical approximations; users can calibrate further
    return {
      custom:   { name:'Custom',          cpt: 4.0 },
      jai:      { name:'JanitorAI (est.)',cpt: 6.0 },
      openai_4o:{ name:'OpenAI 4o-mini',  cpt: 4.5 },
      claude35: { name:'Claude 3.5',      cpt: 4.0 },
      llama3:   { name:'Llama 3 (70B)',   cpt: 4.0 }
    };
  }

  // ---------- UI skeleton ----------
  var dom = { root:null };
  function build(container){
    empty(container);
    var wrap = el('div', 'engine-wrap');

    // ===== Tokens & Limits =====
    var secTok = el('div', 'card eng-section');
    secTok.appendChild(el('h3', null, 'Tokens & Limits'));
    var rowTok = el('div', 'control-row');

    // Model token profile select
    var selModel = document.createElement('select'); selModel.id='eng-model';
    (function(){
      var mp = modelProfiles(), k;
      for (k in mp){ if(mp.hasOwnProperty(k)){ var o=document.createElement('option'); o.value=k; o.text=mp[k].name; selModel.appendChild(o); } }
    })();
    rowTok.appendChild(labelCtl('Model token profile', selModel));

    // cpt
    var iC = document.createElement('input'); iC.id='eng-cpt'; iC.type='number'; iC.min='1'; iC.step='0.1';
    rowTok.appendChild(labelCtl('Chars per token', iC));

    // max cues
    var iM = document.createElement('input'); iM.id='eng-maxcues'; iM.type='number'; iM.min='1'; iM.step='1';
    rowTok.appendChild(labelCtl('Max cues per turn', iM));

    // pool / line
    var iPool = document.createElement('input'); iPool.id='eng-pool'; iPool.type='number'; iPool.min='50'; iPool.step='10';
    rowTok.appendChild(labelCtl('Token pool total', iPool));
    var iLine = document.createElement('input'); iLine.id='eng-linemax'; iLine.type='number'; iLine.min='50'; iLine.step='5';
    rowTok.appendChild(labelCtl('Actor line max', iLine));
    secTok.appendChild(rowTok);

    // Split row
    var rowSplit = el('div','control-row');
    var sScen = document.createElement('input'); sScen.id='eng-split-scen'; sScen.type='range'; sScen.min='0'; sScen.max='1'; sScen.step='0.05';
    var scenLbl = el('span','muted','50%'); scenLbl.id='eng-split-scen-pct';
    rowSplit.appendChild(labelCtl('Scenario split', sScen)); rowSplit.appendChild(scenLbl);
    var sPers = document.createElement('input'); sPers.id='eng-split-pers'; sPers.type='range'; sPers.min='0'; sPers.max='1'; sPers.step='0.05'; sPers.disabled=true; sPers.style.opacity='0.6';
    var persLbl = el('span','muted','50%'); persLbl.id='eng-split-pers-pct';
    rowSplit.appendChild(labelCtl('Personality split', sPers)); rowSplit.appendChild(persLbl);
    secTok.appendChild(rowSplit);

    // ===== Calibration =====
    var secCal = el('div', 'card eng-section');
    secCal.appendChild(el('h3', null, 'Token Calibration'));
    var rowCal = el('div', 'control-row');
    var ta = document.createElement('textarea'); ta.id='eng-cal-text'; ta.placeholder='Paste sample text here (optional)…'; ta.style.height='64px'; ta.style.width='100%';
    rowCal.appendChild(labelCtl('Sample text', ta));
    var iChars = document.createElement('input'); iChars.id='eng-cal-chars'; iChars.type='number'; iChars.min='1'; iChars.step='1';
    rowCal.appendChild(labelCtl('…or char count', iChars));
    var iTok = document.createElement('input'); iTok.id='eng-cal-tokens'; iTok.type='number'; iTok.min='1'; iTok.step='1';
    rowCal.appendChild(labelCtl('Observed tokens', iTok));
    var btnCalc = document.createElement('button'); btnCalc.id='eng-cal-apply'; btnCalc.className='btn'; btnCalc.textContent='Compute & Apply';
    rowCal.appendChild(btnCalc);
    var calNote = el('div','muted','Sets chars/token = chars ÷ observed tokens, then updates Engine + mirrors.');
    secCal.appendChild(rowCal); secCal.appendChild(calNote);

    // ===== Biases =====
    var secBias = el('div','card eng-section');
    secBias.appendChild(el('h3', null, 'Engine Biases'));
    var rowB1 = el('div','control-row');
    var bEm = document.createElement('input'); bEm.id='eng-bias-em'; bEm.type='range'; bEm.min='0'; bEm.max='1'; bEm.step='0.05';
    rowB1.appendChild(labelCtl('Emotion intensity', bEm));
    var bSp = document.createElement('input'); bSp.id='eng-bias-speech'; bSp.type='range'; bSp.min='0'; bSp.max='1'; bSp.step='0.05';
    rowB1.appendChild(labelCtl('Speech drift', bSp));
    secBias.appendChild(rowB1);

    // ===== Lorebook =====
    var secLb = el('div','card eng-section');
    secLb.appendChild(el('h3', null, 'Lorebook Policies'));
    var rowLb = el('div','control-row');
    var honor = document.createElement('input'); honor.id='eng-honor'; honor.type='checkbox';
    rowLb.appendChild(labelCtl('honor anatomy presence', honor));
    var compact = document.createElement('input'); compact.id='eng-compact'; compact.type='checkbox';
    rowLb.appendChild(labelCtl('compact export', compact));
    secLb.appendChild(rowLb);

    // ===== Profile & Linkage =====
    var secProf = el('div','card eng-section');
    secProf.appendChild(el('h3', null, 'Profile & Linkage'));
    var rowP = el('div','control-row');
    var prof = document.createElement('select'); prof.id='eng-profile';
    (function(){ var o1=document.createElement('option');o1.value='slim';o1.text='Slim';prof.appendChild(o1);
                 var o2=document.createElement('option');o2.value='standard';o2.text='Standard';prof.appendChild(o2);
                 var o3=document.createElement('option');o3.value='design';o3.text='Design';prof.appendChild(o3); })();
    rowP.appendChild(labelCtl('Profile', prof));
    var link = document.createElement('input'); link.id='eng-linktokens'; link.type='checkbox';
    rowP.appendChild(labelCtl('keep Tokens panel in sync', link));
    secProf.appendChild(rowP);

    // assemble
    wrap.appendChild(secTok);
    wrap.appendChild(secCal);
    wrap.appendChild(secBias);
    wrap.appendChild(secLb);
    wrap.appendChild(secProf);

    container.appendChild(wrap);
    dom.root = wrap;

    wire();
    render();
  }

  // ---------- render ----------
  function render(){
    var cfg = getCfg();
    var engine = cfg.engine || {}; var tok = engine.token || {}; var lim = engine.limits || {}; var ui = engine.ui || {};
    var lbset = (cfg.lorebook && cfg.lorebook.settings) || {};
    var params = cfg.params || {}; var tc = params.token_caps || {};

    // canonical with mirror fallback
    var cpt = +tok.chars_per_token > 0 ? +tok.chars_per_token : (tc.chars_per_token>0? +tc.chars_per_token : 4);
    var maxCues = +lim.max_cues_global > 0 ? +lim.max_cues_global : (params.max_cues_global>0? +params.max_cues_global : 6);

    // model profile select
    var mpKey = tok.model_profile || 'custom';
    setVal('eng-model', mpKey);

    // tokens & limits
    setVal('eng-cpt', cpt);
    setVal('eng-maxcues', maxCues);
    setVal('eng-pool', (tc.pool_total!=null? tc.pool_total : 240));
    setVal('eng-linemax', (tc.actor_line_max!=null? tc.actor_line_max : 120));

    // splits
    var scen = (tc.split_scenario!=null? tc.split_scenario : 0.35);
    var pers = 1 - scen;
    setVal('eng-split-scen', scen);
    setVal('eng-split-pers', pers);
    setText('eng-split-scen-pct', Math.round(scen*100)+'%');
    setText('eng-split-pers-pct', Math.round(pers*100)+'%');

    // biases
    setVal('eng-bias-em', (params.bias_emotion_intensity!=null? params.bias_emotion_intensity : 0.5));
    setVal('eng-bias-speech', (params.bias_speech_drift!=null? params.bias_speech_drift : 0.5));

    // lorebook
    setChk('eng-honor', !!lbset.honorAnatomyPresence);
    setChk('eng-compact', !!lbset.compactExport);

    // profile & linkage
    var prof = (params.profile || 'standard'); setVal('eng-profile', prof);
    setChk('eng-linktokens', (typeof ui.linkTokens==='undefined') ? true : !!ui.linkTokens);
  }

  // ---------- wiring ----------
  function wire(){
    // model profile → set cpt + mark profile key
    (function(){
      var n = document.getElementById('eng-model');
      if (!n) return;
      n.onchange = function(){
        var key = n.value || 'custom';
        var mp = modelProfiles()[key] || modelProfiles().custom;
        patch(function(cfg){
          cfg.engine = cfg.engine || {};
          cfg.engine.token = cfg.engine.token || {};
          cfg.engine.token.model_profile = key;
          // set canonical cpt
          cfg.engine.token.chars_per_token = mp.cpt;
          // mirror
          cfg.params = cfg.params || {};
          cfg.params.token_caps = cfg.params.token_caps || {};
          cfg.params.token_caps.chars_per_token = mp.cpt;
          return cfg;
        });
        render();
      };
    })();

    // numeric inputs
    numeric('eng-cpt', function(v){
      v = clamp(v, 1, 50);
      patch(function(cfg){
        cfg.engine=cfg.engine||{}; cfg.engine.token=cfg.engine.token||{};
        cfg.engine.token.chars_per_token=v;
        cfg.params=cfg.params||{}; cfg.params.token_caps=cfg.params.token_caps||{};
        cfg.params.token_caps.chars_per_token=v;
        // switching cpt implies custom model_profile
        cfg.engine.token.model_profile = 'custom';
        return cfg;
      });
    });

    numeric('eng-maxcues', function(v){
      v = clamp(v, 1, 50);
      patch(function(cfg){
        cfg.engine=cfg.engine||{}; cfg.engine.limits=cfg.engine.limits||{};
        cfg.engine.limits.max_cues_global=v;
        cfg.params=cfg.params||{}; cfg.params.max_cues_global=v;
        return cfg;
      });
    });

    numeric('eng-pool', function(v){
      patch(function(cfg){
        cfg.params=cfg.params||{}; cfg.params.token_caps=cfg.params.token_caps||{};
        cfg.params.token_caps.pool_total=v; return cfg;
      });
    });

    numeric('eng-linemax', function(v){
      patch(function(cfg){
        cfg.params=cfg.params||{}; cfg.params.token_caps=cfg.params.token_caps||{};
        cfg.params.token_caps.actor_line_max=v; return cfg;
      });
    });

    // splits
    var sScen = document.getElementById('eng-split-scen');
    if (sScen){
      sScen.oninput = function(){
        var scen=num(sScen.value,0.35), pers=1-scen;
        setVal('eng-split-pers', pers);
        setText('eng-split-scen-pct', Math.round(scen*100)+'%');
        setText('eng-split-pers-pct', Math.round(pers*100)+'%');
        patch(function(cfg){
          cfg.params=cfg.params||{}; cfg.params.token_caps=cfg.params.token_caps||{};
          cfg.params.token_caps.split_scenario=scen;
          cfg.params.token_caps.split_personality=pers;
          return cfg;
        });
      };
    }

    // biases
    range('eng-bias-em', function(v){ patch(function(cfg){ cfg.params=cfg.params||{}; cfg.params.bias_emotion_intensity=v; return cfg; }); });
    range('eng-bias-speech', function(v){ patch(function(cfg){ cfg.params=cfg.params||{}; cfg.params.bias_speech_drift=v; return cfg; }); });

    // lorebook toggles
    checkbox('eng-honor', function(on){ patch(function(cfg){ cfg.lorebook=cfg.lorebook||{}; cfg.lorebook.settings=cfg.lorebook.settings||{}; cfg.lorebook.settings.honorAnatomyPresence=on; return cfg; }); });
    checkbox('eng-compact', function(on){ patch(function(cfg){ cfg.lorebook=cfg.lorebook||{}; cfg.lorebook.settings=cfg.lorebook.settings||{}; cfg.lorebook.settings.compactExport=on; return cfg; }); });

    // profile presets (apply to canonical + mirrors)
    select('eng-profile', function(val){
      patch(function(cfg){
        cfg.params = cfg.params || {};
        cfg.params.profile = val;
        var p = profilePresets(val);
        // canonical
        cfg.engine = cfg.engine || {};
        cfg.engine.token = cfg.engine.token || {};
        cfg.engine.limits = cfg.engine.limits || {};
        cfg.engine.token.chars_per_token = p.cpt;
        cfg.engine.limits.max_cues_global = p.maxCues;
        // mirrors
        var tc = (cfg.params.token_caps || {});
        tc.chars_per_token = p.cpt;
        tc.pool_total = p.pool_total;
        tc.actor_line_max = p.actor_line_max;
        tc.split_scenario = p.split_scenario;
        tc.split_personality = 1 - p.split_scenario;
        cfg.params.token_caps = tc;
        cfg.params.max_cues_global = p.maxCues;
        cfg.params.bias_emotion_intensity = p.bias_emotion_intensity;
        cfg.params.bias_speech_drift = p.bias_speech_drift;
        // profile implies model_profile=custom (we're overriding cpt)
        cfg.engine.token.model_profile = 'custom';
        return cfg;
      });
      render();
    });

    // linkage
    checkbox('eng-linktokens', function(on){ patch(function(cfg){ cfg.engine=cfg.engine||{}; cfg.engine.ui=cfg.engine.ui||{}; cfg.engine.ui.linkTokens=on; return cfg; }); });

    // calibration
    (function(){
      var btn = document.getElementById('eng-cal-apply');
      var ta = document.getElementById('eng-cal-text');
      var nch = document.getElementById('eng-cal-chars');
      var tok = document.getElementById('eng-cal-tokens');
      if (!btn) return;
      btn.onclick = function(){
        var chars = 0;
        var pasted = (ta && ta.value) ? String(ta.value) : '';
        if (pasted) { chars = pasted.length; setVal('eng-cal-chars', chars); }
        else { chars = Math.max(1, parseInt((nch && nch.value)||'0',10)||0); }
        var tokens = Math.max(1, parseInt((tok && tok.value)||'0',10)||0);
        var cpt = Math.max(0.1, chars / tokens);
        // apply
        patch(function(cfg){
          cfg.engine=cfg.engine||{}; cfg.engine.token=cfg.engine.token||{};
          cfg.engine.token.chars_per_token = cpt;
          cfg.engine.token.model_profile = 'custom';
          cfg.params=cfg.params||{}; cfg.params.token_caps=cfg.params.token_caps||{};
          cfg.params.token_caps.chars_per_token = cpt;
          return cfg;
        });
        render();
      };
    })();

    // subscribe
    if (root.CFGStore && CFGStore.subscribe){
      CFGStore.subscribe(function(){
        var c=getCfg(); try { return JSON.stringify({e:c.engine||{}, p:c.params||{}, l:((c.lorebook||{}).settings)||{} }); } catch(_e){ return String(Math.random()); }
      }, function(){ if(lastRoot) render(); });
    }
  }

  // tiny wiring helpers
  function numeric(id, cb){ var n=document.getElementById(id); if(!n) return; n.oninput=function(){ cb(num(n.value,0)); }; n.onchange=function(){ cb(num(n.value,0)); }; }
  function range(id, cb){ var n=document.getElementById(id); if(!n) return; n.oninput=function(){ cb(num(n.value,0)); }; n.onchange=function(){ cb(num(n.value,0)); }; }
  function checkbox(id, cb){ var n=document.getElementById(id); if(!n) return; n.onchange=function(){ cb(!!n.checked); }; }
  function select(id, cb){ var n=document.getElementById(id); if(!n) return; n.onchange=function(){ cb(n.value); }; }

  // ---------- lifecycle ----------
  api.mount = function(rootEl){ lastRoot = rootEl; build(rootEl); };
  api.unmount = function(){ if(lastRoot){ empty(lastRoot); lastRoot=null; } };

  root.CMPanel_engine = api;
})(window);
