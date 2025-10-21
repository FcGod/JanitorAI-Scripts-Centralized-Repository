## 🟡 Step 3: Add Keyword Reactions

We’ll do greetings, emotions, and secrets.

// Greetings
var greetings = \["hello", "hi", "hey"];
for (var i = 0; i < greetings.length; i++) {
if (padded.indexOf(" " + greetings\[i] + " ") !== -1) {
context.character.scenario += " They greet you warmly.";
context.character.personality += " Friendly and welcoming.";
break;
}
}

// Emotions
var emotions = \["happy", "sad", "angry", "excited"];
for (var j = 0; j < emotions.length; j++) {
if (padded.indexOf(" " + emotions\[j] + " ") !== -1) {
context.character.scenario += " The user seems " + emotions\[j] + ".";
break;
}
}

// Secrets
if (padded.indexOf(" secret ") !== -1) {
context.character.personality += " Becomes mysterious when secrets are mentioned.";
context.character.scenario += " The atmosphere shifts into secrecy.";
}

Plain English:

* If the user greets → the bot greets back
* If they express an emotion → the bot notices it
* If they mention a secret → the bot becomes mysterious

---
