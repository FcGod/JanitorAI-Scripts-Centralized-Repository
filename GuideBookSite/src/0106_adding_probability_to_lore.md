## 🟡 Adding Probability to Lore

Here’s how we can add probability to a lore entry:

var last = context.chat.last\_message.toLowerCase();

if (last.indexOf("magic") !== -1) {
if (Math.random() < 0.5) { // 50% chance
context.character.personality += ", remembers old magical teachings.";
context.character.scenario += " The air hums with faint magical energy.";
}
}

Plain English:

* If the user mentions “magic”…
* Roll the dice
* If the roll is under 0.5 (50% chance) → trigger the lore
* Otherwise → nothing happens (bot stays quiet)

---
