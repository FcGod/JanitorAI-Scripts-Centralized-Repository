# 📘 Chapter 18: Performance & Sandbox Limits (How Far You Can Push Scripts — ES6 Edition)

Scripts today are faster, larger, and far more forgiving than in the early sandbox days.  
The environment now runs **modern ES6 JavaScript**, supports complex logic, and handles far bigger script sizes without breaking.  
But performance still matters — not because the sandbox is fragile, but because clarity keeps your character snappy and reliable.

---

## 🟢 Why Limits Exist

Even with more room to breathe, limits protect three things:

- **Safety** — no one can crash the host or access external systems.
    
- **Speed** — your logic still runs before every message, so efficiency matters.
    
- **Consistency** — every script behaves the same across platforms.
    

---

## 🟢 Limit 1: JavaScript Version (ES6 Sandbox)

The sandbox now supports most ES6 features inside its safe scope.

✅ Works

- `const`, `let`, arrow functions, template literals
    
- `.includes()`, `.map()`, `.filter()`, `.find()`, `.forEach()`
    
- object and array destructuring
    
- default parameters
    
- `Object.assign()`, `Object.keys()`, `Object.values()`
    

❌ Still Blocked

- `async/await`, `Promise`, `setTimeout`, `setInterval`
    
- `fetch`, `XMLHttpRequest`, `import`, `require`
    
- `document`, `window`, or any global DOM access
    
- extending sandbox globals or writing to outside scope
    

Rule of thumb: anything that talks to the _outside world_ is still off-limits.

---

## 🟢 Limit 2: Script Size and Memory

The sandbox now allows scripts up to ≈ **300 KB** of code — a massive leap from the old 25 KB limit.

You can build multi-layered systems, emotion engines, and full lorebooks in one file.  
Still, keep individual **string additions short** (≈ < 600 characters each) so outputs stay readable and never exceed per-turn message budgets.

**Guideline:**

- Short sentences = more stable outputs.
    
- Big scripts = fine. Big _replies_ = risky.
    

---

## 🟢 Limit 3: Loops and Iteration

The loop guardrails are essentially gone.  
You can now iterate thousands of times safely as long as your code finishes quickly.

```js
for (const word of dictionary) {
  if (lastMessages.includes(word)) found.push(word);
}
```

Still use `break` or `return` to exit early when a match is found — not because you have to, but because clean logic reads better and saves time.

---

## 🟢 Limit 4: Execution Time

Each script still has a small time slice (a few milliseconds).  
If something takes too long, the sandbox stops quietly.  
In practice, this only happens with accidental infinite loops or huge JSON parses.

✅ Safe: hundreds of loops, short text operations.  
⚠️ Risky: recursive functions with no end condition.

---

## 🟢 Limit 5: Memory & State Persistence

There’s still **no persistent memory** between messages.  
Every run starts fresh — your only “storage” is what you write into:

```js
context.character.personality
context.character.scenario
```

Use those fields as your notes.  
They travel forward in the conversation, effectively acting as your short-term memory.

---

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

## 🟢 Limit 7: Randomness & Variation

`Math.random()` works normally.  
You can safely randomize lines, choose probabilities, or mix personality shifts.

```js
if (Math.random() < 0.3) {
  context.character.personality += ", unexpectedly playful";
}
```

Use randomness for color, not for crucial logic that the story depends on.

---

## 🟢 Performance Tips for the Modern Sandbox

- ✅ Use ES6 syntax – `const`, arrow functions, template strings.
    
- ✅ Break large systems into helper functions for clarity.
    
- ✅ Append short phrases, not novels, each turn.
    
- ✅ Exit loops early when goals are met.
    
- ✅ Use `lastMessages` for context without extra memory.
    
- ✅ Test in the debug panel with `console.log()`.
    

---

## 🟢 Quick Practice — Spot the Real Limit

**1️⃣ Why is this now safe?**

```js
if (context.chat.last_message.toLowerCase().includes("hello")) {
  context.character.scenario += "They greet you warmly.";
}
```

✅ Because `.includes()` and template literals are now supported.

**2️⃣ When could this still fail?**

```js
while (true) { /* ... */ }
```

❌ Infinite loop — the sandbox will time out silently.

**3️⃣ Why prefer shorter additions?**  
Large multi-paragraph strings can exceed chat token limits even though the sandbox accepts them. Keep responses natural and concise.

---

## 🟢 Key Takeaways from Chapter 18

- You’re in a **modern ES6 sandbox**, not legacy ES5.
    
- Script size limit ≈ 300 KB — build big systems safely.
    
- Loops are virtually unlimited; just avoid infinite ones.
    
- Per-turn text additions should stay under ~600 characters.
    
- Still no async functions or external fetch calls.
    
- Use guards and `console.log()` for debugging.
    
- Performance issues today come from logic design, not sandbox ceilings.
    
---
✨ **Pro Tip:**  
You’re no longer writing “tiny, fragile scripts.”  
You’re building full systems — so write them like software: modular, readable, and maintainable.
