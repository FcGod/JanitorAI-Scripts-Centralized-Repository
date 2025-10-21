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
