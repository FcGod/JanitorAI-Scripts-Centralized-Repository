## 🟡 Strategy 3: Triangular States

You can blend **three engines** for even more realism.

Example code:

var love = padded.indexOf(" love ") !== -1 ? 1 : 0;
var jealous = padded.indexOf(" jealous ") !== -1 ? 1 : 0;
var anger = padded.indexOf(" angry ") !== -1 ? 1 : 0;

if (love && jealous) {
context.character.personality += ", affectionate but jealous.\n\n";
}
if (love && anger) {
context.character.personality += ", passionate but short-tempered.\n\n";
}
if (jealous && anger) {
context.character.personality += ", bitter and defensive.\n\n";
}

📖 **Plain English:**

* Any **pair** of emotions creates a hybrid.
* You don’t need every possible combo — just the ones that matter to your story.

---
