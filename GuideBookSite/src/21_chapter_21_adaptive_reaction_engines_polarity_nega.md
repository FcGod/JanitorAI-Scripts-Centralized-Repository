# 📘 Chapter 21: Adaptive Reaction Engines (Polarity, Negation & Composite Moods)

So far, our reaction engines have been about **adding points** until a threshold is hit. That’s useful, but real emotions aren’t one-directional. People can:

* Feel positive **or** negative about a topic (**polarity**).
* Cancel out reactions if something is denied (**negation**).
* Hold **mixed feelings** (like bittersweet emotions).

👉 This is where adaptive engines shine: they calculate *direction* and *blend*, not just “on/off.”

---

## 🟡 Polarity (Positive vs. Negative)

Instead of just counting, we give words **+ or – values.**

Example code:

var polarityWords = \[
{ word: "love",  score: +2 },
{ word: "like",  score: +1 },
{ word: "hate",  score: -2 },
{ word: "dislike", score: -1 }
];

var polarity = 0;
for (var i=0; i\<polarityWords.length; i++) {
if (padded.indexOf(" " + polarityWords\[i].word + " ") !== -1) {
polarity += polarityWords\[i].score;
}
}

if (polarity > 0) {
context.character.personality += ", warm and affectionate.\n\n";
} else if (polarity < 0) {
context.character.personality += ", cold and distant.\n\n";
}

📖 **Plain English:**

* Positive words push polarity up.
* Negative words push it down.
* Result = affectionate OR distant.

---

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

## 🟡 Composite Moods (Blends)

Sometimes two emotional signals combine into a **mixed state.**

Example code:

var happy = padded.indexOf(" happy ") !== -1;
var sad   = padded.indexOf(" sad ") !== -1;

if (happy && sad) {
context.character.personality += ", sensing a bittersweet mix of joy and sadness.\n\n";
} else if (happy) {
context.character.personality += ", uplifted by joy.\n\n";
} else if (sad) {
context.character.personality += ", touched by sorrow.\n\n";
}

📖 **Plain English:**

* If both “happy” and “sad” show up → treat as **bittersweet** instead of ignoring one.

---

## 🟡 Advanced Example: Weighted Polarity + Negation

Example code:

var polarityWords = \[
{ word: "love", score: +2 },
{ word: "like", score: +1 },
{ word: "hate", score: -2 },
{ word: "angry", score: -1 }
];

var polarity = 0;
for (var i=0; i\<polarityWords.length; i++) {
var w = polarityWords\[i];
if (padded.indexOf(" " + w\.word + " ") !== -1) {
var neg = (padded.indexOf(" not " + w\.word) !== -1 || padded.indexOf(" don't " + w\.word) !== -1);
polarity += (neg ? -w\.score : w\.score);
}
}

if (polarity > 1) {
context.character.personality += ", affectionate and engaged.\n\n";
} else if (polarity < -1) {
context.character.personality += ", hostile and dismissive.\n\n";
} else {
context.character.personality += ", neutral but observant.\n\n";
}

📖 **Plain English:**

* Words push polarity positive or negative.
* Negation flips the meaning.
* End result = warm, hostile, or neutral depending on balance.

---

## 🟡 Best Practices for Adaptive Engines

* ✅ Use polarity when you want *direction* (love vs hate).
* ✅ Use negation so the bot doesn’t misread “not happy” as “happy.”
* ✅ Use composite moods for realism (bittersweet, conflicted).
* ❌ Don’t overload with giant wordlists — start small (3–5 words each).

---

## 🟡 Quick Practice (Try It Yourself!)

1. Create a polarity engine for **trust vs. doubt.**

   * “trust” = +2, “doubt” = -2.
2. Add negation so “don’t trust” = -2 instead of +2.
3. Build a composite mood where **“fear” + “hope”** = “anxious but determined.”

---

## 🟡 Key Takeaways from Chapter 21

* Adaptive engines track **direction**, not just intensity.
* **Polarity** lets emotions swing positive or negative.
* **Negation** prevents misreads.
* **Composite moods** allow mixed feelings.
* Together, they make bots feel more human.
