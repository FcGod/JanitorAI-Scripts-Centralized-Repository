/* =======================================================================
 * FILE: js/lore/lore.validate.js
 * -----------------------------------------------------------------------
 */
(function (root) {
    'use strict';
    root.MythOS = root.MythOS || {};
    root.MythOS.Lore = root.MythOS.Lore || {};
    if (!root.MythOS.Lore.Validate) root.MythOS.Lore.Validate = {};
    var Validate = root.MythOS.Lore.Validate;
    var Model = (root.MythOS.Lore && root.MythOS.Lore.Model) || {};

    /**
     * ==============================================================
     * Module: MythOS.Lore.Validate
     * Purpose: Compute per-entry status and aggregate tallies.
     * Version: 1.0.0
     * Tier: 40 — Library
     * Depends: MythOS.Lore.Model (for categories)
     * Exports:
     *   entry(e, seenMap) : { status:'ok|warn|err', notes:[] }
     *   tally(entries) : { ok:Number, warn:Number, err:Number }
     * ==============================================================
     */

    function validUuid (u) {
        return typeof u === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test (u);
    }

    function entry (e, seen) {
        var status = 'ok';
        var notes = [];
        seen = seen || {};
        if (!validUuid (e.uuid)) {
            status = 'err';
            notes.push ('invalid-uuid');
        }
        if (seen[e.uuid]) {
            status = 'err';
            notes.push ('duplicate-uuid');
        }
        if (!e.content || !String (e.content).trim ()) {
            if (status !== 'err') status = 'warn';
            notes.push ('empty-content');
        }
        var cats = (Model.categories && Model.categories ()) || [];
        if (cats.indexOf (e.category) === -1) {
            if (status !== 'err') status = 'warn';
            notes.push ('unknown-category');
        }
        return {status: status, notes: notes};
    }

    function tally (list) {
        var seen = {};
        var i, v;
        var out = {ok: 0, warn: 0, err: 0};
        for (i = 0; i < (list || []).length; i++) {
            v = entry (list[i], seen);
            seen[list[i].uuid] = 1;
            out[v.status]++;
        }
        return out;
    }

    // API
    Validate.entry = entry;
    Validate.tally = tally;
}) (window);
