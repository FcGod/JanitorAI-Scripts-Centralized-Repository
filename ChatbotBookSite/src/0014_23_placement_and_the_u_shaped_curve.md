## 2.3 Placement and the U-Shaped Curve

As we saw in Chapter 1, models don’t treat every token equally. The **U-shaped memory curve** describes how bots remember the beginning and end of the prompt best, while the middle fades first. This happens because the transformer architecture assigns stronger “attention” weights to the earliest tokens (anchors) and the most recent tokens (recency), while tokens in the middle receive weaker weighting.

### Start = Anchor

The start of the prompt is where the bot locks in its long-term identity. This is where you place the Personality Block — rules about voice, style, quirks, and defining behaviors. Anchoring early ensures that the bot’s “sense of self” persists throughout the session.

### End = Recency

The end of the prompt is where the bot looks most closely for immediate instructions. This is where Scenario and Advanced Prompt belong. Scenario defines the live situation, relationship state, and rules for this arc. Advanced Prompt provides overlays (tone, formatting, pacing tweaks). By being last in line, these instructions strongly shape the bot’s next reply.

### Middle = Weak Zone

Anything buried in the middle of the prompt risks being blurred or forgotten first. This is why dumping paragraphs of backstory between Personality and Scenario is counterproductive: it places the most critical rules in the weakest part of the curve. Bots will remember trivia from the lore dump just long enough to push your formatting or emotional rules out of the spotlight.

### Good vs. Bad Example

**Good Placement:**

- Personality at the very start → identity anchored
    
- Scenario and Advanced Prompt at the very end → live behavior rules emphasized  
    Result: Consistent voice across turns and responsive, scene-specific actions.
    

**Bad Placement:**

- Scenario comes first → immediate rules overwrite identity
    
- Personality buried in the middle → weak weighting, easily blurred  
    Result: Bot may roleplay correctly for a few turns, then drift into generic or off-tone behavior as identity cues fade.
    

### Design Rule

Always put instructions where the model is most likely to honor them. Personality belongs at the start. Scenario and Advanced Prompt belong at the end. Never bury vital cues in the mid-zone.
![u-shaped-memory.png](../images/u-shaped-memory.png)
