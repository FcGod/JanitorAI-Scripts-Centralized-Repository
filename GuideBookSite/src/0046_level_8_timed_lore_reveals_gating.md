## 🟢 Level 8: Timed Lore Reveals (Gating)

```js
if (count > 15 && lastMessages.includes(" secret ")) {
  context.character.personality += ", keeper of ancient secrets";
  context.character.scenario    += "They whisper about the Sundering.";
}
```

---
