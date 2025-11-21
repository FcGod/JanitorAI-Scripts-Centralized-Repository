(function (root) {
    'use strict';

    var api = {};

    // 0–100 mappings (extremes reach 100)
    function mapVerbosity (v) {
        var m = {'Terse': 20, 'Balanced': 60, 'Verbose': 100};
        return m[v] || 0;
    }

    function mapPacing (v) {
        var m = {'Slow': 25, 'Even': 60, 'Quick': 85, 'Erratic': 100};
        return m[v] || 0;
    }

    function mapTone (v) {
        // Neutral sits mid-low; Commanding tops out
        var m = {'Neutral': 35, 'Warm': 50, 'Playful': 60, 'Formal': 55, 'Irritable': 80, 'Commanding': 100};
        return m[v] || 0;
    }

    function setMeter (container, id, pct) {
        var el = container && container.querySelector ('#' + id);
        if (!el) return;
        el.style.width = (pct | 0) + '%';
    }

    api.update = function (containerEl, actor) {
        if (!containerEl || !actor) return;
        var s = actor.speech || {};
        setMeter (containerEl, 'm-tone', mapTone (s.tone));
        setMeter (containerEl, 'm-pacing', mapPacing (s.pacing));
        setMeter (containerEl, 'm-verbosity', mapVerbosity (s.verbosity));
    };

    root.SpeechMeters = api;

}) (window);
