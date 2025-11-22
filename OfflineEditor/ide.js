/**
 * JAI OFFLINE EDITOR
 * :(
 */

// --- 1. DEFINITIONS & TEMPLATES ---
const TYPES_SOURCE = `
interface LoreEntry {
    keywords?: string[];
    tag?: string;
    triggers?: string[];
    priority?: 1 | 2 | 3 | 4 | 5;
    probability?: number | string;
    requires?: { any?: string[]; all?: string[]; none?: string[]; };
    requireAny?: string[]; requireAll?: string[]; requireNone?: string[];
    block?: string[]; nameBlock?: string[];
    minMessages?: number; maxMessages?: number;
    personality?: string; scenario?: string;
    Shifts?: LoreEntry[];
}
declare var context: {
    character: { personality: string; scenario: string; name: string; };
    chat: { message_count: number; last_message: string; last_messages: Array<{message:string}>; };
};
`;

const ENGINE_SOURCE = `/* ============================================================================
   ADVANCED LORE BOOK SYSTEM v12
   Author: Icehellionx
   ========================================================================== */

var DEBUG = 0;
var APPLY_LIMIT = 6;

context.character = context.character || {};
context.character.personality = typeof context.character.personality === "string" ? context.character.personality : "";
context.character.scenario = typeof context.character.scenario === "string" ? context.character.scenario : "";

var WINDOW_DEPTH = (function (n) {
  n = parseInt(n, 10);
  if (isNaN(n)) n = 5;
  if (n < 1) n = 1;
  if (n > 20) n = 20;
  return n;
})(typeof WINDOW_DEPTH === "number" ? WINDOW_DEPTH : 5);

function _str(x) { return x == null ? "" : String(x); }
function _normalizeText(s) {
  s = _str(s).toLowerCase();
  s = s.replace(/[^a-z0-9_\\s-]/g, " ");
  s = s.replace(/[-_]+/g, " ");
  s = s.replace(/\\s+/g, " ").trim();
  return s;
}

var _lmArr = context && context.chat && context.chat.last_messages && typeof context.chat.last_messages.length === "number" ? context.chat.last_messages : null;
var _joinedWindow = "";
var _rawLastSingle = "";

if (_lmArr && _lmArr.length > 0) {
  var startIdx = Math.max(0, _lmArr.length - WINDOW_DEPTH);
  var segs = [];
  for (var i = startIdx; i < _lmArr.length; i++) {
    var item = _lmArr[i];
    var msg = item && typeof item.message === "string" ? item.message : _str(item);
    segs.push(_str(msg));
  }
  _joinedWindow = segs.join(" ");
  var lastItem = _lmArr[_lmArr.length - 1];
  _rawLastSingle = _str(lastItem && typeof lastItem.message === "string" ? lastItem.message : lastItem);
} else {
  var _lastMsgA = context && context.chat && typeof context.chat.lastMessage === "string" ? context.chat.lastMessage : "";
  var _lastMsgB = context && context.chat && typeof context.chat.last_message === "string" ? context.chat.last_message : "";
  _rawLastSingle = _str(_lastMsgA || _lastMsgB);
  _joinedWindow = _rawLastSingle;
}

var CHAT_WINDOW = {
  depth: WINDOW_DEPTH,
  count_available: _lmArr && _lmArr.length ? _lmArr.length : _rawLastSingle ? 1 : 0,
  text_joined: _joinedWindow,
  text_last_only: _rawLastSingle,
  text_joined_norm: _normalizeText(_joinedWindow),
  text_last_only_norm: _normalizeText(_rawLastSingle),
};
var last = " " + CHAT_WINDOW.text_joined_norm + " ";

var messageCount = 0;
if (_lmArr && typeof _lmArr.length === "number") { messageCount = _lmArr.length; }
else if (context && context.chat && typeof context.chat.message_count === "number") { messageCount = context.chat.message_count; }
else if (typeof context_chat_message_count === "number") { messageCount = context_chat_message_count; }

var activeName = _normalizeText(context && context.character && typeof context.character.name === "string" ? context.character.name : "");

function dbg(msg) { try { if (typeof DEBUG !== "undefined" && DEBUG) { context.character.personality += "\\n\\n[DBG] " + String(msg); } } catch (e) {} }
function arr(x) { return Array.isArray(x) ? x : x == null ? [] : [x]; }
function clamp01(v) { v = +v; if (!isFinite(v)) return 0; return Math.max(0, Math.min(1, v)); }
function parseProbability(v) { if (v == null) return 1; if (typeof v === "number") return clamp01(v); var s = String(v).trim().toLowerCase(); var n = parseFloat(s.replace("%", "")); if (!isFinite(n)) return 1; return s.indexOf("%") !== -1 ? clamp01(n / 100) : clamp01(n); }
function prio(e) { var p = e && isFinite(e.priority) ? +e.priority : 3; if (p < 1) p = 1; if (p > 5) p = 5; return p; }
function getMin(e) { return e && isFinite(e.minMessages) ? +e.minMessages : -Infinity; }
function getMax(e) { return e && isFinite(e.maxMessages) ? +e.maxMessages : Infinity; }
function getKW(e) { return e && Array.isArray(e.keywords) ? e.keywords.slice(0) : []; }
function getTrg(e) { return e && Array.isArray(e.triggers) ? e.triggers.slice(0) : []; }
function getBlk(e) { if (!e) return []; if (Array.isArray(e.block)) return e.block.slice(0); if (Array.isArray(e.Block)) return e.Block.slice(0); return []; }
function getNameBlock(e) { return e && Array.isArray(e.nameBlock) ? e.nameBlock.slice(0) : []; }
function normName(s) { return _normalizeText(s); }
function isNameBlocked(e) { if (!activeName) return false; var nb = getNameBlock(e); for (var i = 0; i < nb.length; i++) { var n = normName(nb[i]); if (!n) continue; if (n === activeName) return true; if (activeName.indexOf(n) !== -1) return true; if (n.indexOf(activeName + " ") === 0) return true; } return false; }
function reEsc(s) { return String(s).replace(/[.*+?^\\\\\${}()|[\\]\\\\]/g, "\\\\$&"); }
function hasTerm(hay, term) { var t = (term == null ? "" : String(term)).toLowerCase().trim(); if (!t) return false; if (t.charAt(t.length - 1) === "*") { var stem = reEsc(t.slice(0, -1)); var re1 = new RegExp("(?:^|\\\\s)" + stem + "[a-z]*?(?=\\\\s|$)"); return re1.test(hay); } var w = reEsc(t); var re2 = new RegExp("(?:^|\\\\s)" + w + "(?=\\\\s|$)"); return re2.test(hay); }
function collectWordGates(e) { var r = e && e.requires ? e.requires : {}; var any = [].concat(arr(e && e.requireAny), arr(e && e.andAny), arr(r.any)); var all = [].concat(arr(e && e.requireAll), arr(e && e.andAll), arr(r.all)); var none = [].concat(arr(e && e.requireNone), arr(e && e.notAny), arr(r.none), arr(getBlk(e))); var nall = [].concat(arr(e && e.notAll)); return { any: any, all: all, none: none, nall: nall }; }
function wordGatesPass(e) { var g = collectWordGates(e); if (g.any.length && !g.any.some(function (w) { return hasTerm(last, w); })) return false; if (g.all.length && !g.all.every(function (w) { return hasTerm(last, w); })) return false; if (g.none.length && g.none.some(function (w) { return hasTerm(last, w); })) return false; if (g.nall.length && g.nall.every(function (w) { return hasTerm(last, w); })) return false; return true; }
function tagsPass(e, activeTagsSet) { var anyT = arr(e && e.andAnyTags); var allT = arr(e && e.andAllTags); var noneT = arr(e && e.notAnyTags); var nallT = arr(e && e.notAllTags); var hasT = function (t) { return !!activeTagsSet && activeTagsSet[String(t)] === 1; }; if (anyT.length && !anyT.some(hasT)) return false; if (allT.length && !allT.every(hasT)) return false; if (noneT.length && noneT.some(hasT)) return false; if (nallT.length && nallT.every(hasT)) return false; return true; }
function isAlwaysOn(e) { var hasKW = !!(e && e.keywords && e.keywords.length); var hasTag = !!(e && e.tag); var hasMin = e && e.minMessages != null; var hasMax = e && e.maxMessages != null; return !hasKW && !hasTag && !hasMin && !hasMax; }
function entryPasses(e, activeTagsSet) { if (!(messageCount >= getMin(e) && messageCount <= getMax(e))) return false; if (isNameBlocked(e)) return false; if (!wordGatesPass(e)) return false; if (!tagsPass(e, activeTagsSet || {})) return false; if (Math.random() > parseProbability(e && e.probability)) return false; return true; }

var dynamicLore = [
  //TODO_ENTRIES
];

//TODO_FUNCTIONS

function compileAuthorLore(authorLore) { var src = Array.isArray(authorLore) ? authorLore : []; var out = new Array(src.length); for (var i = 0; i < src.length; i++) out[i] = normalizeEntry(src[i]); return out; }
function normalizeEntry(e) { if (!e) return {}; var out = {}; for (var k in e) if (Object.prototype.hasOwnProperty.call(e, k)) out[k] = e[k]; out.keywords = Array.isArray(e.keywords) ? e.keywords.slice(0) : []; if (Array.isArray(e.Shifts) && e.Shifts.length) { var shArr = new Array(e.Shifts.length); for (var i = 0; i < e.Shifts.length; i++) { var sh = e.Shifts[i] || {}; var shOut = {}; for (var sk in sh) if (Object.prototype.hasOwnProperty.call(sh, sk)) shOut[sk] = sh[sk]; shOut.keywords = Array.isArray(sh.keywords) ? sh.keywords.slice(0) : []; shArr[i] = shOut; } out.Shifts = shArr; } else if (out.hasOwnProperty("Shifts")) { delete out.Shifts; } return out; }
var _ENGINE_LORE = compileAuthorLore(typeof dynamicLore !== "undefined" ? dynamicLore : []);

var buckets = [null, [], [], [], [], []];
var picked = new Array(_ENGINE_LORE.length);
for (var __i = 0; __i < picked.length; __i++) picked[__i] = 0;
function makeTagSet() { return Object.create(null); }
var trigSet = makeTagSet();
var postShiftTrigSet = makeTagSet();
function addTag(set, key) { set[String(key)] = 1; }
function hasTag(set, key) { return set[String(key)] === 1; }

for (var i1 = 0; i1 < _ENGINE_LORE.length; i1++) { var e1 = _ENGINE_LORE[i1]; var hit = isAlwaysOn(e1) || getKW(e1).some(function (kw) { return hasTerm(last, kw); }); if (!hit) continue; if (!entryPasses(e1, undefined)) { dbg("filtered entry[" + i1 + "]"); continue; } buckets[prio(e1)].push(i1); picked[i1] = 1; var trg1 = getTrg(e1); for (var t1 = 0; t1 < trg1.length; t1++) addTag(trigSet, trg1[t1]); dbg("hit entry[" + i1 + "] p=" + prio(e1)); }

for (var i2 = 0; i2 < _ENGINE_LORE.length; i2++) { if (picked[i2]) continue; var e2 = _ENGINE_LORE[i2]; if (!(e2 && e2.tag && hasTag(trigSet, e2.tag))) continue; if (!entryPasses(e2, trigSet)) { dbg("filtered triggered entry[" + i2 + "]"); continue; } buckets[prio(e2)].push(i2); picked[i2] = 1; var trg2 = getTrg(e2); for (var t2 = 0; t2 < trg2.length; t2++) addTag(trigSet, trg2[t2]); dbg("triggered entry[" + i2 + "] p=" + prio(e2)); }

var selected = []; var pickedCount = 0; var __APPLY_LIMIT = typeof APPLY_LIMIT === "number" && APPLY_LIMIT >= 1 ? APPLY_LIMIT : 99999;
for (var p = 5; p >= 1 && pickedCount < __APPLY_LIMIT; p--) { var bucket = buckets[p]; for (var bi = 0; bi < bucket.length && pickedCount < __APPLY_LIMIT; bi++) { selected.push(bucket[bi]); pickedCount++; } }
if (pickedCount === __APPLY_LIMIT) dbg("APPLY_LIMIT reached");

var bufP = ""; var bufS = "";
for (var si = 0; si < selected.length; si++) { var idx = selected[si]; var e3 = _ENGINE_LORE[idx]; if (e3 && e3.personality) bufP += "\\n\\n" + e3.personality; if (e3 && e3.scenario) bufS += "\\n\\n" + e3.scenario; if (!(e3 && Array.isArray(e3.Shifts) && e3.Shifts.length)) continue; for (var shI = 0; shI < e3.Shifts.length; shI++) { var sh = e3.Shifts[shI]; var activated = isAlwaysOn(sh) || getKW(sh).some(function (kw) { return hasTerm(last, kw); }); if (!activated) continue; var trgSh = getTrg(sh); for (var tt = 0; tt < trgSh.length; tt++) addTag(postShiftTrigSet, trgSh[tt]); if (!entryPasses(sh, trigSet)) { dbg("shift filtered"); continue; } if (sh.personality) bufP += "\\n\\n" + sh.personality; if (sh.scenario) bufS += "\\n\\n" + sh.scenario; } }

var unionTags = (function () { var dst = makeTagSet(), k; for (k in trigSet) if (trigSet[k] === 1) dst[k] = 1; for (k in postShiftTrigSet) if (postShiftTrigSet[k] === 1) dst[k] = 1; return dst; })();
for (var i3 = 0; i3 < _ENGINE_LORE.length; i3++) { if (picked[i3]) continue; var e4 = _ENGINE_LORE[i3]; if (!(e4 && e4.tag && hasTag(postShiftTrigSet, e4.tag))) continue; if (!entryPasses(e4, unionTags)) { dbg("post-filter entry[" + i3 + "]"); continue; } if (e4.personality) bufP += "\\n\\n" + e4.personality; if (e4.scenario) bufS += "\\n\\n" + e4.scenario; dbg("post-shift triggered entry[" + i3 + "] p=" + prio(e4)); }

if (bufP) context.character.personality += bufP;
if (bufS) context.character.scenario += bufS;
`;


