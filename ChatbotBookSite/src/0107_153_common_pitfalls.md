## 15.3 Common Pitfalls

Scenario bots often fail in predictable ways. Knowing them upfront prevents wasted effort.

### 1. Stub Scenarios

**Symptom:** Scenario Block is too thin. (“You are in a café. Talk.”)  
**Problem:** Without baselines or rules, the model defaults to generic chatter. Collapses in 2–3 turns.  
**Fix:** Anchor scene + relationship + 3–5 functional rules minimum.

### 2. Lore Dumps

**Symptom:** Scenario Block contains paragraphs of history or canon explanation.  
**Problem:** Wastes tokens, buries functional rules, confuses the model.  
**Fix:** Move lore into your _head,_ not the prompt. Encode only what changes behavior.

### 3. Over-Complication

**Symptom:** Dozens of NPCs, branching systems, sprawling instructions.  
**Problem:** Token bloat + model confusion = unreliable results.  
**Fix:** Start lean. Build one core loop well, then layer.

### 4. Drift / Flattening

**Symptom:** After 20+ turns, tone or cycle collapses into generic narration.  
**Problem:** Controller not directive enough, or Scenario too vague.  
**Fix:** Tighten Controller tone rules. Refresh Scenario with swaps between arcs.

---
