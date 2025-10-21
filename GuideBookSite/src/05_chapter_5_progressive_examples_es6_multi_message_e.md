# 📘 Chapter 5: Progressive Examples (ES6 + Multi-Message Edition)

By now you’ve learned the basics:

- Scripts run automatically.
    
- They only change _personality_ and _scenario_.
    
- You can safely match words and phrases.
    
- You can also look back through **several recent messages** using `lastMessages`.
    

Now let’s stack those building blocks into **progressive examples** — each one more advanced than the last.  
Think of it like leveling up in a video game: start at Level 1 (simple trigger) and end at Level 10 (dynamic lorebook).

---

## 🗺️ The Progression Roadmap

1️⃣ Tiny Trigger → one word = one response  
2️⃣ Multiple Keywords  
3️⃣ Emotion Detection  
4️⃣ Message Count Progression  
5️⃣ Simple Lorebook (with priorities)  
6️⃣ Scenario Lorebook (personality + scene)  
7️⃣ Dynamic Lorebook (plain checks)  
8️⃣ Timed Lore Reveals (gating)  
9️⃣ Hybrid Systems (moods + context)  
🔟 Advanced Lorebooks (multi-pass / probabilities / unlocks)

---

### 💡 Before We Start

Let’s prepare the two basic text variables used in every example:

```js
const last = context.chat.last_message.toLowerCase();
const padded = ` ${last} `;

// optional: 5-message window for deeper context
const lastMessages = context.chat.last_messages
  .slice(-5)
  .map(m => m.message.toLowerCase())
  .join(" ");
```

You can use either `padded` (just the latest message)  
or `lastMessages` (the recent conversation history) depending on how wide your check needs to be.

---

## 🟢 Level 1: The Tiny Trigger

```js
if (padded.includes(" hello ")) {
  context.character.scenario    += "They greet you warmly.";
  context.character.personality += "Friendly and welcoming.";
}
```

Plain English:  
If the user says “hello,” the bot greets them warmly.

---

## 🟢 Level 2: Multiple Keywords

```js
const greetings = ["hi", "hello", "hey"];

for (const g of greetings) {
  if (lastMessages.includes(` ${g} `)) {
    context.character.scenario    += "They greet you warmly.";
    context.character.personality += "Friendly and welcoming.";
    break;
  }
}
```

Now the script catches any greeting from the **last few messages**, not just the newest.

---

## 🟢 Level 3: Emotion Detection

```js
const emotions = ["happy", "sad", "angry", "excited"];

for (const e of emotions) {
  if (lastMessages.includes(` ${e} `)) {
    context.character.scenario += `The user seems ${e}.`;
    break;
  }
}
```

Plain English:  
Detects emotion even if the word appeared two or three turns ago.

---

## 🟢 Level 4: Message Count Progression

```js
const count = context.chat.message_count;

if (count < 5) {
  context.character.personality += ", polite and formal";
} else if (count < 15) {
  context.character.personality += ", warming up and more casual";
} else if (count < 30) {
  context.character.personality += ", friendly and open";
} else {
  context.character.personality += ", deeply connected and trusting";
}
```

Plain English:  
The longer the chat, the closer the tone.

---

## 🟢 Level 5: Simple Lorebook (with Priorities)

```js
const lorebook = [
  { keywords: ["godfather", "damien"], priority: 10, personality: ", a calculating and charismatic leader" },
  { keywords: ["mafia", "family"],     priority:  5, personality: ", part of a powerful crime family" }
];

const activated = lorebook.filter(entry =>
  entry.keywords.some(k => lastMessages.includes(` ${k} `))
);

if (activated.length) {
  activated.sort((a, b) => b.priority - a.priority);
  context.character.personality += activated[0].personality;
}
```

Plain English:  
Checks across recent messages so multi-turn mentions still activate the same lore.

---

## 🟢 Level 6: Scenario Lorebook (personality + scene)

```js
const lorebook = [
  { keywords: ["godfather"], personality: ", calculating and powerful", scenario: "The Godfather is in a tense meeting." },
  { keywords: ["family"],    personality: ", loyal to family above all", scenario: "The mafia family spreads through the city." }
];

for (const entry of lorebook) {
  if (entry.keywords.some(k => lastMessages.includes(` ${k} `))) {
    context.character.personality += entry.personality;
    context.character.scenario    += entry.scenario;
  }
}
```

---

## 🟢 Level 7: Dynamic Lorebook (Procedural)

```js
if (lastMessages.includes(" magic ")) {
  context.character.personality += ", knowledgeable about magic";
  context.character.scenario    += "They sense magical energies around them.";
}
```

---

## 🟢 Level 8: Timed Lore Reveals (Gating)

```js
if (count > 15 && lastMessages.includes(" secret ")) {
  context.character.personality += ", keeper of ancient secrets";
  context.character.scenario    += "They whisper about the Sundering.";
}
```

---

## 🟢 Level 9: Hybrid Systems

```js
if (lastMessages.includes(" painting ") && lastMessages.includes(" happy ")) {
  context.character.scenario += "They joyfully describe their love of painting.";
}

if (lastMessages.includes(" forest ") && count > 20) {
  context.character.scenario += "The forest feels darker now, full of secrets.";
}
```

Plain English:  
Combines emotion + topic + timing for richer logic.

---

## 🟢 Level 10: Advanced Lorebooks (Multi-Pass)

Advanced systems can add:

- **Priorities** – important traits win
    
- **Probabilities** – random chance
    
- **Unlocks** – one entry reveals another
    

Each pass can use `lastMessages` to scan deeper history for natural continuity.

---

## 🟢 Recap Table

|Level|What It Adds|Example|
|:-:|:--|:--|
|1|One-word trigger|“hello” → greets you|
|2|Multi-message keywords|Catches hello said earlier|
|3|Emotion detection|“sad” → scene notes it|
|4|Message progression|Polite → trusting|
|5|Lorebook priority|Godfather beats mafia|
|6|Lore + scene|Expands setting|
|8|Timed reveal|Secret after 15 lines|
|9|Hybrid logic|Hobby + emotion = special|
|10|Multi-pass system|Priority + probability + unlock|

---

## 🟢 Key Takeaways from Chapter 5

- Start small, grow step-by-step.
    
- Use **`lastMessages`** to catch context across multiple turns.
    
- Apply modern ES6 syntax (`const`, `let`, `.includes`, arrow functions).
    
- Use **priorities** to resolve conflicts.
    
- Gate lore with message count for natural progression.
    
- Combine timing, emotion, and context for living characters.
    

---

✨ **Pro Tip:** Levels 3 – 6 hit the sweet spot — they teach emotion tracking, progression, and simple lorebooks using multi-message awareness without overload.
