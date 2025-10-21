## 🟡 Example: Safe vs Unsafe

**Safe (ES6-style):**

```js
if (context.chat.last_message.toLowerCase().includes("hello")) {
  context.character.scenario += "They greet you warmly.";
}
```

**Unsafe (still blocked):**

```js
await fetch("https://example.com/api");
```

What changed?

- ✅ `.includes()` is now allowed.
    
- ❌ Async calls remain disabled.
    
- Template literals and `const` are fine inside the sandbox.
    

---
