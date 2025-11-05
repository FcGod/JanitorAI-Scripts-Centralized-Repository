## 2.2 The Token Budget

Every model has a maximum number of tokens it can process at once — its **context window**. This is the hard ceiling on how much the bot can “see” at one time. Some of those tokens are **permanent**, always loaded every turn (Personality, Scenario, Advanced Prompt, Chat Memory). Others are **temporary**, made up of conversation history that scrolls as new dialogue is added.

Because the context window is finite, prompt design is a **zero-sum game.** Every token you spend on backstory or fluff is one less token available for conversation. If you burn 2,000 tokens on lore, that is 2,000 tokens of live dialogue you will never get back.

### Visualizing the Budget

Imagine the token budget as a bar divided into two sections:  
**Permanent tokens (rent):** Personality, Scenario, Advanced Prompt. These are loaded every turn and never scroll out.  
**Temporary tokens (groceries):** Conversation history. These move in and out of the bar as you talk, with older lines falling out when the budget is exceeded.

If permanent rent grows too large, temporary space shrinks to almost nothing, and your bot starts “forgetting” after only a few exchanges.
![token-budget-bar.png](../images/token-budget-bar.png)
### Sidebar: Formatting Costs Too

Efficiency isn’t just about words — even formatting burns budget.  
Italics markers, brackets, quotation marks, bold markers, and emojis all take tokens. For example:

- “_Hello_” with italics = 3 tokens (quote + word + italics symbol).
    
- “[She’s nervous.]” with brackets = 4 tokens (bracket + word + punctuation + bracket).
    

Over the course of a Personality or Scenario, formatting choices can quietly add up to hundreds of wasted tokens.

**Best practice:**  
Define one clean, consistent formatting system (e.g., italics for actions, quotes for dialogue, brackets for inner thought). Avoid redundancy or stylistic clutter. You want the bot to learn the pattern without wasting tokens on excessive markers.

### Efficiency Beyond Personality

Token budgeting doesn’t stop at design. It continues into **playstyle.** Long user messages and long bot responses also eat temporary tokens. If you and the bot trade 400-word replies, you’ll hit the window limit fast, and old conversation will scroll out. If you keep replies tighter, your memory lasts longer.

### Design Lesson

Think of tokens as currency. Every token you spend in Personality and Scenario should return a meaningful behavioral effect. Spend your rent wisely, so you have room in the fridge for groceries.
