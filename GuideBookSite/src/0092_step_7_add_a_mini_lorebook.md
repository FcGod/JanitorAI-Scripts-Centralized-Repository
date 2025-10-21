## 🟡 Step 7: Add a Mini Lorebook

Finally, let’s add some simple world lore.

var lorebook = \[
{ keywords: \["forest"], personality: ", deeply connected to nature", scenario: " They are surrounded by tall trees and rustling leaves." },
{ keywords: \["city"], personality: ", street-smart", scenario: " The bustling city streets surround them." }
];

for (var k = 0; k < lorebook.length; k++) {
var entry = lorebook\[k];
for (var m = 0; m < entry.keywords.length; m++) {
if (padded.indexOf(" " + entry.keywords\[m] + " ") !== -1) {
context.character.personality += entry.personality;
context.character.scenario += entry.scenario;
break;
}
}
}

Plain English:

* If the user mentions “forest” → add nature lore
* If the user mentions “city” → add city lore
* These change the “stage set” of the conversation

---
