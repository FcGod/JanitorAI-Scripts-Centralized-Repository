## 4.4 Teaching Each Section

Each part of the Scenario Block carries a different kind of weight. Together, they function like the director’s notes that guide how the actor performs in this particular scene.

### Setting
The Setting anchors the bot in **time and place**. Without it, conversations risk drifting into “white room syndrome,” where interactions float without context.
- **Strong:** “Back booth, café closing. Neon sign humming. Rain outside.”  
- **Weak:** “The café was built in 1950 and known for its history.”  
**Why:** Props and sensory cues (neon sign, rain, café booth) are reusable details that the bot can recycle into natural descriptions. Historical trivia never reappears in dialogue and burns tokens needlessly.

### Relationship State
This defines the **emotional baseline** toward the user. It prevents wild, random swings in tone.
- **Example:** “User Relationship: longtime friend; Trust Level: medium (shares insecurities); Conflict Level: low (light sniping only).”  
**Why:** These variables set boundaries. The bot knows how close it feels to you, how much trust it has, and whether tension is mild or severe. This keeps it stable across turns.

### Interaction Categories
Think of these as **mode presets** for how the bot should respond in different states.
- Neutral = polite, surface-level, functional  
- Comfort = gentle, reassuring, steady  
- Affection = warm, close, vulnerable  
- Conflict = clipped tone, defensive, guarded  
- Teasing = playful banter, sarcasm, mock-challenges  
**Why:** Interaction categories act like pre-built playbooks. They let you swap “modes” without writing new dialogue rules each time.  
![interaction-modes.png](../images/interaction-modes.png)
### Dynamic Behaviors
Scenario isn’t just descriptive — it encodes **cause-and-effect logic**. This is where you define how the bot shifts between modes.
- **Trigger:** “If praised → modest deflection, blush, softer tone.”  
- **Trigger:** “If teased too much → mock-scolding, shift into playful conflict.”  
- **Escalation:** “Comfort → Affection when trust reinforced.”  
- **De-Escalation:** “Conflict → Neutral after apology.”  
- **Repair:** “After apology → soften tone, reaffirm trust.”  
**Why:** These rules give conversations a sense of continuity. Interactions don’t just “jump” states; they evolve logically based on what the user does.

**Insert Picture:** emotional-logic-cycle.png (loop: trigger → conflict → apology → repair → stronger trust).

### Pacing & Style
Scenario is also where you set the **rhythm of play**.
- Short/snappy pacing = quick banter, saves tokens, good for light play.  
- Long/immersive pacing = descriptive responses, higher token use, good for dramatic or narrative-heavy play.  
- **Mirroring:** If you open with short lines, the bot tends to stay short. If you open long, the bot mirrors with longer replies.  
- **Scene Notes:** You can also encode meta-rules here: when to fade-to-black for intimacy, when to cut away or skip time.  

**Why:** Pacing doesn’t just shape style, it directly affects memory and token economy. A bot with 2–3 sentence replies can remember more turns than one writing 5–6 sentence replies.

### Format Reminders
Finally, repeat formatting rules at the Scenario level. Because Scenario is positioned near the **end of the prompt**, these reminders land in the high-weight recency zone.  
- *Italics = actions*  
- “Quotes = dialogue”  
- [Brackets = internal thoughts]  
- **Bold = emphasis**  
- (Parentheses = OOC)  

**Why:** This prevents formatting drift. Even if earlier rules fade, the recency bias of the Scenario keeps formatting consistent.
