## 🟡 Processing the Lorebook

We loop through each category and check for matches.

// Process people
for (var i=0; i\<lorebook.people.length; i++) {
var entry = lorebook.people\[i];
for (var j=0; j\<entry.keywords.length; j++) {
if (padded.indexOf(" " + entry.keywords\[j] + " ") !== -1) {
context.character.personality += entry.personality || "";
context.character.scenario    += entry.scenario || "";
break;
}
}
}

You’d do the same for `places`, `traits`, and `events` (with small tweaks).

---
