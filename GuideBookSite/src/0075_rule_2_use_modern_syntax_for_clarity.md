## 🟢 Rule 2: Use Modern Syntax for Clarity

The sandbox supports ES6 features — use them for clean, readable code.

```js
const greetings = ["hi", "hello", "hey"];

for (const g of greetings) {
  if (padded.includes(` ${g} `)) {
    context.character.personality += ", friendly and welcoming.";
    break;
  }
}
```

- `const` / `let` replace `var`.
    
- Template literals (`` `${var}` ``) improve readability.
    
- Arrow functions and `.forEach()` / `.map()` are safe for light loops.
    

---
