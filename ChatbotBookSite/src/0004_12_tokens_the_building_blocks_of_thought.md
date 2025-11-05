## 1.2 Tokens: The Building Blocks of Thought

LLMs do not process text as whole words. Instead, they break everything into **tokens** — small chunks that may be full words, fragments of words, or even punctuation.

Examples:  
“dog” = 1 token  
“running” = 2 tokens (“runn” + “ing”)  
“don’t” = 2 tokens (“don” + “’t”)  
“.” = 1 token

**Rule of thumb:** 1,000 tokens ≈ 750 words in English.

### Why Tokens Matter

**Token budget defines memory.** Every model has a maximum number of tokens it can “see” at once. This limit is the model’s short-term memory span.

**Tokens consume compute.** More tokens = heavier processing. A bloated prompt makes the model slower and more expensive to run.

**Tokens are your design space.** Every line in Personality, Scenario, or Advanced Prompt consumes permanent tokens. The more you spend here, the less room is left for conversation history.

**Tokens shape drift.** Once you hit the model’s limit, older tokens roll out of memory. If your permanent sections are bloated, drift happens faster because conversation history gets squeezed out.

### Tokenization Surprises

Token boundaries are not always intuitive. Models use subword splits, so unusual or long words often break into multiple tokens.

Examples:  
“antidisestablishmentarianism” = 6 tokens  
“hello!!!” = 3 tokens (“hello” + “!!” + “!”)  
“😊” = 1 token (emojis are usually single tokens)

This is why you should always test your Personality + Scenario in a tokenizer tool before finalizing.
![token-explanation.png](../images/token-explanation.png)
### Quick Reference Table

|Tokens|Words (approx)|Characters (approx)|
|---|---|---|
|1000|750|4,000–5,000|
|4000|3000|16,000–20,000|
|8000|6000|32,000–40,000|
|32000|24000|120,000–150,000|
### Sidebar: Token Best Practices

Think of tokens as your **budget**. Spend wisely.

**Target ceilings for JanitorAI chatbot design:**  
Personality Block: ~600 tokens or less  
Scenario Block: ~800 tokens or less  
Advanced Prompt: ~200–300 tokens  
Total Permanent (all of the above): aim under ~1,800 tokens

This leaves enough room for **temporary tokens** (conversation history) inside a 4k–8k model window. If you overspend permanent tokens, the bot will start “forgetting” live dialogue almost immediately.
