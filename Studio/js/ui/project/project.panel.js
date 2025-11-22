
(function(root){
  'use strict';

  var api = {}, lastRoot = null;

  // ----- helpers -----
  function card(title, bodyHtml){
    return ''+
      '<div class="card" style="padding:12px; margin-bottom:12px;">'+
      (title ? '<h3 style="margin:0 0 8px 0;">'+title+'</h3>' : '')+
      bodyHtml+
      '</div>';
  }
  function row2(aHtml, bHtml){
    return ''+
      '<div class="row" style="display:flex; gap:10px; align-items:center; margin-bottom:8px;">'+
      '<div style="flex:1;">'+aHtml+'</div>'+
      '<div style="flex:1; text-align:right;">'+bHtml+'</div>'+
      '</div>';
  }
  function inputL(id, label, type, placeholder){
    return ''+
      '<label for="'+id+'" style="display:block; font-weight:600;">'+label+'</label>'+
      '<input id="'+id+'" type="'+type+'" placeholder="'+(placeholder||'')+'" style="width:100%;">';
  }
  function checkboxL(id, label){
    return ''+
      '<label><input id="'+id+'" type="checkbox" style="margin-right:6px;">'+label+'</label>';
  }

  function getStore(){ return (root.CFGStore && root.CFGStore.get) ? root.CFGStore.get() : {}; }
  function patch(fn){ if (root.CFGStore && root.CFGStore.patch) root.CFGStore.patch(fn); }

  // ----- UI build -----
  function buildUI(){
    var project = row2(
      inputL('proj-project-title','Project Title','text',''),
      inputL('proj-project-author','Author','text','')
    );

    var flags = checkboxL('proj-debug','Debug Mode');

    var notes = ''+
      '<label>General Notes</label>'+
      '<textarea id="notes-general" placeholder="General production notes..." style="width:100%; min-height:80px; resize:vertical;"></textarea>'+
      '<label style="margin-top:8px; display:block;">Scenario Notes</label>'+
      '<textarea id="notes-scenario" placeholder="Scenario notes..." style="width:100%; min-height:80px; resize:vertical;"></textarea>'+
      '<label style="margin-top:8px; display:block;">Personality Notes</label>'+
      '<textarea id="notes-personality" placeholder="Personality notes..." style="width:100%; min-height:80px; resize:vertical;"></textarea>';

    var exportCard = ''+
      '<div class="row" style="display:flex; gap:16px; align-items:center; flex-wrap:wrap;">'+
        '<label><input id="export-cinematic" type="checkbox" checked style="margin-right:6px;">Include Cinematic Notes</label>'+
        '<label><input id="export-technical" type="checkbox" style="margin-right:6px;">Include Technical Notes</label>'+
      '</div>'+
      '<div class="row" style="display:flex; gap:8px; margin-top:8px; flex-wrap:wrap;">'+
        '<button id="proj-export-cfg" class="btn">Export CFG</button>'+
        '<button id="proj-export-lore" class="btn">Export Lorebook</button>'+
        '<button id="proj-export-cart" class="btn primary">Export Cartridge</button>'+
      '</div>';

    var profile = ''+
      '<div class="row" style="display:flex; gap:8px; flex-wrap:wrap;">'+
        '<button id="proj-save" class="btn primary">Save Profile</button>'+
        '<button id="proj-load" class="btn">Load Profile</button>'+
        '<button id="proj-clear" class="btn danger">Clear Profile</button>'+
      '</div>'+
      '<small id="proj-status" class="muted"></small>';

    return ''+
      card('Project', project)+
      card('Flags', flags)+
      card('Notes', notes)+
      card('Export', exportCard)+
      card('Profile', profile);
  }

  // ----- lifecycle -----
  api.mount = function(el){
    if (!el) return;
    lastRoot = el;
    el.innerHTML = buildUI();

    var projTitle = el.querySelector('#proj-project-title');
    var projAuthor= el.querySelector('#proj-project-author');
    var debug     = el.querySelector('#proj-debug');
    var notesG    = el.querySelector('#notes-general');
    var notesS    = el.querySelector('#notes-scenario');
    var notesP    = el.querySelector('#notes-personality');
    var saveBtn   = el.querySelector('#proj-save');
    var loadBtn   = el.querySelector('#proj-load');
    var clearBtn  = el.querySelector('#proj-clear');
    var statusEl  = el.querySelector('#proj-status');
    var expCfg    = el.querySelector('#proj-export-cfg');
    var expLore   = el.querySelector('#proj-export-lore');
    var expCart   = el.querySelector('#proj-export-cart');
    var inclCin   = el.querySelector('#export-cinematic');
    var inclTec   = el.querySelector('#export-technical');

    function setFieldsFrom(cfg){
      cfg = cfg || {};
      var p = cfg.project || {};
      var f = cfg.features || {};
      var m = (cfg.meta && cfg.meta.notes) || {};

      if (projTitle) projTitle.value = p.title || '';
      if (projAuthor)projAuthor.value= p.author || '';
      if (debug)     debug.checked   = !!f.debug;
      if (notesG)    notesG.value    = m.general || '';
      if (notesS)    notesS.value    = m.scenario || '';
      if (notesP)    notesP.value    = m.personality || '';
    }

    // initial fill
    if (root.CFGStore && CFGStore.get) setFieldsFrom(CFGStore.get());

    // bindings → store
    if (projTitle) projTitle.oninput = function(){ patch(function(c){ c.project=c.project||{}; c.project.title  = projTitle.value; }); };
    if (projAuthor)projAuthor.oninput= function(){ patch(function(c){ c.project=c.project||{}; c.project.author = projAuthor.value; }); };
    if (debug)     debug.onchange    = function(){ patch(function(c){ c.features=c.features||{}; c.features.debug = !!debug.checked; }); };
    if (notesG)    notesG.oninput    = function(){ patch(function(c){ c.meta=c.meta||{}; c.meta.notes=c.meta.notes||{}; c.meta.notes.general     = notesG.value; }); };
    if (notesS)    notesS.oninput    = function(){ patch(function(c){ c.meta=c.meta||{}; c.meta.notes=c.meta.notes||{}; c.meta.notes.scenario    = notesS.value; }); };
    if (notesP)    notesP.oninput    = function(){ patch(function(c){ c.meta=c.meta||{}; c.meta.notes=c.meta.notes||{}; c.meta.notes.personality = notesP.value; }); };

    // save/load/clear
    if (saveBtn)  saveBtn.onclick  = function(){ if (CFGStore && CFGStore.saveProfile) CFGStore.saveProfile(); if (statusEl) statusEl.textContent='Profile saved.'; };
    if (loadBtn)  loadBtn.onclick  = function(){ if (CFGStore && CFGStore.loadProfile) CFGStore.loadProfile(function(cfg){ setFieldsFrom(cfg||CFGStore.get()); }); };
    if (clearBtn) clearBtn.onclick = function(){ if (CFGStore && CFGStore.clearProfile) CFGStore.clearProfile(); if (statusEl) statusEl.textContent='Profile cleared.'; };

    // exports: call DataShaper if present
    function compile(profile, include){
      if (root.DataShaper && DataShaper.compile) {
        DataShaper.compile(CFGStore.get(), { profile: profile, include: include||{} });
      } else if (root.console && console.warn) {
        console.warn('DataShaper.compile not found');
      }
    }
    if (expCfg)  expCfg.onclick  = function(){ compile('cfg'); };
    if (expLore) expLore.onclick = function(){ compile('lorebook'); };
    if (expCart) expCart.onclick = function(){ compile('cartridge', {
      cinematicNotes: !!(inclCin && inclCin.checked),
      technicalNotes: !!(inclTec && inclTec.checked)
    }); };

    // subscribe to store updates
    if (root.CFGStore && CFGStore.subscribe){
      CFGStore.subscribe(function(cfg){ setFieldsFrom(cfg); });
    }
  };

  api.unmount = function(){
    if (lastRoot) lastRoot.innerHTML = '';
    lastRoot = null;
  };

  root.CMPanel_project = api;
})(window);