// --- 2. APP LOGIC ---
var app = {
    editors: {},

    defaultLore: `var _hidden = [
// Example Entry
{
    keywords: ["hello"],
    priority: 5,
    personality: " {{char}} waves hello."
},
];`,
    defaultFunc: `// Example custom function
if (context.chat.message_count > 10) {
    context.character.scenario += "[Secret]";
}`,

    initMonaco: function () {
        console.log("Initialize Monaco...");
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs' } });

        require(['vs/editor/editor.main'], function () {

            // --- COMPLETION PROVIDER ---
            monaco.languages.registerCompletionItemProvider('javascript', {
                provideCompletionItems: function (model, position) {
                    const textUntilPosition = model.getValueInRange({
                        startLineNumber: 1,
                        startColumn: 1,
                        endLineNumber: position.lineNumber,
                        endColumn: position.column
                    });

                    const word = model.getWordUntilPosition(position);
                    const range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn
                    };

                    const uri = model.uri.toString();
                    const suggestions = [];

                    // 1. LORE EDITOR SNIPPETS
                    if (uri.endsWith("lore.js")) {
                        // always -> L0
                        suggestions.push({
                            label: 'always',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '{\n    personality: " ${1}"\n},',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'L0: Always-on entry',
                            range: range
                        });

                        // basic -> L1
                        suggestions.push({
                            label: 'basic',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '{\n    keywords: ["${1}"],\n    personality: " ${2}"\n},',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'L1: Basic keyword entry',
                            range: range
                        });

                        // entry -> L2a (Complex/Time)
                        suggestions.push({
                            label: 'entry',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '{\n    keywords: ["${1}"],\n    priority: ${2:4},\n    triggers: ["${3}"],\n    requireNone: ["${4}"],\n    personality: " ${5}"\n},',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'L2a: Complex entry with priority and triggers',
                            range: range
                        });

                        // tag -> L2b (Tag-based)
                        suggestions.push({
                            label: 'tag',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '{\n    tag: "${1}",\n    priority: ${2:5},\n    personality: " ${3}"\n},',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'L2b: Tag-based entry',
                            range: range
                        });

                        // all -> Comprehensive
                        suggestions.push({
                            label: 'all',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '{\n    keywords: ["${1}"],\n    priority: ${2:4},\n    probability: "${3:100%}",\n    triggers: ["${4}"],\n    tag: "${5}",\n    requires: { any: [], all: [], none: [] },\n    block: [],\n    minMessages: ${6:0},\n    maxMessages: ${7:10},\n    personality: " ${8}",\n    scenario: " ${9}"\n},',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Comprehensive entry with all properties',
                            range: range
                        });

                        // pers / personality -> Simple entry
                        const persSnippet = {
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '{\n    personality: " ${1}"\n},',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Simple personality entry',
                            range: range
                        };
                        suggestions.push({ ...persSnippet, label: 'pers' });
                        suggestions.push({ ...persSnippet, label: 'perso' });
                        suggestions.push({ ...persSnippet, label: 'personality' });
                    }

                    // 2. SCRIPT EDITORS SNIPPETS (Custom & Offline)
                    if (uri.endsWith("script.js") || uri.endsWith("offline.js")) {
                        // personality
                        suggestions.push({
                            label: 'perso',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'context.character.personality += "${1}";',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Append to personality',
                            range: range
                        });

                        // scenario
                        suggestions.push({
                            label: 'scenario',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'context.character.scenario += "${1}";',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Append to scenario',
                            range: range
                        });

                        // last_message
                        suggestions.push({
                            label: 'last_me',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'context.chat.last_message',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Get last message',
                            range: range
                        });
                    }

                    return { suggestions: suggestions };
                }
            });

            // ---------------------------------------------------------
            // SANDBOX CONFIGURATION (Restrict Auto-completion)
            // ---------------------------------------------------------
            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ES2020,
                allowNonTsExtensions: true,
                noLib: true, // DISABLE Standard Library (DOM, etc.)
                allowSyntheticDefaultImports: true
            });

            // Define SAFE environment (ES6 + Console + Math + etc.)
            // We exclude DOM globals like window, document, fetch, etc.
            var safeLib = `
                declare var console: { 
                    log(...args: any[]): void; 
                    error(...args: any[]): void; 
                    warn(...args: any[]): void; 
                };
                declare var Math: Math;
                declare var Date: DateConstructor;
                declare var JSON: JSON;
                declare var RegExp: RegExpConstructor;
                declare var Object: ObjectConstructor;
                declare var Array: ArrayConstructor;
                declare var String: StringConstructor;
                declare var Number: NumberConstructor;
                declare var Boolean: BooleanConstructor;
                declare var Function: FunctionConstructor;
                declare var Symbol: SymbolConstructor;
                declare var Error: ErrorConstructor;
                declare var Map: MapConstructor;
                declare var Set: SetConstructor;
                declare var Promise: PromiseConstructor; // Allowed in syntax, but blocked at runtime if async used
                declare var Proxy: ProxyConstructor;
                
                // Context Globals
                declare var context: {
                    character: { personality: string; scenario: string; name: string; };
                    chat: { message_count: number; last_message: string; last_messages: any[]; };
                };
            `;

            // Add ES5/ES6 core definitions (simplified)
            monaco.languages.typescript.javascriptDefaults.addExtraLib(safeLib, 'ts:filename/safe.d.ts');

            // Inject Types
            monaco.languages.typescript.javascriptDefaults.addExtraLib(TYPES_SOURCE, 'janitor.d.ts');

            // ---------------------------------------------------------
            // EDITOR INITIALIZATION
            // ---------------------------------------------------------


            // CREATE EDITORS
            // 1. Lore
            app.editors.lore = monaco.editor.create(document.getElementById('editor-lore'), {
                value: app.defaultLore,
                language: 'javascript',
                theme: 'vs-dark',
                minimap: { enabled: false },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                lineNumbers: function (lineNumber) {
                    return lineNumber - 1;
                },
                model: monaco.editor.createModel(app.defaultLore, "javascript", monaco.Uri.parse("file:///lore.js"))
            });

            // Function to hide wrapper lines
            const updateHiddenAreas = () => {
                const lineCount = app.editors.lore.getModel().getLineCount();
                app.editors.lore.setHiddenAreas([
                    new monaco.Range(1, 1, 1, 1), // Hide first line
                    new monaco.Range(lineCount, 1, lineCount, 1) // Hide last line
                ]);
            };

            // Initial hide
            updateHiddenAreas();


            // Custom Command: Override Ctrl+A to select only visible content
            // Use addAction with precondition to ensure it only triggers when THIS editor is focused
            app.editors.lore.addAction({
                id: 'select-all-visible-lore',
                label: 'Select All Visible',
                keybindings: [
                    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyA
                ],
                precondition: 'editorTextFocus',
                run: function (ed) {
                    const model = ed.getModel();
                    const lineCount = model.getLineCount();
                    // Select from start of line 2 to end of line N-1
                    if (lineCount > 2) {
                        const lastVisibleLine = lineCount - 1;
                        const maxColumn = model.getLineMaxColumn(lastVisibleLine);
                        ed.setSelection(new monaco.Range(2, 1, lastVisibleLine, maxColumn));
                    }
                }
            });

            // 2. Script
            app.editors.script = monaco.editor.create(document.getElementById('editor-script'), {
                value: app.defaultFunc,
                language: 'javascript',
                theme: 'vs-dark',
                minimap: { enabled: false },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                model: monaco.editor.createModel(app.defaultFunc, "javascript", monaco.Uri.parse("file:///script.js"))
            });

            // 3. Final Output
            app.editors.final = monaco.editor.create(document.getElementById('editor-final'), {
                value: "// Script will generate here...",
                language: 'javascript',
                theme: 'vs-dark',
                readOnly: true,
                minimap: { enabled: false },
                automaticLayout: true,
                scrollBeyondLastLine: false
            });

            // 4. Offline Editor
            app.editors.offline = monaco.editor.create(document.getElementById('editor-offline'), {
                value: "// Write your full script here...\n// context is available globally.",
                language: 'javascript',
                theme: 'vs-dark',
                minimap: { enabled: true },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                model: monaco.editor.createModel("// Write your full script here...\n// context is available globally.", "javascript", monaco.Uri.parse("file:///offline.js"))
            });

            // Listeners for auto-build
            let isFixingWrapper = false;
            app.editors.lore.onDidChangeModelContent(() => {
                if (isFixingWrapper) return;

                const model = app.editors.lore.getModel();
                const lineCount = model.getLineCount();
                // Safety check: if empty, lineCount is 1
                const firstLine = model.getLineContent(1);
                const lastLine = model.getLineContent(lineCount);

                const startMarker = "var _hidden = [";
                const endMarker = "];";

                let edits = [];

                // Check Top
                if (firstLine.indexOf(startMarker) !== 0) {
                    edits.push({
                        range: new monaco.Range(1, 1, 1, 1),
                        text: startMarker + "\n",
                        forceMoveMarkers: true
                    });
                }

                // Check Bottom
                // If lineCount is 1 and we are adding top, we need to be careful.
                // But generally if last line is not endMarker, append it.
                if (lastLine.indexOf(endMarker) === -1) {
                    edits.push({
                        range: new monaco.Range(lineCount + 1, 1, lineCount + 1, 1),
                        text: "\n" + endMarker
                    });
                }

                if (edits.length > 0) {
                    isFixingWrapper = true;
                    // Apply edits. Note: if we insert at top, line numbers shift, 
                    // but since we calculated based on current state and 'applyEdits' 
                    // handles the transaction, it should be fine if we use the ranges derived from current state.
                    // However, appending to bottom (lineCount+1) is safe even if top shifts.
                    model.applyEdits(edits);
                    isFixingWrapper = false;
                }

                updateHiddenAreas();
                app.buildScript();
            });
            app.editors.script.onDidChangeModelContent(app.buildScript);

            // Initial Build
            app.buildScript();

            // Signal Ready
            document.getElementById('console-output').innerHTML = "<span class='log-p'>Ready.</span>";
        });
    },

    buildScript: function () {
        if (!app.editors.lore) return; // Not ready
        let userLore = app.editors.lore.getValue();

        // Safer Stripping using exact markers
        const startMarker = "var _hidden = [";
        const startIdx = userLore.indexOf(startMarker);
        if (startIdx !== -1) {
            userLore = userLore.substring(startIdx + startMarker.length);
        }

        const endMarker = "];";
        const endIdx = userLore.lastIndexOf(endMarker);
        if (endIdx !== -1) {
            userLore = userLore.substring(0, endIdx);
        }

        const userFunc = app.editors.script.getValue();

        let fullCode = ENGINE_SOURCE;

        // Safely inject. If user types breakage, it will be caught at runtime, not here.
        fullCode = fullCode.replace('//TODO_ENTRIES', userLore);
        fullCode = fullCode.replace('//TODO_FUNCTIONS', userFunc);

        if (app.editors.final) app.editors.final.setValue(fullCode);
        return fullCode;
    },

    runSimulation: function () {
        const consoleDiv = document.getElementById('console-output');
        consoleDiv.innerHTML = "";

        let code = "";
        const useEngine = document.getElementById('use-engine').checked;

        if (useEngine) {
            code = app.buildScript();
        } else {
            if (app.editors.offline) {
                code = app.editors.offline.getValue();
            }
        }

        // Get Mocks
        const simMsgCount = parseInt(document.getElementById('sim-count').value) || 0;
        const simLastMsg = document.getElementById('sim-last-msg').value || "";
        const simName = document.getElementById('sim-name').value || "Bot";

        // Setup Context
        const context = {
            character: { personality: "", scenario: "", name: simName },
            chat: {
                message_count: simMsgCount,
                last_message: simLastMsg,
                last_messages: [{ message: simLastMsg }]
            }
        };

        try {
            // Execution Scope
            const run = new Function('context', code);
            run(context);

            // Pretty Print
            let output = "<strong>[SUCCESS] Engine Cycle Complete</strong>\n";
            output += "-----------------------------------\n";
            output += "<span class='log-p'>context.character.personality:</span>\n";
            output += (context.character.personality || "(empty)") + "\n\n";
            output += "<span class='log-s'>context.character.scenario:</span>\n";
            output += (context.character.scenario || "(empty)") + "\n";

            consoleDiv.innerHTML = output;
        } catch (e) {
            consoleDiv.innerHTML = "<span class='log-err'>[RUNTIME ERROR]</span>\n" + e.toString();
        }
    },

    copyScript: function () {
        const code = app.editors.final.getValue();
        navigator.clipboard.writeText(code).then(() => alert("Copied!"));
    },

    downloadScript: function () {
        const code = app.editors.final.getValue();
        const blob = new Blob([code], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Script.js";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

    toggleMode: function () {
        const useEngine = document.getElementById('use-engine').checked;
        const engineContainer = document.getElementById('engine-mode-container');
        const offlineContainer = document.getElementById('offline-mode-container');

        if (useEngine) {
            engineContainer.style.display = 'flex';
            offlineContainer.style.display = 'none';
            // Refresh layout
            if (app.editors.lore) app.editors.lore.layout();
            if (app.editors.script) app.editors.script.layout();
            if (app.editors.final) app.editors.final.layout();
        } else {
            engineContainer.style.display = 'none';
            offlineContainer.style.display = 'flex';
            // Refresh layout - its buggy so its double. 
            if (app.editors.offline) app.editors.offline.layout();
            if (app.editors.offline) app.editors.offline.layout();
        }
    },

    toggleSection: function (id) {
        const el = document.getElementById(id);
        const btn = el.querySelector('.toggle-btn');
        el.classList.toggle('collapsed');

        if (el.classList.contains('collapsed')) {
            btn.textContent = "Show";
        } else {
            btn.textContent = "Hide";

            // SMART RESTORE: Reset layout to fair distribution when showing a section
            // This prevents the "squished" effect and ensures the new section gets space.
            const lore = document.getElementById('wrap-lore');
            const script = document.getElementById('wrap-script');
            const final = document.getElementById('wrap-final');

            const isLoreVisible = !lore.classList.contains('collapsed');
            const isScriptVisible = !script.classList.contains('collapsed');
            const isFinalVisible = !final.classList.contains('collapsed');

            // Reset flex values to defaults (or equal share) based on visibility
            if (isLoreVisible && isScriptVisible && isFinalVisible) {
                lore.style.flex = "35";
                script.style.flex = "25";
                final.style.flex = "40";
            } else if (isLoreVisible && isScriptVisible) {
                lore.style.flex = "50";
                script.style.flex = "50";
            } else if (isLoreVisible && isFinalVisible) {
                lore.style.flex = "50";
                final.style.flex = "50";
            } else if (isScriptVisible && isFinalVisible) {
                script.style.flex = "50";
                final.style.flex = "50";
            } else {
                // Only one visible, it takes all (flex: 1 is sufficient, but let's be explicit)
                if (isLoreVisible) lore.style.flex = "100";
                if (isScriptVisible) script.style.flex = "100";
                if (isFinalVisible) final.style.flex = "100";
            }
        }

        // Refresh all layouts
        setTimeout(() => {
            if (app.editors.lore) app.editors.lore.layout();
            if (app.editors.script) app.editors.script.layout();
            if (app.editors.final) app.editors.final.layout();
        }, 50);
    },

    togglePanel: function (id) {
        const el = document.getElementById(id);
        const btn = el.querySelector('.toggle-btn');
        el.classList.toggle('collapsed');

        const isCollapsed = el.classList.contains('collapsed');

        if (id === 'col-left') {
            btn.textContent = isCollapsed ? "»" : "«";
        } else if (id === 'col-right') {
            btn.textContent = isCollapsed ? "«" : "»";
        }

        // Refresh all layouts as the center area size changed
        setTimeout(() => {
            if (app.editors.lore) app.editors.lore.layout();
            if (app.editors.script) app.editors.script.layout();
            if (app.editors.final) app.editors.final.layout();
            if (app.editors.offline) app.editors.offline.layout();
        }, 50);
    },

    showDocs: function () {
        document.getElementById('docs-modal').style.display = 'flex';
    },

    hideDocs: function (e) {
        // If e is provided (click event), only close if clicking the background or close button
        if (e && e.target.id !== 'docs-modal' && e.target.id !== 'docs-close') return;
        document.getElementById('docs-modal').style.display = 'none';
    },

    startResize: function (e, prevId, nextId) {
        e.preventDefault();
        const prevEl = document.getElementById(prevId);
        const nextEl = document.getElementById(nextId);

        // GUARD: Disable resize if either side is hidden
        if (prevEl.classList.contains('collapsed') || nextEl.classList.contains('collapsed')) {
            return;
        }

        const startY = e.clientY;
        const startPrevH = prevEl.offsetHeight;
        const startNextH = nextEl.offsetHeight;

        function onMouseMove(e) {
            const dy = e.clientY - startY;
            // Adjust flex-basis or height
            // Since we use flex: N, we might need to switch to explicit heights or adjust flex-grow
            // But simplest for resizing flex items is often setting explicit height in pixels
            // and letting flex-grow: 0 take over, OR adjusting flex-grow values.
            // Here we will try setting explicit heights to override flex.

            const newPrevH = startPrevH + dy;
            const newNextH = startNextH - dy;

            if (newPrevH > 35 && newNextH > 35) { // Min height for header
                // Use flex-grow ratios instead of fixed pixels to ensure fluid layout
                // We use the pixel height as the ratio value
                prevEl.style.flex = `${newPrevH}`;
                nextEl.style.flex = `${newNextH}`;

                // Force layout update
                if (app.editors.lore) app.editors.lore.layout();
                if (app.editors.script) app.editors.script.layout();
                if (app.editors.final) app.editors.final.layout();
            }
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
};

// Force a layout refresh 500ms after load to fix any 0-height glitches
window.onload = function () {
    setTimeout(function () {
        app.initMonaco();

        // Double tap layout refresh
        setTimeout(function () {
            if (app.editors.lore) app.editors.lore.layout();
            if (app.editors.script) app.editors.script.layout();
            if (app.editors.final) app.editors.final.layout();
            if (app.editors.offline) app.editors.offline.layout();
        }, 500);

    }, 100);
};

// Resize monitor
window.onresize = function () {
    if (app.editors.lore) app.editors.lore.layout();
    if (app.editors.script) app.editors.script.layout();
    if (app.editors.final) app.editors.final.layout();
    if (app.editors.offline) app.editors.offline.layout();
};
