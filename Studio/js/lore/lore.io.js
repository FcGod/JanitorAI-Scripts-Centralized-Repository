/*
 * MythOS Studio — Lorebook Import/Export & Validation
 * Path: /js/lore/lore.io.js
 * Purpose: Round-trip Lorebook entries via JSON; validate minimal schema; toggle overwrite on import.
 * Public API (window.LoreIO):
 *   - export(cfg)                  : { json:string, count:number }
 *   - validateEntry(entry)         : { ok:boolean, errors:string[] }
 *   - import(cfg, text, opts)      : { added:number, updated:number, skipped:number, errors:string[] }
 *       opts.overwrite (bool)      : replace existing entries with same UUID when true
 * Dependencies: none (operates on cfg.lorebook.entries).
 * Emits/Side-effects: mutates cfg.lorebook.entries in-place.
 * Versioning: ES5 only; Studio-only fields are NOT persisted in exported JSON.
 */
(function (root) {
    'use strict';

    function ensure (cfg) {
        cfg = cfg || {};
        cfg.lorebook = cfg.lorebook || {};
        cfg.lorebook.entries = cfg.lorebook.entries || [];
        return cfg;
    }

    function byUUID (cfg, uuid) {
        var lorebookEntries = (cfg.lorebook && cfg.lorebook.entries) || [];
        var i;
        for (i = 0; i < lorebookEntries.length; i++) {
            if (lorebookEntries[i] && lorebookEntries[i].uuid === uuid) return lorebookEntries[i];
        }
        return null;
    }

    function validateEntry (entry) {
        var errs = [];
        if (!entry || typeof entry !== 'object') errs.push ('not an object');
        if (!entry || !entry.uuid) errs.push ('uuid missing');
        if (!entry || !entry.category) errs.push ('category missing');
        if (!entry || !String (entry.content || '').trim ()) errs.push ('content missing');
        return {ok: !errs.length, errors: errs};
    }

    function exportJSON (cfg) {
        ensure (cfg);
        var list = (cfg.lorebook && cfg.lorebook.entries) || [];
        return {json: JSON.stringify (list, null, 2), count: list.length};
    }

    function importJSON (cfg, text, opts) {
        ensure (cfg);
        opts = opts || {};
        var overwrite = !!opts.overwrite;
        var added = 0, updated = 0, skipped = 0, errors = [];
        var entriesData;

        try {
            entriesData = JSON.parse (String (text || ''));
        } catch (_e) {
            return {added: 0, updated: 0, skipped: 0, errors: ['invalid JSON']};
        }

        if (Object.prototype.toString.call (entriesData) !== '[object Array]') {
            return {added: 0, updated: 0, skipped: 0, errors: ['expected array of entries']};
        }

        var i;
        for (i = 0; i < entriesData.length; i++) {
            var e = entriesData[i];
            var validEntry = validateEntry (e);
            if (!validEntry.ok) {
                errors.push ('row ' + i + ': ' + validEntry.errors.join (', '));
                continue;
            }

            var existing = byUUID (cfg, e.uuid);
            if (existing) {
                if (overwrite) {
                    // Replace entry (shallow)
                    cfg.lorebook.entries[cfg.lorebook.entries.indexOf (existing)] = e;
                    updated++;
                } else {
                    skipped++;
                }
            } else {
                cfg.lorebook.entries.push (e);
                added++;
            }
        }
        return {added: added, updated: updated, skipped: skipped, errors: errors};
    }

    root.LoreIO = {export: exportJSON, import: importJSON, validateEntry: validateEntry};
}) (window);
