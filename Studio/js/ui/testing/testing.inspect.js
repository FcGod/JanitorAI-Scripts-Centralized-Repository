(function(root){
  'use strict';

  // Inspector helpers: render “why it applied” & quick audit
  function renderWhy(why){
    if (!why) return '<div class="muted">No inspector data.</div>';
    var html = '<div class="why"><div class="why-row"><label>Tone</label><span>'+esc(why.tone)+'</span></div>'+
               '<div class="why-row"><label>Pacing</label><span>'+esc(why.pacing)+'</span></div>'+
               '<div class="why-row"><label>Verbosity</label><span>'+esc(why.verbosity)+'</span></div>';
    if (why.diction) html += '<div class="why-row"><label>Diction</label><span>'+esc(why.diction)+'</span></div>';
    if (why.cue) html += '<div class="why-row"><label>Cue</label><span>'+esc(why.cue.key)+': '+esc(why.cue.text||'')+'</span></div>';
    if (why.quirk) html += '<div class="why-row"><label>Quirk</label><span>'+esc(why.quirk)+'</span></div>';
    html += '</div>';
    return html;
  }

  function quickAudit(msgs){
    // simple checks: snapshot present, 4+ cues, tokens per actor line cap
    var cfg = (root.CFGStore && CFGStore.get && CFGStore.get()) || {};
    var caps = (cfg.params && cfg.params.token_caps) || {};
    var lineCap = caps.actor_line_max || 120;

    var warns = [];
    var i;
    for (i=0;i<msgs.length;i++){
      var m = msgs[i];
      if (m.actor && m.tokens > lineCap){
        warns.push('@'+m.actor+' line exceeds actor_line_max ('+m.tokens+'>'+lineCap+')');
      }
    }
    if (!warns.length) return '<div class="audit ok">No warnings.</div>';
    var html = '<ul class="audit">';
    for (i=0;i<warns.length;i++) html += '<li>'+esc(warns[i])+'</li>';
    html += '</ul>';
    return html;
  }

  function esc(s){ return String(s||'').replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];}); }

  root.TestInspect = { renderWhy: renderWhy, quickAudit: quickAudit };

})(window);
