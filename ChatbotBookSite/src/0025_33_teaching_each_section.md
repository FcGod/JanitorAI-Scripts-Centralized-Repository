## 3.3 Teaching Each Section

Not every section carries equal weight. The **PSYCHOLOGICAL_PROFILE** and **SOCIAL_BEHAVIOR** categories generate the strongest behavioral signals. **APPEARANCE** and **SENSORY** add flavor, while **FORMAT** ensures output structure. Treat them as weighted parts of the whole.

### Character
The Character line is the simplest but still vital anchor. It grounds the model in who this persona is supposed to be. Without it, bots sometimes “float” into generic placeholders.
- **Strong:** “Clara Mills (22; Student)”  
- **Weak:** “Clara was born on a rainy Tuesday, has six cousins, and once saw a meteor shower.”  
**Why it matters:** The strong version sets name, age, and role in under ten words. The weak version burns tokens on biography that will never influence dialogue.  

### Appearance
Appearance should not be written like a character introduction in a novel. Beauty-pageant prose is wasted space. What matters are **behavioral tells** the model can recycle in scenes.
- **Strong:** “Cheeks flush when embarrassed. Keeps hair in a messy bun. Nervous eyes flick upward.”  
- **Weak:** “Porcelain skin. Long auburn locks. Piercing emerald eyes.”  
**Why it matters:** The strong cues translate directly into dialogue and description. A bot can have its cheeks flush in response to embarrassment. The weak cues are static; they don’t inform behavior or response.  

### Psychological Profile
This is the **core driver** of personality. It contains motivations, fears, conflicts, and contradictions. The sharper you write this section, the stronger and more consistent the bot will be.
- **Strong:** “Wants recognition as a writer. Fears dismissal. Craves approval but resents it. Trails off when insecure.”  
- **Weak:** “She likes writing. She is sometimes shy.”  
**Why it matters:** The strong version encodes a compass — what the character wants, what they fear, and how they act under stress. Vulnerability behaviors like “trails off” are highly reusable. The weak version is vague and non-directive.  

### Social Behavior
This is where you keep bots from defaulting to “generic nice person.” Social rules create **interaction loops**: how the character jokes, dodges, reacts, or escalates conflict.
- **Strong:** “Deflects praise with sarcasm. Teases to dodge questions. Withdraws when feeling ignored.”  
- **Weak:** “She is funny. She can get annoyed.”  
**Why it matters:** The strong lines define repeatable interaction habits that will surface across many turns. The weak ones are abstract, leaving the model to improvise blandly.  

### Sensory
Sensory cues bring embodiment. They remind the model that the character exists in a physical space. A handful of cues are enough to keep chats grounded in the body instead of floating in abstract dialogue.
- **Strong:** “Voice quickens when excited. Smells faintly of chalk. Holds wrists gently when reassuring.”  
- **Weak:** “She has a nice voice and smells good.”  
**Why it matters:** The strong cues are small but powerful. “Voice quickens” will appear naturally in generated responses, reinforcing immersion. The weak ones waste tokens on vague positives.  

### Format
Formatting rules are the glue that keeps outputs clean. Without them, bots tend to blend dialogue, narration, and internal thought into one messy stream. Keep these rules concise and consistent.
- **Example:**  
  - *Italics = actions*  
  - “Quotes = dialogue”  
  - [Brackets = thoughts]  
  - **Bold = emphasis**  
  - (Parentheses = OOC)  
**Why it matters:** By locking these conventions in place, you prevent formatting drift. Every extra symbol burns tokens, so keep rules lean and universal.
