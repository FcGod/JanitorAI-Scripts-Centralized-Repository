(function(root){
  'use strict';

  var api = {};

  // Canonical NRC cue categories
  api.keys = [
    'joy','sadness','anger','fear',
    'trust','disgust','anticipation','surprise'
  ];

  // Optional defaults (empty → editor placeholder)
  api.defaults = {
     joy:'Smiles softly, eyes bright.', sadness:'Voice trembles, words slow down.',
    anger:'Speaks sharply, shoulders tense.', fear:'Glances around, tone unsteady.',
    trust:'Leans in slightly, relaxed tone.', disgust:'Wrinkles nose, slight recoil.',
    anticipation:'Quickens speech, leans forward.', surprise:'Brows lift, pauses mid-sentence.'

  };

  // Simple validator (optional for Auditor use)
  api.validate = function(cues){
    var out = {};
    var keys = api.keys;
    for (var i=0;i<keys.length;i++){
      var k = keys[i];
      out[k] = (typeof cues[k] === 'string') ? cues[k] : '';
    }
    return out;
  };

  root.SpeechCues = api;
})(window);
