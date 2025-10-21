## 🟡 Step 4: Modular + Dynamic Expansion

Everything Lorebook categories can each have **shifts, weights, and gates.**

var lorebook = {
traits: \[
{
keywords: \["courage"],
personality: ", brave but uncertain",
shifts: \[
{ keywords: \["fear"], personality: ", courage tested against fear" }
],
minCount: 10
}
]
};

📖 **Plain English:**

* Base trait = courage.
* If “fear” is also present → courage changes flavor.
* Only activates after 10 messages.

---
