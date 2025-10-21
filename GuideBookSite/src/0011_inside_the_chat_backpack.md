## 🟢 Inside the Chat Backpack

The script also gives you `context.chat`, which holds details about the conversation itself:

- `message_count` → how many total messages have been sent.
    
- `last_message` → the most recent thing the user typed.
    
- `last_messages` → an array of recent messages (new in modern sandbox).
    
- `first_message_date` / `last_bot_message_date` → timestamps, if supported.
    

Plain English:

- `message_count` = the line number in the play.
    
- `last_message` = the latest shout from the audience.
    
- `last_messages` = a short scrollback — useful for multi-turn logic.
    
- The date fields are nice extras, but beginners can skip them.
    

---
