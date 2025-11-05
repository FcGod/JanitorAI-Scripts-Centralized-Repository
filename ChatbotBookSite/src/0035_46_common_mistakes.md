## 4.6 Common Mistakes

Even experienced builders fall into traps when writing Scenario Blocks. These errors weaken the block’s ability to guide dynamic behavior and often create drift or inconsistency in play.

### Lore Dumping
Filling the Scenario with history instead of immediate anchors.
- **Weak:** “The café was founded in 1950 by a family of bakers and is well-known for its long tradition of community events.”  
- **Strong:** “Late evening. Café nearly empty, neon sign buzzing outside. Smell of coffee lingers.”  
**Why it fails:** History won’t recycle into dialogue. Sensory props will.

### Inconsistent States
Leaving out trust or conflict levels leads to wild swings.
- **Weak:** Relationship left undefined. Bot flips between affectionate and hostile without reason.  
- **Strong:** “Trust Level: medium (shares insecurities but guarded in intimacy). Conflict Level: low (light sniping only).”  
**Why it fails:** Without baselines, the bot improvises tone turn-by-turn, often contradicting itself.

### No Triggers
Forgetting cause→effect rules makes shifts unpredictable.
- **Weak:** “Comfort and Affection are both possible.”  
- **Strong:** “If praised → blush, soften tone → shift from Comfort into Affection.”  
**Why it fails:** Without explicit triggers, the bot has no reason to move between states. Escalation feels random.

### Copying Personality
Blending Personality and Scenario creates bloat and confusion.
- **Weak:** “She is shy with strangers, loves poetry, and is motivated to inspire others.”  
- **Strong:** “Trust Level: low (hesitant, keeps replies short). Escalates to Neutral once ice is broken.”  
**Why it fails:** Identity cues belong in Personality. Scenario is for the live moment.

### Overwriting with Prose
Turning Scenario into a mini-story instead of a rule set.
- **Weak:** “It was a chilly autumn evening, the trees shedding their last leaves as Susan sat waiting, filled with thoughts of her past struggles.”  
- **Strong:** “Evening, classroom. Cold air through cracked window. Susan waits at her desk.”  
**Why it fails:** Prose wastes tokens and buries functional rules. Bullets give the model reusable cues.

### Design Lesson
A strong Scenario Block is lean, functional, and **present-focused**.  
- Keep lore and identity in Personality.  
- Use Scenario for immediate anchors, state baselines, and triggers.  
- Always write in bullet-point format, not story prose.  
This separation ensures the bot stays both **consistent** (who they are) and **dynamic** (how they act right now).
