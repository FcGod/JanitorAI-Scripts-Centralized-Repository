/* =======================================================================
 * FILE: js/lore/lore.io.js
 * -----------------------------------------------------------------------
 */
(function (root) {
    'use strict';
    root.MythOS = root.MythOS || {};
    root.MythOS.Lore = root.MythOS.Lore || {};
    if (!root.MythOS.Lore.IO) root.MythOS.Lore.IO = {};
    var IO = root.MythOS.Lore.IO;
    var Model = (root.MythOS.Lore && root.MythOS.Lore.Model) || {};

    /**
     * ==============================================================
     * Module: MythOS.Lore.IO
     * Purpose: Import/Export lorebook entries in canonical shapes.
     * Version: 1.0.0
     * Tier: 40 — Library
     * Depends: MythOS.Lore.Model
     * Exports:
     *   import(text, existing, opts) -> { entries, report }
     *   export(entries, opts) -> String
     * ==============================================================
     */

    function makeIndexByUuid (list) {
        var m = {}, i;
        for (i = 0; i < list.length; i++) m[list[i].uuid] = i;
        return m;
    }

    IO.import = function (rawText, existing, opts) {
        existing = (existing || []).slice ();
        opts = opts || {};
        var overwrite = !!opts.overwrite;
        var list;
        var added = 0, overwritten = 0, skipped = 0, errors = 0, note = '';
        try {
            var parsed = JSON.parse (rawText);
            if (Object.prototype.toString.call (parsed) === '[object Array]') list = parsed; else list = (parsed && parsed.entries) || [];
        } catch (e) {
            return {entries: existing, report: {added: 0, overwritten: 0, skipped: 0, errors: 1, note: 'invalid JSON'}};
        }
        var byUuid = makeIndexByUuid (existing);
        var used = {};
        var i;
        for (i = 0; i < existing.length; i++) used[existing[i].uuid] = 1;
        for (i = 0; i < list.length; i++) {
            var item = Model.normalizeEntry (list[i], used);
            var idx = byUuid[item.uuid];
            if (typeof idx === 'number') {
                if (overwrite) {
                    existing[idx] = item;
                    overwritten++;
                } else {
                    skipped++;
                }
            } else {
                existing.push (item);
                added++;
                byUuid[item.uuid] = existing.length - 1;
                used[item.uuid] = 1;
            }
        }
        return {
            entries: existing,
            report: {added: added, overwritten: overwritten, skipped: skipped, errors: errors, note: note}
        };
    };

    IO.export = function (entries, opts) {
        opts = opts || {};
        var compact = !!opts.compact;
        var blob = {entries: (entries || [])};
        return compact ? JSON.stringify (blob) : JSON.stringify (blob, null, 2);
    };
}) (window);
