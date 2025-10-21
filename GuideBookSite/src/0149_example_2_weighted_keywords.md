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
