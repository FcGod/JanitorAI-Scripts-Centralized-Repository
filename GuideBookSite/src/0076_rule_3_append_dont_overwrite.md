## 🟢 Rule 3: Append, Don’t Overwrite

Never replace existing text in `personality` or `scenario`; always add to it.

❌ Bad

```js
context.character.personality = "Happy";
```

✅ Good

```js
context.character.personality += ", feeling happy.";
```

Appending preserves accumulated context and prevents blank replies.

---
