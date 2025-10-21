## 🟡 Step 1: The Mini Entry (One Fact)

Here’s the smallest possible “lorebook”:

var lorebook = \[
{ keywords: \["forest"], personality: ", at home in nature", scenario: "Tall trees sway in the breeze." }
];

var last = context.chat.last\_message.toLowerCase();
var padded = " " + last + " ";

for (var i = 0; i < lorebook.length; i++) {
var entry = lorebook\[i];
for (var j = 0; j < entry.keywords.length; j++) {
if (padded.indexOf(" " + entry.keywords\[j] + " ") !== -1) {
context.character.personality += entry.personality;
context.character.scenario += entry.scenario;
break;
}
}
}

Plain English:

* `lorebook` is just a list (array) of entries
* Each entry has **keywords**, a **personality trait**, and a **scenario note**
* If the user says “forest,” the bot adds forest lore

---
