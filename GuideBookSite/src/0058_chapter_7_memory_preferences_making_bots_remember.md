# 📘 Chapter 7: Memory & Preferences (Making Bots “Remember”)

Here’s the truth: scripts don’t actually *remember* things the way humans do. Every time the chat moves forward, the script starts fresh.

👉 But! We can **fake memory** by writing details into the `scenario` (or sometimes `personality`). Since the model “reads” these fields before generating a reply, it will act like it remembered.

Think of it like jotting notes on a sticky pad:

* User: “My name is Alex.”
* Script writes: “Remember: user’s name is Alex” into the scenario.
* Now the bot “sees” that note in future turns.

---
