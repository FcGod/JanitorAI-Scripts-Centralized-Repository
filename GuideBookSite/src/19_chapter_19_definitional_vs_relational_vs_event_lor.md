# 📘 Chapter 19: Definitional vs. Relational vs. Event Lore

Not all lore entries serve the same purpose. Some define **what things are**, some explain **how they connect**, and some move the story with **what happens.**

👉 Think of it like writing a play:

* **Definitional lore** = the stage and cast list.
* **Relational lore** = how the cast feels about each other.
* **Event lore** = the script that makes things happen.

---

## 🟡 Type 1: Definitional Lore

**What it is:**

* Baseline facts about people, places, or objects.
* Things that don’t change often.

**Examples:**

* “The Godfather is calculating and charismatic.”
* “The forest is filled with tall pines.”

Example code:

if (padded.indexOf(" godfather ") !== -1) {
context.character.personality += ", calculating and charismatic.\n\n";
context.character.scenario    += "He sits in a lavish study.\n\n";
}

📖 **Plain English:**
Definitional lore tells us *what exists.*

---

## 🟡 Type 2: Relational Lore

**What it is:**

* How characters, groups, or places connect.
* Explains bonds, rivalries, trust, or loyalty.

**Examples:**

* “Damien is loyal to family above all else.”
* “The mage guild distrusts the alchemists.”

Example code:

if (padded.indexOf(" family ") !== -1) {
context.character.personality += ", loyal to family above all.\n\n";
}

📖 **Plain English:**
Relational lore tells us *how things relate.*

---

## 🟡 Type 3: Event Lore

**What it is:**

* Story beats that happen at a specific moment.
* Can be tied to time, message count, or triggers.

**Examples:**

* “At 20 messages, the phone rings.”
* “When secrets are mentioned, they whisper about the Sundering.”

Example code:

if (context.chat.message\_count === 20) {
context.character.scenario += "A phone rings suddenly, breaking the silence.\n\n";
}

📖 **Plain English:**
Event lore tells us *when things happen.*

---

## 🟡 Quick Comparison

| Lore Type        | Purpose            | Example                           | Code Shape               |
| ---------------- | ------------------ | --------------------------------- | ------------------------ |
| **Definitional** | Establish facts    | “Godfather is calculating”        | Keyword → baseline trait |
| **Relational**   | Define connections | “Mage guild distrusts alchemists” | Keyword → bond/rivalry   |
| **Event**        | Move story forward | “At 20 messages, a phone rings”   | Message count / trigger  |

---

## 🟡 How They Work Together (Story Snippet)

**User says:** “Tell me about the Godfather and his family.”

* **Definitional lore fires:**
  *Godfather = calculating leader.*
* **Relational lore fires:**
  *Loyal to family above all.*
* **Event lore adds (at msg 20):**
  *A phone rings during the meeting.*

👉 Combined, this paints a rich scene: *A calculating Godfather, loyal family ties, and a sudden event interrupting.*

---

## 🟡 Key Takeaways from Chapter 19

* **Definitional lore** = what exists.
* **Relational lore** = how it connects.
* **Event lore** = when things happen.
* Together, they form a **world Bible** for your script.
