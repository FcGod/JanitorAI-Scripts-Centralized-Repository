## 🟡 Strategy 4: Default + Hybrid Override

Sometimes you want one reaction engine to run normally… but then override it if hybrids are detected.

Example code:

if (excite > 0) {
context.character.personality += ", clearly excited.\n\n";
}
if (fear > 0) {
context.character.personality += ", visibly nervous.\n\n";
}

// Hybrid override
if (excite > 0 && fear > 0) {
context.character.personality += ", a jittery mix of excitement and nerves.\n\n";
}

📖 **Plain English:**

* Base states always add something.
* If both exist, add a **hybrid note on top**.
* This creates layered complexity.

---
