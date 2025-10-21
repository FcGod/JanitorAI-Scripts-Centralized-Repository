## 🟢 Rule 8: Fail Gracefully

If nothing matches, just leave things alone or provide a neutral fallback:

```js
if (!matched) context.character.personality += ", neutral and calm.";
```

Empty turns are fine; forced output feels robotic.

---
