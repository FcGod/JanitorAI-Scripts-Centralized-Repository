## 🟡 Sandbox Tricks

Here are a few survival hacks:

1. **No modern JavaScript.**

   * ❌ Doesn’t work: arrow functions, `.map()`, `.includes()`, template strings, `async/await`.
   * ✅ Safe: `for` loops, `indexOf`, `+` string concatenation.

2. **Keep strings short.**

   * Stay under a few hundred characters per update.
   * Giant paragraphs risk being cut off or ignored.

3. **Randomness is fine.**

   * `Math.random()` works.
   * Use it for probability and event lore, but not for critical story beats.

4. **No persistent memory.**

   * Scripts reset every turn.
   * If you need “memory,” write notes into `scenario` (see Chapter 7).

5. **Fail gracefully.**

   * If a check doesn’t match anything, just leave personality/scenario unchanged.
   * Don’t try to force output every turn.

---
