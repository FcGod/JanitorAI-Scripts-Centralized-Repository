(function(root){
  'use strict';

  var api = {};

  // Render a chip list into a container
  api.render = function(selector, arr){
    var el = (typeof selector === 'string') ? document.querySelector(selector) : selector;
    if (!el) return;
    var html = '';
    if (!arr || !arr.length) html = '<div class="muted">No entries.</div>';
    else {
      for (var i=0;i<arr.length;i++){
        html += '<span class="chip">'+arr[i]+'</span> ';
      }
    }
    el.innerHTML = html;
  };

  // Bind a container for simple comma-separated input → patch
  api.bind = function(containerSel, activeId, patchFn){
    var c = (typeof containerSel === 'string') ? document.querySelector(containerSel) : containerSel;
    if (!c) return;
    // Add input fields dynamically for each quirk type
    var groups = ['physical','mental','emotional'];
    var html = '';
    for (var i=0;i<groups.length;i++){
      html += '<div class="chip-group">'+
              '<label style="font-weight:600; text-transform:capitalize;">'+groups[i]+'</label>'+
              '<input id="chip-'+groups[i]+'" type="text" placeholder="comma separated" style="width:100%; margin-bottom:6px;">'+
              '</div>';
    }
    c.innerHTML = html;

    for (var j=0;j<groups.length;j++){
      (function(key){
        var input = c.querySelector('#chip-'+key);
        if (!input) return;
        input.oninput = function(){
          var val = input.value.split(',').map(function(s){return s.trim();}).filter(Boolean);
          patchFn(function(cfg){
            var a = cfg.actors[activeId]; if (!a.quirks) a.quirks = {};
            a.quirks[key] = val;
          });
        };
      })(groups[j]);
    }
  };

  root.SpeechChips = api;
})(window);
