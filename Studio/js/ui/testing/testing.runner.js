(function(root){
  'use strict';

  // Deterministic RNG for repeatable previews
  function SeedPRNG(seed){
    var s = seed|0; if (!s) s = 1234567;
    return function(){
      // xorshift32
      s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
      var u = (s>>>0) / 4294967296;
      return u;
    };
  }

  function getStore(){ return (root.CFGStore && CFGStore.get) ? CFGStore.get() : {actors:{}, params:{}}; }

  function actorsList(){
    var A = (getStore().actors||{}), out=[], k, a, nm;
    for (k in A){
      if (!A.hasOwnProperty(k)) continue;
      a = A[k];
      nm = (a.profile && (a.profile.preferredName||a.profile.fullName)) || k;
      out.push({ id:k, name:nm, data:a });
    }
    return out;
  }

  // Shallow “rules” used for demo decisions — we’ll expand later
  function deriveCueForTone(a, scenarioTone){
    var cues = (a.cues||{}), key;
    // simple mapping; can expand
    var map = {
      neutral:'anticipation', conflict:'anger', comfort:'trust', planning:'anticipation', relief:'surprise'
    };
    key = map[scenarioTone] || 'anticipation';
    return { key:key, text:(cues[key]||'') };
  }

  function sampleQuirk(a, rnd){
    var banks = (a.quirks||{}), all=[], i;
    function push(arr){ if (!arr) return; for (i=0;i<arr.length;i++) all.push(arr[i]); }
    push(banks.physical); push(banks.mental); push(banks.emotional);
    if (!all.length) return '';
    var pick = all[Math.floor(rnd()*all.length)];
    return String(pick||'');
  }

  function buildSystemHeader(scenario, cfg){
    var caps = (cfg.params && cfg.params.token_caps) || {};
    var pool = caps.pool_total!=null ? caps.pool_total : 0;
    return '[MythOS Simulation Preview] Scenario="'+scenario.title+'" Tone='+scenario.tone+' TokenPool='+pool;
  }

  // Token estimate: chars_per_token fallback 4
  function estimateTokens(str){
    var caps = (getStore().params && getStore().params.token_caps) || {};
    var cpt = caps.chars_per_token!=null ? +caps.chars_per_token : 4;
    var chars = (str||'').length|0;
    return Math.max(1, Math.ceil(chars / Math.max(1,cpt)));
  }

  // Compose one actor line using current Studio data + templates
  function renderActorLine(actor, scenario, rnd){
    var a = actor.data || {};
    // tone, pacing, verbosity, diction
    var speech = a.speech || {};
    var handle = (a.profile && (a.profile.preferredName||a.profile.fullName)) || actor.id;

    // cue + quirk
    var cue = deriveCueForTone(a, scenario.tone);
    var quirk = sampleQuirk(a, rnd);

    // template injection (use your helpers when present)
    var line;
    if (root.SpeechTemplates && SpeechTemplates.actor_line){
      line = SpeechTemplates.actor_line(a, { scenario:scenario, cue:cue, quirk:quirk });
    } else {
      // safe fallback
      line = '@'+handle+' ('+(speech.tone||'Neutral')+', '+(speech.pacing||'Even')+', '+(speech.verbosity||'Balanced')+'): ';
      if (cue.text) line += '['+cue.key+': '+cue.text+'] ';
      if (quirk)   line += '{'+quirk+'} ';
      line += (a.summary && a.summary.line) ? a.summary.line : 'speaks in-character.';
    }

    // inspector “why”
    var why = {
      tone: speech.tone||'Neutral',
      pacing: speech.pacing||'Even',
      verbosity: speech.verbosity||'Balanced',
      diction: speech.diction||'',
      cue: cue,
      quirk: quirk
    };

    return { text: line, why: why, tokens: estimateTokens(line) };
  }

  // Run a “chat” of N turns cycling actors
  function runScenario(scenarioId, opts){
    opts = opts||{};
    var cfg = getStore();
    var scenario = (root.TestScenarios && TestScenarios.get(scenarioId)) || { id:'custom', title:'Custom', tone:'neutral', text:'' };
    var rnd = SeedPRNG(opts.seed||1337);

    var roster = actorsList();
    // Keep to 3–6 for readability
    if (roster.length>6) roster = roster.slice(0,6);

    var turns = Math.max(3, opts.turns||6);
    var out = [];

    // System + scene header
    var header = buildSystemHeader(scenario, cfg);
    out.push({ role:'system', text: header, tokens: estimateTokens(header) });
    if (scenario.text){
      out.push({ role:'user', text: scenario.text, tokens: estimateTokens(scenario.text) });
    }

    // Cycle actors
    var i;
    for (i=0;i<turns;i++){
      var actor = roster[i % Math.max(1, roster.length)];
      var line = renderActorLine(actor, scenario, rnd);
      out.push({ role:'assistant', actor:actor.id, text: line.text, why: line.why, tokens: line.tokens });
    }

    // Totals
    var totalTokens = 0, j; for (j=0;j<out.length;j++) totalTokens += out[j].tokens|0;

    return {
      scenario: scenario,
      messages: out,
      totalTokens: totalTokens,
      actors: roster
    };
  }

  root.TestRunner = { runScenario: runScenario, estimateTokens: estimateTokens };

})(window);
