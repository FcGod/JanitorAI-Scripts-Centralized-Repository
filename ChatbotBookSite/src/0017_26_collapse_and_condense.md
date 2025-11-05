## 2.6 Collapse and Condense

Efficiency isn’t just about cutting. It’s also about **collapsing** multiple lines into one without losing meaning. This lets you preserve character depth while spending fewer tokens. Done carefully, collapsing keeps the flavor but reduces waste.

### Line Collapsing

Two separate lines:  
“She is shy when meeting strangers.”  
“She opens up slowly once trust is earned.”

Collapsed into one:  
“She is shy with strangers but opens up as trust builds.”

The collapsed version expresses the same behavior in fewer tokens. Across a 1,500-token Personality, this discipline saves hundreds while making the prompt easier for the model to follow.

### Categorical Condensation

Collapsing also works at the category level — grouping traits instead of listing them separately.

Instead of:  
“She loves roses. She loves lilies. She loves tulips.”

Better:  
“She loves flowers, especially roses and lilies.”

The second line captures the same preferences, highlights key details, and costs fewer tokens.

### Sidebar: Over-Collapse Warning

Collapsing should **tighten**, not flatten. Over-compression risks losing nuance.

Bad: “She is shy, confident, sarcastic, kind, and rude.” (Conflicting traits lumped together, no clarity.)  
Better: “She is shy with strangers, sarcastic with friends, but shows kindness when trust is earned.”

The second version uses one sentence but still encodes **conditional behaviors** — who she is changes with context.

### Other Collapse Strategies

- **Merge adjectives:** “She is kind, generous, and compassionate” → “She is warm and compassionate.”
    
- **Combine formatting rules:** Instead of listing each (“Use italics for actions. Use quotes for dialogue. Use brackets for thoughts.”), collapse: “Use italics for actions, quotes for dialogue, and brackets for thoughts.”
    
- **Condense relationship cues:** “She respects her mentor. She sometimes resents her mentor’s strictness.” → “She respects her mentor but resents his strictness.”
### Design Lesson

Collapsing and condensation are how you **keep depth without waste.** Ask yourself: can two or three lines be rephrased into one without losing behavioral impact? If yes, collapse. If no, preserve the detail. Balance precision with brevity.
