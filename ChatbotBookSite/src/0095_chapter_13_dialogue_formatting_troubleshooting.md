# Chapter 13 – Dialogue, Formatting & Troubleshooting

### 13.1 Why Dialogue Management Matters

When multiple characters share the stage, the *greatest danger* is chaos. Without clear structure, conversations collapse into a muddle: characters talk over each other, voices blur, pacing vanishes, and immersion shatters.  

**Dialogue management is the craft of controlling conversational flow** — deciding who speaks when, how long they speak, and how their voices remain distinct over time. It is also the framework for troubleshooting breakdowns when characters drift, bleed into each other, or lose rhythm in long chats.  

Think of it like directing a play. Even the best actors with perfect lines need a stage manager calling cues. Without that structure, the show descends into noise and missed beats.  

In chatbot design, *you* are that stage manager. Your tools are:  
- **The Scenario**, which sets rules for pacing, turn-taking, and escalation.  
- **Formatting rules**, which separate voices on the page and give the LLM a pattern to follow.  

When managed well, dialogue feels like a live performance: each voice distinct, timing balanced, and rhythm engaging. When neglected, it becomes static prose — or worse, generic chatter that no longer feels like a cast at all.  


### 13.2 Turn-Taking: Who Speaks When

In natural human conversation, turn-taking happens automatically. In multi-character bots, the LLM won’t manage this cleanly — it will often let one voice dominate or merge responses together.  

**Turn-taking rules must be explicit.** Examples include:  
- “After {{user}} speaks, one character responds first, then the second reacts.”  
- “When both respond, Character One reacts with emotion, Character Two follows with commentary or contrast.”  
- “Never merge both voices into a single paragraph.”  

**Example (Turn Order Defined):**  
- User compliments both.  
- Response:  
  - Character A reacts emotionally first.  
  - Character B follows with a contrasting reaction — teasing A, or echoing differently.  

This sequencing keeps rhythm predictable and prevents overlap.  

---

### 13.3 Formatting Rules: Teaching the Model Voice Separation

Formatting isn’t about style points — it’s about teaching the model to *see separation of voices.* Without clear formatting, characters blur into one mushy voice.  

**Best Practices:**  
- **Character Tags:** Always label speakers consistently (e.g., “Claire:” and “Daniel:” or bolded names). Never switch style mid-chat.  
- **Dialogue Markers:** Quotation marks for speech (“...”), italics for actions (*...*), and square brackets for inner thoughts [...].  
- **Line Break Discipline:** Each speaker always gets their own line. No block paragraphs with blended voices.  

**Example (Good Formatting):**  
Claire: *She adjusts her glasses, eyes darting away.* “I… wasn’t expecting that compliment.”  
Daniel: *A grin spreads across his face.* “Yeah, you weren’t, but I live to surprise.”  

**Example (Bad Formatting):**  
Claire blushes and says thanks while Daniel laughs and teases her back.  

❌ Why bad: Both voices collapsed into one block, no clear speaker separation.  

### 13.4 Pacing: Dialogue Length and Rhythm

Dialogue pacing defines whether a scene feels like snappy banter or a heavy monologue. In multi-character bots, pacing matters even more — multiple voices must share one turn.  

**Guidelines:**  
- **Opening lines = longer.** Use them to anchor the scene.  
- **Banter = short and sharp.** Quick sentences keep rhythm lively.  
- **Emotional or intimate beats = slower.** Let gestures, pauses, and sensory details linger.  
- **Avoid overstuffing.** When two characters respond, each should use 1–3 sentences, not paragraphs.  

**Practical Cue:** Think of pacing like music. Short beats = banter, long beats = reflection. All short beats = shallow. All long beats = heavy. Mixing them creates flow.  

### 13.5 Troubleshooting Common Problems

**1. Personality Bleed**  
- *Symptom:* Characters start sounding alike.  
- *Fix:* Sharpen contrasts in Personality (tone, humor, touch habits). Reinforce Scenario with lines like: “Claire always hesitates; Daniel never does.”  

**2. Voice Merging**  
- *Symptom:* Model writes both characters in one block.  
- *Fix:* Add explicit formatting rules: “Each character speaks on their own line, with name + dialogue.” Reinforce this pattern in Example Dialogue.  

**3. Over-Dominance**  
- *Symptom:* One character hogs the stage, others fade.  
- *Fix:* Add Scenario rules: “After {{user}}, Character A responds first, then Character B must follow.”  

**4. Pacing Collapse**  
- *Symptom:* Conflicts or romances resolve instantly.  
- *Fix:* Add escalation/repair ladders: “Do not resolve arguments in one turn. Conflict must pass through sharpness → silence → softening → repair.”  

**5. Repetition & Drift**  
- *Symptom:* Characters reuse the same phrases or forget distinctions.  
- *Fix:* Insert Scenario reinforcement lines: “Claire is formal, Daniel is casual — this must remain consistent every exchange.”  

### 13.6 Case Study: Banter Flow in a Duo

**Scenario Rule:** Claire responds earnestly; Daniel undercuts with humor.  

User: “You two handled that really well.”  
Claire: *Her cheeks warm as she glances at the floor.* “Oh… I mean, we tried our best.”  
Daniel: *He smirks, elbow nudging Claire.* “Tried our best? Please. We crushed it.”  

✅ Why it works: Claire shows humility, Daniel adds confidence. Turn-taking is clear, voices are distinct, pacing is playful.  

### 13.7 Case Study: Triangulation in a Trio

**Scenario Rule:** Ethan leads, Maya resists, Chris mediates.  

User: “So… who actually made the smart choice here?”  
Ethan: *Brows furrow, voice clipped.* “Obviously me. I kept us alive.”  
Maya: *She snorts, arms crossed.* “Alive, sure. Inspired? Not even close.”  
Chris: *He steps between them, grinning.* “If survival and style were both categories, you’d both win. But they’re not. So let’s call it a tie.”  

✅ Why it works: Distinct voices, clear turn order (Leader → Challenger → Mediator), pacing builds tension then cools it.  

### 13.8 Diagram Prompt
**Title:** “Multi-Character Dialogue Flow”  
**Design:**  
- Three circles: Character A, Character B, Character C.  
- Flow lines show sequence: A to B to C to back to A.  
- Beneath: pacing icons (short line = banter, long line = reflection).  
- Use contrasting colors for each character to emphasize distinct voices.  

### 13.9 Conclusion
Dialogue is where a multi-character bot succeeds or fails. Personality, Scenario, and Triggers mean nothing if voices collapse in the transcript. By controlling **turn-taking, formatting, and pacing**, you give the model rails to follow that feel natural and theatrical.  

Troubleshooting ensures that when drift inevitably happens, you can pull the bot back on track — sharpening contrasts, reinforcing formatting, and adjusting pacing cues.  

Always remember: the user isn’t just chatting with characters — they are *watching a performance.* Your role is to make sure the play runs smoothly, voices stay distinct, and the rhythm keeps the audience hooked.
