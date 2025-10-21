## 🟡 Example 3: Escalating Tiers

Once you have a score, you can make different levels of reaction.

if (score === 1) {
context.character.personality += ", slightly responsive.";
} else if (score === 2) {
context.character.personality += ", noticeably moved.";
} else if (score >= 3) {
context.character.personality += ", deeply affected.";
}

Plain English:

* 1 point → mild response
* 2 points → stronger
* 3+ points → intense

This feels much more natural than instant jumps.

---
