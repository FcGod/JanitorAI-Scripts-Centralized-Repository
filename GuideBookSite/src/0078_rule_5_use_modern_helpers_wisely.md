## 🟢 Rule 5: Use Modern Helpers Wisely

Array and object utilities make intent clearer — just avoid nesting them excessively.

```js
const moods = ["happy", "sad", "angry"];
const found = moods.find(m => padded.includes(m));

if (found) context.character.personality += `, senses the user is ${found}.`;
```

`find`, `some`, `every`, `filter` are all sandbox-safe.

---
