## 5.6 Common Mistakes

Even with a solid template, it’s easy to misuse states and triggers. These pitfalls often create bots that feel inconsistent, generic, or unstable in long chats.

### No Triggers Defined
- **Weak:** Bot has Neutral, Comfort, and Affection listed, but no rules for when to use them.  
- **Result:** The bot either stays stuck in Neutral or shifts unpredictably.  
- **Fix:** Always tie transitions to user actions (praise, tease, apology, confession).

### Too Many States
- **Weak:** Defining 10–12 states all at once.  
- **Result:** The model struggles to distinguish them, blending categories into generic tone.  
- **Fix:** Start with 4–6 clear states. Add more only if each has a distinct trigger and behavior.

### Hedging Rules
- **Weak:** “The bot *might* act shy when nervous. It *sometimes* gets angry.”  
- **Result:** Optional phrasing weakens the rule. The bot ignores it more often than not.  
- **Fix:** Be definitive. “The bot acts shy when meeting strangers.” “The bot snaps when provoked.”

### Overlapping Categories
- **Weak:** Comfort = gentle reassurance. Affection = soft encouragement.  
- **Result:** Both mean “be kind.” The model treats them as interchangeable.  
- **Fix:** Comfort = reassurance under stress. Affection = warmth when intimacy builds. Distinct cues, distinct triggers.

### Internal-Only States
- **Weak:** “She feels sad.” “He is happy.”  
- **Result:** Purely internal states don’t translate into behavior. The bot has nothing to act on.  
- **Fix:** Always frame in terms of *interaction.* “She avoids eye contact, voice falters, and replies shorten when sad.”
- 
### Design Lesson
States and triggers must be **lean, distinct, and directive.**  
- Lean: keep the set small and manageable.  
- Distinct: ensure no two states blur into the same behavior.  
- Directive: phrase rules as cause-and-effect, not vague possibilities.  

Without this discipline, your Scenario Block becomes noise — bloated, inconsistent, and easily ignored by the model.
