## 🗺️ The Progression Roadmap

1️⃣ Tiny Trigger → one word = one response  
2️⃣ Multiple Keywords  
3️⃣ Emotion Detection  
4️⃣ Message Count Progression  
5️⃣ Simple Lorebook (with priorities)  
6️⃣ Scenario Lorebook (personality + scene)  
7️⃣ Dynamic Lorebook (plain checks)  
8️⃣ Timed Lore Reveals (gating)  
9️⃣ Hybrid Systems (moods + context)  
🔟 Advanced Lorebooks (multi-pass / probabilities / unlocks)

---

### 💡 Before We Start

Let’s prepare the two basic text variables used in every example:

```js
const last = context.chat.last_message.toLowerCase();
const padded = ` ${last} `;

// optional: 5-message window for deeper context
const lastMessages = context.chat.last_messages
  .slice(-5)
  .map(m => m.message.toLowerCase())
  .join(" ");
```

You can use either `padded` (just the latest message)  
or `lastMessages` (the recent conversation history) depending on how wide your check needs to be.

---
