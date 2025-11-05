## 2.5 Cutting the Fat

One of the fastest ways to waste tokens is through unnecessary detail or weak phrasing. A bloated Personality or Scenario not only eats into your budget but also dilutes the signals that actually drive behavior. The trick is to trim **everything that doesn’t change how the bot acts.**

### Three Common Mistakes

**Trivia Overload**  
Bad: “Her uncle worked in a steel mill in 1983, and her cousin once saw a UFO.”  
Good: “She comes from a working-class family and carries their practical outlook.”  
Why: The first example dumps trivia that will never surface in dialogue. The second compresses the idea into a behavioral cue the bot can express.

**Biography Instead of Behavior**  
Bad: “Born in London in 1995, she attended St. Andrews…”  
Good: “Her voice carries traces of a London upbringing, clipped vowels in stress.”  
Why: A birthdate and school are census records. They don’t shape speech. The rewritten version shows how upbringing influences dialogue.

**Hedging Words**  
Bad: “She might sometimes act shy if the situation feels right.”  
Good: “She acts shy when meeting new people.”  
Why: The words “might” and “sometimes” are read by the model as optional. Definitive phrasing turns the trait into a consistent behavior rule.

### Sidebar: Passive vs. Active Phrasing

Passive phrasing is vague.  
“Defined by shyness” → too abstract.

Active phrasing is concrete.  
“Speaks softly and avoids eye contact” → gives the model tokens it can directly use to generate dialogue and body language.

### Other Token Traps

- **Redundancy:** Saying the same trait multiple ways (“She is quiet. She is reserved. She doesn’t talk much.”) can be collapsed into one stronger line.
    
- **Excess adjectives:** “She is very, very shy” adds nothing. One “shy” is enough.
    
- **Soft hedges:** “Sometimes, maybe, tends to…” weaken rules. Delete them.

### Design Lesson

Every sentence in your prompt should either define _voice, behavior, or relationship_. If it doesn’t, it’s fat. Trim aggressively until only functional rules remain. The more concise the instructions, the sharper and more stable the bot’s performance will be.
