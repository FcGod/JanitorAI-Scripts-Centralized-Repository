/*! SpeechQuirks Loader (ES5, naturalistic) */
(function (root) {
    'use strict';
    var _ready = false, _subs = [];
    var _library = {
        physical: ['Taps fingers', 'Adjusts glasses', 'Clears throat softly'],
        mental: ['Overexplains simple points', 'Loses track mid-sentence'],
        emotional: ['Laughs quietly when nervous', 'Smiles to smooth tension']
    };

    function notify () {
        for (var i = 0; i < _subs.length; i++) {
            try {
                _subs[i] (_library);
            } catch (_e) {
            }
        }
    }

    function onReady (fn) {
        if (typeof fn === 'function') {
            _subs.push (fn);
            if (_ready) fn (_library);
        }
    }

    function loadJSON (url) {
        try {
            var xhr = new XMLHttpRequest ();
            xhr.open ('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            var data = JSON.parse (xhr.responseText || '{}');
                            if (data && data.physical && data.mental && data.emotional) {
                                _library = data;
                                _ready = true;
                                notify ();
                            }
                        } catch (_e) { /* fallback keeps working */
                        }
                    }
                }
            };
            xhr.send (null);
        } catch (_e) { /* fallback keeps working */
        }
    }

    root.SpeechQuirks = {
        get ready () {
            return _ready;
        },
        onReady: onReady,
        get library () {
            return _library;
        }
    };
    loadJSON ('js/ui/speech/speech.quirks.json');
}) (this);
