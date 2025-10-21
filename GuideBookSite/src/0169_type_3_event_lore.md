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
