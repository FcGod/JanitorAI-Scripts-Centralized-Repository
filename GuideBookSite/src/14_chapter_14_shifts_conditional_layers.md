# 📘 Chapter 14: Shifts & Conditional Layers

So far, our lore entries have been **flat**: one keyword → one response. But real life isn’t flat. A forest feels different at **day** vs. **night**. A character acts differently when they’re **calm** vs. **angry**.

👉 That’s where **shifts** (conditional layers) come in. They let one entry change flavor depending on extra context.

---

## 🟡 Step 1: Flat Entry (No Shift)

if (padded.indexOf(" forest ") !== -1) {
context.character.scenario += "The forest surrounds you.";
}

Plain English:
Anytime the user says “forest,” we just add: *“The forest surrounds you.”*
Always the same, no matter what else is happening.

---

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

## 🟡 Step 4: Emotional Shifts

Shifts don’t have to be time-based — they can be **emotional layers**.

var lorebook = \[
{
keywords: \["mentor"],
personality: ", wise and strict",
shifts: \[
{ keywords: \["trust"], personality: ", softens when trusted" },
{ keywords: \["anger"], personality: ", harsh when angry" }
]
}
];

Plain English:

* “Mentor” = wise and strict
* If “trust” is present → add soft trait
* If “anger” is present → add harsh trait

---

## 🟡 Step 5: Probabilistic Shifts

You can add **random variety** into shifts.

if (padded.indexOf(" tavern ") !== -1) {
if (Math.random() < 0.5) {
context.character.scenario += "The tavern is rowdy tonight.";
} else {
context.character.scenario += "The tavern is quiet and dimly lit.";
}
}

Plain English:
Same keyword, two possible moods. Keeps the world fresh.

---

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

## 🟡 Recap Table

| Type                    | Example                          | Use Case                 |
| ----------------------- | -------------------------------- | ------------------------ |
| **Flat**                | “Forest surrounds you”           | Always the same response |
| **Time-based shift**    | “Day → bright” / “Night → eerie” | Environmental changes    |
| **Emotional shift**     | “Mentor + trust → softer”        | Character reactions      |
| **Probabilistic shift** | Tavern noisy vs. quiet           | Variety / replayability  |
| **Layered shift**       | Night + Wolves = howling         | Stacking depth           |

---

## 🟡 Key Takeaways from Chapter 14

* Shifts = **conditional flavors** that modify a base entry
* Use them for **time, mood, emotion, or randomness**
* Shifts make the world **react to context** instead of staying flat
* Layer shifts for **rich storytelling** without bloating your script

---

✨ Pro Tip: Think of shifts like *lighting in a movie scene*. The set (forest) doesn’t change, but the lighting (day, night, candle, storm) transforms the mood completely.
