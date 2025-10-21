# 📘 Chapter 3: The Sandbox Rules (What Works and What Doesn’t)

If you’ve ever played a video game in **sandbox mode**, you know you can experiment — but there are still boundaries. That’s exactly what happens here.

Your script doesn’t run in unrestricted JavaScript like a professional programmer’s environment.  
Instead, it runs in a **safe sandbox** — a controlled runtime that now supports most **ES6 (modern JavaScript)** features **inside the sandbox scope**, while still blocking anything that touches global objects or external systems.

---

## 🟡 The Golden Rule

👉 **You can only use the tools the sandbox gives you.**

The sandbox now supports modern ES6 syntax — but not _everything_.  
If you use something unsafe, async, or tied to the global runtime, the script may fail silently (nothing happens, no error message).

---

## 🟢 Safe Tools (These Always Work)

Here are the tools you can confidently use anywhere inside the sandbox.

### **Strings**

- `.toLowerCase()` → make text lowercase
    
- `.includes("word")` → check if a word appears (ES6-safe replacement for `.indexOf`)
    
- `.trim()` → remove spaces at the start and end
    
- `.replace()` → swap or clean words
    
- Template literals: `` `Hello ${name}` `` ✅
    

### **Numbers & Math**

- `+ - * /` (basic math)
    
- `Math.random()` → random 0–1
    
- `Math.floor()` → round down
    
- `Math.min()` / `Math.max()` → clamp values
    

### **Arrays (Lists)**

- `.length` → how many items
    
- `.includes()` → check for an element
    
- `.forEach()` / `.map()` / `.filter()` ✅ (lightweight iterations now supported)
    
- `for (const x of arr)` loops ✅
    

```js
for (const item of arr) {
  // do something with item
}
```

### **Objects**

- `Object.keys()`, `Object.values()`, `Object.assign()` ✅
    
- Destructuring: `const {a, b} = obj;` ✅
    
- Shorthand properties: `{ name, age }` ✅
    

### **Variables & Functions**

- `const` / `let` ✅ (use instead of `var`)
    
- Arrow functions ✅ → `arr.forEach(x => console.log(x))`
    
- Function defaults: `function say(text = "Hi") { … }` ✅
    

### **Dates**

- `new Date()`
    
- `.getHours()`, `.getMinutes()`
    

### **Regular Expressions (Regex)**

- Basic checks like:
    
    ```js
    if (/\bhello\b/i.test(text)) { … }
    ```
    
    ⚠ Look-behind and advanced Unicode features still not supported.
    

### **Debugging**

- `console.log()` works normally in the sandbox debug panel.
    

✅ These are your everyday building blocks. They now include modern syntax, but still run safely inside the isolated context.

---

## 🔴 Unsafe / Blocked Tools (These Still Don’t Work)

Some JavaScript features interact with the outside environment or the global runtime and remain blocked for safety.

- **Async / Concurrency**
    
    - `async` / `await`, `Promise`, `setTimeout`, `setInterval` → ❌
        
    - No asynchronous I/O or delayed callbacks.
        
- **External Access**
    
    - `fetch`, `XMLHttpRequest`, `require`, `import`, `document`, `window` → ❌
        
    - Anything that touches network, DOM, or file system is blocked.
        
- **Global Side Effects**
    
    - Adding global variables, redefining `context`, or overwriting system objects → ❌
    
   ---

## 🟡 Gray-Area Tools (Work in Most Hosts)

These features are usually fine but may behave inconsistently depending on implementation:

- `.padStart()` / `.padEnd()`
    
- `.repeat()`
    
- Advanced regex flags (`/s`, look-behind, named groups)
    
- Spread syntax on extremely large arrays (`...bigArray`)
    

⚠ **Tip:** If you need absolute reliability, test your script once in the sandbox console before shipping.

---

## 🟡 Why These Limits Exist

The sandbox is designed to:

1. **Stay Fast** — Scripts run before every bot reply, so they must finish in milliseconds.
    
2. **Stay Safe** — No network, file, or global access.
    
3. **Stay Simple** — You get all core ES6 syntax without external complexity.
    

Think of it like a **practice car with upgraded controls but a speed limiter** — you can use all the modern conveniences, but you still can’t crash through the walls.

---

## 🟡 Example: Safe vs Unsafe

**Safe (ES6-style):**

```js
if (context.chat.last_message.toLowerCase().includes("hello")) {
  context.character.scenario += "They greet you warmly.";
}
```

**Unsafe (still blocked):**

```js
await fetch("https://example.com/api");
```

What changed?

- ✅ `.includes()` is now allowed.
    
- ❌ Async calls remain disabled.
    
- Template literals and `const` are fine inside the sandbox.
    

---

## 🟡 Key Takeaways from Chapter 3

- You’re in a **sandbox-safe ES6 environment** — modern syntax works inside script scope.
    
- ✅ Safe: text tools, math, arrays, objects, regex, template literals, arrow functions.
    
- ⚠ Gray Area: padding, repeating, advanced regex, very large spreads.
    
- ❌ Blocked: async functions, timers, external calls, global access.
    
- Always favor **clarity + simplicity** — modern JS is available, but restraint keeps scripts fast and reliable.
    

---

Would you like me to apply this same **ES6-Sandbox modernization** style to Chapter 18 next (Performance & Sandbox Limits)?

---

## 🟡 Key Takeaways from Chapter 3

* You’re in a **sandbox**, not full JavaScript
* ✅ Safe: text basics, math, arrays with loops, dates, regex, console.log
* ❌ Unsafe: modern features, array helpers, async, external APIs
* ⚠ Gray area: `.includes`, `.padStart`, `.repeat` — avoid them if possible
* Always pick the **safest, simplest tool** when in doubt

---
