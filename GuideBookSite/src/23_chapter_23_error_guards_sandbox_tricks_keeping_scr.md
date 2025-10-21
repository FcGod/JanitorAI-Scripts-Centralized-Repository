# 📘 Chapter 23: Error Guards & Sandbox Tricks (Keeping Scripts Safe and Stable)

If you’ve ever had a script suddenly stop working for no clear reason, you’ve probably hit a **sandbox limitation.** The problem is, the sandbox won’t tell you what went wrong — it just fails silently.

👉 The solution: **error guards** and **safe coding habits.**

---

## 🟡 What’s an Error Guard?

An **error guard** is a little snippet of code at the start of your script that makes sure the sandbox won’t crash if something is missing.

The “golden guard” looks like this:

// === CONTEXT GUARDS ===
context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario    = context.character.scenario || "";

📖 **Plain English:**

* If `context.character` doesn’t exist → create it.
* If personality/scenario don’t exist → make them empty strings.
* This prevents “undefined” errors from breaking the script.

---

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

## 🟡 Guarding Against Overwrites

Never replace personality or scenario. Always **append (`+=`)**.

❌ Wrong:
context.character.personality = "angry";
(Deletes everything else!)

✅ Right:
context.character.personality += ", now angrier than before.";

📖 **Plain English:** Always add, never erase.

---

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

## 🟡 Debugging Tip

You can use `console.log` to peek at what’s happening:

console.log("Message count:", context.chat.message\_count);
console.log("Last message:", context.chat.last\_message);

📖 **Plain English:** Logs let you see what the sandbox *thinks* is going on — super useful for troubleshooting.

---

## 🟡 Best Practices Recap

* ✅ Always start with **context guards.**
* ✅ Always lowercase and pad user input.
* ✅ Cap loops and add `break;`.
* ✅ Append strings instead of overwriting.
* ✅ Keep outputs small.
* ✅ Use debugging with `console.log`.
* ❌ Don’t assume modern JavaScript works — it doesn’t.

---

## 🟡 Quick Practice (Try It Yourself!)

1. Add context guards to this broken snippet:

context.character.personality += " cheerful";

2. Fix this unsafe loop:

for (var i=0; i<1000; i++) { ... }

3. Rewrite this dangerous overwrite safely:

context.character.scenario = "dark room";

---

## 🟡 Key Takeaways from Chapter 23

* Guards prevent crashes from undefined fields.
* Loops and strings must be **kept lean.**
* Always append, never overwrite.
* Scripts reset every turn — use scenario for “memory.”
* Sandbox = ES5 only, no modern JS.

---

✨ **Pro Tip:** Think of error guards as *seatbelts.* You hope you never need them, but when things go wrong, they keep your script from flying off the road.
