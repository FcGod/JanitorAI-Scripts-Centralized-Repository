## 🟡 Step 5: Match Phrases (Two or More Words)

Sometimes you want to catch phrases like **“calm down.”** That works too:

if (padded.indexOf(" calm down ") !== -1) {
context.character.personality += "Tries to stay calm.";
}

Notice: same trick, just with two words inside the quotes.

---
