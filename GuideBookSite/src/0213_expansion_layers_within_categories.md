## 🟡 Expansion: Layers Within Categories

You can also make each category support **shifts, weights, and gates.**

Example:

{
keywords: \["magic"],
personality: ", wise in magic",
scenario: "The air hums with energy.",
shifts: \[
{ keywords: \["stars"], scenario: "Magic glimmers like starlight." },
{ keywords: \["shadows"], scenario: "Magic feels heavy and dark." }
],
probability: 0.5,
minCount: 10
}

📖 **Plain English:**

* Base: “magic” → wise in magic.
* Shifts: “stars” → light flavor, “shadows” → dark flavor.
* Probability: 50% chance to trigger.
* minCount: only works after 10+ messages.

---
