## 🟡 Step 1: Flat Keywords (No Order)

if (padded.indexOf(" tease ") !== -1) {
context.character.personality += ", playful and teasing.";
}
if (padded.indexOf(" feelings ") !== -1) {
context.character.scenario += "They hint about their deeper feelings.";
}

Plain English:

* If “tease” shows up → playful
* If “feelings” shows up → emotional hint
* Works fine, but doesn’t check *order*

---
