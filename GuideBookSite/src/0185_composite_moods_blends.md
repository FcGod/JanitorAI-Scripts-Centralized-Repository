## 🟡 Composite Moods (Blends)

Sometimes two emotional signals combine into a **mixed state.**

Example code:

var happy = padded.indexOf(" happy ") !== -1;
var sad   = padded.indexOf(" sad ") !== -1;

if (happy && sad) {
context.character.personality += ", sensing a bittersweet mix of joy and sadness.\n\n";
} else if (happy) {
context.character.personality += ", uplifted by joy.\n\n";
} else if (sad) {
context.character.personality += ", touched by sorrow.\n\n";
}

📖 **Plain English:**

* If both “happy” and “sad” show up → treat as **bittersweet** instead of ignoring one.

---
