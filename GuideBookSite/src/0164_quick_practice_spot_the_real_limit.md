## 🟢 Quick Practice — Spot the Real Limit

**1️⃣ Why is this now safe?**

```js
if (context.chat.last_message.toLowerCase().includes("hello")) {
  context.character.scenario += "They greet you warmly.";
}
```

✅ Because `.includes()` and template literals are now supported.

**2️⃣ When could this still fail?**

```js
while (true) { /* ... */ }
```

❌ Infinite loop — the sandbox will time out silently.

**3️⃣ Why prefer shorter additions?**  
Large multi-paragraph strings can exceed chat token limits even though the sandbox accepts them. Keep responses natural and concise.

---
