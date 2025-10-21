## 🟡 Step 2: Stacking Layers

Entries can fire **in order**: definitional first, then relational, then events.

if (padded.indexOf(" mentor ") !== -1) {
context.character.personality += ", wise and strict";
}

if (padded.indexOf(" mentor ") !== -1 && padded.indexOf(" trust ") !== -1) {
context.character.personality += ", softens when trusted";
}

if (count === 20 && padded.indexOf(" mentor ") !== -1) {
context.character.scenario += " The mentor shares a secret at this moment.";
}

📖 **Plain English:**

* Baseline = wise mentor.
* Relation = softer if trust is mentioned.
* Event = unlocks at message 20.

---
