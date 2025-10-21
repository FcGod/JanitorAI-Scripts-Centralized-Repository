## 🟡 The Context Object (Your Toolbox)

When your script runs, it’s given a **context object**. This is just a box of information about the current chat.

* `context.character` → everything about your character
* `context.chat` → information about the chat itself

You’ll use these most (written on separate lines so you can copy them easily):

context.character.personality    // you can add personality traits here
context.character.scenario       // you can add scene details here
context.chat.last\_message        // the last thing the user typed
context.chat.message\_count       // how many messages have been sent so far

Plain English:

* personality is the actor’s mood.
* scenario is the stage set.
* last\_message is the latest line from the audience.
* message\_count is how many lines have been spoken so far in the play.

---
