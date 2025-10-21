## 🟡 Trick 1: Capturing Names

var last = context.chat.last\_message.toLowerCase();

if (last.indexOf("my name is") !== -1) {
var match = context.chat.last\_message.match(/my name is (\w+)/i);
if (match) {
context.character.scenario += " Remember: the user’s name is " + match\[1] + ".";
}
}

Plain English:

* If the user types “my name is …” → capture the word after it
* Add a note to the scenario: “Remember: the user’s name is Alex.”
* Now the bot will act like it knows your name later

---
