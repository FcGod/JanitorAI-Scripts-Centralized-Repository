## 🟡 Step 6: Layered Shifts (Stacking)

Multiple conditions can layer together.

if (padded.indexOf(" forest ") !== -1) {
if (padded.indexOf(" night ") !== -1) {
context.character.scenario += "The forest is dark and silent.";
if (padded.indexOf(" wolves ") !== -1) {
context.character.scenario += "You hear wolves howling in the distance.";
}
}
}

Plain English:

* Forest + Night → dark forest
* Forest + Night + Wolves → adds a howling event

---
