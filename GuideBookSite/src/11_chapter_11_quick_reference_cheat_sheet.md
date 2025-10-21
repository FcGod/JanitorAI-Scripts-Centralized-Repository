# 📘 Chapter 11: Quick Reference Cheat Sheet

Congratulations! 🎉 You’ve made it through the beginner guide.
This chapter is your **pocket survival kit** for writing scripts. Keep it handy — it’s everything you really need at a glance.

---

## 🟡 Safe Tools (Always Work)

* **Text**

  * `toLowerCase()` → makes text lowercase
  * `indexOf(" word ") !== -1` → check if a word is present
  * `trim()` → removes spaces

* **Numbers & Math**

  * `+`, `-`, `*`, `/` → basic math
  * `Math.random()` → random number 0–1
  * `Math.floor()` → round down

* **Arrays**

  * `arr.length` → how many items
  * `arr.indexOf("thing")` → check if “thing” is in list
  * `for` loops → loop through items

* **Dates**

  * `new Date().getHours()` → current hour

* **Regex**

  * `/\bword\b/i.test(text)` → check whole word safely

* **Debugging**

  * `console.log("Message:", context.chat.last_message);`

---

## 🟡 Unsafe Tools (Never Work)

* `.map()`, `.filter()`, `.reduce()`, `.forEach()`
* Arrow functions `() => {}`
* Template strings `` `Hello ${name}` ``
* Spread operator `...`
* `async/await`, Promises
* Classes
* `try/catch` (errors can’t be caught)
* `setTimeout`, `setInterval`, external calls (`fetch`)

---

## 🟡 Gray Area Tools (Avoid Them)

* `.includes()`
* `.repeat()`
* `.padStart()` / `.padEnd()`

They sometimes work, sometimes don’t, depending on the host. Beginners: stick with `.indexOf`.

---

## 🟡 Common Patterns

**Greeting Trigger**

if (padded.indexOf(" hello ") !== -1) {
context.character.scenario += "They greet you warmly.";
context.character.personality += "Friendly and welcoming.";
}

**Multiple Keywords**

var words = \["hi", "hey", "hello"];
for (var i = 0; i < words.length; i++) {
if (padded.indexOf(" " + words\[i] + " ") !== -1) {
// do something
break;
}
}

**Message Count Progression**

if (context.chat.message\_count > 10) {
context.character.personality += ", more comfortable now.";
}

**Time of Day Flavor**

var hour = new Date().getHours();
if (hour < 6 || hour > 22) {
context.character.personality += ", sleepy.";
}

**Name Capture**

if (last.indexOf("my name is") !== -1) {
var match = context.chat.last\_message.match(/my name is (\w+)/i);
if (match) context.character.scenario += " Remember: user’s name is " + match\[1] + ".";
}

**Lorebook Entry**

var lore = \[
{ keywords: \["forest"], personality: ", loves nature", scenario: "They walk among tall trees." }
];

---

## 🟡 Best Practices Recap

* ✅ Always **append (`+=`)**, never overwrite
* ✅ Keep sentences **short and atomic**
* ✅ Loops: use `break;` to stop early
* ✅ Test features before relying on them
* ✅ Add **comments** to explain what code does
* ❌ Don’t overload with giant word lists
* ❌ Don’t write paragraphs into personality/scenario — keep it bite-sized

---

## 🟡 Quick Troubleshooting

* **“My script does nothing”** → You probably used an unsupported feature (e.g., `.includes`)
* **“It’s repeating the same trait a lot”** → Add a check (`if (!context.character.personality.includes("trait"))`)
* **“It’s too slow”** → Cut down loops or break earlier
* **“It forgot what I told it”** → Remember: fake memory by writing into `scenario`

---

## 🟡 The Golden Formula

If you ever get lost, here’s the **minimum skeleton**:

context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario = context.character.scenario || "";

var last = String((context.chat && context.chat.last\_message) || "");
var padded = " " + last.toLowerCase() + " ";

// Example reaction
if (padded.indexOf(" hello ") !== -1) {
context.character.scenario += "They greet you warmly.";
context.character.personality += "Friendly and welcoming.";
}

That’s all you really need to start building. Everything else is just stacking more blocks on top.

---

✨ Pro Tip: The best scripts aren’t the fanciest. They’re the ones that quietly nudge your character into feeling alive, without you ever noticing the machinery behind it.
