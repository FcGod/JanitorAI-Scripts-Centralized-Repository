## 🟢 Level 4: Message Count Progression

```js
const count = context.chat.message_count;

if (count < 5) {
  context.character.personality += ", polite and formal";
} else if (count < 15) {
  context.character.personality += ", warming up and more casual";
} else if (count < 30) {
  context.character.personality += ", friendly and open";
} else {
  context.character.personality += ", deeply connected and trusting";
}
```

Plain English:  
The longer the chat, the closer the tone.

---
