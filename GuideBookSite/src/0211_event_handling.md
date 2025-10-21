## 🟡 Event Handling

Events are a little different: they don’t rely on keywords, but on conditions.

var count = context.chat.message\_count;

for (var i=0; i\<lorebook.events.length; i++) {
var entry = lorebook.events\[i];

if (entry.trigger === "count==10" && count === 10) {
context.character.scenario += entry.scenario + "\n\n";
}

if (entry.trigger === "count>20" && count > 20) {
context.character.scenario += entry.scenario + "\n\n";
}
}

📖 **Plain English:**

* If the trigger condition is true → event fires.

---
