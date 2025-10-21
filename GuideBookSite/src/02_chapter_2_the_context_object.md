# 📘 Chapter 2: The Context Object

When your script runs, it doesn’t start from scratch — it’s handed a **context object**.  
Think of the **context** like a backpack your script always carries. Inside, you’ll find everything you need to know about:

- **The character** – their personality, scenario, and traits.
    
- **The chat** – what the user said, how long the talk has gone, and (optionally) a few of the latest messages.
    

---

## 🟢 Inside the Character Backpack

The script gives you a special box called `context.character`.

Here’s what’s inside — some pieces are _read-only_, others are _editable_:

|Property|Meaning|Editable?|
|---|---|---|
|`name`|the character’s full name|❌|
|`chat_name`|their display name in chat|❌|
|`example_dialogs`|sample training lines|❌|
|**`personality`**|their mood, traits, and tone|✅|
|**`scenario`**|what’s happening around them|✅|

Plain English:

- `name` = their driver’s license — you can read it, not rewrite it.
    
- `chat_name` = their nametag in the play.
    
- `example_dialogs` = practice lines, hands off.
    
- `personality` = their inner mood — you can add to it mid-scene.
    
- `scenario` = the stage set — you can rearrange it safely.
    

---

## 🟢 Inside the Chat Backpack

The script also gives you `context.chat`, which holds details about the conversation itself:

- `message_count` → how many total messages have been sent.
    
- `last_message` → the most recent thing the user typed.
    
- `last_messages` → an array of recent messages (new in modern sandbox).
    
- `first_message_date` / `last_bot_message_date` → timestamps, if supported.
    

Plain English:

- `message_count` = the line number in the play.
    
- `last_message` = the latest shout from the audience.
    
- `last_messages` = a short scrollback — useful for multi-turn logic.
    
- The date fields are nice extras, but beginners can skip them.
    

---

## 🟢 Multi-Message Context (Looking Back Several Lines)

By default, scripts only read the **latest** message.  
But what if you want to react to something said a few turns ago — like a slow-burn emotion or a repeating word?

You can create a small **look-back window**:

```js
const lastMessages = context.chat.last_messages
  .slice(-5)                           // take the last 5 user messages
  .map(m => m.message.toLowerCase())   // normalize casing
  .join(" ");                          // merge into one searchable string
```

Now `lastMessages` is a single string containing recent chat history.

You can use it exactly like `last_message`:

```js
if (lastMessages.includes("secret")) {
  context.character.personality += ", becomes cautious about secrets.";
}
```

### 🧠 Why This Matters

- Detects patterns spread across several turns.
    
- Prevents missing context from short back-and-forth lines.
    
- Enables _multi-message emotion tracking_ and _progressive lore triggers._
    

💡 Tip: Adjust the depth with `.slice(-3)` or `.slice(-10)` depending on how much history you want.

---

## 🟢 Why Only Two Things Can Change

Even with these tools, you can only modify:

- `context.character.personality`
    
- `context.character.scenario`
    

Everything else stays locked — this keeps the sandbox safe and predictable.  
Think of it like being allowed to **write on the whiteboards**, not **remodel the theater**.

---

## 🟢 Example: Exploring Context in Action

```js
console.log("Last message:", context.chat.last_message);
console.log("Total messages:", context.chat.message_count);
console.log("Current personality:", context.character.personality);
```

These logs appear only in the **debug panel**, not in the visible chat.  
They’re your flashlight when testing scripts.

---

## 🟢 A First Real Example

Let’s make the character “warm up” over time:

```js
if (context.chat.message_count > 20) {
  context.character.personality += ", has really warmed up to the user";
  context.character.scenario    += " The atmosphere feels much friendlier now.";
}
```

Plain English:

- After 20 messages → add warmth to both personality and scene.
    
- The longer the chat, the more natural and connected it feels.
    

---

## 🟢 Key Takeaways from Chapter 2

- The **context object** is your script’s toolbox.
    
- `context.character` → everything about the character.
    
- `context.chat` → everything about the conversation.
    
- You can now use **`last_messages`** to look several messages deep.
    
- Only `personality` and `scenario` are writable.
    
- Use these tools to make scripts react intelligently to history, timing, and emotion.
    

---

✨ **Pro Tip:** Treat `lastMessages` like short-term memory.  
It won’t remember forever — but within a few turns, it can make your character feel truly attentive.
