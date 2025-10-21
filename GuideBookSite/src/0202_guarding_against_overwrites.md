## 🟡 Guarding Against Overwrites

Never replace personality or scenario. Always **append (`+=`)**.

❌ Wrong:
context.character.personality = "angry";
(Deletes everything else!)

✅ Right:
context.character.personality += ", now angrier than before.";

📖 **Plain English:** Always add, never erase.

---
