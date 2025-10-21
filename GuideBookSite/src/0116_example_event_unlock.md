## 🟡 Example: Event Unlock

You can also tie events to certain ranges:

if (count === 10) {
context.character.scenario += " A distant bell rings, marking a turning point in the conversation.";
}

if (count > 20 && count < 25) {
context.character.personality += ", feeling nostalgic.";
context.character.scenario += " They recall something from their childhood.";
}

Plain English:

* At exactly 10 messages → an event happens
* Between 20 and 25 messages → they enter a nostalgic mood

---
