## 🟡 Step 3: Probability + Layers

Combine randomness with layers for replayability.

if (padded.indexOf(" tavern ") !== -1) {
if (Math.random() < 0.5) {
context.character.scenario += " The tavern is loud and rowdy.";
} else {
context.character.scenario += " The tavern is quiet, a hushed corner of town.";
}
}

📖 **Plain English:**
“Tavern” always fires, but its mood shifts randomly. Next time, the same keyword feels fresh.

---
