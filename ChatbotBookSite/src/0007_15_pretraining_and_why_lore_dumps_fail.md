## 1.5 Pretraining and Why Lore Dumps Fail

Modern LLMs are **pretrained** on massive text corpora: books, websites, conversations, scripts, and articles. This is what gives them broad cultural fluency. The model has already seen fantasy novels, noir detective stories, slice-of-life dialogue, superhero tropes, and anime archetypes. It has also absorbed a huge amount of factual scaffolding: it almost certainly knows who Sherlock Holmes is, how to describe a café scene, or that Goku is a Saiyan warrior.

This means you do not need to “teach” the model everything again. Its foundation is already built. Your job as a bot creator is to **remind it what to emphasize.**

### The Lore Dump Mistake

Beginners often assume: “If I paste 9,000 words of lore, the bot will never make mistakes.”  
The reality is the opposite. Long lore dumps cause three problems:

1. **Token waste:** The extra text eats up your permanent budget, leaving little space for conversation history.
    
2. **Instruction burial:** Functional rules like formatting or triggers get pushed into the weak middle of the context window.
    
3. **Confusion drift:** Because the model is prediction-based, trivia without behavioral rules gives it “noise” instead of guidance, increasing the chance of off-tone responses.
    
### Good vs. Bad Example

**Good Reminder (DBZ bot):**  
“This is Dragon Ball Z. Goku is a Saiyan warrior who trains and fights to protect Earth. Piccolo is his rival and mentor.”  
✅ Concise. Reinforces the roles that matter for tone and behavior. Uses fewer than 40 tokens.

**Bad Lore Dump:**  
“Dragon Ball Z is a Japanese anime series created by Akira Toriyama in 1989. It follows Son Goku through childhood, early martial arts training, the battle against the Red Ribbon Army, his confrontations with King Piccolo, the 23rd Tenkaichi Budokai, and many more story arcs… [eight paragraphs of history].”  
❌ Bloated. Hundreds or thousands of tokens consumed. Adds trivia the model already knows. Pushes functional rules out of memory.

### Sidebar: Reminders vs. Wikis

Think of pretraining as hiring a driver. The driver already knows the city map. You don’t need to explain every street. You just say: “Take me to the museum, and avoid the highway.” In chatbot terms: remind the model who the characters are and what tone you want — do not reprint the wiki article.

### Best Practices

Keep reminders under a few sentences.  
Focus on **tone, role, or relationship cues**, not chronology.  
Never exceed ~10% of your permanent budget with lore; save the space for behavior rules.
![Reminder vs. Lore Dump.png](../images/Reminder vs. Lore Dump.png)
