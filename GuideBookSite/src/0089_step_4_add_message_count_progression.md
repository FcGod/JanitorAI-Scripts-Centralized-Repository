## 🟡 Step 4: Add Message Count Progression

We’ll make the character grow friendlier the longer the chat goes.

var count = context.chat.message\_count;

if (count < 5) {
context.character.personality += ", polite and cautious.";
} else if (count < 15) {
context.character.personality += ", warming up and more casual.";
} else if (count < 30) {
context.character.personality += ", open and relaxed.";
} else {
context.character.personality += ", deeply connected and trusting.";
}

Plain English:

* Short chat → polite
* Medium chat → casual
* Long chat → close friend

---
