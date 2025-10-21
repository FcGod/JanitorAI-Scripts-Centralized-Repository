## 🟡 Message Count Progression (Growing Friendships)

One of the easiest ways to add realism is to let the character “warm up” as the chat goes on.

var count = context.chat.message\_count;

if (count < 5) {
context.character.personality += ", polite and formal";
context.character.scenario += " This feels like a cautious first meeting.";
} else if (count < 15) {
context.character.personality += ", becoming more casual";
context.character.scenario += " The atmosphere is loosening up.";
} else if (count < 30) {
context.character.personality += ", open and friendly";
context.character.scenario += " You’ve both settled into an easy rhythm.";
} else {
context.character.personality += ", deeply connected";
context.character.scenario += " The bond feels strong and genuine.";
}

Plain English:

* Early messages → polite stranger
* Midway → casual and relaxed
* Long chats → trust and deep connection

This is like a **relationship arc** unfolding as you keep talking.

---
