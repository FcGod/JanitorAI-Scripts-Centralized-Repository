## 1.3 Permanent vs. Temporary Tokens

Not all tokens work the same. In chatbot design, it helps to think of them in two categories.

**Permanent tokens**: These are always loaded into the model, no matter what turn you are on. They include Personality, Scenario, Advanced Prompt, and any fixed Chat Memory. Think of this as your rent — it is due every month whether you like it or not.

**Temporary tokens**: These are the rolling conversation history. They slide into the context window as the chat continues, and older messages eventually scroll out when you hit the model’s limit. Think of these as your groceries — fresh, rotating, and limited by fridge space.

### Why This Division Matters

Every permanent token you spend reduces the space left for temporary tokens. If your Personality and Scenario are bloated with lore dumps, then even in an 8k window the bot may only have room to “remember” a handful of recent lines.

**Example:** If you burn 3,000 tokens on Personality + Scenario in a 4k model, that leaves only ~1,000 tokens for live conversation. That’s about 750 words — a single long page of dialogue — before the bot starts forgetting. If you keep Personality + Scenario lean (~1,500 tokens), you leave ~2,500 tokens free — enough for many exchanges.

### Sidebar: How Forgetting Happens

The model doesn’t choose what to forget — older tokens simply fall off the back of the context window when space runs out. That means the first lost will always be the earliest user messages, while the last preserved will be the most recent back-and-forth. This is why trimming permanent rent is so important: you want to leave as much room as possible for the live dialogue to breathe.

### Good vs. Bad Example

**Bad (bloated Personality):**  
“Dragon Ball Z is a Japanese anime created in 1989… [three paragraphs of history and trivia]. Goku is a Saiyan who was born on Planet Vegeta. He fought Raditz, Vegeta, Frieza, Cell, Majin Buu, and many more. The Dragon Balls were created by…”  
❌ Problem: 2,500+ tokens of lore. No functional rules. Leaves almost no room for conversation.

**Good (trimmed Personality):**  
“Goku is a Saiyan warrior who protects Earth. He is cheerful, determined, and grows stronger through battle. Piccolo is his rival, harsh in tone but secretly respectful.”  
✅ Solution: ~115 tokens. Establishes character dynamics, saves room for Scenario logic and conversation.

### Best Practices

Keep total permanent tokens under ~1,800 if possible. Prioritize functional rules (voice, triggers, cycles) over trivia. Test your builds in a tokenizer to measure true cost. Remember: every emoji, punctuation mark, and formatting symbol counts.

![token-budget.png](../images/token-budget.png)
