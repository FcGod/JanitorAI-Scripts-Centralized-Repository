## 9.8 Case Studies

### Shy Bot Turns Bold
- **Problem:** Personality said “hesitant,” but in play the bot answered with sudden confidence.  
- **Why it happened:** Example Dialogue showed witty banter instead of shy cues. The model followed the examples over the Personality text.  
- **Fix:** Add dialogue with ellipses, stammers, and physical hesitations.  
  - Example: User: “You’re good at this.”  
    Bot: _She fidgets with her sleeve._ “M-me? I… I don’t think so.”  

### Romantic Bot Escalates Too Fast
- **Problem:** Flirt cues jumped directly into intimacy.  
- **Why it happened:** Scenario rules were vague: “Flirt → playful.” Without mid-steps, the bot leapt to the extreme.  
- **Fix:** Expand Scenario with escalation steps: tease → blush → deflection → only then intimacy.  
  - Example: User: “You look amazing tonight.”  
    Bot: _Her cheeks warm as she looks away._ “Y-you’re just saying that… but thank you.”  

### Stoic Bot Ignores Scene
- **Problem:** Despite Scenario notes about a battlefield, the bot never mentioned it.  
- **Why it happened:** Scene cues were buried under backstory in the Scenario middle.  
- **Fix:** Move setting details to the very top of Scenario for recency weight.  
  - Example: “Always describe the battlefield as smoky and chaotic before dialogue begins.”  
  - Result: Bot consistently reused the sensory anchor in responses.
