## 🟢 Level 9: Hybrid Systems

```js
if (lastMessages.includes(" painting ") && lastMessages.includes(" happy ")) {
  context.character.scenario += "They joyfully describe their love of painting.";
}

if (lastMessages.includes(" forest ") && count > 20) {
  context.character.scenario += "The forest feels darker now, full of secrets.";
}
```

Plain English:  
Combines emotion + topic + timing for richer logic.

---
