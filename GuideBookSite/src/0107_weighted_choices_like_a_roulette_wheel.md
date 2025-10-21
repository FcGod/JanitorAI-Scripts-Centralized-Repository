## 🟡 Weighted Choices (Like a Roulette Wheel)

Probability doesn’t have to be “yes or no.” You can also make the bot **pick between multiple options**.

var options = \[
{ chance: 0.6, text: "They talk about a magical library." },
{ chance: 0.3, text: "They recall a battle with a sorcerer." },
{ chance: 0.1, text: "They stay silent, eyes distant." }
];

var roll = Math.random();
var total = 0;

for (var i = 0; i < options.length; i++) {
total += options\[i].chance;
if (roll < total) {
context.character.scenario += options\[i].text;
break;
}
}

Plain English:

* Options are given **weights** (60%, 30%, 10%)
* Roll the dice
* Whichever slot the dice falls into → that’s the chosen outcome
* So “magical library” happens most often, but sometimes you’ll get the rarer paths

---
