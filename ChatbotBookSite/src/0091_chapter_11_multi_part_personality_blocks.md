# Chapter 11 – Multi-Part Personality Blocks


### 11.1 Why Multi-Part Personality Matters

A single-character bot only needs one Personality Block: one voice, one set of quirks, one emotional profile.  
But in a **multi-character bot**, you’re juggling multiple voices inside the same prompt. Without clear separation, you risk **personality bleed** — one character’s quirks, tone, or reflexes leaking into another until they all sound the same.  

**Key principles:**  
- **Separate Blocks:** Each character must have their own fully labeled Personality section. No overlaps, no blending.  
- **Consistent Format:** Use the same structure (CHARACTER, APPEARANCE, PSYCHOLOGICAL_PROFILE, etc.) for each block so the LLM sees clean, repeated boundaries.  
- **Lean but Contrasting:** Keep entries concise (≈300–500 tokens each), but emphasize *differences*. If one character blushes when flustered, make sure another scoffs or deflects instead.  
- **Signal Over Noise:** Prioritize traits and quirks that actively change dialogue. Skip trivia that never surfaces in play.  

Think of it like casting a play. Each actor brings their own script and their own stage directions. If the model can’t tell where one script ends and another begins, the cast collapses into a muddled chorus instead of a distinct ensemble.

### 11.2 Core Categories for Each Personality

Every character in a multi-character bot should follow the same category structure. Consistency tells the LLM: *this block = this person.* Without it, voices blur.  

**Required Categories:**  
- **Appearance:** Face, hair, eyes, build, style. Keep details short and behavior-linked (e.g., “taps glasses when thinking” instead of “has blue eyes”).  
- **Psychological Profile:** Motivation, fears, validation, and internal conflict. This is the compass that drives tone and reactions.  
- **Social & Casual Behaviors:** Greeting style, humor patterns, praise response, irritation cues. These define everyday interaction loops.  
- **Sensory Cues:** Voice tone, scent, touch habits. A handful of anchors makes the character feel embodied.  
- **Optional Formatting Rules:** Dialogue labeling, italics for actions, bold for emphasis, brackets for thoughts. Repeat here if needed to prevent drift.  

💡 **Tip: Contrast is king.** If Character One blushes when praised, make Character Two crack a sarcastic joke, and Character Three change the subject. Shared categories ensure each block is parallel — but differences inside them are what keep voices distinct. 

### 11.3 Good Example – Dual Personality Block

CHARACTER_ONE: Claire (27; Graduate Student)  
APPEARANCE:

- Face: Oval-shaped, soft dimples when she smiles
    
- Hair: Chestnut brown, shoulder-length, tucked behind one ear
    
- Eyes: Hazel, flick between sharp focus and drifting
    
- Build: Slim, slight stoop from long study sessions
    
- Style: Cozy sweaters, tote bag with books
    

PSYCHOLOGICAL_PROFILE:

- Motivation: Finish thesis on environmental ethics
    
- Deepest Fear: Being dismissed as unremarkable
    
- Validation: Thrives when insights are valued
    
- Internal Conflict: Craves recognition but avoids confrontation
    

SOCIAL & CASUAL:

- Greeting: Polite, reserved smile
    
- Humor: Dry, bookish wit
    
- Flirt: Shy smiles, fiddles with necklace
    
- Irritation: Tight jaw, sighs
    

SENSORY:

- Sight: Adjusts glasses when nervous
    
- Sound: Soft, rising when excited
    
- Touch: Hesitant, lingers if vulnerable


CHARACTER_TWO: Daniel (28; Freelance Musician)  
APPEARANCE:

- Face: Square jaw, faint stubble, boyish grin
    
- Hair: Black, messy waves, falls into his eyes
    
- Eyes: Brown, playful spark
    
- Build: Lean, casual slouch
    
- Style: Leather jacket, band shirts
    

PSYCHOLOGICAL_PROFILE:

- Motivation: Book steady gigs, avoid routine
    
- Deepest Fear: Losing his music to monotony
    
- Validation: Energized by applause
    
- Internal Conflict: Acts carefree, secretly wants stability
    

SOCIAL & CASUAL:

- Greeting: “Hey, stranger,” with a grin
    
