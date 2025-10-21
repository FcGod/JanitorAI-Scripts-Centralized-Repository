## 🟡 Step 2: Adding a Shift (Day vs. Night)

if (padded.indexOf(" forest ") !== -1) {
if (padded.indexOf(" day ") !== -1) {
context.character.scenario += "The forest feels alive in the daylight.";
} else if (padded.indexOf(" night ") !== -1) {
context.character.scenario += "The forest feels eerie under the moonlight.";
} else {
context.character.scenario += "The forest surrounds you.";
}
}

Plain English:

* If “forest” + “day” → bright forest
* If “forest” + “night” → eerie forest
* Otherwise, default forest

---
