# 📘 Chapter 4: How to Match Words Safely

So far we’ve learned *what scripts are* (little recipes), *what the context object is* (your backpack of tools), and *what the sandbox allows* (only the safe toys). Now it’s time to actually **react to words** the user types.

This is the “hello world” of scripting:
👉 *If the user says X, then make the character do Y.*

---

## 🟡 Why Matching Needs to Be Careful

At first glance, you might think:

> “Just check if the user’s message contains the word!”

But computers are picky. Look at this:

* User types: **“Hello there!”**
* If we only check for lowercase **“hello”**, we’ll miss it.
* If we check for **“hell”**, we might accidentally match **“shells.”**

That’s why we need **safe matching**.

---

## 🟡 Step 1: Normalize the Message

First, we make the user’s message lowercase so it doesn’t matter if they type “HELLO” or “hello.”

var last = context.chat.last\_message.toLowerCase();

Plain English:
“Take the user’s last line and make everything lowercase.”

---

## 🟡 Step 2: Pad with Spaces

Next, we add a space at the start and end:

var padded = " " + last + " ";

Why?
So we only catch whole words.

* " hello " → ✅ matches.
* "shellows" → ❌ won’t match, because it doesn’t have spaces around it.

---

## 🟡 Step 3: Check for the Word

Now we use the safest tool: `.indexOf()`.

if (padded.indexOf(" hello ") !== -1) {
context.character.scenario += "They greet you warmly.";
context.character.personality += "Friendly and welcoming.";
}

Line by line:

* `if ( ... !== -1)` → means “if the word is found.”
* If found:

  * Add to the **scenario**: “They greet you warmly.”
  * Add to the **personality**: “Friendly and welcoming.”

---

## 🟡 Example in Action

* User types: “HELLO!!!”
* Script lowercases → “hello!!!”
* Script pads → " hello!!! "
* `indexOf(" hello ")` → finds it inside.
* Result: Character smiles and greets you.

---

## 🟡 Step 4: Match Multiple Words

What if you want to catch **hi, hey, hello** all at once?
We can use a simple list:

var greetings = \["hi", "hello", "hey"];
for (var i = 0; i < greetings.length; i++) {
if (padded.indexOf(" " + greetings\[i] + " ") !== -1) {
context.character.scenario += "They greet you warmly.";
context.character.personality += "Friendly and welcoming.";
break; // stop after the first match
}
}

Plain English:

* Make a list of possible greetings.
* Loop through them one by one.
* If one matches → trigger the response.
* `break;` makes sure we don’t fire multiple times.

---

## 🟡 Step 5: Match Phrases (Two or More Words)

Sometimes you want to catch phrases like **“calm down.”** That works too:

if (padded.indexOf(" calm down ") !== -1) {
context.character.personality += "Tries to stay calm.";
}

Notice: same trick, just with two words inside the quotes.

---

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

## 🟡 Quick Practice (Try It Yourself!)

1. Write a script that makes the character **sad** if the user types “sorry.”
2. Write a script that makes the character **excited** if the user says “let’s go!”
3. Write a script that makes the character **mysterious** if the user mentions “secret.”

(Hint: Use `indexOf(" sorry ")`, `indexOf(" let's go ")`, etc.)

---

## 🟡 Key Takeaways from Chapter 4

* Always lowercase the message (`.toLowerCase()`).
* Always pad with spaces (`" " + last + " "`).
* Use `.indexOf(" word ") !== -1` for safe checks.
* You can catch multiple words with loops or regex.
* Keep responses short and simple.

---

✨ Pro Tip: Don’t try to catch *every* word at once. Start small — one or two triggers — then build up. Scripts are like Lego bricks: stack them slowly and test as you go.

---
---
