## 🟢 Limit 6: Error Handling

The sandbox still skips `try / catch`, so guards remain good practice:

```js
context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario    = context.character.scenario    || "";
```

These prevent undefined errors and silent crashes.  
If something fails, `console.log()` it — debugging works everywhere now.

---
