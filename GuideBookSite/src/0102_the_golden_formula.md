## 🟡 The Golden Formula

If you ever get lost, here’s the **minimum skeleton**:

context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario = context.character.scenario || "";

var last = String((context.chat && context.chat.last\_message) || "");
var padded = " " + last.toLowerCase() + " ";

// Example reaction
if (padded.indexOf(" hello ") !== -1) {
context.character.scenario += "They greet you warmly.";
context.character.personality += "Friendly and welcoming.";
}

That’s all you really need to start building. Everything else is just stacking more blocks on top.

---

✨ Pro Tip: The best scripts aren’t the fanciest. They’re the ones that quietly nudge your character into feeling alive, without you ever noticing the machinery behind it.
