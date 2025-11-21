/*
 * actors.anatomy.patch.js — Non-destructive addon for existing Actors panel (ES5)
 * Purpose: Injects an "Anatomy / Appendages" card + bindings WITHOUT replacing your current panel.
 * Usage: Load AFTER your current actors.panel.js. It will wrap CMPanel_actors.mount/update and inject the card.
 */
(function (root) {
    'use strict';

    var Patch = {};
    var wrapped = false;

    // ---- Small helpers ----
    function has (x) {
        return x != null && x !== '';
    }

    function el (tag, cls, text) {
        var e = document.createElement (tag);
        if (cls) e.className = cls;
        if (text != null) e.textContent = text;
        return e;
    }

    function empty (n) {
        while (n && n.firstChild) n.removeChild (n.firstChild);
    }

    function getStore () {
        return (root.CFGStore && root.CFGStore.get) ? root.CFGStore.get () : (root.GUI && root.GUI.State && root.GUI.State.CFG) || {actors: {}};
    }

    function patch (mut) {
        if (root.CFGStore && root.CFGStore.patch) return root.CFGStore.patch (mut);
        var cfg = getStore ();
        var res = mut (cfg) || cfg;
        if (root.GUI && root.GUI.State) root.GUI.State.CFG = res;
        return res;
    }

    // Ensure appendage objects exist but DO NOT stomp existing props
    function ensureAppendageHolders (a) {
        a.appearance = a.appearance || {};
        a.appearance.appendages = a.appearance.appendages || {};
    }

    // Anchor discovery: tries to find a right/non-list column to inject into.
    function findDetailColumn (rootEl) {
        // Try common patterns first
        var q = [
            '.actors-detail',
            '.actors-col-right',
            '.actors-right',
            '.cm-actors-right',
            '.panel-body .right',
            '.lb-col.lb-col-right',
            '[data-panel="actors"] .panel-body',
            '.panel-content'
        ];
        for (var i = 0; i < q.length; i++) {
            var el = rootEl.querySelector (q[i]);
            if (el) return el;
        }
        // fallback: append to root
        return rootEl;
    }

    // Build the card UI
    function buildCard () {
        var card = el ('div', 'card myth-anatomy-card');
        card.appendChild (el ('h3', null, 'Anatomy / Appendages'));

        var pres = el ('div', 'an-pres');
        pres.appendChild (toggle ('ap-ears-on', 'Ears present'));
        pres.appendChild (toggle ('ap-tail-on', 'Tail present'));
        pres.appendChild (toggle ('ap-wings-on', 'Wings present'));
        pres.appendChild (toggle ('ap-horns-on', 'Horns present'));

        var cols = el ('div', 'an-cols');
        cols.appendChild (colEars ());
        cols.appendChild (colTail ());
        cols.appendChild (colWings ());
        cols.appendChild (colHorns ());

        card.appendChild (pres);
        card.appendChild (cols);

        return card;

        function row (label, input) {
            var r = el ('div', 'row');
            var L = el ('label', null, label);
            r.appendChild (L);
            r.appendChild (input);
            return r;
        }

        function select (id, opts) {
            var s = document.createElement ('select');
            s.id = id;
            for (var i = 0; i < opts.length; i++) {
                var o = document.createElement ('option');
                o.value = opts[i];
                o.text = opts[i];
                s.appendChild (o);
            }
            return s;
        }

        function number (id, min, max, step) {
            var n = document.createElement ('input');
            n.type = 'number';
            n.id = id;
            n.min = min;
            n.max = max;
            n.step = step;
            return n;
        }

        function range (id) {
            var r = document.createElement ('input');
            r.type = 'range';
            r.id = id;
            r.min = '0';
            r.max = '1';
            r.step = '0.05';
            return r;
        }

        function checkbox (id) {
            var w = el ('label', 'row-toggle');
            var c = document.createElement ('input');
            c.type = 'checkbox';
            c.id = id;
            w.appendChild (c);
            w.appendChild (document.createTextNode (' ' + id.replace (/^ap-/, '').replace (/-/g, ' ')));
            return w;
        }

        function toggle (id, text) {
            var w = el ('label', 'row-toggle');
            var c = document.createElement ('input');
            c.type = 'checkbox';
            c.id = id;
            w.appendChild (c);
            w.appendChild (document.createTextNode (' ' + text));
            return w;
        }

        function colEars () {
            var c = el ('div', 'an-col');
            c.appendChild (el ('h4', null, 'Ears'));
            c.appendChild (row ('Style', select ('ap-ears-style', ['', 'Feline', 'Canine', 'Leporine', 'Fox', 'Pointed', 'Round'])));
            c.appendChild (row ('Position', select ('ap-ears-pos', ['top', 'side'])));
            c.appendChild (row ('Mobility', range ('ap-ears-mob')));
            c.appendChild (row ('Sensitivity', range ('ap-ears-sens')));
            return c;
        }

        function colTail () {
            var c = el ('div', 'an-col');
            c.appendChild (el ('h4', null, 'Tail'));
            c.appendChild (row ('Style', select ('ap-tail-style', ['', 'Feline', 'Canine', 'Fox', 'Wolf', 'Dragon', 'Bovine'])));
            c.appendChild (row ('Length', select ('ap-tail-len', ['short', 'medium', 'long'])));
            c.appendChild (row ('Fluff', range ('ap-tail-fluff')));
            c.appendChild (row ('Mobility', range ('ap-tail-mob')));
            var pre = el ('label', 'row-toggle');
            var cb = document.createElement ('input');
            cb.type = 'checkbox';
            cb.id = 'ap-tail-pre';
            pre.appendChild (cb);
            pre.appendChild (document.createTextNode (' Prehensile'));
            c.appendChild (pre);
            return c;
        }

        function colWings () {
            var c = el ('div', 'an-col');
            c.appendChild (el ('h4', null, 'Wings'));
            c.appendChild (row ('Style', select ('ap-wings-style', ['', 'Feathered', 'Leathery', 'Insect'])));
            c.appendChild (row ('Span (cm)', number ('ap-wings-span', 0, 2000, 1)));
            c.appendChild (row ('Mobility', range ('ap-wings-mob')));
            c.appendChild (row ('Strength', range ('ap-wings-str')));
            c.appendChild (row ('Fold', select ('ap-wings-fold', ['back', 'cloak'])));
            return c;
        }

        function colHorns () {
            var c = el ('div', 'an-col');
            c.appendChild (el ('h4', null, 'Horns'));
            c.appendChild (row ('Style', select ('ap-horns-style', ['', 'Straight', 'Curved', 'Spiral', 'Antlers'])));
            c.appendChild (row ('Length (cm)', number ('ap-horns-len', 0, 200, 1)));
            return c;
        }
    }

    function valueOf (id) {
        var e = document.getElementById (id);
        return e ? e.value : '';
    }

    function checked (id) {
        var e = document.getElementById (id);
        return !!(e && e.checked);
    }

    function setVal (id, v) {
        var e = document.getElementById (id);
        if (e) e.value = (v == null ? '' : v);
    }

    function setChk (id, v) {
        var e = document.getElementById (id);
        if (e) e.checked = !!v;
    }

    function setRange (id, v) {
        var e = document.getElementById (id);
        if (e) e.value = (+v || 0);
    }

    // Fill and bind against current active actor id (read from existing panel state if possible)
    function detectActiveId () {
        // If your panel exposes activeId, use it; else use first actor key
        var A = getStore ().actors || {};
        var k;
        for (k in A) {
            return k;
        }
        return null;
    }

    function fill () {
        var cfg = getStore ();
        var id = detectActiveId ();
        if (!id) return;
        var a = (cfg.actors || {})[id] || {};
        ensureAppendageHolders (a);
        var ad = (a.appearance && a.appearance.appendages) || {};
        setChk ('ap-ears-on', ad.ears && !!ad.ears.present);
        setChk ('ap-tail-on', ad.tail && !!ad.tail.present);
        setChk ('ap-wings-on', ad.wings && !!ad.wings.present);
        setChk ('ap-horns-on', ad.horns && !!ad.horns.present);

        setVal ('ap-ears-style', ad.ears ? ad.ears.style : '');
        setVal ('ap-ears-pos', ad.ears ? ad.ears.position : 'top');
        setRange ('ap-ears-mob', ad.ears ? ad.ears.mobility : 0);
        setRange ('ap-ears-sens', ad.ears ? ad.ears.sensitivity : 0);
        setVal ('ap-tail-style', ad.tail ? ad.tail.style : '');
        setVal ('ap-tail-len', ad.tail ? ad.tail.length : 'medium');
        setRange ('ap-tail-fluff', ad.tail ? ad.tail.fluff : 0);
        setRange ('ap-tail-mob', ad.tail ? ad.tail.mobility : 0);
        setChk ('ap-tail-pre', ad.tail && !!ad.tail.prehensile);
        setVal ('ap-wings-style', ad.wings ? ad.wings.style : '');
        var span = document.getElementById ('ap-wings-span');
        if (span) span.value = ad.wings ? (+ad.wings.span_cm || 0) : 0;
        setRange ('ap-wings-mob', ad.wings ? ad.wings.mobility : 0);
        setRange ('ap-wings-str', ad.wings ? ad.wings.strength : 0);
        setVal ('ap-wings-fold', ad.wings ? ad.wings.fold : 'back');
        setVal ('ap-horns-style', ad.horns ? ad.horns.style : '');
        var len = document.getElementById ('ap-horns-len');
        if (len) len.value = ad.horns ? (+ad.horns.length_cm || 0) : 0;
    }

    function bind () {
        bindChk ('ap-ears-on', function (on) {
            toggle ('ears', on);
        });
        bindChk ('ap-tail-on', function (on) {
            toggle ('tail', on);
        });
        bindChk ('ap-wings-on', function (on) {
            toggle ('wings', on);
        });
        bindChk ('ap-horns-on', function (on) {
            toggle ('horns', on);
        });

        bindSel ('ap-ears-style', ['appearance', 'appendages', 'ears', 'style']);
        bindSel ('ap-ears-pos', ['appearance', 'appendages', 'ears', 'position']);
        bindRange ('ap-ears-mob', ['appearance', 'appendages', 'ears', 'mobility']);
        bindRange ('ap-ears-sens', ['appearance', 'appendages', 'ears', 'sensitivity']);

        bindSel ('ap-tail-style', ['appearance', 'appendages', 'tail', 'style']);
        bindSel ('ap-tail-len', ['appearance', 'appendages', 'tail', 'length']);
        bindRange ('ap-tail-fluff', ['appearance', 'appendages', 'tail', 'fluff']);
        bindRange ('ap-tail-mob', ['appearance', 'appendages', 'tail', 'mobility']);
        bindChk ('ap-tail-pre', function (on) {
            write (['appearance', 'appendages', 'tail', 'prehensile'], !!on);
        });

        bindSel ('ap-wings-style', ['appearance', 'appendages', 'wings', 'style']);
        bindNum ('ap-wings-span', ['appearance', 'appendages', 'wings', 'span_cm']);
        bindRange ('ap-wings-mob', ['appearance', 'appendages', 'wings', 'mobility']);
        bindRange ('ap-wings-str', ['appearance', 'appendages', 'wings', 'strength']);
        bindSel ('ap-wings-fold', ['appearance', 'appendages', 'wings', 'fold']);

        bindSel ('ap-horns-style', ['appearance', 'appendages', 'horns', 'style']);
        bindNum ('ap-horns-len', ['appearance', 'appendages', 'horns', 'length_cm']);
    }

    function write (path, val) {
        patch (function (cfg) {
            var id = detectActiveId ();
            var a = (cfg.actors || {})[id];
            if (!a) return cfg;
            var o = a, i;
            for (i = 0; i < path.length - 1; i++) {
                o[path[i]] = o[path[i]] || {};
                o = o[path[i]];
            }
            o[path[path.length - 1]] = val;
            return cfg;
        });
    }

    function bindSel (id, path) {
        var e = document.getElementById (id);
        if (e) e.onchange = function () {
            write (path, String (e.value || ''));
        };
    }

    function bindChk (id, cb) {
        var e = document.getElementById (id);
        if (e) e.onchange = function () {
            cb (!!e.checked);
        };
    }

    function bindRange (id, path) {
        var e = document.getElementById (id);
        if (e) e.oninput = function () {
            var v = parseFloat (e.value);
            if (isNaN (v)) v = 0;
            if (v < 0) v = 0;
            if (v > 1) v = 1;
            write (path, v);
        };
    }

    function bindNum (id, path) {
        var e = document.getElementById (id);
        if (e) e.oninput = function () {
            var v = +e.value || 0;
            if (v < 0) v = 0;
            write (path, v);
        };
    }

    function toggle (key, on) {
        patch (function (cfg) {
            var id = detectActiveId ();
            var a = (cfg.actors || {})[id];
            if (!a) return cfg;
            a.appearance = a.appearance || {};
            a.appearance.appendages = a.appearance.appendages || {};
            if (on) {
                a.appearance.appendages[key] = a.appearance.appendages[key] || {};
                a.appearance.appendages[key].present = true;
            } else {
                if (a.appearance.appendages[key]) delete a.appearance.appendages[key];
            }
            return cfg;
        });
    }

    // ---- Injection wrapper ----
    function injectInto (rootEl) {
        if (!rootEl || rootEl.__anatomyInjected) return;
        var col = findDetailColumn (rootEl);
        var card = buildCard ();
        // place near the end to avoid disrupting existing layout
        col.appendChild (card);
        fill ();
        bind ();
        rootEl.__anatomyInjected = true;
    }

    Patch.enable = function () {
        if (wrapped) return;
        wrapped = true;
        var Panel = root.CMPanel_actors;
        if (!Panel || !Panel.mount) {
            console.warn ('[anatomy.patch] CMPanel_actors not found. Load this after your actors.panel.js');
            return;
        }
        var _mount = Panel.mount;
        var _update = Panel.update || function () {
        };
        Panel.mount = function (container) {
            _mount.call (Panel, container);
            try {
                injectInto (container);
            } catch (e) {
            }
        };
        Panel.update = function () {
            _update.call (Panel);
            var container = (typeof document !== 'undefined') ? document.querySelector ('[data-panel="actors"], .actors-wrap, .panel-actors') : null;
            if (container) try {
                injectInto (container);
            } catch (e) {
            }
        };
    };

    root.MythOSActorsAnatomyPatch = Patch;

}) (this);
