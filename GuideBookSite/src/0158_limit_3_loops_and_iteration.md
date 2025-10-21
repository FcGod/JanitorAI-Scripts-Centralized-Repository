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
