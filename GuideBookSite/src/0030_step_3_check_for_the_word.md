## 🟡 Step 3: Check for the Word

Now we use the safest tool: `.indexOf()`.

if (padded.indexOf(" hello ") !== -1) {
context.character.scenario += "They greet you warmly.";
context.character.personality += "Friendly and welcoming.";
}

Line by line:

* `if ( ... !== -1)` → means “if the word is found.”
* If found:

  * Add to the **scenario**: “They greet you warmly.”
  * Add to the **personality**: “Friendly and welcoming.”

---
