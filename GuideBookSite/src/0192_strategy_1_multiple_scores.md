## 🟡 Strategy 1: Multiple Scores

Run two engines at the same time, then combine the results.

Example code:

// Excitement Engine
var exciteWords = \["excited", "thrilled", "can't wait"];
var excite = 0;
for (var i=0; i\<exciteWords.length; i++) {
if (padded.indexOf(exciteWords\[i]) !== -1) excite++;
}

// Fear Engine
var fearWords = \["scared", "afraid", "nervous"];
var fear = 0;
for (var j=0; j\<fearWords.length; j++) {
if (padded.indexOf(fearWords\[j]) !== -1) fear++;
}

// Blend
if (excite > 0 && fear > 0) {
context.character.personality += ", excited but nervous.\n\n";
context.character.scenario    += " Their smile is wide, but their hands tremble.\n\n";
}

📖 **Plain English:**

* If “excited” words and “fear” words both show up → bot enters a hybrid “nervous-excited” state.

---
