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
