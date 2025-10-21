# 📘 Chapter 1: What Scripts Are

Imagine your character is like an actor in a play. Normally, they follow the script you wrote in their **Personality** and **Scenario** fields. But what if you wanted them to change their lines on the fly depending on what the user says? That’s where **scripts** come in.

A **script** is just a tiny set of instructions you write in a very basic form of JavaScript. Think of it like a recipe card:

* If this happens → do that.
* If the user says “hello” → make the character smile.

---

## 🟡 When Do Scripts Run?

Scripts are automatic. You don’t press a button to activate them. They run:

* Before every single bot reply.
* Right after the user sends a message.
* Every time the chat moves forward.

That means your script is always “listening,” watching what the user says, and adjusting the character’s behavior in the background.

---

## 🟡 What Can Scripts Change?

This is important: scripts only get to change **two things**:

1. **Personality** → how the character acts or feels

   * Example: “cheerful and supportive”

2. **Scenario** → what’s happening around the character

   * Example: “It’s late at night, and the rain is tapping on the window.”

Everything else (like the character’s name, memories, or chat history) is locked. The sandbox doesn’t let you mess with it. Think of **Personality** and **Scenario** as two whiteboards you’re allowed to write on.

---

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

## 🟡 A Tiny First Example

Example: simple “hello” trigger

if (context.chat.last\_message.toLowerCase().indexOf("hello") !== -1) {
context.character.scenario += "They greet you warmly.";
context.character.personality += "Friendly and welcoming.";
}

What it means:

* Look at what the user just typed.
* Change it to lowercase so “HELLO” or “Hello” also works.
* Check if the word “hello” is in there.
* If yes, add two short notes: one to scenario (what’s happening) and one to personality (how they act).

---

## 🟡 Key Takeaways from Chapter 1

* Scripts are *if-this-then-that* instructions for your characters.
* They only control **Personality** and **Scenario**.
* They run **every time the user types something**.
* You use the `context` toolbox to get info about the conversation.
* With just a few lines, you can make your character react to words.

---
