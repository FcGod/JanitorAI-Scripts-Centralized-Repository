## 6.2 Formatting Conventions

Formatting teaches the bot how to **separate action, dialogue, and thought**. Without it, the model often blends everything into a single block of text. Clear conventions give the LLM rules to follow so output stays structured.

### Core Conventions

- **_Italics:_ Actions and descriptions**  
  _She tucks her hair behind her ear, glancing away._

- **"Quotes:" Spoken dialogue**  
  "I wasn’t expecting to see you here."

- **[Brackets]: Internal thoughts or unspoken feelings**  
  [Why does my heart always race around him?]

- **Bold (optional): Emphasis or strong beats**  
  "**Don’t** walk away from me right now."

### Why Each Matters

- **Italics anchor embodiment.** They signal to the model: this is physical action, not dialogue. Without italics, bots may blend actions directly into speech.  
- **Quotes enforce turn-taking.** LLMs are heavily trained on quoted conversation. If you use quotes consistently, the model naturally treats dialogue as back-and-forth, not narration.  
- **Brackets enable inner monologue.** They provide a repeatable channel for vulnerability, hesitation, and dramatic irony — emotions expressed silently, not spoken aloud.  
- **Bold provides rhythm.** Sparing use of bold highlights strong beats or emphasis. It lets you replace multiple adverbs (“really, really angry”) with a cleaner, token-efficient marker.  

### Design Lesson

Consistency matters more than the symbols themselves. Whether you choose italics, brackets, or parentheses, commit to them across **Personality, Scenario, and Example Dialogue**. The more consistent the formatting, the more reliably the bot will follow it in play. Inconsistent formatting = drift and messy outputs.
