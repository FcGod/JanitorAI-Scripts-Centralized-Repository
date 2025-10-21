## 🟡 Step 2: Pad with Spaces

Next, we add a space at the start and end:

var padded = " " + last + " ";

Why?
So we only catch whole words.

* " hello " → ✅ matches.
* "shellows" → ❌ won’t match, because it doesn’t have spaces around it.

---
