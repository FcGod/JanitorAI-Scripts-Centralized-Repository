## 🟢 Level 3: Emotion Detection

```js
const emotions = ["happy", "sad", "angry", "excited"];

for (const e of emotions) {
  if (lastMessages.includes(` ${e} `)) {
    context.character.scenario += `The user seems ${e}.`;
    break;
  }
}
```

Plain English:  
Detects emotion even if the word appeared two or three turns ago.

---
