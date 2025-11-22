(function(root){
  'use strict';

  var api = {};

  api.render = function(actor){
    if (!actor) return '';
    var pref = (actor.profile && actor.profile.preferredName) || actor.id;
    var tone = (actor.speech && actor.speech.tone) || 'neutral';
    var snap = (actor.summary && actor.summary.line) || '';
    var phr = (actor.speech && actor.speech.diction) ? ' ('+actor.speech.diction+')' : '';
    return '@' + pref + ' [' + tone + phr + ']: ' + snap;
  };

  root.SpeechPreview = api;
})(window);
