## 🟡 What’s an Error Guard?

An **error guard** is a little snippet of code at the start of your script that makes sure the sandbox won’t crash if something is missing.

The “golden guard” looks like this:

// === CONTEXT GUARDS ===
context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario    = context.character.scenario || "";

📖 **Plain English:**

* If `context.character` doesn’t exist → create it.
* If personality/scenario don’t exist → make them empty strings.
* This prevents “undefined” errors from breaking the script.

---
