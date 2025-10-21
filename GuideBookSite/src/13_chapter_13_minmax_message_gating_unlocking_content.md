# 📘 Chapter 13: Min/Max Message Gating (Unlocking Content Over Time)

So far, we’ve used **message count** for gradual shifts (polite → casual → trusting). But what if you want to **lock and unlock certain lore** depending on how long the conversation has been going?

That’s what **min/max gating** is for. It’s like setting a **window of opportunity**:

* *Before 15 messages → the secret is hidden*
* *Between 16–30 messages → the secret is revealed*

👉 This creates natural pacing, like chapters in a story.

---

## 🟡 Why Use Gating?

* **Story beats** → certain reveals only happen once the bond deepens
* **Mystery** → early hints, later explanations
* **Progression** → the chat feels like it has “levels”

---

## 🟡 The Simple Formula

You can check message count with two conditions:

var count = context.chat.message\_count;

if (count >= 5 && count <= 15) {
context.character.scenario += " They seem hesitant to share anything personal yet.";
}

Plain English:

* If message count is **between 5 and 15** → add this scene note
* Outside that range → nothing happens

---

## 🟡 Example: Secrets in Stages

Let’s use gating to reveal a secret over time.

var count = context.chat.message\_count;

if (count <= 15 && padded.indexOf(" secret ") !== -1) {
context.character.personality += ", cautious about their secrets.";
context.character.scenario += " They hint that there are things they cannot share yet.";
}

if (count >= 16 && count <= 30 && padded.indexOf(" secret ") !== -1) {
context.character.personality += ", finally ready to open up.";
context.character.scenario += " They whisper a deeper truth, as if trusting you more.";
}

if (count > 30 && padded.indexOf(" secret ") !== -1) {
context.character.personality += ", burdened by secrets too heavy to ignore.";
context.character.scenario += " They reveal everything, unable to hold it in any longer.";
}

Plain English:

* Early in the chat → they avoid the secret
* Midway → they share cautiously
* Later → they spill everything

---

## 🟡 Example: Event Unlock

You can also tie events to certain ranges:

if (count === 10) {
context.character.scenario += " A distant bell rings, marking a turning point in the conversation.";
}

if (count > 20 && count < 25) {
context.character.personality += ", feeling nostalgic.";
context.character.scenario += " They recall something from their childhood.";
}

Plain English:

* At exactly 10 messages → an event happens
* Between 20 and 25 messages → they enter a nostalgic mood

---

## 🟡 Best Practices for Gating

* ✅ Use **ranges** for flexibility (e.g., 15–30), not just single numbers
* ✅ Tie gates to **story pacing** (early, mid, late)
* ✅ Combine with **keywords** (like “secret”) for more depth
* ❌ Don’t make everything gated — the chat shouldn’t feel like a checklist

---

## 🟡 Quick Practice (Try It Yourself!)

1. Make a character **stay guarded** before 10 messages, but **warm up** between 10–20
2. Add an **event** at exactly 25 messages where “a storm begins”
3. Make the bot **reveal a family story** only if message count is above 30

---

## 🟡 Key Takeaways from Chapter 13

* Use `>=` and `<=` to create message count **windows**
* Gating creates pacing and unlocks lore naturally
* Combine gating with **keywords** for deeper reveals
* Treat gating like **chapters** in a conversation — new arcs appear as the chat grows

---

✨ Pro Tip: Think of min/max gating as *doors in a hallway*. Each door only opens after enough steps forward, revealing a new part of the story.
