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
