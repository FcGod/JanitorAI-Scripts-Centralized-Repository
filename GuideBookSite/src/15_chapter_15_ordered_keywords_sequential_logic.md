# 📘 Chapter 15: Ordered Keywords (Sequential Logic)

So far, your triggers have been simple:

* “happy” → add cheerful trait
* “forest” → add forest scene

But what if you only want something to fire if **keywords appear in order**?

👉 Example: “She teases you… then admits her feelings.”

* If the user only says “tease,” it shouldn’t fire
* If they only say “feelings,” it shouldn’t fire
* But if “tease” comes **before** “feelings,” it unlocks a special event

This is called **sequential logic.**

---

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

## 🟡 Step 2: Multi-Keyword (Both Present, Any Order)

if (padded.indexOf(" tease ") !== -1 && padded.indexOf(" feelings ") !== -1) {
context.character.scenario += "Their teasing shifts into something heartfelt.";
}

Plain English:
This only triggers if both words appear, but it doesn’t care which one comes first.

---

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

## 🟡 Step 4: Story Example

**User says:**
“She confessed her feelings, almost teasing.”
→ *Does not fire* (feelings came before tease)

**User says:**
“She kept teasing until she admitted her feelings.”
→ *Fires* (tease came first)

---

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

## 🟡 Recap Table

| Type              | Example                          | Order Matters? |
| ----------------- | -------------------------------- | -------------- |
| **Flat**          | “tease” → playful                | ❌ No           |
| **Multi-keyword** | “tease” + “feelings” → heartfelt | ❌ No           |
| **Sequential**    | “tease” → “feelings”             | ✅ Yes          |
| **Long chain**    | meet → fight → reconcile         | ✅ Yes          |

---

## 🟡 Key Takeaways from Chapter 15

* Sequential logic checks **position** as well as presence
* Lets you script **story beats** that unfold in order
* Great for arcs like: teasing → feelings, fight → reconcile, secret → betrayal
* Without order checks, scripts may fire in unintended contexts

---

✨ Pro Tip: Think of sequential logic like *sheet music*. Notes (keywords) only make sense when they’re played in the right order.
