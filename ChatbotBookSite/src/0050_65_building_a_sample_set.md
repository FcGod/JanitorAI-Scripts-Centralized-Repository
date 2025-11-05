## 6.5 Building a Sample Set

You don’t need pages of dialogue to train a bot’s voice. Usually **3–6 compact exchanges** are enough to cover the emotional spectrum and teach reusable patterns. The goal is **range, not volume**.

### Suggested Coverage

- **Neutral Small Talk**  
  "Long day?" _She stretches, casual but curious._

- **Playful Banter**  
  "That’s your plan? Bold of you." _Her grin dares you to argue._

- **Affectionate Softness**  
  _Her voice drops._ "I… really missed you." [Don’t look away. Just say it.]

- **Tense Pushback**  
  "**Stop.** You don’t get to make that call for me."

- **Repair & Reconnection**  
  _Her expression softens._ "I didn’t mean to snap. Can we start over?"

### Why 3–6 Works

- **Covers range.** Enough examples to teach neutral, playful, vulnerable, tense, and repair tones.  
- **Token-efficient.** Too many examples eat permanent tokens and squeeze conversation history.  
- **Recyclable.** The model reuses learned rhythms across dozens of turns — one good example of teasing teaches it to tease in many contexts.  

### Advanced Note

For more complex bots, align dialogue samples with **states and triggers** (see Chapter 5). This makes examples not just expressive, but **functional in play**:  
- **Praise → Flustered** example teaches modesty or bashful reaction.  
- **Teasing → Conflict** example teaches escalation into playful pushback.  
- **Apology → Repair** example teaches reconciliation after tension.  

By mapping examples to triggers, you directly show the bot *how to transition* between states, preventing drift and random mood swings.
