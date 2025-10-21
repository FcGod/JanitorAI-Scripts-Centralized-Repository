## 🟡 Step 3: Lorebook with Shifts

We can store shifts **inside an entry**.

var lorebook = \[
{
keywords: \["forest"],
scenario: "The forest surrounds you.",
shifts: \[
{ keywords: \["day"], scenario: "The forest glows with sunlight." },
{ keywords: \["night"], scenario: "The forest grows dark and quiet." }
]
}
];

Processing looks like:

1. Match “forest.”
2. Add its base scenario.
3. Check if any **shift keywords** also match → add their text.

---
