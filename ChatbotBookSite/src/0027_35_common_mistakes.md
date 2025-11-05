## 3.5 Common Mistakes

Even with a clear template, beginners often fall into predictable traps that weaken Personality Blocks. These mistakes usually come from writing as if you were describing a character in a novel instead of instructing an LLM how to perform.

### Biographies Instead of Behaviors
Long biographies consume tokens without giving the model usable instructions.
- **Weak:** “Born in 1992, Clara had a childhood filled with soccer games and piano recitals. She has three brothers and once lived in Spain.”  
- **Strong:** “Competitive streak from sports. Keeps rhythm by tapping her desk when thinking.”  
**Why it matters:** The strong version turns biography into repeatable behaviors the bot can act out in chat. The weak version is trivia that never surfaces.

### Lore Dumps
Lore belongs in Scenario, not Personality. Overloading Personality with setting detail buries the real identity cues.
- **Weak:** “The Kingdom of Aranor was founded in 1273 after the War of Iron. Its nobles wear red sashes, and Clara’s family swore fealty generations ago.”  
- **Strong:** “Raised in noble tradition, speaks formally and stiffly in public but relaxes with close friends.”  
**Why it matters:** The strong version translates lore into usable behavior. The weak version is worldbuilding that eats tokens and clutters the weak middle zone of the prompt.

### Hedging
Words like “might,” “sometimes,” or “can be” make traits optional.
- **Weak:** “She might sometimes act shy if she feels nervous.”  
- **Strong:** “She acts shy when meeting new people.”  
**Why it matters:** Definitive rules are consistently followed. Hedges tell the model, “this doesn’t always matter,” and the trait often vanishes in play.

### Duplication
Don’t repeat Scenario content in Personality. Identity should be stable; situation belongs in Scenario.
- **Weak Personality + Scenario Mix:**  
  Personality: “She is nervous because today is her first day at the academy.”  
  Scenario: “It’s her first day at the academy, and she doesn’t know anyone yet.”  
- **Strong Separation:**  
  Personality: “Introverted with strangers, slow to open up until trust is built.”  
  Scenario: “It’s her first day at the academy, and she feels out of place.”  
**Why it matters:** Personality defines *who she is everywhere*. Scenario defines *what she’s doing right now*. Mixing them wastes tokens and confuses weighting.
### Design Lesson
A Personality Block should read like a list of **behavioral rules**, not a biography or encyclopedia entry. Keep it lean, directive, and free of hedges or duplication. If a line doesn’t change how the bot talks or acts, it doesn’t belong here.
