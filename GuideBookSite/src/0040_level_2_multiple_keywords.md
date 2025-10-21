## 🟢 Level 2: Multiple Keywords

```js
const greetings = ["hi", "hello", "hey"];

for (const g of greetings) {
  if (lastMessages.includes(` ${g} `)) {
    context.character.scenario    += "They greet you warmly.";
    context.character.personality += "Friendly and welcoming.";
    break;
  }
}
```

Now the script catches any greeting from the **last few messages**, not just the newest.

---
