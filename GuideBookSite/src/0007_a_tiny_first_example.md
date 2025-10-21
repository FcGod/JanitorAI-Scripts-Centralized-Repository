## 🟡 A Tiny First Example

Example: simple “hello” trigger

if (context.chat.last\_message.toLowerCase().indexOf("hello") !== -1) {
context.character.scenario += "They greet you warmly.";
context.character.personality += "Friendly and welcoming.";
}

What it means:

* Look at what the user just typed.
* Change it to lowercase so “HELLO” or “Hello” also works.
* Check if the word “hello” is in there.
* If yes, add two short notes: one to scenario (what’s happening) and one to personality (how they act).

---
