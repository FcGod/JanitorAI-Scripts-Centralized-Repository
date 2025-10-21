## 🟡 Step 3: Priorities

What if multiple entries trigger at once? We don’t want everything to fire.
We add **priority numbers**. Higher priority wins.

var lorebook = \[
{ keywords: \["godfather", "damien"], priority: 10, personality: ", a calculating and charismatic leader" },
{ keywords: \["mafia", "family"], priority: 5, personality: ", part of a powerful crime family" }
];

var activated = \[];
for (var i = 0; i < lorebook.length; i++) {
var entry = lorebook\[i];
for (var j = 0; j < entry.keywords.length; j++) {
if (padded.indexOf(" " + entry.keywords\[j] + " ") !== -1) {
activated.push(entry);
break;
}
}
}

activated.sort(function(a, b) { return b.priority - a.priority; });

if (activated.length > 0) {
context.character.personality += activated\[0].personality;
}

Plain English:

* If both “godfather” and “family” appear, “godfather” wins because it has higher priority

---
