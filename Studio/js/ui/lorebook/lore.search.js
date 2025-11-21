/* =======================================================================
 * FILE: js/lore/lore.search.js
 * -----------------------------------------------------------------------
 */
(function (root) {
    'use strict';
    root.MythOS = root.MythOS || {};
    root.MythOS.Lore = root.MythOS.Lore || {};
    if (!root.MythOS.Lore.Search) root.MythOS.Lore.Search = {};
    var Search = root.MythOS.Lore.Search;
    var Validate = (root.MythOS.Lore && root.MythOS.Lore.Validate) || {};

    /**
     * ==============================================================
     * Module: MythOS.Lore.Search
     * Purpose: Field filtering and status filtering helpers.
     * Version: 1.0.0
     * Tier: 40 — Library
     * Depends: MythOS.Lore.Validate (for status filtering)
     * Exports:
     *   fields() : ['name','content','keysRaw','keysecondaryRaw','uuid']
     *   filterByField(entries, field, query) : entries[]
     *   filterByStatus(entries, status) : entries[]
     * ==============================================================
     */

    var FIELDS = ['name', 'content', 'keysRaw', 'keysecondaryRaw', 'uuid'];

    function fields () {
        return FIELDS.slice ();
    }

    function filterByField (list, field, q) {
        list = (list || []).slice ();
        q = String (q || '').toLowerCase ();
        if (!q) return list;
        var out = [];
        var i;
        for (i = 0; i < list.length; i++) {
            var e = list[i];
            var v = String (field === 'keysRaw' ? e.keysRaw : field === 'keysecondaryRaw' ? e.keysecondaryRaw : e[field] || '').toLowerCase ();
            if (!v) continue;
            if (field === 'uuid') {
                if (v.indexOf (q) === 0) out.push (e);
            } else if (v.indexOf (q) !== -1) out.push (e);
        }
        return out;
    }

    function filterByStatus (list, status) {
        var out = [];
        var seen = {};
        var i, v;
        for (i = 0; i < list.length; i++) {
            v = Validate.entry (list[i], seen);
            seen[list[i].uuid] = 1;
            if (v.status === status) out.push (list[i]);
        }
        return out;
    }

    // API
    Search.fields = fields;
    Search.filterByField = filterByField;
    Search.filterByStatus = filterByStatus;
}) (window);
