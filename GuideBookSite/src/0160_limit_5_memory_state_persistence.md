## 🟢 Limit 5: Memory & State Persistence

There’s still **no persistent memory** between messages.  
Every run starts fresh — your only “storage” is what you write into:

```js
context.character.personality
context.character.scenario
```

Use those fields as your notes.  
They travel forward in the conversation, effectively acting as your short-term memory.

---
