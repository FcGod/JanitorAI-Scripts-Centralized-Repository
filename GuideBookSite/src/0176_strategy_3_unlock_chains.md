## 🟡 Strategy 3: Unlock Chains

Lore can **unlock other lore.**

Example code:

if (padded.indexOf(" secret ") !== -1) {
context.character.scenario += " They hint at something hidden.\n\n";
context.character.personality += ", a keeper of secrets.\n\n";

// Unlock related lore
if (count > 20) {
context.character.scenario += " They finally share a secret about the Sundering.\n\n";
}
}

📖 **Plain English:**

* Mentioning “secret” creates a new trait.
* If enough time has passed, it unlocks the *next layer* of lore.

---
