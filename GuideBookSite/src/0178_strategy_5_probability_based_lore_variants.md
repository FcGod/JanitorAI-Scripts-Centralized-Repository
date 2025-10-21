## 🟡 Strategy 5: Probability-Based Lore Variants

Keep lore fresh by adding randomness.

Example code:

if (padded.indexOf(" dragon ") !== -1) {
if (Math.random() < 0.5) {
context.character.scenario += " A dragon roars in the distance.\n\n";
} else {
context.character.scenario += " A dragon flies overhead, wings blotting out the sun.\n\n";
}
}

📖 **Plain English:**

* Mentioning “dragon” doesn’t always give the same response.
* Sometimes you get a roar, sometimes a sighting.

---
