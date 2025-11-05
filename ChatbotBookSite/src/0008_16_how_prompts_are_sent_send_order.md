## 1.6 How Prompts Are Sent (Send Order)

When you press send, the platform does not just dump your instructions into the model at random. They are arranged in a specific order called the **send order**. Understanding this order is critical, because tokens at the end of the prompt often carry more weight than those in the middle.

### JanitorAI Send Order

1. **Personality Block** – Defines the bot’s identity, style, and static rules.
    
2. **Chat Memory** – Fixed continuity notes that remind the bot of important facts across turns.
    
3. **Scenario Block** – Anchors the current scene, relationship baseline, and live logic.
    
4. **Advanced Prompt** – Temporary overlays such as “always be flirty” or “use short replies.”
    
5. **Recent Messages** – The last user input and the bot’s most recent responses.
    

This layered structure ensures the bot always knows who it is, where it is, and what just happened — in that order.

### Analogy

Think of it like a play.  
**Personality = the actor’s script** (who they are and how they talk).  
**Scenario = the stage directions** (what is happening in this scene).  
**Advanced Prompt = the director whispering last notes** before the curtain rises.  
**Recent Messages = the live dialogue** happening on stage.

### Advanced Prompt Warning

Because the Advanced Prompt is placed at the end of the send order, it can outweigh even the Personality if it is too heavy. This is both powerful and risky. Use it for overlays like formatting rules or tone shifts, not as a dumping ground for long instructions. If your Advanced Prompt is longer than a few hundred tokens, it is probably displacing more important information.
![prompt-send-order.png](../images/prompt-send-order.png)
