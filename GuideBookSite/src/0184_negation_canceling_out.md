## 🟡 Negation (Canceling Out)

We also need to handle when a user says the **opposite**:

* “I’m *not* happy.”
* “I *don’t* like that.”

We can scan for negation words before we score.

Example code:

var negation = (padded.indexOf(" not ") !== -1 || padded.indexOf(" don't ") !== -1);

if (padded.indexOf(" happy ") !== -1) {
if (negation) {
context.character.personality += ", notes the user isn’t actually happy.\n\n";
} else {
context.character.personality += ", mirrors the user’s happiness.\n\n";
}
}

📖 **Plain English:**

* If “happy” is present → check if negation words appear nearby.
* If yes → treat it as *opposite*.
* If no → treat normally.

---
