# 📘 Chapter 8: Building a Simple Lorebook

Up until now, you’ve been working with **triggers**: single words → single responses. That’s fine for small scripts, but what if you want your bot to *remember multiple pieces of world information*?

👉 That’s where a **lorebook** comes in.

A **lorebook** is just a collection of entries. Each entry is like a **mini fact**:

* Who someone is
* What a place looks like
* How a character reacts

---

## 🟡 Step 1: The Mini Entry (One Fact)

Here’s the smallest possible “lorebook”:

var lorebook = \[
{ keywords: \["forest"], personality: ", at home in nature", scenario: "Tall trees sway in the breeze." }
];

var last = context.chat.last\_message.toLowerCase();
var padded = " " + last + " ";

for (var i = 0; i < lorebook.length; i++) {
var entry = lorebook\[i];
for (var j = 0; j < entry.keywords.length; j++) {
if (padded.indexOf(" " + entry.keywords\[j] + " ") !== -1) {
context.character.personality += entry.personality;
context.character.scenario += entry.scenario;
break;
}
}
}

Plain English:

* `lorebook` is just a list (array) of entries
* Each entry has **keywords**, a **personality trait**, and a **scenario note**
* If the user says “forest,” the bot adds forest lore

---

## 🟡 Step 2: Multiple Entries

Now let’s add more facts.

var lorebook = \[
{ keywords: \["forest"], personality: ", at home in nature", scenario: "Tall trees sway in the breeze." },
{ keywords: \["city"], personality: ", sharp and streetwise", scenario: "The streets buzz with activity." },
{ keywords: \["river"], personality: ", calm and reflective", scenario: "Water flows gently nearby." }
];

Plain English:
Now “forest,” “city,” and “river” each unlock their own lore.

---

## 🟡 Step 3: Priorities

What if multiple entries trigger at once? We don’t want everything to fire.
We add **priority numbers**. Higher priority wins.

var lorebook = \[
{ keywords: \["godfather", "damien"], priority: 10, personality: ", a calculating and charismatic leader" },
{ keywords: \["mafia", "family"], priority: 5, personality: ", part of a powerful crime family" }
];

var activated = \[];
for (var i = 0; i < lorebook.length; i++) {
var entry = lorebook\[i];
for (var j = 0; j < entry.keywords.length; j++) {
if (padded.indexOf(" " + entry.keywords\[j] + " ") !== -1) {
activated.push(entry);
break;
}
}
}

activated.sort(function(a, b) { return b.priority - a.priority; });

if (activated.length > 0) {
context.character.personality += activated\[0].personality;
}

Plain English:

* If both “godfather” and “family” appear, “godfather” wins because it has higher priority

---

## 🟡 Step 4: Flat Style (Beginner-Friendly)

If arrays feel overwhelming, you can just write entries as `if` checks.

if (padded.indexOf(" forest ") !== -1) {
context.character.personality += ", at home in nature";
context.character.scenario += "Tall trees sway in the breeze.";
}

if (padded.indexOf(" city ") !== -1) {
context.character.personality += ", sharp and streetwise";
context.character.scenario += "The streets buzz with activity.";
}

Plain English:
This works the same as a lorebook — it’s just less organized. Fine for small scripts, but messy for big worlds.

---

## 🟡 Step 5: Expanding Lore

Lorebooks can include more than just traits and places. You can add:

* **Relationships** (e.g., “brother,” “mentor”)
* **Objects** (e.g., “sword,” “ring”)
* **Factions** (e.g., “mages guild,” “alchemists”)

Example:

var lorebook = \[
{ keywords: \["mentor"], personality: ", wise and strict", scenario: "Their mentor watches closely." },
{ keywords: \["ring"], scenario: "A mysterious ring glints faintly." }
];

Plain English:
Anything you want the bot to “know about” can go into a lorebook.

---

## 🟡 Recap Table

| Style                      | Pros                           | Cons                   | Best For                  |
| -------------------------- | ------------------------------ | ---------------------- | ------------------------- |
| **Flat if checks**         | Easy to read, no arrays        | Gets messy fast        | Beginners, small projects |
| **Simple lorebook array**  | Organized, scalable            | Slightly harder syntax | Medium projects           |
| **Lorebook w/ priorities** | Resolves conflicts, neat       | Needs sorting step     | Complex projects          |
| **Expanded lorebook**      | Covers people, places, objects | More setup work        | Large worldbuilding       |

---

## 🟡 Key Takeaways from Chapter 8

* A **lorebook** is just a structured list of entries
* Each entry = keywords + personality + scenario
* Use **priorities** if multiple entries might trigger
* Start with flat if checks, move to arrays as your world grows
* Lorebooks keep scripts clean and organized — essential for big projects

---

✨ Pro Tip: Think of a lorebook like a **wiki inside your script**. Each entry is a “page” (a fact), and keywords are the links that lead to it.
