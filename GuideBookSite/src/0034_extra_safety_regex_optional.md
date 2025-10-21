## 🟡 Extra Safety: Regex (Optional)

If you’re feeling adventurous, you can use **regex** for trickier matches:

if (/\b(help|assist|aid)\b/i.test(last)) {
context.character.personality += "Eager to be helpful.";
}

What this means:

* `\b` = word boundary (keeps it from matching inside longer words).
* `(help|assist|aid)` = any of these words.
* `i` = ignore capitalization.

⚠️ Beginner tip: Regex is powerful, but can be confusing. Stick to `.indexOf` until you’re confident.

---
