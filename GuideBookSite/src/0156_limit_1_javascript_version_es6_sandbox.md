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
