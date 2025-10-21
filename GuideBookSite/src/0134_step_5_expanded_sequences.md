## 🟡 Step 5: Expanded Sequences

You can extend this idea to longer chains.

var meetIndex = padded.indexOf(" meet ");
var fightIndex = padded.indexOf(" fight ");
var reconcileIndex = padded.indexOf(" reconcile ");

if (meetIndex !== -1 && fightIndex !== -1 && reconcileIndex !== -1) {
if (meetIndex < fightIndex && fightIndex < reconcileIndex) {
context.character.scenario += "They met, fought, and finally reconciled.";
}
}

Plain English:
The script only fires if the **full sequence** appears in order.

---
