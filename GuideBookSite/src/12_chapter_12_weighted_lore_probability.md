# 📘 Chapter 12: Weighted Lore & Probability

Up until now, your scripts have been **deterministic** — meaning: if the user types a word, the script *always* triggers the same response. That’s great for consistency, but it can feel predictable.

What if sometimes the bot shares a story, but other times it stays quiet?
What if mentioning “magic” doesn’t always flood the scene with spell lore?

👉 That’s where **weights and probability** come in.

---

## 🟡 Why Use Probability?

Humans aren’t machines — we don’t always react the same way every time. By adding probability, you can make responses feel:

* **Fresh** → The same word doesn’t always trigger
* **Unpredictable** → Surprises keep the conversation alive
* **Natural** → Sometimes people mention something but don’t elaborate

---

## 🟡 The Random Roll

The sandbox has a built-in dice roller:

Math.random()

This gives a number between **0 and 1** (like a percentage).

* `0.0` = 0%
* `0.5` = 50%
* `1.0` = 100%

So if you want something to happen 50% of the time:

if (Math.random() < 0.5) {
// do the thing
}

---

## 🟡 Adding Probability to Lore

Here’s how we can add probability to a lore entry:

var last = context.chat.last\_message.toLowerCase();

if (last.indexOf("magic") !== -1) {
if (Math.random() < 0.5) { // 50% chance
context.character.personality += ", remembers old magical teachings.";
context.character.scenario += " The air hums with faint magical energy.";
}
}

Plain English:

* If the user mentions “magic”…
* Roll the dice
* If the roll is under 0.5 (50% chance) → trigger the lore
* Otherwise → nothing happens (bot stays quiet)

---

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

## 🟡 Realistic Example: Telling Secrets

if (last.indexOf("secret") !== -1) {
var roll = Math.random();
if (roll < 0.7) {
context.character.personality += ", reluctant but burdened with knowledge.";
context.character.scenario += " They hint at a secret but don’t reveal it.";
} else {
context.character.personality += ", daring enough to share forbidden truths.";
context.character.scenario += " They whisper the real secret with trembling lips.";
}
}

Plain English:

* 70% of the time → the bot stays cagey
* 30% of the time → the bot spills the secret
* This feels human, because sometimes people hold back

---

## 🟡 Best Practices for Probability

* ✅ Use probability for **flavor**, not for everything
* ✅ Keep rare events **special** (don’t hide key lore behind a 1% chance)
* ✅ Document your weights with comments so you remember why you picked them
* ❌ Don’t chain too many random checks at once — randomness piles up and makes scripts unpredictable in bad ways

---

## 🟡 Quick Practice (Try It Yourself!)

1. Add a **50% chance** that the bot mentions the weather when the user says “outside.”
2. Create a **weighted choice** where “forest” triggers either:

   * 60% → peaceful description
   * 30% → mysterious atmosphere
   * 10% → dangerous vibes

---

## 🟡 Key Takeaways from Chapter 12

* `Math.random()` gives you a 0–1 roll (your digital dice)
* Use `< number` checks for simple percentages
* Use **weighted choices** for more variety
* Add probability for flavor, surprise, and realism

---

✨ Pro Tip: Think of probability like seasoning in cooking — a little makes things delicious, but too much can ruin the dish.
