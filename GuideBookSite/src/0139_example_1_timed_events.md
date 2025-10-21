## 🟡 Example 1: Timed Events

if (context.chat.message\_count === 10) {
context.character.scenario += " A church bell rings in the distance, marking the tenth exchange.";
}

if (context.chat.message\_count === 25) {
context.character.scenario += " A sudden breeze stirs, carrying whispers from nowhere.";
}

Plain English:

* At exactly 10 messages → bell sound
* At 25 messages → eerie breeze
* These happen *even if the user didn’t mention anything*

---
