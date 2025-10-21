## 🟡 Step 6: Add Simple Memory (Name Capture)

We’ll make the bot “remember” if the user says their name.

if (last.indexOf("my name is") !== -1) {
var match = context.chat.last\_message.match(/my name is (\w+)/i);
if (match) {
context.character.scenario += " Remember: the user’s name is " + match\[1] + ".";
}
}

Plain English:

* If the user says “my name is …” → store it in scenario
* Now the bot acts like it remembers your name

---
