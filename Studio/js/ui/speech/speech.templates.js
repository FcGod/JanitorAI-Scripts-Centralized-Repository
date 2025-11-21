(function (root) {
    'use strict';

    var api = {};

    // Snapshot line generator (used by sp-regen)
    api.snapshot = function (actor) {
        if (!actor) return '';
        var tone = (actor.speech && actor.speech.tone) || 'neutral';
        var pref = (actor.profile && actor.profile.preferredName) || actor.id || 'unknown';
        var quirks = (actor.quirks && actor.quirks.physical && actor.quirks.physical[0]) || '';
        var diction = (actor.speech && actor.speech.diction) || '';
        var line = pref + ' speaks in a ' + tone + ' tone';
        if (quirks) line += ', showing a hint of ' + quirks;
        if (diction) line += ' with ' + diction + ' phrasing';
        line += '.';
        return line;
    };

    // Optionally, templates for other exports
    api.templates = {
        cue: '@{handle} [{tone}] {line}'
    };

    root.SpeechTemplates = api;
}) (window);
