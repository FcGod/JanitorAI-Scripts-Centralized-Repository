## 🟢 Limit 4: Execution Time

Each script still has a small time slice (a few milliseconds).  
If something takes too long, the sandbox stops quietly.  
In practice, this only happens with accidental infinite loops or huge JSON parses.

✅ Safe: hundreds of loops, short text operations.  
⚠️ Risky: recursive functions with no end condition.

---
