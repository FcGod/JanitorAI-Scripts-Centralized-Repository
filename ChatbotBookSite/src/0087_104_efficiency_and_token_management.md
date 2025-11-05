## 10.4 Efficiency and Token Management
Every new character costs tokens. Each Personality Block is permanent “rent” inside the bot definition — it loads on every turn. Add too many, and you’ll squeeze out the space needed for conversation history. The result: characters start “forgetting” context mid-scene, or worse, collapsing into generic voices.

### The Enemy: Token Bloat
It’s tempting to give every character paragraphs of backstory, favorite foods, and extended family trees. But all of that is permanent cost. The more you spend on trivia, the less room you leave for the actual play — dialogue, shifts, and user interaction. Token bloat doesn’t just slow performance; it actively erases memory for live turns.

### The Solution: Practical Guidelines
- **300–500 tokens per Personality.** Enough to define voice, quirks, and reflexes without spilling into trivia.  
- **Keep total Personality under ~1,500 tokens.** This leaves room for a shared Scenario (~500 tokens) while still saving space for live conversation.  
- **Absolute ceiling: ~2,000 tokens permanent.** Beyond this, the LLM has so little room left for temporary tokens that even the best design will drift.  

### Efficiency Through Behavior
Efficiency isn’t about cutting depth — it’s about cutting waste. Skip biographies that never show up in dialogue. Focus on mannerisms, humor style, speech patterns, and reflexes — the things that surface constantly in play. One line like *“deflects praise with sarcasm”* will fire dozens of times in chat. One line like *“born in 1993 in a small coastal town”* will never matter.

### Design Lesson
Think of your token budget like stage lighting. If you burn all the electricity on elaborate spotlights (backstory), there’s no power left to light the actual performance (live dialogue). Trim until every token is pulling its weight on stage.
