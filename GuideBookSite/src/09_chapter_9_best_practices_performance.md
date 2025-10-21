# 📘 Chapter 9: Best Practices & Performance

By now, you’ve seen scripts grow from **tiny triggers** to **dynamic lorebooks**. That’s powerful — but with more capability comes more ways to go off track.  
This chapter focuses on keeping scripts:

- ✅ **Safe** — they never crash.
    
- ✅ **Efficient** — they respond instantly even when complex.
    
- ✅ **Readable** — you can return months later and still understand them.
    

---

## 🟢 Rule 1: Keep It Focused — Not “Small”

Scripts can now handle thousands of lines, but logical focus still matters.

- **Good:** clear functions and short logical blocks.
    
- **Bad:** one 1,000-line function that does ten different things.
    

Think _cohesion_, not _file size._

---

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

## 🟢 Rule 4: Favor Readable Logic Over Compression

The old 25 KB ceiling encouraged code-golf tricks.  
Now you can write descriptively:

```js
if (isEvening && isGreeting) {
  context.character.scenario += " The café lights glow softly.";
}
```

Readable code beats dense one-liners every time.

---

## 🟢 Rule 5: Use Modern Helpers Wisely

Array and object utilities make intent clearer — just avoid nesting them excessively.

```js
const moods = ["happy", "sad", "angry"];
const found = moods.find(m => padded.includes(m));

if (found) context.character.personality += `, senses the user is ${found}.`;
```

`find`, `some`, `every`, `filter` are all sandbox-safe.

---

## 🟢 Rule 6: Clamp Your Outputs (Still Important)

While scripts can be larger, individual field updates should stay concise.  
Short, atomic sentences remain easier for the model to interpret.

- **Ideal addition:** < 600 characters.
    
- **Danger zone:** multi-paragraph dumps.
    

---

## 🟢 Rule 7: Test and Log Openly

Testing is your friend:

```js
console.log("Last message:", context.chat.last_message);
console.log("Personality now:", context.character.personality);
```

`console.log` output appears in the sandbox debug panel — no harm done.

---

## 🟢 Rule 8: Fail Gracefully

If nothing matches, just leave things alone or provide a neutral fallback:

```js
if (!matched) context.character.personality += ", neutral and calm.";
```

Empty turns are fine; forced output feels robotic.

---

## 🟢 Rule 9: Comment Generously

```js
// Greeting logic — triggers only once per chat start
if (padded.includes(" hello ")) { ... }
```

Comments cost almost nothing but save hours later.

---

## 🟢 Rule 10: Plan for Growth, Not Compression

Your sandbox can now handle complex logic trees, but clarity still wins.

- Build features in layers (keywords → reactions → emotions).
    
- Add functions when patterns repeat.
    
- Keep related logic grouped by theme.
    

---

## 🟢 Key Takeaways from Chapter 9

- ✅ Use modern ES6 syntax (`const`, `let`, arrow functions, template literals`).
    
- ✅ Write for clarity and maintainability, not size limits.
    
- ✅ Append text instead of overwriting.
    
- ✅ Keep outputs concise and meaningful.
    
- ✅ Test and comment liberally.
