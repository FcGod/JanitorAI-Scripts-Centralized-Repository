## 1.7 Why Bots Drift

Even well-designed bots sometimes lose their way. This is called **drift** — when the model gradually stops following its Personality, Scenario, or formatting rules and begins sounding generic, contradictory, or inconsistent. Understanding _why_ drift happens helps you design against it.

### Common Causes of Drift

**Token overflow**: Every model has a fixed context window. Once conversation plus permanent tokens exceed that limit, the oldest tokens fall off the back. If critical anchoring instructions scroll out, the bot loses them.

**Middle collapse**: Instructions placed in the middle of the prompt are the first to blur, because the model’s attention weights are strongest at the start (anchor bias) and end (recency bias). Any important detail that sits in the middle will be followed weakly, if at all.

**Recency overwrite**: Because the last tokens are most influential, a heavy Advanced Prompt or a few intense user turns can override Personality rules. The bot may follow the last instruction it “saw” even if it contradicts earlier guidance.

**Lore bloat**: Excess backstory or trivia in Personality and Scenario wastes space and pushes functional rules out of view. The model sees lots of words but receives little useful guidance, increasing the chance of off-tone or generic replies.
![1ef4d5ef-891d-4788-a28f-448f71db708f.png](../images/1ef4d5ef-891d-4788-a28f-448f71db708f.png)
### Sidebar: Symptoms of Drift

Sudden generic voice after 15–20 turns.  
Loss of formatting consistency (italics/quotes forgotten).  
Conflicting behaviors (e.g., supposed to be shy, suddenly overly bold).  
Difficulty remembering relationship baselines established at the start.
### Design Lesson

Build lean. Every permanent token is precious. Ask yourself: **Does this line change behavior, or just add trivia?** If it doesn’t change behavior, cut it. Keeping prompts tight is the best long-term defense against drift.

LLMs are pattern engines, not databases.  
Tokens are the building blocks of all conversation.  
Context windows are limited, and memory is U-shaped.  
Pretraining means you do not need lore dumps. Use reminders, not encyclopedias.  
Send order defines weight. Placement matters.  
Bots drift when instructions are buried or overwritten.
