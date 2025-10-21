## 🟡 Strategy 2: Weighted Blends

Not all emotions are equal. Maybe “fear” should outweigh “excitement.”

Example code:

var state = (excite \* 1) + (fear \* 2);

if (state >= 3 && fear > 0 && excite > 0) {
context.character.personality += ", anxious but determined.\n\n";
}

📖 **Plain English:**

* Excitement counts less, fear counts more.
* Final mood is “anxious but determined.”

---
