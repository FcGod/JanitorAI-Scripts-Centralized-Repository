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
