## 🟡 Common Patterns

**Greeting Trigger**

if (padded.indexOf(" hello ") !== -1) {
context.character.scenario += "They greet you warmly.";
context.character.personality += "Friendly and welcoming.";
}

**Multiple Keywords**

var words = \["hi", "hey", "hello"];
for (var i = 0; i < words.length; i++) {
if (padded.indexOf(" " + words\[i] + " ") !== -1) {
// do something
break;
}
}

**Message Count Progression**

if (context.chat.message\_count > 10) {
context.character.personality += ", more comfortable now.";
}

**Time of Day Flavor**

var hour = new Date().getHours();
if (hour < 6 || hour > 22) {
context.character.personality += ", sleepy.";
}

**Name Capture**

if (last.indexOf("my name is") !== -1) {
var match = context.chat.last\_message.match(/my name is (\w+)/i);
if (match) context.character.scenario += " Remember: user’s name is " + match\[1] + ".";
}

**Lorebook Entry**

var lore = \[
{ keywords: \["forest"], personality: ", loves nature", scenario: "They walk among tall trees." }
];

---
