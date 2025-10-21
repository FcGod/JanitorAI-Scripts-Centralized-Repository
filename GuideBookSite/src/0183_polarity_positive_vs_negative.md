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
