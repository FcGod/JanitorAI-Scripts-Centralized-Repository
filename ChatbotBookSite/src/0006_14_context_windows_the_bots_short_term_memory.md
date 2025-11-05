## 1.4 Context Windows: The Bot’s Short-Term Memory

The context window is the maximum number of tokens a model can process at once. A useful analogy is a reel of film projected onto a screen: only a certain stretch of frames are visible. As new frames roll in, old ones fall off the back. The same happens with tokens — once you hit the limit, older tokens disappear from the model’s awareness.

### Common Model Sizes

4k window ≈ 3,000 words of text  
8k window ≈ 6,000 words of text  
16k window ≈ 12,000 words of text  
32k window ≈ 24,000 words of text

Regardless of size, the rule is the same: once tokens exceed the limit, earlier text is gone.

### The U-Shaped Memory Curve

Models remember the **beginning** very well because it anchors the session.  
They remember the **end** extremely well because it is freshest.  
The **middle** is weakest and fades first.

This curve exists because transformer models distribute “attention” unevenly. Tokens at the start benefit from anchoring bias, tokens at the end benefit from recency bias, and tokens in the middle receive less weight.

### Placement Strategy

Personality belongs at the **start** of the prompt so it reliably anchors the bot’s identity.  
Scenario and Advanced Prompt belong at the **end** so they directly shape the bot’s immediate behavior.  
Avoid placing key rules in the middle where they are most likely to blur or be forgotten.

### Good vs. Bad Example

**Good Placement:**  
Personality at the very start → locks identity.  
Scenario and Advanced Prompt at the end → control the immediate scene.  
Result: The bot holds its voice consistently while following scene-specific instructions.

**Bad Placement:**  
Personality buried after Scenario → identity rules land in the weak middle zone.  
Scenario placed first → long-term identity gets overwritten by situational cues.  
Result: The bot may sound correct for a few turns, then drift into generic responses as Personality cues fade.
![u-shaped-memory.png](../images/u-shaped-memory.png)
