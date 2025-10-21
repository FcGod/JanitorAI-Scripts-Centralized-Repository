## 🟡 Strategy 1: Progressive Lore Entries

Have the same keyword trigger **different effects** at different stages.

Example code:

var count = context.chat.message\_count;

if (padded.indexOf(" forest ") !== -1) {
if (count < 10) {
context.character.scenario += " The forest feels calm and welcoming.\n\n";
} else if (count < 20) {
context.character.scenario += " The forest begins to feel mysterious, shadows lengthening.\n\n";
} else {
context.character.scenario += " The forest feels dangerous now, with unseen creatures watching.\n\n";
}
}

📖 **Plain English:**

* Early: peaceful forest.
* Midway: mysterious forest.
* Later: dangerous forest.

---