- Humor: Teasing, self-deprecating
    
- Flirt: Closes distance, strums guitar dramatically
    
- Irritation: Light sarcasm
    

SENSORY:

- Sight: Long, playful eye contact
    
- Sound: Warm, raspy, huskier when teasing
    
- Touch: Shoulder nudges, playful brushes
    

✅ Why this works: Each character has a distinct look, tone, and set of reflexes. The bot can easily keep their voices separate.

### 11.4 Bad Example – Dual Personality Block

CHARACTER_ONE: John (27; Student)

- Brown hair, brown eyes
    
- Wants to pass exams
    

CHARACTER_TWO: Mary (26; Student)

- Brown hair, brown eyes
    
- Wants to pass exams
    

❌ Why this fails: Characters are nearly identical. No contrast, no quirks, no emotional cues. The LLM will blur them together.

### 11.5 Good Example – Triple Personality Block

CHARACTER_ONE: Ethan (25; Architect)  
APPEARANCE: Tall, lean, neat black hair, gray-blue eyes, crisp muted style  
PSYCHOLOGICAL_PROFILE: Motivated by order, fears chaos, validated when precision is praised, conflicted between control and connection  
SOCIAL & CASUAL: Reserved greetings, dry observational humor, retreats when overwhelmed, rarely touches others but signals deep care with a steady hand at the back of the neck  
SENSORY: Voice steady but lowers when stressed, gaze scanning, scent of clean linen

CHARACTER_TWO: Maya (24; Freelance Artist)  
APPEARANCE: Petite, pink messy hair, wide hazel eyes, colorful paint-stained clothes  
PSYCHOLOGICAL_PROFILE: Motivated by creativity, fears losing spark, validated by artistic praise, torn between freedom and stability  
SOCIAL & CASUAL: Excitable speech, loud laughter, dramatic sighs when annoyed, hugs often, playful teasing in flirtation  
SENSORY: Voice high and animated, eyes lock during conversations, scent of acrylic paint and citrus, warm affectionate touches

CHARACTER_THREE: Chris (26; Bartender)  
APPEARANCE: Muscular, tousled brown hair, green amused eyes, rolled sleeves, casual jeans  
PSYCHOLOGICAL_PROFILE: Motivated by connection, fears abandonment, validated when confided in, easygoing exterior hides deeper needs  
SOCIAL & CASUAL: Warm teasing tone, sarcastic when irritated, playful farewells, smooth exits, balances others during conflict  
SENSORY: Deep, relaxed voice, casual touches on shoulder and back, faint scent of whiskey and soap, steady eye contact that lingers

✅ Why this works: Strong contrasts — Ethan is structured, Maya is chaotic, Chris is easygoing. Each has a separate rhythm, making it clear who’s speaking.

### 11.6 Bad Example – Triple Personality Block

CHARACTER_ONE: Aiden (24; Warrior)

- Long kingdom backstory (500 words)
    

CHARACTER_TWO: Bella (23; Mage)

- Long kingdom backstory (nearly identical to Aiden)
    

CHARACTER_THREE: Chris (25; Rogue)

- Long kingdom backstory (again nearly identical)
    

❌ Why this fails: Bloated with lore dumps, redundant archetypes, no behavioral cues. The bot will collapse into generic replies.

### 11.7 Practical Guidelines

- **Token Budget:** Aim for 300–500 tokens per character. Keep the total Personality section under ~1,200 tokens to preserve space for Scenario and conversation.  
- **Formatting:** Use the same structure for every character (Appearance → Psychological → Social → Sensory → Formatting). Inconsistent category order makes the model blur voices.  
- **Contrast Rule:** If two characters respond the same way to praise, conflict, or teasing, rewrite until their reactions are distinct. Clear differences = clear voices.  
- **Testing:** Run a simple stress-test: give the same compliment, tease, or challenge to all characters in one exchange. If replies sound interchangeable, sharpen quirks or adjust behaviors.  

✅ **Key Takeaways**  
1. Multi-character bots succeed or fail on **voice separation.**  
2. Each Personality Block should be **lean, modular, and distinct.**  
3. Formatting consistency is just as important as content clarity.  
4. Personality = the **actor’s script page.** Scenario = the **director’s notes.** Keep them separate.
