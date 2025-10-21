## 🟢 Multi-Message Context (Looking Back Several Lines)

By default, scripts only read the **latest** message.  
But what if you want to react to something said a few turns ago — like a slow-burn emotion or a repeating word?

You can create a small **look-back window**:

```js
const lastMessages = context.chat.last_messages
  .slice(-5)                           // take the last 5 user messages
  .map(m => m.message.toLowerCase())   // normalize casing
  .join(" ");                          // merge into one searchable string
```

Now `lastMessages` is a single string containing recent chat history.

You can use it exactly like `last_message`:

```js
if (lastMessages.includes("secret")) {
  context.character.personality += ", becomes cautious about secrets.";
}
```

### 🧠 Why This Matters

- Detects patterns spread across several turns.
    
- Prevents missing context from short back-and-forth lines.
    
- Enables _multi-message emotion tracking_ and _progressive lore triggers._
    

💡 Tip: Adjust the depth with `.slice(-3)` or `.slice(-10)` depending on how much history you want.

---
