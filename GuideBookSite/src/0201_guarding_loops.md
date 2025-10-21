## 🟡 Guarding Loops

Loops can crash scripts if they run too long. Add **limits** and **breaks.**

for (var i=0; i\<keywords.length && i<100; i++) {
if (padded.indexOf(" " + keywords\[i] + " ") !== -1) {
// do something
break; // stop once found
}
}

📖 **Plain English:**

* Cap loops so they don’t spin forever.
* Exit early when you’ve already found what you need.

---
