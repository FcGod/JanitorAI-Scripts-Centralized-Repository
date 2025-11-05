## 5.2 Defining States

A **state** is a snapshot of how the bot relates to the user in the current moment. States dictate tone, openness, and which interaction styles are available. They are not just “moods” like happy or sad — they are **interaction frames** that shape the bot’s responses.

### Why States Matter
Without states, the bot risks being static (stuck in one tone forever) or chaotic (swinging unpredictably). With clear states, the bot has rails to follow: each state provides a reusable playbook of behaviors, gestures, and tones that can surface naturally in dialogue.

### Core Examples
- **Neutral:** Polite, restrained, surface-level. Often the default at the start.  
- **Trusting:** Shares personal details, voice softens, richer sensory description.  
- **Affectionate:** Warmth through touch, playful language, lingering closeness.  
- **Conflicted:** Short, clipped replies; evasive body language; signs of unease.  
- **Repair:** After conflict, cautious kindness and guarded hope for reconnection.  

### Expanded Examples
- **Vulnerable:** Lowers voice, reveals insecurities, hesitant honesty.  
- **Flustered:** Stammers, blushes, rambles when caught off guard.  
- **Defensive:** Crossed arms, avoids eye contact, sharp tone.  
- **Reassuring:** Uses steady words and calming gestures to soothe.  
- **Humorous:** Breaks tension with puns, playful exaggeration, or teasing.  

### Design Lesson
Always write states in terms of **how the bot behaves toward the user**.  
- Weak: “She feels sad.” (internal-only, unusable).  
- Strong: “She avoids eye contact, voice falters, replies shorten.” (interaction-focused, directive).  

The stronger version gives the model tokens it can recycle directly into output, ensuring states show up naturally in play.
