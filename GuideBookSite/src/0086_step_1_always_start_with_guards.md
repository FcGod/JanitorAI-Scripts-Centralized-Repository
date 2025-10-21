## 🟡 Step 1: Always Start with Guards

Every script should start by making sure the fields exist.

// === CONTEXT GUARDS ===
context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario = context.character.scenario || "";

Plain English:

* If personality or scenario doesn’t exist yet, create them as empty strings
* This prevents errors before we do anything else

---
