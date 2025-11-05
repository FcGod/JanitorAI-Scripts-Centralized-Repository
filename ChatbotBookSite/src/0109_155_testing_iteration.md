## 15.5 Testing & Iteration

Even the best scenario bot drifts. Testing and iterative fixes make them robust.

### Structured Test Methods

1. **Tone Test:** Run 20 turns. Did narration keep the same style? If not, tighten Controller.
    
2. **Adherence Test:** Trigger the same action twice. Did the same rule fire? If not, rewrite Scenario rules to be clearer.
    
3. **Token Test:** Check prompt size. If Controller + Scenario > 1,800 tokens, you are starving conversation memory. Cut fluff.
    

### Recovery Techniques

- **Recaps:** Add a short recap line into Scenario when swapping arcs. (“After three days’ rest, training resumes.”)
    
- **Transplants:** If tone collapses, re-paste Controller + Scenario into a new chat.
    
- **Drift Spotting:** Watch for “generic voice” creep — often a sign Controller formatting is too loose.
    

---
