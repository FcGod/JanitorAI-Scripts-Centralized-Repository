## 🟡 Event Triggers (Special Surprises)

You can create little “story beats” that happen at certain times in the chat.

if (context.chat.message\_count === 10) {
context.character.personality += ", momentarily distracted";
context.character.scenario += " Suddenly, their phone rings with an unexpected call.";
}

if (context.chat.message\_count === 25) {
context.character.personality += ", reactive to the environment";
context.character.scenario += " The weather suddenly changes around them.";
}

Plain English:

* At 10 messages: A phone rings (mini-event)
* At 25 messages: The weather shifts

This gives the illusion that the *story has beats* like a TV episode.

---
