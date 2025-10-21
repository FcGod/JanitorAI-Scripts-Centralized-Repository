# 📘 Chapter 7: Memory & Preferences (Making Bots “Remember”)

Here’s the truth: scripts don’t actually *remember* things the way humans do. Every time the chat moves forward, the script starts fresh.

👉 But! We can **fake memory** by writing details into the `scenario` (or sometimes `personality`). Since the model “reads” these fields before generating a reply, it will act like it remembered.

Think of it like jotting notes on a sticky pad:

* User: “My name is Alex.”
* Script writes: “Remember: user’s name is Alex” into the scenario.
* Now the bot “sees” that note in future turns.

---

## 🟡 Trick 1: Capturing Names

var last = context.chat.last\_message.toLowerCase();

if (last.indexOf("my name is") !== -1) {
var match = context.chat.last\_message.match(/my name is (\w+)/i);
if (match) {
context.character.scenario += " Remember: the user’s name is " + match\[1] + ".";
}
}

Plain English:

* If the user types “my name is …” → capture the word after it
* Add a note to the scenario: “Remember: the user’s name is Alex.”
* Now the bot will act like it knows your name later

---

## 🟡 Trick 2: Storing Interests (Likes and Dislikes)

We can also detect hobbies, foods, or other favorites.

var last = context.chat.last\_message.toLowerCase();
var likes = \["pizza", "movies", "music", "hiking"];
var dislikes = \["spiders", "loud noises", "crowds"];

for (var i = 0; i < likes.length; i++) {
if (last.indexOf(likes\[i]) !== -1) {
context.character.personality += ", remembers the user likes " + likes\[i];
context.character.scenario += " They bring up " + likes\[i] + " as a friendly topic.";
}
}

for (var j = 0; j < dislikes.length; j++) {
if (last.indexOf(dislikes\[j]) !== -1) {
context.character.personality += ", remembers the user dislikes " + dislikes\[j];
context.character.scenario += " They avoid mentioning " + dislikes\[j] + ".";
}
}

Plain English:

* If the user says they like pizza → the bot remembers and might mention it
* If they say they dislike spiders → the bot avoids that topic
* These get added into personality and scenario as notes

---

## 🟡 Trick 3: Memory by Repetition

Scripts can also add reminders over time:

context.character.personality += ", has a good memory for conversation details";
context.character.scenario += " They remember important things the user has shared.";

Plain English:
Even if you don’t capture a name or hobby, you can add flavor text that says the bot “remembers.” This nudges the AI to act consistent with earlier lines.

---

## 🟡 Trick 4: Hybrid Lore + Memory

You can combine lore with memory, so the bot responds differently based on what the user likes.

Example:

* If user says they like “stars,” and then mentions “magic,” the lore might be written with a positive spin:

  * “Magic feels harmonious, like a song from the stars.”

* If user dislikes “darkness,” the same lore shifts to caution:

  * “Magic can be dangerous, especially when tied to shadows.”

Plain English:
This makes the world feel **tailored** to the user, like the character is really paying attention.

---

## 🟡 Quick Practice (Try It Yourself!)

1. Make the bot **remember a favorite color** if the user says “I like blue.”
2. Make the bot **avoid scary topics** if the user says “I’m afraid of spiders.”
3. Make the bot **store a pet’s name** if the user says “My dog’s name is Max.”

(Hint: use the same pattern as the “my name is” example, but change the word.)

---

## 🟡 Key Takeaways from Chapter 7

* Scripts don’t really “remember,” but you can fake it with `scenario` notes
* Capture names, hobbies, likes, dislikes with simple keyword checks
* Personality/scenario additions guide the bot to act consistent
* Hybrid systems combine lore with preferences for personal flavor

---

✨ Pro Tip: Don’t overload memory with too many notes. A few well-placed reminders (“user likes pizza,” “user’s name is Alex”) go a long way.
