## 🟡 Example: Secrets in Stages

Let’s use gating to reveal a secret over time.

var count = context.chat.message\_count;

if (count <= 15 && padded.indexOf(" secret ") !== -1) {
context.character.personality += ", cautious about their secrets.";
context.character.scenario += " They hint that there are things they cannot share yet.";
}

if (count >= 16 && count <= 30 && padded.indexOf(" secret ") !== -1) {
context.character.personality += ", finally ready to open up.";
context.character.scenario += " They whisper a deeper truth, as if trusting you more.";
}

if (count > 30 && padded.indexOf(" secret ") !== -1) {
context.character.personality += ", burdened by secrets too heavy to ignore.";
context.character.scenario += " They reveal everything, unable to hold it in any longer.";
}

Plain English:

* Early in the chat → they avoid the secret
* Midway → they share cautiously
* Later → they spill everything

---
