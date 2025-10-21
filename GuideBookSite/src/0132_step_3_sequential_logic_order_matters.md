## 🟡 Step 3: Sequential Logic (Order Matters)

var teaseIndex = padded.indexOf(" tease ");
var feelingsIndex = padded.indexOf(" feelings ");

if (teaseIndex !== -1 && feelingsIndex !== -1 && teaseIndex < feelingsIndex) {
context.character.scenario += "The teasing slowly turns into a confession of feelings.";
}

Plain English:

* Both words must appear
* “tease” must come **before** “feelings”
* Only then does the special scenario fire

---
