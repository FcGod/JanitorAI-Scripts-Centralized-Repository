# 📘 Chapter 17: Simple Reaction Engines (Weighted Keyword Scores)

So far, your scripts have been **on/off switches**:

* If the user says “happy” → add cheerful personality
* If the user says “sad” → add somber personality

That’s good for basics, but what if you want your character to build up **stronger reactions** depending on *how many* related words show up?

👉 That’s what a **reaction engine** does: instead of a single trigger, it **scores words** and reacts based on the total.

---

## 🟡 Why Use Weighted Scores?

* Captures **intensity** (a little teasing vs. a lot of teasing)
* Prevents **false positives** (one weak word doesn’t immediately flip a mood)
* Creates **gradual escalation** (small signals build into a bigger reaction)

---

## 🟡 Example 1: Scoring Touch Words

Let’s say we want the bot to react to physical contact, but only if enough signals appear.

var touchWords = \["touch", "hold", "grab", "caress"];
var score = 0;

for (var i=0; i\<touchWords.length; i++) {
if (padded.indexOf(" " + touchWords\[i] + " ") !== -1) {
score++;
}
}

if (score >= 2) {
context.character.personality += ", responsive to physical closeness.";
context.character.scenario    += " Their body language shifts as the touch lingers.";
}

Plain English:

* Scan for “touch,” “hold,” “grab,” “caress.”
* Add 1 point for each match.
* If at least 2 are found → trigger the reaction.

---

## 🟡 Example 2: Weighted Keywords

Not all words are equal. “caress” might carry more weight than “touch.”

var reactions = \[
{ word: "touch",  weight: 1 },
{ word: "hold",   weight: 2 },
{ word: "caress", weight: 3 }
];

var score = 0;
for (var i=0; i\<reactions.length; i++) {
if (padded.indexOf(" " + reactions\[i].word + " ") !== -1) {
score += reactions\[i].weight;
}
}

if (score >= 3) {
context.character.personality += ", reacting strongly to intimacy.";
}

Plain English:

* “touch” = +1
* “hold” = +2
* “caress” = +3
* Add them up → the stronger the words, the faster the threshold is reached.

---

## 🟡 Example 3: Escalating Tiers

Once you have a score, you can make different levels of reaction.

if (score === 1) {
context.character.personality += ", slightly responsive.";
} else if (score === 2) {
context.character.personality += ", noticeably moved.";
} else if (score >= 3) {
context.character.personality += ", deeply affected.";
}

Plain English:

* 1 point → mild response
* 2 points → stronger
* 3+ points → intense

This feels much more natural than instant jumps.

---

## 🟡 Best Practices for Reaction Engines

* ✅ Use scores for **emotions, physical actions, or tone shifts**
* ✅ Assign weights carefully (not every word is equal)
* ✅ Keep thresholds low (2–3 points is usually enough)
* ❌ Don’t make the math too complex — keep it simple and readable

---

## 🟡 Quick Practice (Try It Yourself!)

1. Make a reaction engine for **anger words** (angry, furious, rage).

   * 1 = mild annoyance, 2 = frustration, 3+ = full rage
2. Build a **flirtation engine** where playful words (“wink,” “tease,” “smirk”) add up until the bot becomes overtly flirty
3. Create a **fear engine** where words like “dark,” “scary,” and “danger” escalate tension in the scenario

---

## 🟡 Key Takeaways from Chapter 17

* Reaction engines score **multiple inputs** instead of just flipping a switch
* Scores allow for **gradual escalation** and **intensity tiers**
* Weighted words add realism (some words count more)
* This is the first step toward **dynamic emotional engines**

---

✨ Pro Tip: Reaction engines are like a thermometer — the more words you pile in, the hotter the mood gets.

---
---
