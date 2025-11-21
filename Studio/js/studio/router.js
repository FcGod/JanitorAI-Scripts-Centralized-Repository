/**
 * MythOS Studio — Router (ES5)
 * Path: js/studio/router.js
 * Purpose: Minimal UI routing for parent + child tab navigation without external deps.
 *          Designed to be safe/idempotent and to run before any data-binding logic.
 * Conventions:
 *   - Parent bar:  <nav id="cm-parent-tabs"> with buttons [data-parent="basic|advanced|experimental"]
 *   - Wraps:       #wrap-basic, #wrap-advanced, #wrap-experimental
 *   - Child tabs:  within each wrap, first .cm-tabs with buttons [data-tab]
 *   - Panels:      within each wrap, .cm-main contains elements [data-panel]
 * Behavior:
 *   - No localStorage in this file (structure-first). We can add persistence later.
 *   - Sets only the first child panel visible by default in each wrap.
 *   - Advanced & Experimental wrappers can remain hidden by host CSS; the router tolerates this.
 * ES level: ES5-only (no arrow functions, no let/const, no class syntax).
 */
(function (window) {
    'use strict';

    var DOC = window.document;
    if (!window.MythOS) {
        window.MythOS = {};
    }

    /* --------------------------------------------------------------
     * tiny utils
     * -------------------------------------------------------------- */
    function addClass (element, name) {
        if (!element) return;
        if ((' ' + element.className + ' ')
            .indexOf (' ' + name + ' ') !== -1)
            return;
        element.className = element.className ? (element.className + ' ' + name) : name;
    }

    function removeClass (element, name) {
        if (!element) return;
        element.className =
            (' ' + (element.className || '') + ' ')
                .replace (new RegExp ('\\s+' + name + '\\b', 'g'), ' ')
                .replace (/^\s+|\s+$/g, '');
    }

    //QuerySelectorALl shorthand
    function qsa (root, sel) {
        return (root || DOC).querySelectorAll (sel);
    }

    //QuerySelector shorthand
    function qs (root, sel) {
        return (root || DOC).querySelector (sel);
    }

    /* --------------------------------------------------------------
     * child router: toggles panels within a single wrapper
     * -------------------------------------------------------------- */
    function ChildRouter (wrapperId) {
        this.root = DOC.getElementById (wrapperId);
        this.tabs = this.root ? qs (this.root, '.cm-tabs') : null;
        this.main = this.root ? qs (this.root, '.cm-main') : null;
        this.buttons = this.tabs ? qsa (this.tabs, 'button[data-tab]') : [];
        this.panels = this.main ? qsa (this.main, '[data-panel]') : [];
    }

    ChildRouter.prototype.activate = function (id, inputButton) {
        var i, panel, button;
        for (i = 0; i < this.buttons.length; i++) {
            button = this.buttons[i];
            if (button === inputButton) {
                addClass (button, 'is-active-btn');
            } else {
                removeClass (button, 'is-active-btn');
            }
        }
        for (i = 0; i < this.panels.length; i++) {
            panel = this.panels[i];
            if (panel.getAttribute ('data-panel') === id) {
                removeClass (panel, 'is-hidden');
                panel.setAttribute ('aria-hidden', 'false');
            } else {
                addClass (panel, 'is-hidden');
                panel.setAttribute ('aria-hidden', 'true');
            }
        }
    };
    ChildRouter.prototype.bind = function () {
        var self = this;
        if (!this.root || !this.tabs || !this.main) return;

        this.tabs.addEventListener ('click', function (ev) {
            var target = ev.target || ev.srcElement;
            if (!target || !target.getAttribute) return;
            var id = target.getAttribute ('data-tab');
            if (!id) return;

            self.activate (id, target);
        }, false);
        // default to first tab if available
        if (this.buttons.length) {
            this.activate (this.buttons[0].getAttribute ('data-tab'), this.buttons[0]);
        }
    };

    /* --------------------------------------------------------------
     * parent router: toggles top-level wraps
     * -------------------------------------------------------------- */
    function ParentRouter () {
        this.bar = DOC.getElementById ('cm-parent-tabs');
        this.wraps = {
            basic: DOC.getElementById ('wrap-basic'),
            advanced: DOC.getElementById ('wrap-advanced'),
            experimental: DOC.getElementById ('wrap-experimental')
        };
    }

    ParentRouter.prototype.activate = function (name) {
        var key;
        for (key in this.wraps) if (this.wraps.hasOwnProperty (key)) {
            if (this.wraps[key]) {
                this.wraps[key].className = (key === name) ? 'wrap' : 'wrap hidden';
            }
        }
        if (!this.bar) return;
        var buttons = qsa (this.bar, 'button[data-parent]');
        var i, button, is;
        for (i = 0; i < buttons.length; i++) {
            button = buttons[i];
            is = (button.getAttribute ('data-parent') === name);

            if (is) addClass    (button, 'active');
            else    removeClass (button, 'active');
        }
    };
    ParentRouter.prototype.bind = function () {
        var self = this;
        if (!this.bar) return;
        this.bar.addEventListener ('click', function (ev) {
            var eventTarget = ev.target || ev.srcElement;
            if (!eventTarget || !eventTarget.getAttribute) return;
            var which = eventTarget.getAttribute ('data-parent');
            if (!which) return;
            self.activate (which);
        }, false);
        // default selection: basic
        self.activate ('basic');
    };

    /* --------------------------------------------------------------
     * public facade
     * -------------------------------------------------------------- */
    var StudioRouter = {
        version: '1.0.0',
        initAll: function () {
            // Parent
            var parentRouter = new ParentRouter ();
            parentRouter.bind ();
            // Children (safe to bind even if wrapper is hidden)
            new ChildRouter ('wrap-basic').bind ();
            new ChildRouter ('wrap-advanced').bind ();
            new ChildRouter ('wrap-experimental').bind ();
            return true;
        },
        _ChildRouter: ChildRouter,
        _ParentRouter: ParentRouter
    };

    // Export
    window.MythOS.StudioRouter = StudioRouter;

    // Auto-init when DOM is ready
    (function domReady (fn) {
        if (DOC.readyState === 'complete' || DOC.readyState === 'interactive') {
            try {
                fn ();
            } catch (e) {
            }
            return;
        }
        DOC.addEventListener ('DOMContentLoaded', function () {
            try {
                fn ();
            } catch (e) {
            }
        }, false);
    } (function () {
        StudioRouter.initAll ();
    }));

} (window));
