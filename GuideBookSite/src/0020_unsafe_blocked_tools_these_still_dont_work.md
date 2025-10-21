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
