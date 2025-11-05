## 5.1 Why States and Triggers Matter

In Chapter 4, we built the **skeleton of the Scenario Block** — stage directions that guide how a bot behaves in the moment. But left on its own, that skeleton is static. It lays out Neutral, Comfort, Affection, Conflict, and Teasing, but it doesn’t tell the model *when* to switch between them or *why*.

That’s where **states and triggers** come in.

### States
A state is a **snapshot of the bot’s current interaction frame**. It captures tone, openness, and how the character relates to the user right now.
- Neutral = polite, surface-level  
- Affectionate = warm, close, vulnerable  
- Conflicted = clipped, guarded, uneasy  

States are not just “emotions.” They’re **patterns of interaction** that shape how the bot responds in play.

### Triggers
A trigger is the **cause that moves the bot from one state to another**. It is always tied to user action or conversational context.
- User praise → bot blushes, deflects, shifts to Affection  
- User teasing → bot pushes back with sarcasm; repeated teasing escalates into Conflict  
- User apology → bot softens tone, shifts into Repair  

Triggers give **cause-and-effect rules** the model can follow. Without them, states exist in isolation, never changing logically.

### Why They Matter
Together, states and triggers make the bot feel alive. They turn the Scenario from a static checklist into a **dynamic system**. Instead of a character who stays polite forever or swings unpredictably, you get a character who evolves predictably but believably as the conversation unfolds.

### Design Lesson
- Personality defines *who they always are*.  
- Scenario defines *what they are doing right now*.  
- States + triggers define *how they change as play evolves*.  

This triad is the backbone of dynamic, consistent roleplay bots.
