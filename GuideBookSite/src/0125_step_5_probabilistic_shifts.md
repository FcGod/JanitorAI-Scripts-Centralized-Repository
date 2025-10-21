## 🟡 Step 5: Probabilistic Shifts

You can add **random variety** into shifts.

if (padded.indexOf(" tavern ") !== -1) {
if (Math.random() < 0.5) {
context.character.scenario += "The tavern is rowdy tonight.";
} else {
context.character.scenario += "The tavern is quiet and dimly lit.";
}
}

Plain English:
Same keyword, two possible moods. Keeps the world fresh.

---
