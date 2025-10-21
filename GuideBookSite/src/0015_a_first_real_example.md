## 🟢 A First Real Example

Let’s make the character “warm up” over time:

```js
if (context.chat.message_count > 20) {
  context.character.personality += ", has really warmed up to the user";
  context.character.scenario    += " The atmosphere feels much friendlier now.";
}
```

Plain English:

- After 20 messages → add warmth to both personality and scene.
    
- The longer the chat, the more natural and connected it feels.
    

---
