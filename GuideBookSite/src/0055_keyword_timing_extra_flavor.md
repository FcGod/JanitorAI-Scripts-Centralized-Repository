## 🟡 Keyword + Timing = Extra Flavor

You can also mix timing and keyword checks.

var last = context.chat.last\_message.toLowerCase();

if (context.chat.message\_count > 15 && last.indexOf(" secret ") !== -1) {
context.character.personality += ", mysterious and cautious";
context.character.scenario += " They whisper, as if revealing something hidden.";
}

Plain English:

* Only after 15+ messages…
* If the user mentions “secret”…
* The character reveals hidden knowledge

This feels like *unlocking lore* through deeper conversation.

---
