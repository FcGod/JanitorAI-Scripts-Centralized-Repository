# 📘 Appendix B: Sandbox Rules Cheat Sheet

* ✅ Allowed: `for` loops, `if/else`, `indexOf`, `toLowerCase`, string concatenation (`+`), basic math, `Math.random()`.
* ❌ Not Allowed (ES5 sandbox): `.map()`, `.filter()`, `.reduce()`, `.forEach()`, arrow functions `() => {}`, template strings using backticks, `async/await`, classes, `try/catch`.
* Safe loop size: under 300 checks (keep it lean; break early when possible).
* Safe string size per addition: under \~600 characters (short, atomic sentences).
* Rough hard ceiling per turn (all text combined): \~27,000 characters.
* No persistent memory — fake memory by writing notes into `scenario`.
* Fail gracefully — if nothing matches, it’s okay to do nothing this turn.

---
