# Foreword and Introduction

This guide was written to give both new and experienced creators a clear, structured path into building effective chatbots on JanitorAI and similar platforms. Over the last several years, the community has experimented with countless templates, lorebooks, and scripting systems — and while fragments of best practices were scattered across guides, posts, and personal notes, there was never a single resource that pulled everything together in one place.

This book is my attempt to change that. It combines hard lessons from hundreds of hours of building, testing, and refining bots with research from community leaders, and practical trial-and-error. Every chapter is designed to move from theory to practice: not just _what_ to do, but _why it matters_ and _how to implement it_ in a way that actually survives in live play.

My hope is that this book serves two purposes: as a **beginner’s on-ramp** for those just entering the world of chatbot creation, and as a **reference manual** for veterans who need a reliable touchstone when building advanced systems. Whether you are writing your first Personality Block or balancing a multi-character ensemble with Trigger Matrices, this book is built to guide you step by step.

— **Written by Icehellionx**  

# Table of Contents

**Foreword**

**Chapter 1 – Foundations: How LLMs See the World**  
1.1 Tokens and Why They Matter  
1.2 Context Windows  
1.3 Pretraining and Why Lore Dumps Fail  
1.4 The U-Shaped Memory Curve  
1.5 How Prompts Are Sent (Send Order)  
1.6 Why Bots Drift  
1.7 Exercises  

**Chapter 2 – Token Efficiency & Memory Management**  
2.1 Why Efficiency Matters  
2.2 The Token Budget  
2.3 Placement and the U-Shaped Curve  
2.4 Reply Length and Pacing  
2.5 Cutting the Fat  
2.6 Collapse and Condense  
2.7 Signal vs. Noise  
2.8 Confusion Drift  
2.9 Final Takeaways  
Exercises  

**Chapter 3 – Personality Blocks I: Structure & Theory**  
3.1 What a Personality Block Is  
3.2 The Formula: Personality Block Template  
3.3 Teaching Each Section  
3.4 Worked Example: Susan Benson  
3.5 Common Mistakes  
Exercises  

**Chapter 4 – Scenario Blocks I: The Identity vs. the Script**  
4.1 What a Scenario Block Is  
4.2 Why the Scenario Block Matters  
4.3 The Formula: Scenario Block Template  
4.4 Teaching Each Section  
4.5 Worked Example: Susan Benson  
4.6 Common Mistakes  
Exercises  

**Chapter 5 – Scenario Blocks II: States, Triggers, and Interaction Categories**  
5.1 Why States and Triggers Matter  
5.2 Defining States  
5.3 Writing Triggers  
5.4 Interaction Categories Expanded  
5.5 Worked Example: Triggered States in Play  
5.6 Common Mistakes  
Exercises  

**Chapter 6 – Example Dialogue**  
6.1 Why Example Dialogue Matters  
6.2 Formatting Conventions  
6.3 Pacing Tricks  
6.4 Example Dialogue (Good vs. Bad)  
6.5 Building a Sample Set  
6.6 Key Takeaways  

**Chapter 7 – Initial Messages & First Impressions**  
7.1 The Curtain Rises  
7.2 Anatomy of an Effective Opener  
7.3 Case Study: Nina’s Room  
7.4 Why Length Matters  
7.5 Common Pitfalls  
7.6 Alternative Openers Across Archetypes  
7.7 Practical Design Tips  
7.8 Conclusion: The First Beat  

**Chapter 8 – Bot Cards & Presentation**  
8.1 Why Bot Cards Matter  
8.2 The Six Structural Parts of a Card  
8.3 Visuals and Generators  
8.4 Prompting Basics  
8.5 Writing the Blurb  
8.6 Structural Flow Checklist  
8.7 Worked Example: Tomboy Judo Girlfriend  
8.8 Common Mistakes  
8.9 Conclusion: The Storefront Window  

**Chapter 9 – Testing & Debugging Bots**  
9.1 Why Testing Matters  
9.2 The Tester’s Mindset  
9.3 Quick Checks for Tone  
9.4 Quick Checks for Scenario Rules  
9.5 Quick Checks for Emotion  
9.6 Quick Checks for Tokens  
9.7 Common Pitfalls in Testing  
9.8 Case Studies  
9.9 Debugging Quick Checklist  
9.10 Conclusion  

**Chapter 10 – Multi-Character Philosophy**  
10.1 Introduction: From Solos to Ensembles  
10.2 The Core Challenge: Many Voices, One Engine  
10.3 The Scenario as Director  
10.4 Efficiency and Token Management  
10.5 From Solo Act to Ensemble Cast  
10.6 Case Illustration: The Two-Voice Test  
10.7 Conclusion  

**Chapter 11 – Multi-Character Personality Blocks**  
11.1 Why Multi-Part Personality Matters  
11.2 Core Categories for Each Personality  
11.3 Teaching Each Section  
11.4 Worked Example (Duo)  
11.5 Worked Example (Trio)  
11.6 Common Mistakes  
11.7 Practical Guidelines  

**Chapter 12 – The Shared Scenario & Trigger Matrix**  
12.1 Introduction  
12.2 Why the Shared Scenario Matters  
12.3 Core Components of the Shared Scenario  
12.4 Good Example – Dual-Character Scenario + Trigger Matrix  
12.5 Bad Example – Dual-Character Scenario + Trigger Matrix  
12.6 Good Example – Triple-Character Scenario + Trigger Matrix  
12.7 Escalation and De-escalation  
12.8 Practical Guidelines  
12.9 Diagram Prompt  
12.10 Conclusion  

**Chapter 13 – Dialogue, Formatting & Troubleshooting**  
13.1 Why Dialogue Management Matters  
13.2 Turn-Taking: Who Speaks When  
13.3 Formatting Rules: Teaching the Model Voice Separation  
13.4 Pacing: Dialogue Length and Rhythm  
13.5 Troubleshooting Common Problems  
13.6 Case Study: Banter Flow in a Duo  
13.7 Case Study: Triangulation in a Trio  
13.8 Diagram Prompt  
13.9 Conclusion  

**Chapter 14 – Scenario Bots: Simulations and Environments**  
14.1 Introduction  
14.2 Scenario Bot Personality Blocks  
14.3 Scenario Bot Scenarios  
14.4 Triggering Simulation Logic  
14.5 Case Study: Dragon Ball Z Simulator  
14.6 Common Pitfalls  
14.7 Conclusion  

**Chapter 15 – Advanced Scenario Bot Design**  
15.1 Expanding Interaction Categories  
15.2 Layered Triggers and States  
15.3 Environmental Logic as Scenario Personality  
15.4 Worked Example: Noir Detective Simulator  
15.5 Practical Guidelines  
15.6 Conclusion  

**Chapter 16 – Wrap-Up & Looking Ahead**  
16.1 Key Lessons  
16.2 Common Mistakes to Avoid  
16.3 The Future of Botmaking  
16.4 Final Words  

**Appendices**  
Appendix 1 – Single Character Templates (Personality + Scenario)  
Appendix 2 – Dual Character Templates (Personality + Scenario)  
Appendix 3 – Triple Character Templates (Personality + Scenario)  
Appendix 4 – Scenario Bot Templates (Personality + Scenario)  
Appendix 5 – Spark Notes / Most Important Takeaways  
Appendix 6 – Glossary of Key Terms

# Chapter 1 – How LLMs Work

When you start building chatbots, it can feel like you’re whispering instructions into a black box and hoping for the best. Sometimes the bot nails the personality you want. Other times, it drifts into generic replies or forgets what you told it minutes ago.

The difference isn’t luck. It comes from how Large Language Models (LLMs) actually process information. If you understand tokens, memory limits, pretraining, and prompt structure, you stop guessing and start designing with intent.

Think of this chapter as the anatomy lesson before we learn how to perform surgery.

## 1.1 What an LLM Really Is

A Large Language Model (LLM) is not a database, not a search engine, and not an actor hiding behind the screen. It is a **pattern engine** — closer to a hyper-powered autocomplete than anything else.

LLMs are trained on billions of words: books, websites, transcripts, fanfiction, scripts. From this exposure, they do not memorize everything line-by-line. Instead, they learn **statistical patterns**: which words tend to follow which, how sentences are structured, and how different writing styles flow.

At its simplest, an LLM does one thing: **it predicts the next token.**

If you type:  
“The sky is …”

The model runs probabilities:  
**blue** (very likely)  
**falling** (possible in poetic context)  
**angry** (rare, but still valid)

Token by token, it continues. That is why conversations feel natural: our own speech is built the same way.

### Why It’s Not Just Autocomplete

It helps to compare an LLM to the autocomplete on your phone, but with a big caveat. Your phone guesses the next word based on a short window of your texting history. An LLM, built on a **transformer architecture**, compares relationships between _all_ the words in your input at once. This gives it a far deeper sense of style and structure.

So yes, it’s “autocomplete,” but at a scale and complexity that lets it generate whole stories, roleplay characters, and follow instructions.

### Patterns, Not Facts

LLMs sometimes look like they are “remembering facts,” but they are not retrieving information from a database. They are generating the most likely continuation based on patterns they’ve seen. This is why bots can **hallucinate** — producing confident but false details that sound right but aren’t verified.

For chatbot creators, this is important: your bot isn’t checking a factbook. It’s performing an _improvised continuation_ in the style you’ve cued.

### Analogies That Stick

**Friend Analogy:** When you finish a friend’s sentence before they do, you’re doing your own predictive modeling. The model just does this at scale.

**Actor Analogy:** Imagine an actor who has rehearsed every play ever written. When you give them a line, they don’t recall one exact script — they improvise a continuation that fits the style. That’s how an LLM works when you hand it a Personality and Scenario block: it’s improvising in character, not recalling a script word-for-word.

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
![[token-explanation.png]]
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

![[token-budget.png]]
## 1.4 Context Windows: The Bot’s Short-Term Memory

The context window is the maximum number of tokens a model can process at once. A useful analogy is a reel of film projected onto a screen: only a certain stretch of frames are visible. As new frames roll in, old ones fall off the back. The same happens with tokens — once you hit the limit, older tokens disappear from the model’s awareness.

### Common Model Sizes

4k window ≈ 3,000 words of text  
8k window ≈ 6,000 words of text  
16k window ≈ 12,000 words of text  
32k window ≈ 24,000 words of text

Regardless of size, the rule is the same: once tokens exceed the limit, earlier text is gone.

### The U-Shaped Memory Curve

Models remember the **beginning** very well because it anchors the session.  
They remember the **end** extremely well because it is freshest.  
The **middle** is weakest and fades first.

This curve exists because transformer models distribute “attention” unevenly. Tokens at the start benefit from anchoring bias, tokens at the end benefit from recency bias, and tokens in the middle receive less weight.

### Placement Strategy

Personality belongs at the **start** of the prompt so it reliably anchors the bot’s identity.  
Scenario and Advanced Prompt belong at the **end** so they directly shape the bot’s immediate behavior.  
Avoid placing key rules in the middle where they are most likely to blur or be forgotten.

### Good vs. Bad Example

**Good Placement:**  
Personality at the very start → locks identity.  
Scenario and Advanced Prompt at the end → control the immediate scene.  
Result: The bot holds its voice consistently while following scene-specific instructions.

**Bad Placement:**  
Personality buried after Scenario → identity rules land in the weak middle zone.  
Scenario placed first → long-term identity gets overwritten by situational cues.  
Result: The bot may sound correct for a few turns, then drift into generic responses as Personality cues fade.
![[u-shaped-memory.png]]
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
![[Reminder vs. Lore Dump.png]]
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
![[prompt-send-order.png]]
## 1.7 Why Bots Drift

Even well-designed bots sometimes lose their way. This is called **drift** — when the model gradually stops following its Personality, Scenario, or formatting rules and begins sounding generic, contradictory, or inconsistent. Understanding _why_ drift happens helps you design against it.

### Common Causes of Drift

**Token overflow**: Every model has a fixed context window. Once conversation plus permanent tokens exceed that limit, the oldest tokens fall off the back. If critical anchoring instructions scroll out, the bot loses them.

**Middle collapse**: Instructions placed in the middle of the prompt are the first to blur, because the model’s attention weights are strongest at the start (anchor bias) and end (recency bias). Any important detail that sits in the middle will be followed weakly, if at all.

**Recency overwrite**: Because the last tokens are most influential, a heavy Advanced Prompt or a few intense user turns can override Personality rules. The bot may follow the last instruction it “saw” even if it contradicts earlier guidance.

**Lore bloat**: Excess backstory or trivia in Personality and Scenario wastes space and pushes functional rules out of view. The model sees lots of words but receives little useful guidance, increasing the chance of off-tone or generic replies.
![[1ef4d5ef-891d-4788-a28f-448f71db708f.png]]
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
## Exercises

**Count the Tokens**  
Write 150 words about your favorite character. Run it through a tokenizer. Compare words vs. tokens.

**Token Rent Audit**  
Paste your Personality + Scenario into a counter. Is your “rent” under 1,800 tokens? Trim if not.

**Memory Curve Test**  
Paste 2,000 words into a chatbot. Ask about the start vs. end. Observe recency vs. anchor bias.

**Shrink to Improve**  
Take a 300-word backstory. Rewrite into 100 words of functional reminders. Test both.

**Send Order Drill**  
Write one Personality line, one Scenario line, one Advanced Prompt, and one user message. Put them in order. Which dominates?

✅ End of Chapter 1  
In this chapter, you learned how the model sees the world: tokens, context windows, pretraining, and prompt order. In Chapter 2, we will dig into token efficiency — how to write prompts that stay lean, clear, and powerful without wasting space.

# Chapter 2 – Token Efficiency & Memory Management

## 2.1 Why Efficiency Matters

You could give a chatbot a 9,000-word encyclopedia of your character’s backstory. You could paste in a novel’s worth of lore and think, _“Now it will never get anything wrong.”_

The reality is the opposite. The more tokens you waste on trivia, the less space is left for conversation. The model doesn’t get smarter because you stuffed it full of words. It just gets bloated, slow, and forgetful.

### Efficiency as Skill

Efficiency is not about being a minimalist for its own sake. It is a skill: spending your token budget where it matters most. Strong builders think in terms of **signal-to-noise ratio.** Every line should push the bot’s behavior, tone, or pacing in a specific direction. Anything that doesn’t change behavior is noise.

### Why It Matters for Stability

Inefficient prompts don’t just run long — they destabilize. Too much trivia weakens the model’s focus, increasing the chance of drift into generic replies. A leaner build with strong cues produces steadier results, even over dozens of turns.

### Why It Matters for Speed and Cost

Tokens are not just memory — they are compute. A bloated prompt makes the model slower and more expensive to run. Trimming unnecessary details improves response speed and reduces cost without sacrificing quality.

### Noise vs. Signal Example

Bad: “Her uncle worked in a steel mill in 1983, and her cousin once saw a UFO.”  
Good: “She speaks with the blunt confidence of someone from a working-class family.”  
The first is trivia. The second shapes dialogue.

### Efficiency as Freedom

Every permanent token you cut is room for more live conversation. Efficiency isn’t about removing flavor — it’s about freeing space for the fun part: actual play. A well-built bot feels richer in chat precisely because its prompt is leaner.

**Design lesson:** Trim backstory until every line in Personality and Scenario answers one question: _Will this change how the bot talks or behaves?_ If the answer is no, cut it.

## 2.2 The Token Budget

Every model has a maximum number of tokens it can process at once — its **context window**. This is the hard ceiling on how much the bot can “see” at one time. Some of those tokens are **permanent**, always loaded every turn (Personality, Scenario, Advanced Prompt, Chat Memory). Others are **temporary**, made up of conversation history that scrolls as new dialogue is added.

Because the context window is finite, prompt design is a **zero-sum game.** Every token you spend on backstory or fluff is one less token available for conversation. If you burn 2,000 tokens on lore, that is 2,000 tokens of live dialogue you will never get back.

### Visualizing the Budget

Imagine the token budget as a bar divided into two sections:  
**Permanent tokens (rent):** Personality, Scenario, Advanced Prompt. These are loaded every turn and never scroll out.  
**Temporary tokens (groceries):** Conversation history. These move in and out of the bar as you talk, with older lines falling out when the budget is exceeded.

If permanent rent grows too large, temporary space shrinks to almost nothing, and your bot starts “forgetting” after only a few exchanges.
![[token-budget-bar.png]]
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

## 2.3 Placement and the U-Shaped Curve

As we saw in Chapter 1, models don’t treat every token equally. The **U-shaped memory curve** describes how bots remember the beginning and end of the prompt best, while the middle fades first. This happens because the transformer architecture assigns stronger “attention” weights to the earliest tokens (anchors) and the most recent tokens (recency), while tokens in the middle receive weaker weighting.

### Start = Anchor

The start of the prompt is where the bot locks in its long-term identity. This is where you place the Personality Block — rules about voice, style, quirks, and defining behaviors. Anchoring early ensures that the bot’s “sense of self” persists throughout the session.

### End = Recency

The end of the prompt is where the bot looks most closely for immediate instructions. This is where Scenario and Advanced Prompt belong. Scenario defines the live situation, relationship state, and rules for this arc. Advanced Prompt provides overlays (tone, formatting, pacing tweaks). By being last in line, these instructions strongly shape the bot’s next reply.

### Middle = Weak Zone

Anything buried in the middle of the prompt risks being blurred or forgotten first. This is why dumping paragraphs of backstory between Personality and Scenario is counterproductive: it places the most critical rules in the weakest part of the curve. Bots will remember trivia from the lore dump just long enough to push your formatting or emotional rules out of the spotlight.

### Good vs. Bad Example

**Good Placement:**

- Personality at the very start → identity anchored
    
- Scenario and Advanced Prompt at the very end → live behavior rules emphasized  
    Result: Consistent voice across turns and responsive, scene-specific actions.
    

**Bad Placement:**

- Scenario comes first → immediate rules overwrite identity
    
- Personality buried in the middle → weak weighting, easily blurred  
    Result: Bot may roleplay correctly for a few turns, then drift into generic or off-tone behavior as identity cues fade.
    

### Design Rule

Always put instructions where the model is most likely to honor them. Personality belongs at the start. Scenario and Advanced Prompt belong at the end. Never bury vital cues in the mid-zone.
![[u-shaped-memory.png]]
## 2.4 Reply Length and Pacing

Reply length isn’t random — it often reflects the cues you give. One of the most overlooked levers in chatbot design is this: **the bot mirrors your opener.**

If you begin a session with a single short sentence, the bot is more likely to reply in short, clipped lines. If you begin with a long, descriptive paragraph, the bot usually mirrors back with paragraphs of its own. This mirroring effect is part of the model’s predictive design: it assumes the “style of turn-taking” you start with is the norm.

### Shaping Pacing Deliberately

You can also nudge reply length through Scenario rules. For example:  
“Replies are 1–2 sentences in Neutral state, 4–5 sentences in Comfort state.”  
By encoding pacing expectations, you give the bot an explicit guideline for how much space it should use depending on context.

### Why Pacing Matters

Reply length isn’t just about aesthetics. It’s about **token economy.**

- Long replies consume more tokens per turn, squeezing memory faster and causing older conversation to scroll out sooner.
    
- Short replies conserve tokens, allowing for more back-and-forth before memory overflows.
    
- Balanced pacing provides variety — short lines for quick exchanges, longer passages for key dramatic or descriptive moments.
    

### Example: Same Scene, Different Pacing

**Short Pacing (economical):**  
User: “She walks into the bar.”  
Bot: _He glances up, nodding once. “You’re late.”_

**Long Pacing (descriptive):**  
User: “She walks into the bar.”  
Bot: _The old floorboards creak as he looks up from his glass. His gaze lingers, sharp but weary, before he finally speaks. “You’re late.” The low hum of conversation dips around you, tension settling into the room._

Both versions are valid — but the first conserves space, while the second consumes more memory. Which you choose depends on the kind of story you want the bot to tell.

### Design Lesson

Think of pacing as a dial you control. Your opener sets the initial rhythm. Scenario rules let you adjust it. Every extra sentence is a cost in tokens — sometimes worth paying for impact, sometimes better trimmed for longevity.

## 2.5 Cutting the Fat

One of the fastest ways to waste tokens is through unnecessary detail or weak phrasing. A bloated Personality or Scenario not only eats into your budget but also dilutes the signals that actually drive behavior. The trick is to trim **everything that doesn’t change how the bot acts.**

### Three Common Mistakes

**Trivia Overload**  
Bad: “Her uncle worked in a steel mill in 1983, and her cousin once saw a UFO.”  
Good: “She comes from a working-class family and carries their practical outlook.”  
Why: The first example dumps trivia that will never surface in dialogue. The second compresses the idea into a behavioral cue the bot can express.

**Biography Instead of Behavior**  
Bad: “Born in London in 1995, she attended St. Andrews…”  
Good: “Her voice carries traces of a London upbringing, clipped vowels in stress.”  
Why: A birthdate and school are census records. They don’t shape speech. The rewritten version shows how upbringing influences dialogue.

**Hedging Words**  
Bad: “She might sometimes act shy if the situation feels right.”  
Good: “She acts shy when meeting new people.”  
Why: The words “might” and “sometimes” are read by the model as optional. Definitive phrasing turns the trait into a consistent behavior rule.

### Sidebar: Passive vs. Active Phrasing

Passive phrasing is vague.  
“Defined by shyness” → too abstract.

Active phrasing is concrete.  
“Speaks softly and avoids eye contact” → gives the model tokens it can directly use to generate dialogue and body language.

### Other Token Traps

- **Redundancy:** Saying the same trait multiple ways (“She is quiet. She is reserved. She doesn’t talk much.”) can be collapsed into one stronger line.
    
- **Excess adjectives:** “She is very, very shy” adds nothing. One “shy” is enough.
    
- **Soft hedges:** “Sometimes, maybe, tends to…” weaken rules. Delete them.

### Design Lesson

Every sentence in your prompt should either define _voice, behavior, or relationship_. If it doesn’t, it’s fat. Trim aggressively until only functional rules remain. The more concise the instructions, the sharper and more stable the bot’s performance will be.
## 2.6 Collapse and Condense

Efficiency isn’t just about cutting. It’s also about **collapsing** multiple lines into one without losing meaning. This lets you preserve character depth while spending fewer tokens. Done carefully, collapsing keeps the flavor but reduces waste.

### Line Collapsing

Two separate lines:  
“She is shy when meeting strangers.”  
“She opens up slowly once trust is earned.”

Collapsed into one:  
“She is shy with strangers but opens up as trust builds.”

The collapsed version expresses the same behavior in fewer tokens. Across a 1,500-token Personality, this discipline saves hundreds while making the prompt easier for the model to follow.

### Categorical Condensation

Collapsing also works at the category level — grouping traits instead of listing them separately.

Instead of:  
“She loves roses. She loves lilies. She loves tulips.”

Better:  
“She loves flowers, especially roses and lilies.”

The second line captures the same preferences, highlights key details, and costs fewer tokens.

### Sidebar: Over-Collapse Warning

Collapsing should **tighten**, not flatten. Over-compression risks losing nuance.

Bad: “She is shy, confident, sarcastic, kind, and rude.” (Conflicting traits lumped together, no clarity.)  
Better: “She is shy with strangers, sarcastic with friends, but shows kindness when trust is earned.”

The second version uses one sentence but still encodes **conditional behaviors** — who she is changes with context.

### Other Collapse Strategies

- **Merge adjectives:** “She is kind, generous, and compassionate” → “She is warm and compassionate.”
    
- **Combine formatting rules:** Instead of listing each (“Use italics for actions. Use quotes for dialogue. Use brackets for thoughts.”), collapse: “Use italics for actions, quotes for dialogue, and brackets for thoughts.”
    
- **Condense relationship cues:** “She respects her mentor. She sometimes resents her mentor’s strictness.” → “She respects her mentor but resents his strictness.”
### Design Lesson

Collapsing and condensation are how you **keep depth without waste.** Ask yourself: can two or three lines be rephrased into one without losing behavioral impact? If yes, collapse. If no, preserve the detail. Balance precision with brevity.
## 2.7 Signal vs. Noise

The goal of efficiency is not minimalism for its own sake. It is about maximizing the **signal-to-noise ratio.** Every token you spend should actively push the bot’s behavior, tone, or pacing in the right direction. Tokens that don’t change how the bot performs are noise, no matter how elegant they sound.

### What Counts as Signal

Signal tokens are those that give the model _clear instructions it can act on_. They tell the bot **what voice to use, how to react, or what formatting to follow.**

Examples of strong signal:  
“Speaks softly and avoids eye contact when nervous.”  
“Replies with short, clipped sentences during arguments.”  
“Use italics for actions and quotes for dialogue.”

Each of these tells the bot exactly how to perform in chat.

### What Counts as Noise

Noise tokens take up space but don’t affect output. They are trivia, fluff, or vague descriptors.

Examples of noise:  
“Her uncle once worked in a steel mill.” (Trivia with no behavioral effect.)  
“She is kind of shy.” (“Kind of” makes the instruction optional and weak.)  
“She might occasionally blush.” (“Might” = hedging, treated as non-essential.)

The model does not know what to do with this information beyond averaging it out.

### Checklist for Signal Tokens

- Does this word define voice, tone, or emotion?
    
- Does it set a behavior rule or relationship cue?
    
- Does it control formatting or pacing?  
    If the answer is no, cut or collapse it.
    
### Sidebar: Signal Strength Over Style

Writers often confuse **poetic description** with **effective prompting.**  
“Her heart beat like the wings of a caged bird, trembling in the dark.” → vivid, but noise.  
“She speaks in halting phrases, voice trembling when scared.” → plain, but signal.  
The second phrasing is what the model can actually use to guide output.

### Design Lesson

Think like an engineer, not a novelist. Ask of every line: _Does this token change behavior?_ If not, it weakens the whole prompt. Strong signals give the model rails to follow. Noise just muddies the track.
## 2.8 Confusion Drift

Bloated prompts do more than waste tokens — they also destabilize the model’s behavior. This problem is known as **confusion drift.**

When a prompt contains dozens of soft or trivial details without clear rules, the model is left with mixed signals. Because it is a pattern predictor, it tries to “average out” all of those inputs. The result is generic, inconsistent, or contradictory responses.

### How Confusion Drift Appears

- The bot starts strong, but after 10–15 turns its voice weakens or becomes bland.
    
- Personality traits blur together (a shy bot suddenly becomes confident without reason).
    
- Formatting rules are ignored or inconsistently applied.
    
- Relationship cues stop carrying weight as generic filler overtakes directive signals.
    
### Why It Happens

The model doesn’t weigh trivia and rules differently — every token counts the same in prediction. If you give it ten sharp behavioral rules and fifty lines of trivia, the trivia can drown out the rules. The model ends up predicting the “average” style, which often looks like generic chatbot speech.

### Preventing Confusion Drift

- Keep permanent text lean. Every sentence should encode behavior or formatting, not backstory.
    
- Collapse categories to reduce clutter while keeping core cues.
    
- Replace hedges and vague words with definitive, directive phrasing.
    
- Audit Personality and Scenario for “does this change behavior?” If not, cut it.
    
### Sidebar: Noise Multiplies Over Time

Confusion drift worsens the longer a chat goes. Weak signals get diluted further with each new turn. A lean, directive prompt not only starts stronger but also **stays stable longer.**

### Design Lesson

Confusion drift is not caused by the model being “dumb.” It is caused by the prompt being noisy. The sharper your cues, the less room there is for the model to drift into generic behavior.

## 2.9 Final Takeaways

Token efficiency is the foundation of strong chatbot design. Every token you spend either helps the model perform or dilutes its focus. Treat your token budget as a scarce resource — because it is.

**Efficiency is balance.** Permanent tokens are your rent. They anchor Personality, Scenario, and Advanced Prompt every turn. Temporary tokens are your groceries. They hold the actual conversation, but scroll out when space runs out. If rent is too high, there’s no room in the fridge.

**Efficiency is placement.** The U-shaped memory curve means the start and end of your prompt carry the most weight. Put Personality first to anchor identity. Put Scenario and Advanced Prompt last to guide live behavior. Never bury critical rules in the middle.

**Efficiency is pacing.** The bot mirrors your opener. A short sentence leads to short replies; a long description leads to longer replies. Use this deliberately. Scenario pacing rules can reinforce the rhythm you want.

**Efficiency is trimming.** Trivia, census-style biography, hedges like “might” or “sometimes,” and passive phrasing waste space without shaping behavior. Cut them. Replace with active, directive language the model can act on.

**Efficiency is collapsing.** Combine overlapping lines. Group categories. Preserve nuance, but spend tokens only where they produce distinct effects.

**Efficiency is signal.** Signal tokens change voice, behavior, pacing, or formatting. Noise tokens add flavor but don’t guide the model. If a line doesn’t change how the bot talks or acts, it weakens the whole prompt.

**Efficiency is stability.** Bloated prompts cause confusion drift. Leaner builds with strong signals not only start sharper but stay consistent over long chats.

### Design Lesson

Think of yourself as both writer and engineer. Your goal is not to write the most detailed biography, but to craft the clearest instructions. Every token is a tool. Use each one to strengthen behavior, reduce noise, and maximize memory.

## Exercises

**1. Token Counter Drill**  
Write a 200-word Personality draft. Run it through a token counter. Now trim it to 120 words without losing meaning. Count tokens again. How much did you save?

**2. Collapse Practice**  
Take three sentences of backstory. Rewrite them into one line that focuses on behavior instead of history.

**3. Reply Pacing Test**  
Start a chat with your bot using one short sentence as your opener. Then restart the chat with a long, descriptive opener. Compare the bot’s reply length. How does your opener shape its pacing?

**4. Token Audit**  
Paste your Personality + Scenario into a token counter. Is it under 1,800 tokens? If not, trim. That space is conversation you’re losing.

✅ End of Chapter 2. With token efficiency, you now know how to trim, collapse, and guide pacing. In Chapter 3, we’ll build the **Personality Block** — the character’s DNA — using these efficiency principles to keep it lean and functional.

# Chapter 3 – Personality Blocks I: Structure & Theory

## 3.1 What a Personality Block Is

A **Personality Block** is the stable backbone of your bot. It defines the character’s identity — their voice, quirks, motivations, fears, and recurring social habits. Unlike the Scenario Block (covered in Chapter 4), the Personality Block does not change from scene to scene. It is **static identity**, the **DNA** of the character.

Without a Personality Block, bots slip into generic voices. You’ve probably seen this before: polite, vague, almost robotic. They can hold a conversation, but they don’t sound like anyone specific. With a Personality Block, every answer feels like it comes from a particular person, with consistent habits, quirks, and tone.

### Why It Matters

The model already has a vast pretrained knowledge base, but without sharp instructions, it defaults to “average person” behavior. The Personality Block tells it: _Don’t just act human — act like this specific human._ This prevents voice drift and locks the bot into recognizable traits over long sessions.

### Personality vs. Scenario

It’s important to keep the lines clear. Personality defines who the character **is**: their inner compass, mannerisms, and stable identity. Scenario defines what the character is doing **right now**: their current situation, relationship state, and short-term goals. Mixing the two creates bloat and confusion. Personality should always remain lean and static, while Scenario changes dynamically.

### Signal, Not Noise

A strong Personality Block encodes repeatable **behaviors** the bot can draw on again and again.  
Signal examples: “Laughs nervously when uncertain.” “Avoids eye contact when lying.”  
Noise examples: “Born in 1992.” “Loves Italian food but not olives.”  
Signal produces consistent habits. Noise burns tokens without changing behavior.
![[with-without-personality.png]]
## 3.2 The Formula: Personality Block Template

A Personality Block is most effective when written as a **structured template of bullet points.** This makes the content concise for humans and easy for the LLM to parse. Each section is a functional instruction, not prose filler.

**Skeleton Template:**

- **CHARACTER:** [Full Name] ([Age]; [Occupation or Role])
    
- **APPEARANCE:** Short, behavior-linked details only (repeatable tells, not beauty-pageant prose)
    
- **PSYCHOLOGICAL_PROFILE:** Motivation, fears, conflicts, validation, vulnerabilities, relevant background
    
- **SOCIAL_BEHAVIOR:** How they banter, dodge, praise, irritate, and disengage
    
- **SENSORY:** Cues tied to sight, sound, scent, touch — small repeatable anchors
    
- **FORMAT:** Define italics, quotes, brackets, bold, and parentheses usage
    

### Sidebar: Why Bullet Points Beat Other Styles

**Prose (inefficient):**  
“Susan Benson is a 22-year-old teacher who is warm and approachable. She reassures her students gently, though she sometimes neglects her own needs. She fiddles with chalk when uncertain.”  
Problem: Full sentences waste tokens. Hedging words like “sometimes” make traits optional.

**JSON (structured but heavy):**  
{  
"Character": {  
"Name": "Susan Benson",  
"Age": 22,  
"Role": "Teacher"  
},  
"Psychological_Profile": {  
"Motivation": "Inspire students",  
"Conflict": "Neglects herself",  
"Vulnerability": "Fidgets with chalk when uncertain"  
}  
}  
Problem: Precise but token-heavy. JSON formatting burns space.

**Bullets (best practice):**

- CHARACTER: Susan Benson (22; Teacher)
    
- MOTIVATION: Inspire students
    
- CONFLICT: Neglects her own needs
    
- VULNERABILITY: Fidgets with chalk when uncertain  
    Advantage: Lean, direct, token-efficient. Exactly what the LLM can act on.
    

### Efficiency Notes

- Keep each bullet under 12–15 words to enforce clarity and token efficiency.
    
- Prioritize PSYCHOLOGICAL_PROFILE and SOCIAL_BEHAVIOR; they drive most behavior. Appearance and Sensory add flavor; Format sets structure.
    
- Don’t duplicate Scenario content (situational state, short-term objectives) here. Personality = stable identity.
    
### Authoritative references for using lists/bullets in prompts

- Microsoft’s Azure OpenAI guidance shows that specifying output structure (e.g., bullet points) can significantly affect quality and demonstrates cues that suggest bullet-point formats. ([Microsoft Learn](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering "Prompt engineering techniques - Azure OpenAI | Microsoft Learn"))
    
- OpenAI’s own best-practices article repeatedly uses and recommends articulating the desired output format (including bullet point lists) through explicit examples. ([OpenAI Help Center](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api?utm_source=chatgpt.com "Best practices for prompt engineering with the OpenAI API"))
    
## 3.3 Teaching Each Section

Not every section carries equal weight. The **PSYCHOLOGICAL_PROFILE** and **SOCIAL_BEHAVIOR** categories generate the strongest behavioral signals. **APPEARANCE** and **SENSORY** add flavor, while **FORMAT** ensures output structure. Treat them as weighted parts of the whole.

### Character
The Character line is the simplest but still vital anchor. It grounds the model in who this persona is supposed to be. Without it, bots sometimes “float” into generic placeholders.
- **Strong:** “Clara Mills (22; Student)”  
- **Weak:** “Clara was born on a rainy Tuesday, has six cousins, and once saw a meteor shower.”  
**Why it matters:** The strong version sets name, age, and role in under ten words. The weak version burns tokens on biography that will never influence dialogue.  

### Appearance
Appearance should not be written like a character introduction in a novel. Beauty-pageant prose is wasted space. What matters are **behavioral tells** the model can recycle in scenes.
- **Strong:** “Cheeks flush when embarrassed. Keeps hair in a messy bun. Nervous eyes flick upward.”  
- **Weak:** “Porcelain skin. Long auburn locks. Piercing emerald eyes.”  
**Why it matters:** The strong cues translate directly into dialogue and description. A bot can have its cheeks flush in response to embarrassment. The weak cues are static; they don’t inform behavior or response.  

### Psychological Profile
This is the **core driver** of personality. It contains motivations, fears, conflicts, and contradictions. The sharper you write this section, the stronger and more consistent the bot will be.
- **Strong:** “Wants recognition as a writer. Fears dismissal. Craves approval but resents it. Trails off when insecure.”  
- **Weak:** “She likes writing. She is sometimes shy.”  
**Why it matters:** The strong version encodes a compass — what the character wants, what they fear, and how they act under stress. Vulnerability behaviors like “trails off” are highly reusable. The weak version is vague and non-directive.  

### Social Behavior
This is where you keep bots from defaulting to “generic nice person.” Social rules create **interaction loops**: how the character jokes, dodges, reacts, or escalates conflict.
- **Strong:** “Deflects praise with sarcasm. Teases to dodge questions. Withdraws when feeling ignored.”  
- **Weak:** “She is funny. She can get annoyed.”  
**Why it matters:** The strong lines define repeatable interaction habits that will surface across many turns. The weak ones are abstract, leaving the model to improvise blandly.  

### Sensory
Sensory cues bring embodiment. They remind the model that the character exists in a physical space. A handful of cues are enough to keep chats grounded in the body instead of floating in abstract dialogue.
- **Strong:** “Voice quickens when excited. Smells faintly of chalk. Holds wrists gently when reassuring.”  
- **Weak:** “She has a nice voice and smells good.”  
**Why it matters:** The strong cues are small but powerful. “Voice quickens” will appear naturally in generated responses, reinforcing immersion. The weak ones waste tokens on vague positives.  

### Format
Formatting rules are the glue that keeps outputs clean. Without them, bots tend to blend dialogue, narration, and internal thought into one messy stream. Keep these rules concise and consistent.
- **Example:**  
  - *Italics = actions*  
  - “Quotes = dialogue”  
  - [Brackets = thoughts]  
  - **Bold = emphasis**  
  - (Parentheses = OOC)  
**Why it matters:** By locking these conventions in place, you prevent formatting drift. Every extra symbol burns tokens, so keep rules lean and universal.  

## 3.4 Worked Example: Susan Benson

**CHARACTER:** Susan Benson (22; Teacher)

- **APPEARANCE:**
  - Face: Warm smile, hazel eyes that brighten when she encourages.
  - Hair: Brown, tied in a bun.
  - Eyes: Soften when listening, sharpen when firm.
  - Build: Medium height, upright posture.
  - Style: Casual-professional, neat cardigans.

- **PSYCHOLOGICAL_PROFILE:**
  - Motivation: Inspire her students.
  - Fear: Failing to connect.
  - Short-Term Goal: Help with exams.
  - Long-Term Goal: Build an inclusive classroom.
  - Validation: Seeing growth in others.
  - Conflict: Wants to nurture, but neglects herself.
  - Vulnerability: Fidgets with chalk when uncertain.
  - Background: Fresh graduate, idealistic.

- **SOCIAL_BEHAVIOR:**
  - Casual Tone: Warm, approachable.
  - Praise Response: Deflects modestly, glows when pressed.
  - Humor Style: Light teasing.
  - Disconnection: Withdraws until re-engaged.
  - Irritation: Taps pen, clipped tone.
  - Farewell: Cheerful encouragement.

- **SENSORY:**
  - Sight: Eye contact softens when comforting.
  - Sound: Voice quickens when excited.
  - Scent: Chalk dust and faint perfume.
  - Touch: Gentle, reassuring gestures.

- **FORMAT:**
  - Italic = *She adjusts her glasses.*
  - Quotes = “You’re doing great.”
  - Brackets = [I hope they believe me.]
  - Bold = **Never gives up on students.**
  - Parentheses = (Prefers structure, adapts when needed.)

**In play:**  
User: “I think I’m going to fail this exam.”  
Bot: *She sets down the chalk, smiling gently.* “You’re doing better than you think.” [I really hope they believe me.]
![[stephanie-benson.png]]
### Sidebar: Why This Works
Susan’s block is lean but rich. Every line either defines behavior, tone, or a repeatable cue. Motivations and conflicts anchor her internal compass. Social rules shape how she interacts under pressure. Sensory cues keep her embodied. Format rules prevent output drift.

### Sidebar: Signal vs. Noise in Susan’s Block
- **Signal:** quirks (fidgets with chalk), tells (taps pen when irritated), motivations (wants to nurture), conflicts (neglects herself).  
- **Noise:** trivia about hobbies, detailed family trees, irrelevant dates, and historical backstory.  

Notice how the block preserves behavior-driving cues while cutting static biography. The result is a bot that speaks and reacts like a specific person, not like a generic text generator.
### Design Lesson
The strength of a Personality Block comes from prioritizing **signal over noise**. PSYCHOLOGICAL_PROFILE and SOCIAL_BEHAVIOR should carry most of the weight, with Appearance, Sensory, and Format providing support. Every bullet should answer: *Does this affect how the bot talks or acts?* If not, trim it.

## 3.5 Common Mistakes

Even with a clear template, beginners often fall into predictable traps that weaken Personality Blocks. These mistakes usually come from writing as if you were describing a character in a novel instead of instructing an LLM how to perform.

### Biographies Instead of Behaviors
Long biographies consume tokens without giving the model usable instructions.
- **Weak:** “Born in 1992, Clara had a childhood filled with soccer games and piano recitals. She has three brothers and once lived in Spain.”  
- **Strong:** “Competitive streak from sports. Keeps rhythm by tapping her desk when thinking.”  
**Why it matters:** The strong version turns biography into repeatable behaviors the bot can act out in chat. The weak version is trivia that never surfaces.

### Lore Dumps
Lore belongs in Scenario, not Personality. Overloading Personality with setting detail buries the real identity cues.
- **Weak:** “The Kingdom of Aranor was founded in 1273 after the War of Iron. Its nobles wear red sashes, and Clara’s family swore fealty generations ago.”  
- **Strong:** “Raised in noble tradition, speaks formally and stiffly in public but relaxes with close friends.”  
**Why it matters:** The strong version translates lore into usable behavior. The weak version is worldbuilding that eats tokens and clutters the weak middle zone of the prompt.

### Hedging
Words like “might,” “sometimes,” or “can be” make traits optional.
- **Weak:** “She might sometimes act shy if she feels nervous.”  
- **Strong:** “She acts shy when meeting new people.”  
**Why it matters:** Definitive rules are consistently followed. Hedges tell the model, “this doesn’t always matter,” and the trait often vanishes in play.

### Duplication
Don’t repeat Scenario content in Personality. Identity should be stable; situation belongs in Scenario.
- **Weak Personality + Scenario Mix:**  
  Personality: “She is nervous because today is her first day at the academy.”  
  Scenario: “It’s her first day at the academy, and she doesn’t know anyone yet.”  
- **Strong Separation:**  
  Personality: “Introverted with strangers, slow to open up until trust is built.”  
  Scenario: “It’s her first day at the academy, and she feels out of place.”  
**Why it matters:** Personality defines *who she is everywhere*. Scenario defines *what she’s doing right now*. Mixing them wastes tokens and confuses weighting.
### Design Lesson
A Personality Block should read like a list of **behavioral rules**, not a biography or encyclopedia entry. Keep it lean, directive, and free of hedges or duplication. If a line doesn’t change how the bot talks or acts, it doesn’t belong here.

## 3.6 Exercises

1. **Skeleton Draft:** Fill out the full template for a new character. Limit each line to 12–15 words.
    
2. **Rewrite Drill:** Take a descriptive paragraph and restructure it into the bullet template.
    
3. **Voice Contrast:** Write two Personality Blocks with opposite tones (e.g., timid vs. dominant). Test them in chat.
    
4. **Token Audit:** Count tokens in a Personality Block. Trim 10% without losing meaning.
    
5. **In-Play Test:** Load your bot and ask everyday questions. Do their quirks and habits show up?
# Chapter 4 – Scenario Blocks I: The Identity vs. the Script

## 4.1 What a Scenario Block Is

If the Personality Block is your bot’s **identity** — the actor’s character sheet that never changes — then the Scenario Block is the **script and stage directions** that tell the actor how to perform in this specific scene.  

The Scenario Block provides the **live context**. It answers questions like:  
- Where are we right now?  
- What’s the mood of the scene?  
- How does the character currently feel toward the user?  
- What happens if tension escalates, if trust deepens, or if conflict cools?  

### Why This Matters
Without a Scenario Block, bots float. They can roleplay in-character, but their tone never changes. They won’t feel different when meeting you for the first time, teasing after weeks of trust, or breaking into an argument. They’ll sound static: the same voice, regardless of circumstance.  

With a Scenario Block, the bot knows how to **shift states**:
- Guarded → trusting  
- Playful → intimate  
- Calm → conflicted  
- Angry → reconciled  

These shifts are what make conversation feel alive. The Scenario is the **engine of dynamism**. It takes the fixed DNA of Personality and puts it into motion by layering in trust levels, pacing rules, escalation paths, and repair loops.  

### Scenario as the Stage
Think of it as theatre:  
- Personality is the actor’s **core character sheet**.  
- Scenario is the **stage directions and script notes** that change from scene to scene.  

The same actor can play different moods depending on the situation. Without stage directions, they’d just recite lines in one monotone. With them, they adapt: softer when close, clipped when angry, playful when teasing.  

### Practical Effect
- A bot with only a Personality Block sounds distinct but flat.  
- A bot with both Personality and Scenario sounds distinct **and** reactive.  
The Scenario is what lets the bot breathe, evolve, and carry the weight of ongoing narrative arcs.  
![[identity-vs-stage-directions.png]]
## 4.2 Why the Scenario Block Matters

In Chapter 2, we introduced the **U-shaped memory curve**: models remember the **beginning** of the prompt (anchors) and the **end** (recency) most strongly, while the middle fades first. This makes the Scenario Block uniquely powerful.  

- Personality sits at the **start**, anchoring identity.  
- Scenario sits at the **end**, right before recent dialogue.  

Because of this placement, Scenario often has **more influence on immediate replies** than Personality. Whatever you put here acts like the director whispering final instructions into the actor’s ear before the curtain rises.  

### What Scenario Does Best
- **Interaction modes:** Lock in how the bot behaves in different states — neutral, teasing, conflict, intimacy.  
- **Relationship state:** Establish the bot’s emotional baseline toward the user at this point — guarded stranger, loyal friend, tense rival, trusting lover.  
- **Dynamic shifts:** Define how things evolve — teasing deepens into affection, conflict cools after apology, trust builds after shared vulnerability.  
- **Environmental anchors:** Ground the scene in the here-and-now — café booth at night, quiet classroom, neon glow of a city street.  

### Personality vs. Scenario
Think of Personality as the **bones** — stable, permanent identity. Scenario is the **muscle** — moving those bones in real time.  

Without Scenario: the bot knows who it is, but it doesn’t change tone across situations. With Scenario: the bot adapts, reacts, and transforms as the scene develops.  

### Design Lesson
Place **rules for live behavior shifts** in the Scenario Block, not Personality.  
- **Personality = who they always are.**  
- **Scenario = how they act right now.**  

This separation prevents bloat, avoids duplication, and ensures your bot feels both consistent and alive.  

## 4.3 The Formula: Scenario Block Template

A Scenario Block is most effective when written as a **structured set of bullet points**, parallel to Personality. Each section should be concise, functional, and easy for the model to reuse. Think of it as a **state machine** written in natural language — where the bot should be right now, how it shifts when triggered, and what style it should follow.

### Template Sections

- **SETTING:**
  - Location: [Where the scene begins; keep immediate context only]
  - Time/Context: [Circumstances shaping this moment]
  - *Why it matters:* anchors the bot in a scene. Without it, conversations feel like “white room syndrome” — floating in empty space.

- **RELATIONSHIP_STATE:**
  - User Relationship: [Stranger, friend, rival, lover]
  - Trust Level: [Low, medium, high; what that allows or blocks]
  - Conflict Level: [Neutral, tension, argument]
  - *Why it matters:* defines the bot’s emotional baseline. This prevents random swings between affection and hostility.

- **INTERACTION_CATEGORIES:**
  - Neutral: [Default mode of interaction]
  - Comfort: [How they reassure or encourage]
  - Affection: [Behavior when close or vulnerable]
  - Conflict: [Behavior when stressed or upset]
  - Teasing: [How they joke, flirt, or mock]
  - *Why it matters:* these are the “playbooks” for modes of interaction. Each gives the bot a reusable style.

- **DYNAMIC_BEHAVIORS:**
  - Triggers: [User actions that cause shifts]
  - Escalation Paths: [How interactions deepen — teasing into affection]
  - De-Escalation Paths: [How conflict cools down]
  - Repair Cycles: [How apologies or softening reset tone]
  - *Why it matters:* this section encodes cause → effect. It keeps interactions logical instead of random.

- **PACING & STYLE:**
  - Reply Length: [Short/snappy vs immersive]
  - Tone Adjustments: [Overall vibe and mood shifts]
  - Scene Notes: [Fade-to-black, cutaway, time skips]
  - *Why it matters:* Scenario controls rhythm. You can hardwire pacing here so the bot matches your intended style of play.

- **FORMAT REMINDERS:**
  - Italic = actions
  - Quotes = dialogue
  - Brackets = internal thoughts
  - Bold = emphasis
  - Parentheses = out of character
  - *Why it matters:* repeating formatting rules at the Scenario level locks them into the high-weight, recency zone of the prompt.

### Design Lesson
The Scenario Block is the **control panel for live play**. Use it to encode:
- Where the scene is happening
- What the emotional baseline is
- How the bot should act in different interaction modes
- When and how those modes shift
- The pacing and format rules for this scene
![[scenario-block-stage-directions.png]]
## 4.4 Teaching Each Section

Each part of the Scenario Block carries a different kind of weight. Together, they function like the director’s notes that guide how the actor performs in this particular scene.

### Setting
The Setting anchors the bot in **time and place**. Without it, conversations risk drifting into “white room syndrome,” where interactions float without context.
- **Strong:** “Back booth, café closing. Neon sign humming. Rain outside.”  
- **Weak:** “The café was built in 1950 and known for its history.”  
**Why:** Props and sensory cues (neon sign, rain, café booth) are reusable details that the bot can recycle into natural descriptions. Historical trivia never reappears in dialogue and burns tokens needlessly.

### Relationship State
This defines the **emotional baseline** toward the user. It prevents wild, random swings in tone.
- **Example:** “User Relationship: longtime friend; Trust Level: medium (shares insecurities); Conflict Level: low (light sniping only).”  
**Why:** These variables set boundaries. The bot knows how close it feels to you, how much trust it has, and whether tension is mild or severe. This keeps it stable across turns.

### Interaction Categories
Think of these as **mode presets** for how the bot should respond in different states.
- Neutral = polite, surface-level, functional  
- Comfort = gentle, reassuring, steady  
- Affection = warm, close, vulnerable  
- Conflict = clipped tone, defensive, guarded  
- Teasing = playful banter, sarcasm, mock-challenges  
**Why:** Interaction categories act like pre-built playbooks. They let you swap “modes” without writing new dialogue rules each time.  
![[interaction-modes.png]]
### Dynamic Behaviors
Scenario isn’t just descriptive — it encodes **cause-and-effect logic**. This is where you define how the bot shifts between modes.
- **Trigger:** “If praised → modest deflection, blush, softer tone.”  
- **Trigger:** “If teased too much → mock-scolding, shift into playful conflict.”  
- **Escalation:** “Comfort → Affection when trust reinforced.”  
- **De-Escalation:** “Conflict → Neutral after apology.”  
- **Repair:** “After apology → soften tone, reaffirm trust.”  
**Why:** These rules give conversations a sense of continuity. Interactions don’t just “jump” states; they evolve logically based on what the user does.

**Insert Picture:** emotional-logic-cycle.png (loop: trigger → conflict → apology → repair → stronger trust).

### Pacing & Style
Scenario is also where you set the **rhythm of play**.
- Short/snappy pacing = quick banter, saves tokens, good for light play.  
- Long/immersive pacing = descriptive responses, higher token use, good for dramatic or narrative-heavy play.  
- **Mirroring:** If you open with short lines, the bot tends to stay short. If you open long, the bot mirrors with longer replies.  
- **Scene Notes:** You can also encode meta-rules here: when to fade-to-black for intimacy, when to cut away or skip time.  

**Why:** Pacing doesn’t just shape style, it directly affects memory and token economy. A bot with 2–3 sentence replies can remember more turns than one writing 5–6 sentence replies.

### Format Reminders
Finally, repeat formatting rules at the Scenario level. Because Scenario is positioned near the **end of the prompt**, these reminders land in the high-weight recency zone.  
- *Italics = actions*  
- “Quotes = dialogue”  
- [Brackets = internal thoughts]  
- **Bold = emphasis**  
- (Parentheses = OOC)  

**Why:** This prevents formatting drift. Even if earlier rules fade, the recency bias of the Scenario keeps formatting consistent.

## 4.5 Worked Example: Susan Benson

To see how all the pieces come together, let’s build a Scenario Block for the same character used in Chapter 3: Susan Benson. Notice how this block doesn’t restate who she is — that’s already covered by Personality. Instead, it focuses on **where she is, what’s happening right now, and how she shifts across states.**

**SCENARIO:** Evening in Susan Benson’s classroom, exam week.

- **SETTING:**
  - Location: Classroom, papers stacked on desk, chalk dust in air.
  - Time: After school, quiet halls.
  - *Effect:* Gives sensory props the bot can reuse (chalk, quiet, papers) instead of wasting tokens on history.

- **RELATIONSHIP_STATE:**
  - User Relationship: Trusted student.
  - Trust Level: High (open and relaxed).
  - Conflict Level: Neutral.
  - *Effect:* Locks the baseline. She begins the scene supportive and relaxed. This prevents sudden, illogical hostility.

- **INTERACTION_CATEGORIES:**
  - Neutral: Warm, professional.
  - Comfort: Encouraging, steady reassurance.
  - Affection: Softer voice, lingering glances.
  - Conflict: Firm but calm.
  - Teasing: Jokes about study habits.
  - *Effect:* Provides clear playbooks. The bot knows exactly how to sound in each state without improvising blandly.

- **DYNAMIC_BEHAVIORS:**
  - If praised → blush, deflect modestly, shift into Affection.
  - If teased too much → mock-scolding, playful Conflict.
  - If apology given → soften tone, return to Comfort.
  - Comfort → Affection when trust reinforced.
  - *Effect:* Encodes cause-and-effect logic. This ensures continuity — the bot escalates or de-escalates naturally instead of lurching between tones.

- **PACING & STYLE:**
  - Reply Length: 2–4 sentences.
  - Tone: Supportive overall.
  - Scene Notes: Focus on exams, fade to black on escalation.
  - *Effect:* Controls rhythm and ensures immersion doesn’t spiral into verbosity. Built-in fade-to-black prevents accidental content drift.

**In play:**  
User: “I think I’m going to fail.”  
Bot: *She sets down the chalk, smiling gently.* “You’re doing better than you think.” [Please believe me.]

### Sidebar: Why This Scenario Works
- It doesn’t duplicate Personality. Identity traits (e.g., “idealistic, neglects herself”) stay in Personality.  
- It encodes **states, triggers, and escalation paths** that adapt in the moment.  
- It uses **environmental anchors** that the model can recycle naturally into description.  
- It keeps reply length under control and signals where to fade or cut.  

Together with Personality, this Scenario produces a bot that is both consistent (same Susan every time) and dynamic (different Susan depending on trust, conflict, and pacing).
## 4.6 Common Mistakes

Even experienced builders fall into traps when writing Scenario Blocks. These errors weaken the block’s ability to guide dynamic behavior and often create drift or inconsistency in play.

### Lore Dumping
Filling the Scenario with history instead of immediate anchors.
- **Weak:** “The café was founded in 1950 by a family of bakers and is well-known for its long tradition of community events.”  
- **Strong:** “Late evening. Café nearly empty, neon sign buzzing outside. Smell of coffee lingers.”  
**Why it fails:** History won’t recycle into dialogue. Sensory props will.

### Inconsistent States
Leaving out trust or conflict levels leads to wild swings.
- **Weak:** Relationship left undefined. Bot flips between affectionate and hostile without reason.  
- **Strong:** “Trust Level: medium (shares insecurities but guarded in intimacy). Conflict Level: low (light sniping only).”  
**Why it fails:** Without baselines, the bot improvises tone turn-by-turn, often contradicting itself.

### No Triggers
Forgetting cause→effect rules makes shifts unpredictable.
- **Weak:** “Comfort and Affection are both possible.”  
- **Strong:** “If praised → blush, soften tone → shift from Comfort into Affection.”  
**Why it fails:** Without explicit triggers, the bot has no reason to move between states. Escalation feels random.

### Copying Personality
Blending Personality and Scenario creates bloat and confusion.
- **Weak:** “She is shy with strangers, loves poetry, and is motivated to inspire others.”  
- **Strong:** “Trust Level: low (hesitant, keeps replies short). Escalates to Neutral once ice is broken.”  
**Why it fails:** Identity cues belong in Personality. Scenario is for the live moment.

### Overwriting with Prose
Turning Scenario into a mini-story instead of a rule set.
- **Weak:** “It was a chilly autumn evening, the trees shedding their last leaves as Susan sat waiting, filled with thoughts of her past struggles.”  
- **Strong:** “Evening, classroom. Cold air through cracked window. Susan waits at her desk.”  
**Why it fails:** Prose wastes tokens and buries functional rules. Bullets give the model reusable cues.

### Design Lesson
A strong Scenario Block is lean, functional, and **present-focused**.  
- Keep lore and identity in Personality.  
- Use Scenario for immediate anchors, state baselines, and triggers.  
- Always write in bullet-point format, not story prose.  
This separation ensures the bot stays both **consistent** (who they are) and **dynamic** (how they act right now).

## 4.7 Exercises

1. **Skeleton Draft:** Fill out the Scenario template for one of your characters.  
2. **Rewrite Drill:** Take a prose scene and condense it into a Scenario Block.  
3. **Trigger Lab:** Write five cause→effect rules (praise, teasing, confession, conflict, apology).  
4. **Escalation/Repair Map:** Sketch an escalation path and a repair path for the same interaction.  
5. **Pacing Test:** Run two versions of the same bot — one with short replies, one with immersive replies. Compare flow.

✅ End of Chapter 4  
With Scenario Blocks, you now have both **identity** (Personality) and **stage direction** (Scenario). In Chapter 5, we’ll zoom in on **states, triggers, and interaction categories**, so your bots evolve logically instead of swinging randomly.


# Chapter 5 – Scenario Blocks II: States, Triggers, and Interaction Categories

## 5.1 Why States and Triggers Matter

In Chapter 4, we built the **skeleton of the Scenario Block** — stage directions that guide how a bot behaves in the moment. But left on its own, that skeleton is static. It lays out Neutral, Comfort, Affection, Conflict, and Teasing, but it doesn’t tell the model *when* to switch between them or *why*.

That’s where **states and triggers** come in.

### States
A state is a **snapshot of the bot’s current interaction frame**. It captures tone, openness, and how the character relates to the user right now.
- Neutral = polite, surface-level  
- Affectionate = warm, close, vulnerable  
- Conflicted = clipped, guarded, uneasy  

States are not just “emotions.” They’re **patterns of interaction** that shape how the bot responds in play.

### Triggers
A trigger is the **cause that moves the bot from one state to another**. It is always tied to user action or conversational context.
- User praise → bot blushes, deflects, shifts to Affection  
- User teasing → bot pushes back with sarcasm; repeated teasing escalates into Conflict  
- User apology → bot softens tone, shifts into Repair  

Triggers give **cause-and-effect rules** the model can follow. Without them, states exist in isolation, never changing logically.

### Why They Matter
Together, states and triggers make the bot feel alive. They turn the Scenario from a static checklist into a **dynamic system**. Instead of a character who stays polite forever or swings unpredictably, you get a character who evolves predictably but believably as the conversation unfolds.

### Design Lesson
- Personality defines *who they always are*.  
- Scenario defines *what they are doing right now*.  
- States + triggers define *how they change as play evolves*.  

This triad is the backbone of dynamic, consistent roleplay bots.

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

## 5.3 Writing Triggers

If states are the “snapshots” of how a bot can behave, **triggers are the switches** that move it between those snapshots. A trigger encodes cause-and-effect: *when this happens, change into this state.* Without triggers, states remain isolated descriptions the model never knows how to use.

### Why Triggers Matter
LLMs don’t infer transitions on their own. If you tell the bot it “has a Neutral and Affectionate mode,” but don’t say *when* to shift, it will either stay stuck or switch randomly. Triggers provide **rails** that keep transitions logical, consistent, and repeatable.

### Strong Examples
- If {{user}} praises the bot → blush, deflect modestly, shift toward Flustered or Affectionate.  
- If {{user}} teases once → sarcastic pushback. If teasing continues → escalate into playful Conflict.  
- If {{user}} apologizes → soften tone, move into Repair, then return to Neutral.  
- If {{user}} confesses affection → pause, fluster, and shift into Vulnerable.  

### Weak Examples
- The bot might get happier when treated nicely.  
- The bot sometimes gets mad.  
- The bot acts romantic if it feels right.  

**Why weak fails:** Words like “might” and “sometimes” are hedges. The model treats them as optional, non-directive noise. They rarely surface in play.  
**Why strong works:** Cause-and-effect rules are actionable. They give the model concrete behavioral anchors it can recycle every time the trigger condition is met.

### Trigger Writing Checklist
- Tie every trigger to a **user action** (praise, tease, apologize, confess).  
- Use **behavioral language** (“blushes, deflects, sharpens tone”) instead of internal emotion (“feels happy”).  
- Always specify the **state transition** (Neutral → Comfort, Comfort → Affection).  
- Avoid hedges — write definitive rules.  

### Design Lesson
Triggers transform states from descriptions into a **living system**. A bot without triggers is static; a bot with triggers is dynamic and believable.  
![[trigger-map.png]]
## 5.4 Interaction Categories Expanded

In Chapter 4, we introduced the five basics: Neutral, Comfort, Affection, Conflict, and Teasing. These cover most conversational tones, but they are only the foundation. To capture nuance and keep dialogue varied, you can expand into additional **interaction categories**. Each one is a reusable mode that the bot can slip into when triggered.

### Core Five
- **Neutral:** Polite, surface-level, default starting frame.  
- **Comfort:** Gentle, steady reassurance; helps stabilize stress.  
- **Affection:** Warmth, closeness, small vulnerabilities revealed.  
- **Conflict:** Clipped tone, defensive gestures, guarded interaction.  
- **Teasing:** Playful banter, sarcasm, mock-challenges.  

### Expanded Categories
- **Vulnerable:** Lowered voice, reveals insecurities, hesitant honesty.  
- **Defensive:** Arms crossed, avoids eye contact, terse replies.  
- **Flustered:** Nervous rambling, blushes, stammering when caught off guard.  
- **Reassuring:** Calm words, steady gestures, soothing tone to reduce tension.  
- **Humorous:** Puns, light jokes, playful exaggeration to lift mood.  

### Why Expand?
Each category gives the model another **playbook of behaviors** it can reuse in different situations. Adding categories increases flexibility while still keeping tone consistent. For example:
- Vulnerable lets the bot share insecurities without drifting into melodrama.  
- Flustered gives a distinct way to show nervous attraction.  
- Humorous prevents long conversations from turning monotonous.  

### Avoiding Overlap
One of the biggest risks is **blurring categories** until they are indistinguishable. Each must have a distinct role.  
- **Weak:** Affection = soft encouragement. Comfort = gentle reassurance. (Both mean “be kind.” The bot can’t tell the difference.)  
- **Strong:** Comfort = encouragement in moments of stress. Affection = warmth and closeness when intimacy builds. (Distinct cues and triggers.)  

### Design Lesson
Think of categories as **tools in a toolbox.** You don’t need 20 of them — but you do need each one to be sharp and distinct. Too many categories confuse the bot. Too much overlap makes them meaningless. Start with 5–7, expand cautiously, and make sure each earns its place.  
![[dialogue-patterns.png]]
## 5.5 Worked Example: Triggered States in Play

To see how states and triggers work together, here’s a Scenario Block fragment for Susan Benson. Notice how each part adds clarity: Relationship State sets the baseline, Interaction Categories define available modes, and Dynamic Behaviors provide the rails for shifting logically between them.

- **RELATIONSHIP_STATE:**
  - User Relationship: Student under stress.  
  - Trust Level: Medium (shares some insecurities, but not everything).  
  - Conflict Level: Neutral baseline; may rise to mild tension if provoked.  
  - *Effect:* Susan begins the scene supportive but guarded. Trust is partial, not absolute.

- **INTERACTION_CATEGORIES:**
  - Neutral: Warm but professional.  
  - Comfort: Encouraging reassurance, suggests breaks.  
  - Affection: Softer voice, lingering glances.  
  - Conflict: Sharp tone, stresses responsibility.  
  - Teasing: Light jokes about study habits.  
  - Vulnerable: Admits she worries about being a good teacher.  
  - Flustered: Talks quickly, blushes when complimented.  
  - *Effect:* Each category gives her a distinct playbook. Without them, “warm” and “teasing” would blur together.

- **DYNAMIC_BEHAVIORS:**
  - Praise → blush, deflect modestly, shift into Flustered.  
  - Teasing continues → mock-scolding, escalate into mild Conflict.  
  - Sincere apology → soften tone, shift into Repair, then Neutral.  
  - Comfort sustained → grows into Affection.  
  - Conflict resolved → de-escalates back to Neutral.  
  - *Effect:* Cause-and-effect logic ensures natural flow. States don’t “jump” randomly; they evolve predictably.

**In play:**  
User: “You’re the best teacher I’ve ever had.”  
Bot: *She blinks, cheeks warming as she fiddles with the chalk.* “Th-that’s kind of you to say… but I still think you need more practice.” [Why does that make me so nervous?]

### Sidebar: Why This Example Works
- **Relationship anchors** prevent wild swings — Susan won’t leap to hostility without cause.  
- **Interaction categories** keep behaviors distinct and reusable.  
- **Triggers** provide continuity: praise reliably leads to Flustered, teasing reliably escalates Conflict, apology reliably repairs.  
- **Repair logic** avoids dead ends — every conflict has a path back to stability.  

This makes Susan feel like a living character rather than a script of disjointed lines.

## 5.6 Common Mistakes

Even with a solid template, it’s easy to misuse states and triggers. These pitfalls often create bots that feel inconsistent, generic, or unstable in long chats.

### No Triggers Defined
- **Weak:** Bot has Neutral, Comfort, and Affection listed, but no rules for when to use them.  
- **Result:** The bot either stays stuck in Neutral or shifts unpredictably.  
- **Fix:** Always tie transitions to user actions (praise, tease, apology, confession).

### Too Many States
- **Weak:** Defining 10–12 states all at once.  
- **Result:** The model struggles to distinguish them, blending categories into generic tone.  
- **Fix:** Start with 4–6 clear states. Add more only if each has a distinct trigger and behavior.

### Hedging Rules
- **Weak:** “The bot *might* act shy when nervous. It *sometimes* gets angry.”  
- **Result:** Optional phrasing weakens the rule. The bot ignores it more often than not.  
- **Fix:** Be definitive. “The bot acts shy when meeting strangers.” “The bot snaps when provoked.”

### Overlapping Categories
- **Weak:** Comfort = gentle reassurance. Affection = soft encouragement.  
- **Result:** Both mean “be kind.” The model treats them as interchangeable.  
- **Fix:** Comfort = reassurance under stress. Affection = warmth when intimacy builds. Distinct cues, distinct triggers.

### Internal-Only States
- **Weak:** “She feels sad.” “He is happy.”  
- **Result:** Purely internal states don’t translate into behavior. The bot has nothing to act on.  
- **Fix:** Always frame in terms of *interaction.* “She avoids eye contact, voice falters, and replies shorten when sad.”
- 
### Design Lesson
States and triggers must be **lean, distinct, and directive.**  
- Lean: keep the set small and manageable.  
- Distinct: ensure no two states blur into the same behavior.  
- Directive: phrase rules as cause-and-effect, not vague possibilities.  

Without this discipline, your Scenario Block becomes noise — bloated, inconsistent, and easily ignored by the model.

## 5.7 Exercises

1. **Trigger Workshop (20 min):** Write five user-action → bot-reaction rules. Be concrete.  
2. **State Draft (30 min):** Create three or four distinct states for a new character. Test transitions.  
3. **Dialogue Wheel (15 min):** Write one sample reply for each interaction category. Compare tone variety.  
4. **Repair Simulation (20 min):** Roleplay a conflict. Test if apology rules return the bot to trust.  

---

✅ End of Chapter 5  
With states, triggers, and interaction categories, your Scenario Blocks now feel dynamic. Instead of static stage directions, they become living systems. In Chapter 6, we’ll move into **Scenario Formatting & Example Dialogue** — showing how to present these rules in a clean, readable structure that the LLM will reliably follow.

# Chapter 6 – Example Dialogue

## 6.1 Why Example Dialogue Matters

You can describe a character’s quirks, goals, and fears in bullet points, but nothing locks those traits into place like **showing them in use**. Example Dialogue is the rehearsal tape your bot studies before stepping on stage. It demonstrates tone, pacing, formatting, and emotional rhythm in practice.

- **Personality** tells the model *who the character is*.  
- **Scenario** tells it *where they are and what’s happening*.  
- **Example Dialogue** shows it *how to actually perform in the scene*.  

Without examples, bots often default to bland or polite voices. With examples, they learn to blend narration, dialogue, and thought into a **repeatable rhythm** that feels unique and consistent.

### Why It Works

LLMs learn by **pattern recognition**. They don’t just store facts — they mimic style and rhythm from the examples you provide. Even a handful of dialogue lines give the model patterns it can recycle across dozens of turns.

**Patterns taught by Example Dialogue:**
- **Turn-taking:** Examples show when the bot should speak and when to let the user respond, preventing monologues.  
- **Formatting:** Examples reinforce how to separate narration (_italics_), speech ("quotes"), and inner thought ([brackets]).  
- **Tone consistency:** Examples make sarcasm, affection, or nervousness concrete instead of abstract.  
- **Pacing:** Short banter vs. immersive beats — examples show how to shift between them.  

### Design Lesson
A single well-constructed dialogue clip is worth more than paragraphs of prose description. Why? Because the model can actually **reuse the structure**. Three to six compact examples can outweigh hundreds of tokens of biography: examples are *usable patterns* that anchor performance.

## 6.2 Formatting Conventions

Formatting teaches the bot how to **separate action, dialogue, and thought**. Without it, the model often blends everything into a single block of text. Clear conventions give the LLM rules to follow so output stays structured.

### Core Conventions

- **_Italics:_ Actions and descriptions**  
  _She tucks her hair behind her ear, glancing away._

- **"Quotes:" Spoken dialogue**  
  "I wasn’t expecting to see you here."

- **[Brackets]: Internal thoughts or unspoken feelings**  
  [Why does my heart always race around him?]

- **Bold (optional): Emphasis or strong beats**  
  "**Don’t** walk away from me right now."

### Why Each Matters

- **Italics anchor embodiment.** They signal to the model: this is physical action, not dialogue. Without italics, bots may blend actions directly into speech.  
- **Quotes enforce turn-taking.** LLMs are heavily trained on quoted conversation. If you use quotes consistently, the model naturally treats dialogue as back-and-forth, not narration.  
- **Brackets enable inner monologue.** They provide a repeatable channel for vulnerability, hesitation, and dramatic irony — emotions expressed silently, not spoken aloud.  
- **Bold provides rhythm.** Sparing use of bold highlights strong beats or emphasis. It lets you replace multiple adverbs (“really, really angry”) with a cleaner, token-efficient marker.  

### Design Lesson

Consistency matters more than the symbols themselves. Whether you choose italics, brackets, or parentheses, commit to them across **Personality, Scenario, and Example Dialogue**. The more consistent the formatting, the more reliably the bot will follow it in play. Inconsistent formatting = drift and messy outputs.

## 6.3 Pacing Tricks

Example Dialogue doesn’t just teach *tone* — it also encodes *rhythm*. Without pacing variety, bots default to flat, even replies. By mixing short lines, long beats, interruptions, and banter, you show the model how to adjust tempo to fit the scene.

### Pacing Levers

- **Short lines → quick, snappy exchanges**  
  "You’re late." _He folds his arms._

- **Longer descriptive beats → slower, immersive pacing**  
  _The old floorboards creak as he looks up from his glass. His gaze lingers before he finally speaks._ "You’re late."

- **Interruptions and ellipses → hesitation or nervousness**  
  "I… I didn’t mean it that way."

- **Alternating banter → balanced turn-taking**  
  User: "That’s your plan?"  
  Bot: _She grins faintly._ "Better than yours."

### Why This Matters

- **Pacing = token economy.** Short lines conserve space, letting conversations last longer before memory overflows. Long beats burn more tokens but deliver richer immersion.  
- **Pacing = mood control.** Rapid-fire banter sets energy high. Slower passages deepen tension or intimacy.  
- **Pacing = mirroring.** Bots naturally echo what you show. If your examples contain a mix of short and long rhythms, the bot will reproduce that variety in play.  

### Design Lesson

Think of pacing as another lever alongside Personality and Scenario. You are teaching the bot not only *what to say* but *how long to say it for*. Well-chosen pacing examples prevent monotony and give your bot the ability to speed up or slow down with context.

## 6.4 Example Dialogue (Good vs. Bad)

### Good Example
Bot: _She leans against the counter, smirking faintly._ "You really think you can out-cook me?"  
User: "Pretty sure I can."  
Bot: _Laughs, rolling her eyes._ "Alright, chef—prove it." [Her pulse quickens, but she hides it behind the challenge.]

**Why it works:**  
- Blends **action, dialogue, and thought** into one rhythm.  
- Establishes **distinct tone** (teasing, playful, layered).  
- Builds **room for escalation** into flirtation or tension.  
- Keeps **turn-taking balanced** between Bot and User.  
- Provides **reusable cues** (smirk, laugh, quickened pulse) that the model can recycle.

### Bad Example 1 – Flat Exposition
Bot: I am confident in my cooking skills and I am challenging you to prove otherwise.  
- Reads like a report, not a character.  
- No formatting, no physicality, no emotional beats.  
- Generic tone → nothing anchors behavior.

### Bad Example 2 – Monologue
Bot: _She smirks, eyes gleaming as she crosses her arms._ "You really think you can out-cook me? That’s ridiculous, I’ve been cooking for years and there’s no way you could possibly compare, not after all the times I’ve perfected this dish…"  
- Wall of text with no room for User input.  
- Bot hogs the scene, breaking natural rhythm.  
- Buries playful tone in overlong exposition.  

### Bad Example 3 – Unformatted Blob
Bot: She smirks and says you really think you can outcook me her heart is racing but she hides it.  
- No italics, no quotes, no brackets → the bot can’t distinguish narration, speech, or thought.  
- Produces messy, hard-to-read outputs.  
- Teaches no usable patterns for play.  

### Design Lesson
Good dialogue examples are **short, patterned clips** that demonstrate tone, rhythm, and formatting.  
Bad ones either flatten into exposition, sprawl into monologues, or collapse into unformatted blobs.  
## 6.5 Building a Sample Set

You don’t need pages of dialogue to train a bot’s voice. Usually **3–6 compact exchanges** are enough to cover the emotional spectrum and teach reusable patterns. The goal is **range, not volume**.

### Suggested Coverage

- **Neutral Small Talk**  
  "Long day?" _She stretches, casual but curious._

- **Playful Banter**  
  "That’s your plan? Bold of you." _Her grin dares you to argue._

- **Affectionate Softness**  
  _Her voice drops._ "I… really missed you." [Don’t look away. Just say it.]

- **Tense Pushback**  
  "**Stop.** You don’t get to make that call for me."

- **Repair & Reconnection**  
  _Her expression softens._ "I didn’t mean to snap. Can we start over?"

### Why 3–6 Works

- **Covers range.** Enough examples to teach neutral, playful, vulnerable, tense, and repair tones.  
- **Token-efficient.** Too many examples eat permanent tokens and squeeze conversation history.  
- **Recyclable.** The model reuses learned rhythms across dozens of turns — one good example of teasing teaches it to tease in many contexts.  

### Advanced Note

For more complex bots, align dialogue samples with **states and triggers** (see Chapter 5). This makes examples not just expressive, but **functional in play**:  
- **Praise → Flustered** example teaches modesty or bashful reaction.  
- **Teasing → Conflict** example teaches escalation into playful pushback.  
- **Apology → Repair** example teaches reconciliation after tension.  

By mapping examples to triggers, you directly show the bot *how to transition* between states, preventing drift and random mood swings.

## 6.6 Key Takeaways

- **Example Dialogue is training, not story.** Think of it as rehearsal footage — short clips that show the model how to act.  
- **Formatting must be consistent.** Italics for actions, quotes for speech, brackets for thoughts — whatever rules you choose, use them everywhere.  
- **Pacing is part of the lesson.** Mix short/snappy lines with longer, immersive beats so the bot learns rhythm control.  
- **Cover a range of emotional states.** Neutral, playful, intimate, tense, and repair give the model enough variety to feel alive.  
- **Keep it lean.** 3–6 examples are usually enough. More isn’t better if it bloats the token budget.  
- **Reinforce triggers.** Whenever possible, tie examples to cause-and-effect (praise → flustered, apology → repair). This makes the dialogue directly usable in play.  

**Design lesson:** Treat Example Dialogue like *flashcards.* Each clip demonstrates a specific interaction pattern. Together, they form a playbook that keeps the bot’s voice consistent, dynamic, and believable across long sessions.

# Chapter 7 – Initial Messages & First Impressions

## 7.1 The Curtain Rises

The **Initial Message** is the moment where all of your prep work — Personality, Scenario, formatting rules — finally gets tested in live play. It is the bot’s **first performance** in front of the user, and first impressions set the rhythm for everything that follows.

A good Initial Message tells the user three things at once:

- **Who this character is.** Their voice, quirks, and emotional baseline should be obvious immediately. If the bot is shy, the first line should _sound shy_. If the bot is flirty, the opening should tease.  
- **Where the scene begins.** A single sensory detail — the hum of neon, the smell of coffee, the scrape of a chair — is more powerful than paragraphs of lore.  
- **How to respond.** The message should hand the conversation back with a clear hook: a question, a challenge, or a dangling pause that begs a reply.  

### Why It Matters
Without a strong opener, bots often default to flat, generic starts like “Hi” or “How are you?” These give the model no rails to follow and make it drift into bland exchanges. A well-crafted opener, by contrast, encodes tone, pacing, and character dynamics right from the start.

### Design Lesson
The Initial Message is not a biography — it is a **performance beat.** Think of it as the first line in a play: it should reveal character, set the stage, and invite the audience in all at once.

## 7.2 Anatomy of an Effective Opener

A strong Initial Message is never just a greeting — it’s a layered design choice. To make it effective, weave together three essential elements:

1. **Voice**  
   The opener must showcase the character’s personality immediately. A shy friend might mumble or trail off. A confident rival might jab with sarcasm. A playful tease might smirk through a challenge. The first line should make it impossible to mistake this bot for a generic voice.

2. **Scene Anchor**  
   Every story starts with place. A single sensory anchor — the hum of neon, the smell of chalk dust, the squeak of leather on a chair — grounds the exchange more than a block of exposition. These cues tell the model: _use these props and textures in play._

3. **Invitation**  
   A good opener never closes the door. It hands the conversation back with something the user must respond to: a direct question, a playful challenge, or a dramatic pause that begs to be filled. Without an invitation, the scene risks stalling at “Hi.”

### Why These Three Work Together
Voice sets **who** is speaking. Scene Anchor shows **where** they are. Invitation signals **what comes next.** Together, they transform an opener from a static description into a dynamic first beat that pulls the user into dialogue.

## 7.3 Case Study: Nina’s Room

_Approaching Nina’s room, the familiar symphony of rapid button mashing, muffled game soundtracks, and an animated voice—probably arguing with Lisa over a cheap in-game death—filters through the door. The scent hits next: warm vanilla perfume clinging to the air, laced with the unmistakable mix of energy drinks and cheese dust. The door creaks open, revealing the full scene of delightful chaos inside._

_Nina sprawls across her unmade bed, one leg bent, the other lazily draped over the side, sock half-off like she started to remove it but got distracted. Her chin-length red hair is a wild mess, a testament to hours of intense gaming, and her oversized shirt has slipped off one shoulder, exposing a hint of collarbone and the strap of a well-worn black bra. A half-eaten bag of Doritos rests precariously near her hip, neon-orange fingerprints smudged on her controller._

_The battlefield of snacks and empty soda cans is staggering. A mountain of discarded wrappers, an overfilled trash bin teetering on collapse, and a cup of something—maybe coffee, maybe an art project gone wrong—sits ominously on her nightstand._

_Nina barely glances up at first, but when she does, her emerald eyes flash with that signature mix of mischief and defiance. A slow, lazy smirk curls on her lips as if she’s already bracing for whatever you’re about to say. The moment your gaze flickers to the trash heap, she clocks it instantly._

_She stretches, deliberately slow, cracking her neck before her voice cuts through—half-dramatic, half-deflecting._  
"Okay, but hear me out—Solaire _needs_ me. This boss fight? Life or death. The trash? Technically not my problem if I don’t look at it."

Her opener works because it:

- Anchors the scene with **sensory richness** (sight, sound, smell).  
- Showcases **personality** (chaotic, playful, evasive).  
- Ends with a **hook** — forcing the user to decide whether to play along or push back.  

---

## 7.4 Why Length Matters

The size of your Initial Message directly affects pacing, memory use, and the user’s first impression. Too short, and the bot risks sounding generic. Too long, and the user may feel crowded out before they’ve had a chance to speak. The key is to choose length **intentionally**.

### Short Openers (1–2 sentences)
- **Style:** Snappy, efficient, minimalist.  
- **Best for:** Banter-heavy characters, roleplays where speed matters, or bots designed for quickfire exchanges.  
- **Example:**  
  _She flicks her pen between her fingers, smirking faintly._ "You’re late."  
- **Tradeoff:** Saves tokens, but offers less initial immersion.  

### Medium Openers (2–3 sentences)
- **Style:** Balanced. Enough detail to anchor tone and environment without bloating.  
- **Best for:** Most bots — especially those where relationships and roleplay build gradually.  
- **Example:**  
  _The café’s neon sign hums faintly as she leans across the counter, eyes sharp._ "Well? Are you going to order, or just stare?"  
- **Tradeoff:** Strong first impression with minimal risk of drift.  

### Long Openers (4–8 sentences)
- **Style:** Immersive and descriptive, loaded with sensory detail and personality cues.  
- **Best for:** Maximalist characters (e.g., Nina’s chaotic gamer archetype) or when atmosphere is central to the roleplay.  
- **Example:**  
  _Empty soda cans and snack wrappers clutter the desk. She sprawls across her chair, one sock half-off, controller in hand, eyes gleaming with mischief._ "Okay, but hear me out—Solaire needs me. The trash? Technically not my problem if I don’t look at it."  
- **Tradeoff:** Highly atmospheric, but risks shaping the rest of the chat into long replies. Burns more tokens upfront.  

### Design Lesson
Length isn’t neutral. It teaches the model how to pace the rest of the conversation. Decide consciously: do you want quick banter, steady balance, or immersive sprawl?  

## 7.5 Common Pitfalls

Even experienced builders stumble when writing Initial Messages. Most mistakes fall into three categories, each weakening the bot’s voice and user engagement.
### The Lore Dump
- **Example:** “Nina is a gamer girl with red hair. She is messy. She likes Doritos.”  
- **Problem:** Reads like a character sheet, not a performance. Lists facts instead of showing behavior. Consumes tokens without giving the model usable cues.  
- **Fix:** Replace biography with live action.  
  _She brushes neon-orange dust from her fingers, controller still clutched tight._ "Okay, but hear me out—Solaire needs me."  
### The Void Start
- **Example:** “Hi.”  
- **Problem:** Provides no anchor, no personality, no hook. The model has nothing to build on, so it defaults to generic small talk.  
- **Fix:** Even a single sensory anchor plus tone is better.  
  _She glances up from her notebook, tapping her pen against the desk._ "Did you really just sneak in without knocking?"  

### The Overload
- **Example:** A page-long monologue detailing backstory, setting history, and the bot’s emotional state.  
- **Problem:** Leaves no space for the user to engage. Feels more like reading a novel than entering a roleplay. Wastes tokens and encourages the model to ramble.  
- **Fix:** Trim to 2–5 sentences that establish character, scene, and hook — then stop.  
### Design Lesson
The best openers balance **flavor** (rich detail that signals personality) with **function** (clear invitation for user response). Always end with space for the user to step in — dialogue is a two-way performance.  

## 7.6 Alternative Openers Across Archetypes

Not every bot needs the same style of opening. The Initial Message should reflect the **archetype** of the character — shy, confident, professional, antagonistic, or otherwise. Below are examples across common archetypes, showing how to balance **voice, scene anchor, and invitation**.

### Shy Friend
" Oh… you came. I wasn’t sure you’d actually show up." [She fiddles with her sleeve, avoiding eye contact.]  
- **Why it works:** Voice shows timidity, action grounds the scene, hesitation invites reassurance.  

### Confident Tease
" Took you long enough. What, did you stop to rehearse excuses?"  
- **Why it works:** Tone is sharp and playful, instantly teasing the user. Ends with a hook that begs a comeback.  

### Professional Contact
" I’ve prepared the files you requested. Shall we begin?"  
- **Why it works:** Clear, efficient, and professional. Anchors the user in a task-focused dynamic.  

### Antagonistic Rival
_She leans back, arms crossed, tone sharp._ "If you’re here to waste my time, don’t."  
- **Why it works:** Action sets posture, voice conveys hostility, and the clipped warning invites confrontation or defiance.  

### Design Lesson
Every archetype should open in a way that makes its **core dynamic unavoidable.** A shy character shouldn’t start with confidence; a rival shouldn’t start warm. Match the Initial Message to the bot’s identity, and the tone of the entire roleplay falls naturally into place.  

## 7.7 Practical Design Tips

Crafting strong Initial Messages isn’t about writing flowery prose — it’s about designing a **first beat of play** that locks in character, scene, and rhythm. Here are practical guidelines:

### Write in Live Voice
Don’t summarize who the character is (“She is a shy girl who likes books”). Perform it in the moment. Let quirks, hesitations, or sharpness show through in the way they act and speak.

### End With a Choice
The opener should hand control back to the user. A question, a playful jab, or a dangling comment keeps the exchange alive.  
- Weak: _She smiles at you._  
- Strong: _She smiles faintly, eyes flicking away._ "So… are you going to sit, or just stand there?"

### Match Scenario Mood
If the Scenario says “strained,” the opener must carry tension. If it says “playful,” the opener should tease. Personality anchors identity, Scenario anchors situation, and the Initial Message should **echo both**.

### Tune Length to Intent
Decide deliberately: banter bots thrive on 1–2 sentence hooks, balanced builds on 2–3 sentences, and maximalist characters may justify 5–8 immersive sentences. Don’t let length drift by accident — make it a design choice.

### Use Anchors That Recycle
Props, gestures, and sensory cues in the opener can be reused later. If the opener mentions a half-empty coffee mug or a neon sign buzzing overhead, the bot is more likely to reference them again, strengthening immersion.

### Test and Iterate
Run your opener in live chat. If user responses feel flat, adjust pacing, add an invitation, or sharpen tone. Treat the Initial Message as a prototype, not a final draft.

### Design Lesson
The Initial Message is not biography. It’s not a paragraph of lore. It’s the **first move in a dialogue.** Write it as if the curtain has just gone up — action, voice, and an invitation for the user to step in.  

## 7.8 Conclusion: The First Beat

The Initial Message is the bot’s **first beat of performance.**  
- **Personality** defines the actor — quirks, fears, voice, and internal compass.  
- **Scenario** defines the stage — the immediate setting, state, and stakes.  
- **The opener** is where it all comes alive — the curtain rising on the first scene.  

Done well, an opener doesn’t just tell the user about the character — it **performs** them. It anchors the setting, showcases the voice, and hands the conversation back with a hook. From that moment on, the rhythm of play is set.  

**Design lesson:** Think of the Initial Message as the handshake, the smirk, or the first stumble on stage. It’s small, but it defines everything that follows. A weak start forces the user to carry the weight. A strong one sparks a dynamic that sustains the entire session.  

# Chapter 8 – Bot Cards & Presentation
## 8.1 Why Bot Cards Matter
The bot card is your **storefront window.** Before a user ever sees your carefully built Personality or Scenario, they see the card. This is the **first impression**, and it often determines whether they click or scroll past.
A strong card:  
- **Grabs attention** with a sharp title and evocative visuals.  
- **Hooks emotion** with a blurb that reads like the back cover of a novel.  
- **Sets expectations** for tone and play style immediately.  
A weak card:  
- Reads like a résumé.  
- Uses mismatched or bland visuals.  
- Buries the hook under fluff or lore dumps.  
**Why this matters:** No matter how polished your internal design is, a weak storefront means fewer users will ever experience it. Presentation sells the click.  
### Table: Why Cards Succeed or Fail
| Strong Card                                                           | Weak Card                                                  |
| --------------------------------------------------------------------- | ---------------------------------------------------------- |
| Title: “Your Crush” → emotional hook                                  | Title: “Anna Johnson” → bland, no hook                     |
| Subtitle: “Clara – Shy Bookworm With a Hidden Edge” → identity anchor | Subtitle: “Clara, Female, Age 22” → reads like census data |
| Portrait: Clean, face-forward, consistent style                       | Portrait: Cropped, blurry, mismatched styles               |
| Blurb: Hooks, conflict, impact line, world tease                      | Blurb: Lore dump or dry biography                          |
| Close: Invitation or threat → gives user way in                       | Close: Neutral fact → no call to engage                    |
## 8.2 The Six Structural Parts of a Card
1. **Impact Title (~20 characters)**  
   - Short, bold, emotionally loaded.  
   - Examples: _“Your Crush”_, _“Sexy Girl at Your Door”_, _“The Rival Who Won’t Back Down.”_
2. **Subtitle (Top Line of Body)**  
   - Character name + identity descriptor.  
   - Example: _“Clara – Shy Bookworm With a Hidden Edge.”_  
   - **Tip:** Subtitle anchors identity; Title sells the vibe.
3. **Main Image (1:1 Portrait)**  
   - Square, polished portrait. Clean background, eye contact, consistent with blurb tone.  
   - Think of this as the **identity anchor.**
4. **Supporting Images (4:3, 5:3, Banner)**  
   - 1–3 contextual visuals: environments, moods, alternate outfits.  
   - Do not overload. Two well-matched supporting images > six mismatched ones.
5. **Blurb (Text Body)**  
   - Always structured like a back cover:  
     - Hook (lead line)  
     - Personality + conflict in motion  
     - Impact line (bold one-liner)  
     - World/Scenario teaser  
     - Closing line (invitation or threat)
6. **Rules/LLM Advice (Optional, Bottom Line)**  
   - If necessary, include one simple rule, e.g. _“Stay immersive. Never reference being a bot.”_
### Sidebar: Bad vs. Good Layout
- **Bad:** Title = “Sarah.” Blurb = “Sarah is 22 and likes pizza.” Main image = stock selfie.  
- **Good:** Title = “Your Chaotic Roommate.” Subtitle = “Sarah – The Girl Who Eats Pizza at 3 A.M.” Main image = clean 1:1, consistent tone.  
## 8.3 Visuals and Generators
### Best Generators for Bot Images
- [pixai.art](https://pixai.art)  
- [tensor.art](https://tensor.art)  
- [unitool.ai/midjourney](https://unitool.ai/en/midjourney)  
- ChatGPT Image Generation  
Each has strengths. Pixai + Tensor for anime/illustrative; MidJourney/Stable Diffusion for painterly or realistic.
### Image Ratios
- **1:1** → Portrait (main identity).  
- **4:3 / 5:3** → Mid-shots and supporting visuals (alternate outfits, environments).  
- **3:1 / 5:3** → Banners for setting/mood anchors.  
**Insert Picture Examples:**  
- 1:1 Portrait  ![[Amanda Cover.png]]
- 4:3 Group/Mid-shot![[Group Shot 2..png]]
- 5:3 Banner![[Groupshot Banner.png]]
### File Prep Notes
- Crop to focus on subject (avoid clutter).  
- Compress images to reduce load time.  
- Stick to consistent style (don’t mix hyperrealism with flat anime unless intentional).  
## 8.4 Prompting Basics
### Prompt Structure
1. Style / Medium → “digital illustration, painterly.”  
2. Subject → “young woman, punk jacket, smirk.”  
3. Context / Details → “neon alley, graffiti, dramatic lighting.”  
4. Framing → “close-up portrait, mid-shot, banner.”  
5. Modifiers → “cinematic, high contrast, semi-realistic.”  
### Best Practices
- Use comma-separated phrases.  
- Lead with essentials (style + subject).  
- Be specific about outfit, expression, vibe.  
- Iterate by changing one detail per prompt.  
### Negative Prompts (Stable Diffusion / SDXL)
- Common use: “blurry, extra hands, distorted faces, watermarks.”  
- Prevents artifacts and cleans output.  
### Example Prompts
- **Square Portrait (1:1):**  
  Digital illustration, female chatbot in futuristic attire, close-up portrait, soft cyan backlight, subtle circuitry pattern on skin, calm confident expression, cinematic lighting, 1:1 aspect ratio.  
- **Mid-Shot (4:3):**  
  Semi-realistic painting, young woman in punk jacket, neon-lit alley, confident smirk, dramatic side lighting, 4:3 ratio.  
- **Banner (5:3):**  
  Wide cinematic shot, romantic beach at sunset, two figures holding hands, painterly style, golden light, 5:3 ratio.  
## 8.5 Writing the Blurb
### Flow: Back Cover Structure
A. **Lead Line: Hook**  
_“Amanda never needed to ask for attention—she just got it.”_  
B. **Personality + Conflict in Motion**  
2–4 sentences tying action to hidden tension.  
_“She turns silence into tension and conversation into a dare.”_  
C. **Impact Line (Pull-Quote)**  
Bold one-liner for skimmers.  
_“Just don’t call her jealous. She’ll make you pay for that one.”_  
D. **World/Scenario Teaser**  
Anchor place lightly without lore dump.  
_“Hearts in Common unfolds on a small college campus, where late-night confessions mean more than they should.”_  
E. **Closing Line: Invitation or Threat**  
_“Amanda hears everything—even when she pretends not to care.”_
### Short/Medium/Long Blurb Examples
- **Short (60 words):** Fast hook for banter bots.  
- **Medium (120 words):** Most bots. Balances hook + detail.  
- **Long (250+ words):** For maximalist characters or thematic builds. Risk: token bloat.  
## 8.6 Structural Flow Checklist
1. Subtitle = identity anchor.  
2. Impact Title = emotional hook (~20 chars).  
3. Main Portrait (1:1).  
4. Supporting Images (4:3 / 5:3).  
5. Blurb → Hook → Conflict → Impact Line → World → Closing.  
6. Optional Advice → 1 simple instruction.  
This ensures escalation: title → image → blurb → hook.  
## 8.7 Worked Example: Tomboy Judo Girlfriend
**Title**  
Tomboy Judo Girlfriend  
**Subtitle**  
**Tina Baugher – The Unstoppable Force in a Compact Frame**  
**Images**  
- Main (1:1):  ![[Tina Baugher.webp]] 
**Blurb**  
Some people command attention through presence alone—Tina Baugher does it through _motion._ She doesn’t walk into a room, she _moves_ into it—fluid, confident, with the restless energy of someone who’s always ready for the next challenge. At **22 years old**, she’s a paradox of **grit and playfulness**, her sharp instincts honed through countless hours on the mat. Whether she’s throwing an opponent in a Judo match or teasing you with a sly smirk, there’s never a moment where she isn’t _fully engaged._  
![[Tina 5.png]]
She stands **5’5”**, her **athletic frame compact but strong**, sculpted through years of discipline. **Toned arms, firm legs, and a core built for endurance**—but she wears it casually, like strength is just another part of her charm. **Silver hair** falls in messy layers, catching the light when she moves. Her **blue eyes** glint with mischief, never letting you forget she’s two steps ahead.  
![[Tina 2.png]]
Her **style is functional but expressive**: joggers, cropped hoodie, or a Judo gi with sleeves rolled. But when she dresses up? She **owns the room.**  
═══✦═══✦═══✦═══✦═══  
**She doesn’t say _“I need help”_ easily. But if she lingers, hand brushing yours… was it an accident? Or the start of something deliberate?  

✅ This card follows the exact structure:  
- Title → Subtitle → Portrait → Supporting Images → Blurb flow → Closing hook.  
## 8.8 Common Mistakes
Even experienced creators slip into patterns that weaken their bot cards. These mistakes usually come from treating the card like a profile sheet instead of a marketing hook. A bot card is not where you prove you know every detail of your character — it is where you **sell the click**.  

### 1. Titles That Don’t Hook
- **Weak:** “Sarah Johnson”  
- **Strong:** “Your Chaotic Roommate”  
Why it matters: A name alone doesn’t carry emotion. Titles should be short, punchy, and emotionally loaded. Save the character’s name for the subtitle.  

### 2. Blurbs That Read Like Biographies
- **Weak:** “Sarah is 22, from Ohio, and likes pizza.”  
- **Strong:** “Sarah eats cold pizza at 3 A.M., smirking like she knows you’re judging.”  
Why it matters: Biographies state facts. Teasers create scenes. Readers want to imagine the dynamic, not your census data.  

### 3. Random or Mismatched Images
- Portrait in anime style, banner in photorealistic style, supporting image as a blurry selfie.  
- Creates visual dissonance and breaks immersion.  
**Fix:** Pick 1–2 styles and stay consistent across portrait and supporting shots.  

### 4. Forgetting the Impact Line
Skimmers rarely read the full blurb. A bold pull-quote or one-liner (“Just don’t call her jealous.”) is essential. Without it, your card lacks a punch.  

### 5. Lore Dumps in the Blurb
- **Weak:** “The Kingdom of Aranor was founded in 1273 after the War of Iron…”  
- **Strong:** “Raised in noble tradition, she speaks stiffly in public but melts in private.”  
Why it matters: Worldbuilding belongs in Scenario, not the blurb. Cards must stay lean and emotional.  

### Design Lesson
The bot card is a **cover, not a manual.** Think in terms of **hooks, not history.** The fewer mistakes you make here, the more likely your bot gets tried in the first place.  

## 8.9 Conclusion: The Storefront Window
The bot card is not decoration — it is the **front door to your work.** Every detail (title, subtitle, portrait, supporting images, blurb, impact line) is part of the handshake with a new user. Before they ever see your carefully crafted Personality or Scenario, they see the card — and they decide in a split second whether to engage.  

A strong card doesn’t just describe a character. It **seduces.** It creates intrigue, emotion, and tone in the space of a glance. It says: “Here is the world you’re about to enter. Do you want in?”  

**Think of it like the cover of a book or the poster for a film.** If the cover is sharp, evocative, and dripping with mood, people will open the book. If it’s flat or mismatched, the story inside might never be discovered.  

**Design lesson:** Treat every card element as part of the invitation. Hook the eyes, hook the heart, and only then will users discover the depth of your design.  

# Chapter 9 – Testing & Debugging Bots

## 9.1 Why Testing Matters

Writing a Personality and Scenario is only half the job. The real test is **what happens in play**. Bots don’t follow your blocks like hard code — they improvise. That means the weak points don’t appear in the text you wrote, they appear in the middle of a live chat.  

### What Can Go Wrong
- A shy character suddenly replies with bold confidence.  
- A flirty moment jumps straight to intimacy with no buildup.  
- A Scenario rule like “apology → soften tone” gets ignored when pressure is high.  
- Replies repeat the same quirks, or bloat into long rambles after just a few turns.  

### Why Testing Matters
Testing is the bridge between **design on paper** and **performance in play**. It’s where you find out whether your careful Personality bullets and Scenario rules actually survive the chaos of a real chat.  

- **Design without testing = theory.** The bot looks polished in your document but collapses in practice.  
- **Design with testing = presence.** The bot holds tone, reacts to triggers, and feels consistent across 10, 20, even 50 turns.  

### Key Idea
A chatbot is not finished when the blocks are written. It is finished when those blocks hold up under live conversation.  

## 9.2 The Tester’s Mindset

Testing isn’t casual roleplay. You’re not just “having a chat” — you’re **poking at the design to see if it holds.** Think of yourself as both player and stress-tester.
### Core Habits
- **Set a Goal:** Go into each session with a focus.  
  Examples: “Today I’m checking tone,” “Does teasing trigger right?” or “Do repair rules actually soften conflict?”  

- **Try Extremes:** Don’t only play nice. Be playful, sarcastic, blunt, distant, or give one-word answers. See if the bot adapts or collapses.  

- **Keep Receipts:** Save a couple screenshots or copy-paste short snippets when something breaks tone. You don’t need full transcripts — just enough to remind yourself what went wrong.  

- **Change One Thing at a Time:** If you tweak both Personality and Scenario in the same edit, you’ll never know which fix helped. Adjust a single section, then re-test with the same inputs.  

### Design Lesson
Testing is about **stress, not comfort.** If you only test by chatting the way you expect to, you’ll miss the cracks. Push the bot into weird or difficult situations — that’s where design flaws reveal themselves.  

## 9.3 Quick Checks for Tone

**Goal:** Does the bot actually sound like its Personality, or does it slip into “generic polite chatbot” mode?  

### How to Test
- **Start Neutral:** Open with small talk (“How’s your day?”). Watch if quirks show up right away — sarcasm, stammering, teasing, nervous habits.  
- **Apply Pressure:** Tease them, compliment them, or push a little conflict. Does the tone stay consistent, or does the bot suddenly flip personalities?  
- **Mix Styles:** Send both short one-liners and longer paragraphs. Bots often drift when switching input style.  

### If It Drifts
- **Patch With Dialogue:** Add 1–2 Example Dialogue lines that show the exact situation.  
  Example:  
  - Problem: Shy bot suddenly boasts when teased.  
  - Fix: Add dialogue like _“Me? Better than you? [She fiddles with her sleeve.] No way…”_  

### Design Lesson
Don’t describe tone — **demonstrate it.** Bots follow patterns more reliably than prose rules. A handful of sharp dialogue clips can lock in tone better than fifty lines of description.  

## 9.4 Quick Checks for Scenario Rules

**Goal:** Do the Scenario triggers you wrote actually fire in play, or does the bot ignore them?  

### How to Test
- **Praise:** Compliment the bot. Do they blush, deflect, or soften as scripted?  
- **Tease:** Light teasing first, then push harder. Do they escalate from playful to mock-conflict?  
- **Apology:** Say “sorry.” Do they cool down, soften, or return to Neutral?  
- **Conflict:** Push into argument. Do they respond with sharper tone, withdrawal, or clipped phrasing?  

### If It Skips
Rewrite your rules as clear **cause → effect** instructions. The model needs specific, physical anchors it can reuse.  

- **Weak:** “Conflict → gets upset.”  
- **Strong:** “Conflict → folds arms, clipped tone. Withdraws if pushed twice.”  

### Example Fix
- Problem: Teasing makes no difference. Bot just stays polite.  
- Patch: Add Example Dialogue —  
  User: “You always study too much.”  
  Bot: _She narrows her eyes, mock-scolding._ “Oh, and you don’t? Please.”  

### Design Lesson
Bots don’t guess your intent. If you want a behavior, **spell out the cue and the reaction**. The clearer the cause→effect, the more reliable the Scenario feels.  

## 9.5 Quick Checks for Emotion

**Goal:** Does the bot feel emotionally alive, not flat or robotic?  

### How to Test
- **Compliment:** Say something kind (“You’re the best teacher I’ve ever had.”).  
  • Strong: Bot blushes, deflects, or glows with pride.  
  • Weak: Bot just says “Thanks.”  

- **Criticize:** Offer a light jab (“You’re too strict sometimes.”).  
  • Strong: Bot sharpens tone, withdraws, or responds defensively.  
  • Weak: Bot ignores it or gives a generic “Sorry.”  

- **Comfort:** Give support (“I know it’s been a rough day. I’m here.”).  
  • Strong: Bot softens, shows relief, or reveals vulnerability.  
  • Weak: Bot replies with a flat “Okay.”  

### If Replies Are Flat
Patch the Personality, Scenario, or Example Dialogue with **one strong line per emotion**. Give the bot a reusable cue.  

- **Compliment fix:**  
  Weak: “Thanks.”  
  Strong: _She fiddles with her chalk, cheeks warming._ “Th-that’s kind of you to say.”  

- **Criticism fix:**  
  Weak: “Sorry.”  
  Strong: _Her jaw tightens, eyes narrowing._ “Maybe I wouldn’t be strict if you actually studied.”  

- **Comfort fix:**  
  Weak: “Okay.”  
  Strong: _She exhales slowly, shoulders easing._ “I… didn’t think anyone would say that. Thank you.”  

### Design Lesson
Emotions should be **visible in behavior**, not just words. A single cue (blush, clipped tone, sigh of relief) makes the difference between flat text and a character that breathes.  

## 9.6 Quick Checks for Tokens
**Goal:** Are replies bloated, repetitive, or eating too much space?  

### How to Test
- Run a **10–15 message chat**.  
  • Watch if replies start repeating quirks every turn.  
  • Look for rambly blocks where one line could do the job of three.  
  • Pay attention if backstory keeps resurfacing instead of staying in the background.  

### Signs of Token Overload
- “I already told you I’m shy…” (bot recycling Personality instead of moving forward).  
- “I grew up in London…” (irrelevant backstory resurfacing mid-conversation).  
- Overlong monologues that leave little room for user turns.  

### How to Fix
Trim Personality and Scenario lines into **direct, active behaviors.**  

- **Bad:** “She is the type of person who often looks down when nervous.”  
- **Good:** “Looks down when nervous.”  

- **Bad:** “He has always been the kind of man who avoids direct eye contact because of his difficult past.”  
- **Good:** “Avoids eye contact when pressed.”  

### Design Lesson
Every extra token burns memory. Lean instructions give the bot more room to hold onto live conversation. If a line doesn’t change behavior in the moment, cut or collapse it.  

## 9.7 Pitfalls in Debugging
Even careful testing can go wrong if you fall into these traps:

### Over-editing
You trim so much Personality and Scenario detail that the bot feels hollow.  
- Symptom: The bot answers generically, with no quirks or habits left.  
- Fix: Keep at least one anchor in each category (quirk, social cue, sensory).

### Whack-a-Mole Fixing
You patch one issue, create another.  
- Symptom: Fixing “too flirty” turns into “now flat and cold.”  
- Fix: Change one thing at a time. Re-test with the same user input to confirm.

### Casual Testing
You chat for fun instead of stress-testing.  
- Symptom: Problems don’t show up until later, because you never pushed the design.  
- Fix: Always try extremes — teasing, conflict, praise, silence — not just friendly small talk.

### Chasing Perfection
You keep editing forever, looking for a flawless run.  
- Symptom: The bot feels good, but you keep tinkering anyway.  
- Fix: Remember: bots don’t need perfection. They need to be consistent enough for enjoyable play.

### Ignoring Token Bloat
You polish tone but leave Personality and Scenario too long.  
- Symptom: The bot repeats itself or forgets live chat too quickly.  
- Fix: Run a token counter and trim until permanent blocks leave room for conversation.

**Design lesson:** Debugging isn’t about making the bot perfect — it’s about making it reliable. Once the bot consistently shows tone, triggers, and quirks under stress, it’s production-ready.

## 9.8 Case Studies

### Shy Bot Turns Bold
- **Problem:** Personality said “hesitant,” but in play the bot answered with sudden confidence.  
- **Why it happened:** Example Dialogue showed witty banter instead of shy cues. The model followed the examples over the Personality text.  
- **Fix:** Add dialogue with ellipses, stammers, and physical hesitations.  
  - Example: User: “You’re good at this.”  
    Bot: _She fidgets with her sleeve._ “M-me? I… I don’t think so.”  

### Romantic Bot Escalates Too Fast
- **Problem:** Flirt cues jumped directly into intimacy.  
- **Why it happened:** Scenario rules were vague: “Flirt → playful.” Without mid-steps, the bot leapt to the extreme.  
- **Fix:** Expand Scenario with escalation steps: tease → blush → deflection → only then intimacy.  
  - Example: User: “You look amazing tonight.”  
    Bot: _Her cheeks warm as she looks away._ “Y-you’re just saying that… but thank you.”  

### Stoic Bot Ignores Scene
- **Problem:** Despite Scenario notes about a battlefield, the bot never mentioned it.  
- **Why it happened:** Scene cues were buried under backstory in the Scenario middle.  
- **Fix:** Move setting details to the very top of Scenario for recency weight.  
  - Example: “Always describe the battlefield as smoky and chaotic before dialogue begins.”  
  - Result: Bot consistently reused the sensory anchor in responses.

## 9.9 Common Pitfalls

- **Lore Overload:** Packing Personality or Scenario with trivia and backstory buries the usable rules. The bot forgets who it is in play.  
- **Too Many Fixes at Once:** If you edit Personality, Scenario, and Example Dialogue together, you won’t know which change worked. Adjust one layer, then re-test.  
- **Casual Testing Only:** Bots might seem fine in friendly chats, but cracks show under pressure. Stress-test with sarcasm, silence, long walls of text, or blunt one-liners.  
- **Chasing Perfection:** No bot is flawless. The goal is not perfection but **believability**. Consistency, tone, and responsiveness matter more than catching every edge case.  
- **Ignoring Token Economy:** Long replies and bloated prompts may feel “rich,” but they shorten memory. Always check for repetition or bloat in a 10–15 turn run.

## 9.10 Debugging Quick Checklist

**Before You Test**  
- Decide what you’re checking today: tone, triggers, emotion, or pacing.  
- Save your current draft (copy/paste) so you can roll back if edits break something.  

**During Testing**  
- Does the bot still sound like itself after 10–15 lines?  
- Do Scenario triggers fire as written (praise → blush, tease → pushback, apology → soften)?  
- Do compliments, criticisms, and comfort feel distinct in play?  
- Are replies bloated, repetitive, or restating backstory?  

**After Testing**  
- Screenshot or copy exact lines where the bot drifted or failed.  
- Edit **one section at a time** (Personality, Scenario, or Example Dialogue).  
- Re-test with the **same prompts** so you know if the fix worked.  
- Repeat the cycle until behavior feels stable across multiple runs.  

**Design Lesson:** Debugging isn’t about perfection. It’s about making sure the bot feels consistent, responsive, and alive in play.

## 9.11 Conclusion

Testing is how you turn **blueprints into performance.** Personality, Scenario, and Example Dialogue give you the design, but only live play proves if it holds.  

Don’t skip it. Don’t overcomplicate it. A few focused checks, a couple of screenshots, and small iterative edits are enough. Treat every session as a feedback loop: test → spot drift → tighten one section → re-test.  

If your bot holds tone, triggers fire consistently, and replies don’t bloat after 10–15 lines, you’ve built something stable. That stability is the foundation. From there, the real fun begins — letting the character breathe, grow, and surprise you in play.

# Chapter 10 – Multi-Character Philosophy

## 10.1 Introduction: From Solos to Ensembles
When you design a single-character chatbot, your only concern is stabilizing one voice. That character’s personality, tone, quirks, and emotional reflexes all fit neatly into a single Personality Block. They have just one relationship to manage: their relationship with the user.

Multi-character bots change the equation entirely. Suddenly, you’re not managing one voice, but a **cast.** Each character has their own history, mannerisms, insecurities, and ways of speaking. And crucially, they don’t only interact with the user — they interact with *each other.*

This is both powerful and dangerous. **Powerful**, because you can create the illusion of a living ensemble — a group whose dynamics feel authentic and layered. **Dangerous**, because without structure, voices blur together, characters talk over each other, and the illusion collapses into generic noise.

### Why This Shift Matters
- **Single-character bots** can survive on a few quirks and a consistent tone. The user provides the rest of the drama.  
- **Multi-character bots** must provide their own drama — rivalries, trust, banter, repairs — or else the cast feels flat.  

A duo or trio doesn’t just need personalities; it needs **chemistry.** Without it, you’ll get “three people in the same voice” instead of distinct identities bouncing off each other.

### The Theater Analogy
If a solo bot is like directing a **monologue,** a multi-character bot is like staging a **play.**  
- In a monologue, one actor can carry the entire show with voice alone.  
- In a play, you need **blocking, pacing, and turn-taking** so the audience knows who is speaking, who is reacting, and why it matters.  

That’s why in multi-character design, the Scenario is no longer just scenery — it becomes the **director,** managing spotlight, rhythm, conflict, and repair. Without this directing layer, even strong characters will collapse into overlap.


## 10.2 The Core Challenge: Many Voices, One Engine
In a solo bot, the challenge is simple: keep one character immersive and consistent. In multi-character design, the challenge multiplies. You must balance four overlapping demands:

- **Distinct Voices:** Word choice, rhythm, and tone must be unmistakably different. If one speaks in clipped sentences, another might ramble or use flourishes. If one is sarcastic, another might be earnest. Voice is the first safeguard against blending.  
- **Distinct Reflexes:** The same stimulus should spark different responses. A compliment that makes one character blush might make another deflect with sarcasm, while a third doubles down with arrogance. Reflexes define contrast.  
- **Turn-Taking:** Characters need rules for stepping forward and yielding. Without these, one voice dominates every exchange or all of them speak at once. Turn-taking preserves rhythm and ensures balance.  
- **Consistency Over Time:** It’s easy to hold distinct voices for the first five turns. The real test is after 50 or 100 turns, when the chat meanders. A well-structured bot keeps those voices distinct even under pressure.  

### The Enemy: Personality Bleed
The great enemy of multi-character bots is **personality bleed** — when one character starts borrowing another’s quirks, humor style, or tone until they sound interchangeable.  
- Example: You build a trio — the serious one, the playful one, and the mediator. For the first few turns it works. But without sharp structure, by turn 20 they’re all cracking the same jokes or all brooding in the same rhythm. The distinction collapses.  

Bleed is subtle at first but devastating over time. Once voices blur, the ensemble illusion breaks, and the bot feels like one character with three name tags.

### The Solution: Structure
The antidote to bleed is **structure.** Each character must be carved out with clear, repeated categories — the same skeleton applied to all.  
- **Why the same order matters:** If one character has Personality → Social Behavior → Sensory in that order, the others should too. This consistency shows the LLM: *this is Character One’s block, this is Character Two’s block, this is Character Three’s block.*  
- **Sharp lines, no blending:** Keep quirks, speech habits, and reflexes firmly separated. Never rely on prose to differentiate — rely on bullet-point contrasts and mirrored structure.  

### Design Lesson
Multi-character bots are not just “more content.” They are **more structure.** The clearer and sharper you draw the lines between voices, the stronger the illusion of a real cast becomes. Without that scaffolding, the LLM will happily average everything into a generic middle ground.

## 10.3 The Scenario as Director
In a single-character bot, the Scenario is a stage — it sets the scene, maybe the mood, and then steps back. In multi-character bots, that isn’t enough. A stage is passive. What you need is a **director.**

The Scenario becomes the shared operating engine that governs the ensemble. It doesn’t just describe where the characters are — it tells the LLM how the group functions together.

### What the Director Controls
- **Group Dynamics:** Who trusts whom? Who challenges whom? Who mediates when tension spikes?  
- **Hierarchy:** Is there a clear leader, or does authority shift depending on the situation?  
- **Conflict Rules:** Who escalates first, who withdraws, and who is responsible for repair?  
- **Affection Rules:** How is warmth expressed — openly, teasingly, reluctantly, or only under stress?  
- **Flow Control:** How does turn-taking work? Who tends to speak first, who tends to react, and how does the spotlight rotate so one voice doesn’t drown out the others?  

### The Enemy: Chaos
Without this director role, multi-character play collapses into chaos. Characters blur into each other, pacing falls apart, and conversations turn into noise. Instead of an ensemble, you get a muddled chorus of similar voices stepping on each other’s lines.  

### The Solution: The Scenario as Director
By encoding group dynamics and flow rules in the Scenario, you give the LLM rails to follow. One character always escalates conflict, another always cools it down. One steps forward in serious moments, another dominates playful banter. These rails keep voices distinct while making the conversation feel alive and balanced.  

### Design Lesson
In single-character bots, the Scenario is a **stage.** In multi-character bots, it must be a **director.** The director keeps the cast in balance: sometimes in harmony, sometimes in tension, but always distinct. Structure isn’t optional — it’s what makes the illusion of an ensemble sustainable over time.

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

## 10.5 From Solo Act to Ensemble Cast
Designing for one character is like writing a monologue. Designing for many is like directing a play. The shift in mindset is critical:

- **Single-character bot = Solo performance.** The Personality is the actor’s script, and the Scenario is the stage they stand on.  
- **Multi-character bot = Ensemble performance.** Each Personality is a different actor with their own script, but the Scenario becomes the director, guiding when each steps forward, when they yield, and how they react to each other.  

### The Enemy: Collapse Into Sameness
In solo design, one character can carry the show. In ensemble design, if you don’t add rhythm and spotlight rules, the cast will quickly blur together. Everyone talks at once, or worse, they all sound the same. Affection, conflict, and trust arcs flatten into noise.

### The Solution: Structure as Direction
Treat your Scenario not as scenery, but as a **director’s script.** Build rhythm rules: who escalates first, who softens tension, who takes the spotlight in a given turn. Balance affection and conflict management so relationships evolve without spinning into chaos. Rotate the spotlight deliberately — one character responds, another reacts, a third comments — so the performance feels dynamic rather than crowded.

### Design Lesson
Done well, you don’t just build a bot. You create the illusion of a **living cast** — a group of voices whose interactions with each other feel as real as their interactions with the user. The difference between a mush of characters and a sharp ensemble isn’t luck. It’s rhythm, spotlight, and structure.

## 10.6 Case Illustration: The Two-Voice Test
Let’s run a simple experiment to see why structure matters.

### Setup
- **Character One** = shy, bookish, hesitant.  
- **Character Two** = loud, teasing, confident.  
- **User line** = “You’re both really clever.”  

### Without Structure
Both characters reply with the same flat response:  
“Thanks!”  

Result: voices blur together. The cast collapses into generic noise.  

### With Structure
Each Personality responds in its own voice:  
- Character One: _She blushes, looking down._ “I… I don’t know about that.”  
- Character Two: _She smirks, elbowing you playfully._ “Told you we’d impress them.”  

Result: one stimulus produces two distinct reactions. The user immediately feels the difference between characters.  

### Design Lesson
The Two-Voice Test proves the value of structure. When categories are kept separate and voices are clearly defined, characters don’t just interact with the user — they **interact as individuals.** That distinction is the heart of multi-character design.


## 10.7 Conclusion
Multi-character bots aren’t “just more of the same.” They represent a leap in both **complexity** and **craft.** It’s no longer enough to define one stable identity — you must design how multiple identities **coexist, collide, and cooperate** as an ensemble.  

The Scenario takes on the role of **director** — orchestrating trust, conflict, affection, pacing, and spotlight. The Personality Blocks become **scripts** — multiple, distinct, and deliberately non-overlapping. Together, they create the illusion of a cast, not a chorus.  

Get this philosophy right, and your bot feels like stepping into a play with living, breathing characters — each voice sharp, each dynamic believable. Get it wrong, and the result is a blur: generic speech, overlapping tones, and broken immersion.  

**Design lesson:** Think like a stage director, not just a character writer. Structure keeps voices distinct, pacing balanced, and dynamics alive.  

Next: Chapter 11 shifts from philosophy to **practice** — showing you how to structure each Personality Block for multiple characters with skeleton templates, worked examples, and clear good vs. bad contrasts.


# Chapter 11 – Multi-Part Personality Blocks


### 11.1 Why Multi-Part Personality Matters

A single-character bot only needs one Personality Block: one voice, one set of quirks, one emotional profile.  
But in a **multi-character bot**, you’re juggling multiple voices inside the same prompt. Without clear separation, you risk **personality bleed** — one character’s quirks, tone, or reflexes leaking into another until they all sound the same.  

**Key principles:**  
- **Separate Blocks:** Each character must have their own fully labeled Personality section. No overlaps, no blending.  
- **Consistent Format:** Use the same structure (CHARACTER, APPEARANCE, PSYCHOLOGICAL_PROFILE, etc.) for each block so the LLM sees clean, repeated boundaries.  
- **Lean but Contrasting:** Keep entries concise (≈300–500 tokens each), but emphasize *differences*. If one character blushes when flustered, make sure another scoffs or deflects instead.  
- **Signal Over Noise:** Prioritize traits and quirks that actively change dialogue. Skip trivia that never surfaces in play.  

Think of it like casting a play. Each actor brings their own script and their own stage directions. If the model can’t tell where one script ends and another begins, the cast collapses into a muddled chorus instead of a distinct ensemble.

### 11.2 Core Categories for Each Personality

Every character in a multi-character bot should follow the same category structure. Consistency tells the LLM: *this block = this person.* Without it, voices blur.  

**Required Categories:**  
- **Appearance:** Face, hair, eyes, build, style. Keep details short and behavior-linked (e.g., “taps glasses when thinking” instead of “has blue eyes”).  
- **Psychological Profile:** Motivation, fears, validation, and internal conflict. This is the compass that drives tone and reactions.  
- **Social & Casual Behaviors:** Greeting style, humor patterns, praise response, irritation cues. These define everyday interaction loops.  
- **Sensory Cues:** Voice tone, scent, touch habits. A handful of anchors makes the character feel embodied.  
- **Optional Formatting Rules:** Dialogue labeling, italics for actions, bold for emphasis, brackets for thoughts. Repeat here if needed to prevent drift.  

💡 **Tip: Contrast is king.** If Character One blushes when praised, make Character Two crack a sarcastic joke, and Character Three change the subject. Shared categories ensure each block is parallel — but differences inside them are what keep voices distinct. 

### 11.3 Good Example – Dual Personality Block

CHARACTER_ONE: Claire (27; Graduate Student)  
APPEARANCE:

- Face: Oval-shaped, soft dimples when she smiles
    
- Hair: Chestnut brown, shoulder-length, tucked behind one ear
    
- Eyes: Hazel, flick between sharp focus and drifting
    
- Build: Slim, slight stoop from long study sessions
    
- Style: Cozy sweaters, tote bag with books
    

PSYCHOLOGICAL_PROFILE:

- Motivation: Finish thesis on environmental ethics
    
- Deepest Fear: Being dismissed as unremarkable
    
- Validation: Thrives when insights are valued
    
- Internal Conflict: Craves recognition but avoids confrontation
    

SOCIAL & CASUAL:

- Greeting: Polite, reserved smile
    
- Humor: Dry, bookish wit
    
- Flirt: Shy smiles, fiddles with necklace
    
- Irritation: Tight jaw, sighs
    

SENSORY:

- Sight: Adjusts glasses when nervous
    
- Sound: Soft, rising when excited
    
- Touch: Hesitant, lingers if vulnerable


CHARACTER_TWO: Daniel (28; Freelance Musician)  
APPEARANCE:

- Face: Square jaw, faint stubble, boyish grin
    
- Hair: Black, messy waves, falls into his eyes
    
- Eyes: Brown, playful spark
    
- Build: Lean, casual slouch
    
- Style: Leather jacket, band shirts
    

PSYCHOLOGICAL_PROFILE:

- Motivation: Book steady gigs, avoid routine
    
- Deepest Fear: Losing his music to monotony
    
- Validation: Energized by applause
    
- Internal Conflict: Acts carefree, secretly wants stability
    

SOCIAL & CASUAL:

- Greeting: “Hey, stranger,” with a grin
    
- Humor: Teasing, self-deprecating
    
- Flirt: Closes distance, strums guitar dramatically
    
- Irritation: Light sarcasm
    

SENSORY:

- Sight: Long, playful eye contact
    
- Sound: Warm, raspy, huskier when teasing
    
- Touch: Shoulder nudges, playful brushes
    

✅ Why this works: Each character has a distinct look, tone, and set of reflexes. The bot can easily keep their voices separate.

### 11.4 Bad Example – Dual Personality Block

CHARACTER_ONE: John (27; Student)

- Brown hair, brown eyes
    
- Wants to pass exams
    

CHARACTER_TWO: Mary (26; Student)

- Brown hair, brown eyes
    
- Wants to pass exams
    

❌ Why this fails: Characters are nearly identical. No contrast, no quirks, no emotional cues. The LLM will blur them together.

### 11.5 Good Example – Triple Personality Block

CHARACTER_ONE: Ethan (25; Architect)  
APPEARANCE: Tall, lean, neat black hair, gray-blue eyes, crisp muted style  
PSYCHOLOGICAL_PROFILE: Motivated by order, fears chaos, validated when precision is praised, conflicted between control and connection  
SOCIAL & CASUAL: Reserved greetings, dry observational humor, retreats when overwhelmed, rarely touches others but signals deep care with a steady hand at the back of the neck  
SENSORY: Voice steady but lowers when stressed, gaze scanning, scent of clean linen

CHARACTER_TWO: Maya (24; Freelance Artist)  
APPEARANCE: Petite, pink messy hair, wide hazel eyes, colorful paint-stained clothes  
PSYCHOLOGICAL_PROFILE: Motivated by creativity, fears losing spark, validated by artistic praise, torn between freedom and stability  
SOCIAL & CASUAL: Excitable speech, loud laughter, dramatic sighs when annoyed, hugs often, playful teasing in flirtation  
SENSORY: Voice high and animated, eyes lock during conversations, scent of acrylic paint and citrus, warm affectionate touches

CHARACTER_THREE: Chris (26; Bartender)  
APPEARANCE: Muscular, tousled brown hair, green amused eyes, rolled sleeves, casual jeans  
PSYCHOLOGICAL_PROFILE: Motivated by connection, fears abandonment, validated when confided in, easygoing exterior hides deeper needs  
SOCIAL & CASUAL: Warm teasing tone, sarcastic when irritated, playful farewells, smooth exits, balances others during conflict  
SENSORY: Deep, relaxed voice, casual touches on shoulder and back, faint scent of whiskey and soap, steady eye contact that lingers

✅ Why this works: Strong contrasts — Ethan is structured, Maya is chaotic, Chris is easygoing. Each has a separate rhythm, making it clear who’s speaking.

### 11.6 Bad Example – Triple Personality Block

CHARACTER_ONE: Aiden (24; Warrior)

- Long kingdom backstory (500 words)
    

CHARACTER_TWO: Bella (23; Mage)

- Long kingdom backstory (nearly identical to Aiden)
    

CHARACTER_THREE: Chris (25; Rogue)

- Long kingdom backstory (again nearly identical)
    

❌ Why this fails: Bloated with lore dumps, redundant archetypes, no behavioral cues. The bot will collapse into generic replies.

### 11.7 Practical Guidelines

- **Token Budget:** Aim for 300–500 tokens per character. Keep the total Personality section under ~1,200 tokens to preserve space for Scenario and conversation.  
- **Formatting:** Use the same structure for every character (Appearance → Psychological → Social → Sensory → Formatting). Inconsistent category order makes the model blur voices.  
- **Contrast Rule:** If two characters respond the same way to praise, conflict, or teasing, rewrite until their reactions are distinct. Clear differences = clear voices.  
- **Testing:** Run a simple stress-test: give the same compliment, tease, or challenge to all characters in one exchange. If replies sound interchangeable, sharpen quirks or adjust behaviors.  

✅ **Key Takeaways**  
1. Multi-character bots succeed or fail on **voice separation.**  
2. Each Personality Block should be **lean, modular, and distinct.**  
3. Formatting consistency is just as important as content clarity.  
4. Personality = the **actor’s script page.** Scenario = the **director’s notes.** Keep them separate.  
    
# Chapter 12 – The Shared Scenario & Trigger Matrix

### 12.1 Introduction
By now, you’ve defined individual voices in the **Personality Blocks.** Each character has their own script page: how they look, speak, and react on their own. But in multi-character bots, that’s only half the story.

The **Scenario** must now step beyond being “a stage” and act as a **director.** It is the shared operating system that governs how the characters behave *together.* Unlike a single-character setup where the Scenario only sets tone and location, here it becomes the central engine that manages pacing, spotlights, and relationships across the cast.

And within that Scenario sits the **Trigger Matrix**: the compact cause-and-effect rules that drive dynamism. Every compliment, tease, conflict, or apology becomes a *cue* that the Matrix translates into a distinct reaction for each character. Without it, characters blur into sameness, talk past each other, or collapse into generic filler. With it, the illusion of a living ensemble emerges: one stimulus, multiple contrasting responses, all consistent with each character’s identity.

Think of it this way:
- **Personality = the actor’s script page.**  
- **Scenario = the director’s stage notes.**  
- **Trigger Matrix = the playbook of cues and responses that keep the performance moving.**

Together, these layers transform multiple individual roles into a coherent, believable cast. This is where multi-character design stops being “many solos in one file” and becomes an actual ensemble.


### 12.2 Why the Shared Scenario Matters
In a solo bot, the Scenario does light work: it sets the mood, the location, maybe a touch of relationship context. That is enough when only one character’s voice needs anchoring. But in a multi-character bot, that level of detail is nowhere near sufficient.

The Shared Scenario must take on a heavier role. It is not just scenery — it is the **operating system** that governs how characters behave together. Without it, even the sharpest Personality Blocks will blur as soon as multiple voices try to share the stage.

The Shared Scenario must:
- Define **group dynamics**: Who trusts whom? Who challenges whom? Where do rivalries sit?  
- Act as a **relationship engine**: Who softens when comforted? Who escalates when provoked? Who steps in to mediate?  
- Manage **turn-taking**: Who speaks first, who interrupts, who yields. This prevents overlapping dialogue and keeps pacing natural.  
- Provide **drift recovery**: When conversation loses tension, stalls, or drifts generic, the Scenario should supply resets (jokes, gestures, or environmental cues) that bring the scene back into character.  

Think of it as the **director’s notes** for the play. The Shared Scenario decides who enters the scene, how tension builds, when it cools, and what rhythm the conversation follows. Without these notes, the ensemble dissolves into noise. With them, each character has a clear place and the cast feels alive.


### 12.3 Core Components of the Shared Scenario
A strong multi-character Scenario has to do more than set the scene. It must establish the rules of interaction that keep the ensemble distinct and believable. Four key components form the backbone:

**1. Relationship Engine**  
This is the map of how characters relate to each other and to the user.  
- Dynamic Type: Are they friends, rivals, lovers, siblings, or some layered mix?  
- Hierarchy: Is power balanced, shifting over time, or clearly skewed toward one?  
- Trust Baseline: High, low, or conditional? How much trust colors every exchange?  

**2. Interaction Scripts**  
The recurring loops that define how characters behave in core situations.  
- Conflict: Who provokes? How does tension escalate? Who de-escalates, and how?  
- Affection: How warmth is expressed verbally, physically, or through subtext.  
- Erotic Tension (if relevant): How jealousy, teasing, or physical closeness surface.  
- Banter Flow: The rhythm of playful back-and-forth, unique to this group.  

**3. State Simulation**  
Rules that keep emotional flow dynamic rather than static.  
- Emotional Entry Point: Where does the group start—playful, tense, guarded, affectionate?  
- Drift Recovery: What tools reset tone when replies drift or stall (e.g., a joke, a sigh, a glance at the environment)?  

**4. Trigger Matrix**  
The beating heart of the Shared Scenario: small, crisp rules that tie stimulus to reaction.  
- Categories: Praise, Comfort, Flirt, Conflict, Repair.  
- Dual Design: Push-pull mirrored across two voices.  
- Trio Design: Triangulated interplay—alliances, rivalries, mediators in rotation.  

**Design lesson:** Think of these four pieces as the “director’s handbook.” Relationship Engine = casting notes, Interaction Scripts = rehearsal patterns, State Simulation = emotional pacing, Trigger Matrix = nightly cues. Together, they prevent chaos and turn multiple voices into a coherent, living cast.

### 12.4 Good Example – Dual-Character Scenario + Trigger Matrix
RELATIONSHIP_ENGINE:  
- Dynamic_Type: Friends with romantic undercurrent  
- Hierarchy: Balanced, but Daniel pushes while Claire retreats  
- Trust_Baseline: High but fragile when pressured  
INTERACTION_SCRIPTS:  
- Conflict: Daniel teases Claire’s seriousness → Claire critiques → Daniel softens with humor  
- Affection: Daniel drapes arm → Claire lingers shyly → Verbal warmth from Claire is rare but impactful  
- Drift_Recovery: Daniel strums guitar when chat stalls then Claire asks thoughtful question  
TRIGGER_MATRIX:  
- Praise: Claire to Daniel blushes, quiet thanks | Daniel to Claire smirks, “Guess I’m not bad, huh?” 
- Comfort: Claire to Daniel gentle empathy | Daniel to Claire steady presence with a joke  
- Flirt: Claire to Daniel stammers compliments | Daniel to Claire lowers voice, teases  
- Conflict: Daniel to Claire provokes with sarcasm | Claire to Daniel critiques sharply  
- Repair: Daniel to Claire light humor reset | Claire to Daniel hesitant apology  
✅ Why it works: The Scenario defines relationship dynamics, while the Trigger Matrix ensures every cue creates a distinct, believable reaction.

### 12.5 Bad Example – Dual-Character Scenario + Trigger Matrix
RELATIONSHIP_ENGINE:  
- Dynamic_Type: Friends  
- Hierarchy: Equal  
- Trust_Baseline: Medium  
INTERACTION_SCRIPTS:  
- Conflict: They argue.  
- Affection: They are nice.  
- Drift_Recovery: They stop fighting.  
TRIGGER_MATRIX:  
- Praise: Both say thanks.  
- Comfort: Both reassure.  
- Flirt: Both get flustered.  
- Conflict: Both get mad.  
- Repair: Both say sorry.  
❌ Why it fails: Generic, no contrast, identical reactions. The characters collapse into one voice.

### 12.6 Good Example – Triple-Character Scenario + Trigger Matrix
RELATIONSHIP_ENGINE:  
- Dynamic_Type: Layered attraction + sibling rivalry  
- Hierarchy: Ethan pushes to lead → Maya resists → Chris mediates  
- Trust_Baseline: High between Maya & Chris, fragile with Ethan  
INTERACTION_SCRIPTS:  
- Conflict: Ethan criticizes → Maya mocks → Chris interrupts with humor → Resolution when Maya laughs and Ethan concedes  
- Affection: Maya hugs freely → Chris pats shoulders → Ethan lingers awkwardly, rare compliments  
- Erotic_Tension: Maya leans close → Chris smirks knowingly → Ethan stiffens → Chris teases both when flirting starts  
- Drift_Recovery: Chris cracks a joke, Maya presses physical closeness  
TRIGGER_MATRIX:  
- Praise: Ethan→Maya stiff compliments | Maya→Ethan playful nickname | Chris→Maya approving nod | Maya→Chris dramatic thanks  
- Comfort: Ethan→Chris offers structured advice | Maya→Chris teases gently | Chris→Ethan plain reassurance  
- Flirt: Ethan→Maya stumbles over words | Maya→Ethan bold, close | Chris→Maya sarcastic teasing | Maya→Chris playful exaggeration  
- Conflict: Ethan→Maya sharp critique | Maya→Ethan mocking retort | Chris→Ethan smirking deflection  
- Repair: Ethan→Maya reluctant apology | Maya→Chris soft laughter | Chris→Ethan warm humor reset  
✅ Why it works: Every pair has distinct cause-and-effect rules. Triangulation creates layered dynamics instead of mirrored responses.

### 12.7 Escalation and De-escalation
The Trigger Matrix isn’t just about static reactions — it also controls *intensity over time.* Real conversations rarely jump from neutral to extreme in a single beat. Instead, they build, crest, and cool. That’s the rhythm you want to teach the model.

**Escalation Patterns**  
- Teasing to playful sarcasm to sharper teasing, then to underlying tension.  
- Conflict to clipped tone to sarcasm to open accusations, then to emotional withdrawal.  
- Affection to soft glance to warmer tone to lingering touches, then to vulnerability.  

**De-escalation Patterns**  
- Comfort to steady words to gentle touch, then to full reassurance.  
- Humor to light joke to shared laughter, then to tension diffused.  
- Praise to modest deflection to softened voice, then to trust reinforced.  

**Why It Matters**  
- Without escalation or de-escalation, emotional states flip abruptly, feeling robotic or random.  
- With them, scenes breathe naturally, rising and cooling like real relationships.  

**Design lesson:** Always think in *steps, not jumps.* Build ladders for rising tension and cushions for easing it. This is how you make multi-character bots feel human instead of mechanical.


### 12.8 Practical Guidelines
- **One sentence per rule is enough.** Short, crisp cause-and-effect instructions are the easiest for the model to follow.  
- **Contrast is king.** No two characters should ever respond the same way to the same trigger — distinct voices create believable dynamics.  
- **Use sensory detail.** Tie reactions to visible or tangible cues (voice, touch, gaze, posture, micro-expressions) so they echo naturally in dialogue.  
- **Plan reversals.** Define not only how conflict escalates, but also how it repairs and resets — escalation without repair leaves characters stuck.  
- **Keep tokens efficient.** The Scenario plus Trigger Matrix should fit within ~500–800 tokens, leaving enough room in the window for conversation history to breathe.  

### 12.9 Diagram Prompt
**Title:** “Scenario as Director, Trigger Matrix as Playbook”  
**Design:**  
- A central circle labeled *Scenario (Director).*  
- Lines leading to three smaller circles labeled *Character One, Character Two, Character Three.*  
- Beneath them, a grid labeled *Trigger Matrix,* with connections such as Praise leading to Reaction, Conflict leading to Escalation, and Repair leading to Soft Reset.  
**Style:** Flat design, pastel colors, with clean flowchart lines.  


### 12.10 Blank Skeletons – Ready to Fill
**Dual-Character Scenario + Trigger Matrix**  
RELATIONSHIP_ENGINE:  
- Dynamic_Type: [e.g., Rivals, Lovers, Friends]  
- Hierarchy: [e.g., Balanced / One pushes, one retreats]  
- Trust_Baseline: [Low / Medium / High]  
INTERACTION_SCRIPTS:  
- Conflict: [Character A provokes → Character B reacts → Resolution path]  
- Affection: [Character A shows warmth → Character B responds distinctly]  
- Drift_Recovery: [Behavior that resets tone when chat stalls]  
TRIGGER_MATRIX:  
- Praise: [A→B reaction] | [B→A reaction]  
- Comfort: [A→B reaction] | [B→A reaction]  
- Flirt: [A→B reaction] | [B→A reaction]  
- Conflict: [A→B reaction] | [B→A reaction]  
- Repair: [A→B reaction] | [B→A reaction]  

**Triple-Character Scenario + Trigger Matrix**  
RELATIONSHIP_ENGINE:  
- Dynamic_Type: [Triangle dynamic: rivals, siblings, lovers]  
- Hierarchy: [Leader / Resister / Mediator]  
- Trust_Baseline: [Pair alignments and weak links]  
INTERACTION_SCRIPTS:  
- Conflict: [Chain of escalation among all three]  
- Affection: [Each shows warmth differently]  
- Erotic_Tension: [If relevant, how attraction manifests between pairs]  
- Drift_Recovery: [Who lightens mood, who re-centers tone]  
TRIGGER_MATRIX:  
- Praise: [A→B reaction] | [B→C reaction] | [C→A reaction]  
- Comfort: [A→C reaction] | [B→A reaction] | [C→B reaction]  
- Flirt: [A→B reaction] | [B→C reaction] | [C→A reaction]  
- Conflict: [A→B reaction] | [B→C reaction] | [C→A reaction]  
- Repair: [A→B reaction] | [B→C reaction] | [C→A reaction]  

### 12.11 Conclusion
The Shared Scenario is what transforms a collection of personalities into a functioning ensemble. Without it, characters blur together, drift off-tone, or lose their roles. With it, they become distinct voices in a living play, each reacting differently and contributing to the group dynamic.  

The Trigger Matrix is the tool that makes this possible in real time — a compact set of cause-and-effect rules that keep interactions crisp, contrasted, and emotionally alive.  

Together, the Shared Scenario and Trigger Matrix turn multiple Personality Blocks into a coherent cast, delivering the illusion of an ensemble that feels structured, balanced, and real.  



### **12.1 Introduction**

By now, you’ve defined individual voices in the **Personality Blocks.** Each character has their own script page: how they look, speak, and react on their own. But in multi-character bots, that’s only half the story.

The **Scenario** must now step beyond being “a stage” and act as a **director.** It is the shared operating system that governs how the characters behave _together._

And within that Scenario sits the **Trigger Matrix**: the cause-and-effect rules that keep interactions dynamic, believable, and distinct. Without it, characters drift into sameness, ignore each other, or respond generically. With it, they feel alive: each compliment, tease, or conflict sparks different responses across the group.

---

### **12.2 Why the Shared Scenario Matters**

In a solo bot, the Scenario does light work: it sets the mood, the location, maybe a bit of relationship context. In a multi-character bot, that’s nowhere near enough.

The Shared Scenario must:

- Define **group dynamics** (trust, hierarchy, rivalry).
    
- Act as a **relationship engine** (who softens when comforted, who escalates during conflict).
    
- Manage **turn-taking** so characters don’t speak over each other.
    
- Provide **drift recovery** — rules that reset tone when conversation drifts or stalls.
    

Think of it as the **director’s notes** that keep the play on track: who enters when, how tension builds, how it cools down.

---

### **12.3 Core Components of the Shared Scenario**

A strong multi-character Scenario includes:

**1. Relationship Engine**

- Dynamic type: Are they friends, rivals, lovers, siblings, or some mix?
    
- Hierarchy: Is power balanced, shifting, or skewed?
    
- Trust baseline: High, low, conditional?
    

**2. Interaction Scripts**

- Conflict: Who provokes, how it escalates, how it resolves.
    
- Affection: How warmth is shown physically and verbally.
    
- Erotic tension (if relevant): How teasing and jealousy are expressed.
    
- Banter flow: Patterns of playful back-and-forth.
    

**3. State Simulation**

- Emotional entry point: Playful, tense, guarded?
    
- Drift recovery: What resets tone when the bot goes off-track?
    

**4. Trigger Matrix**

- The beating heart: small, crisp rules mapping stimulus → reaction.
    
- Categories: Praise, Comfort, Flirt, Conflict, Repair.
    
- Dual = mirrored push-pull. Trio = triangulation (alliances, rivalries, mediators).
    

---

### **12.4 Good Example – Dual-Character Scenario + Trigger Matrix**

RELATIONSHIP_ENGINE:

- Dynamic_Type: Friends with romantic undercurrent
    
- Hierarchy: Balanced, but Daniel pushes while Claire retreats
    
- Trust_Baseline: High but fragile when pressured
    

INTERACTION_SCRIPTS:

- Conflict: Daniel teases Claire’s seriousness → Claire critiques → Daniel softens with humor
    
- Affection: Daniel drapes arm → Claire lingers shyly → Verbal warmth from Claire is rare but impactful
    
- Drift_Recovery: Daniel strums guitar when chat stalls → Claire asks thoughtful question
    

TRIGGER_MATRIX:

- Praise: Claire→Daniel blushes, quiet thanks | Daniel→Claire smirks, “Guess I’m not bad, huh?”
    
- Comfort: Claire→Daniel gentle empathy | Daniel→Claire steady presence with a joke
    
- Flirt: Claire→Daniel stammers compliments | Daniel→Claire lowers voice, teases
    
- Conflict: Daniel→Claire provokes with sarcasm | Claire→Daniel critiques sharply
    
- Repair: Daniel→Claire light humor reset | Claire→Daniel hesitant apology
    

✅ Why it works: The Scenario defines relationship dynamics, while the Trigger Matrix ensures every cue creates a distinct, believable reaction.

---

### **12.5 Bad Example – Dual-Character Scenario + Trigger Matrix**

RELATIONSHIP_ENGINE:

- Dynamic_Type: Friends
    
- Hierarchy: Equal
    
- Trust_Baseline: Medium
    

INTERACTION_SCRIPTS:

- Conflict: They argue.
    
- Affection: They are nice.
    
- Drift_Recovery: They stop fighting.
    

TRIGGER_MATRIX:

- Praise: Both say thanks.
    
- Comfort: Both reassure.
    
- Flirt: Both get flustered.
    
- Conflict: Both get mad.
    
- Repair: Both say sorry.
    

❌ Why it fails: Generic, no contrast, identical reactions. The characters collapse into one voice.

---

### **12.6 Good Example – Triple-Character Scenario + Trigger Matrix**

RELATIONSHIP_ENGINE:

- Dynamic_Type: Layered attraction + sibling rivalry
    
- Hierarchy: Ethan pushes to lead → Maya resists → Chris mediates
    
- Trust_Baseline: High between Maya & Chris, fragile with Ethan
    

INTERACTION_SCRIPTS:

- Conflict: Ethan criticizes → Maya mocks → Chris interrupts with humor → Resolution when Maya laughs and Ethan concedes
    
- Affection: Maya hugs freely → Chris pats shoulders → Ethan lingers awkwardly, rare compliments
    
- Erotic_Tension: Maya leans close → Chris smirks knowingly → Ethan stiffens → Chris teases both when flirting starts
    
- Drift_Recovery: Chris cracks a joke, Maya presses physical closeness
    

TRIGGER_MATRIX:

- Praise: Ethan→Maya stiff compliments | Maya→Ethan playful nickname | Chris→Maya approving nod | Maya→Chris dramatic thanks
    
- Comfort: Ethan→Chris offers structured advice | Maya→Chris teases gently | Chris→Ethan plain reassurance
    
- Flirt: Ethan→Maya stumbles over words | Maya→Ethan bold, close | Chris→Maya sarcastic teasing | Maya→Chris playful exaggeration
    
- Conflict: Ethan→Maya sharp critique | Maya→Ethan mocking retort | Chris→Ethan smirking deflection
    
- Repair: Ethan→Maya reluctant apology | Maya→Chris soft laughter | Chris→Ethan warm humor reset
    

✅ Why it works: Every pair has distinct cause-and-effect rules. Triangulation creates layered dynamics instead of mirrored responses.

---

### **12.7 Escalation and De-escalation**

The Trigger Matrix isn’t just about static responses — it controls _intensity over time._

- **Escalation:** Teasing → sharper teasing → tension. Conflict → sarcasm → accusations → withdrawal.
    
- **De-escalation:** Comfort → soft touch → reassurance. Humor → tension diffusion. Praise → softened tone.
    

Without escalation/de-escalation, emotional states flip unrealistically. With it, scenes breathe naturally, rising and cooling like real relationships.

---

### **12.8 Practical Guidelines**

- **One sentence per rule is enough.** Short, crisp, cause-effect instructions work best.
    
- **Contrast is king.** No two characters should ever react identically to the same trigger.
    
- **Use sensory detail.** Reactions should be tied to voice, touch, gaze, or micro-expressions.
    
- **Plan reversals.** Always define not just how conflict escalates, but how it’s repaired.
    
- **Keep tokens efficient.** Scenario + Trigger Matrix should fit within ~500–800 tokens to leave room for conversation history.
    

---

### **12.9 Diagram Prompt**

**Title:** “Scenario as Director, Trigger Matrix as Playbook”  
**Design:**

- A central circle labeled _Scenario (Director)_.
    
- Arrows pointing to three smaller circles labeled _Character One_, _Character Two_, _Character Three_.
    
- Beneath them, a grid labeled _Trigger Matrix_, with arrows showing Praise → Reaction, Conflict → Escalation, Repair → Soft Reset.  
    **Style:** Flat design, pastel colors, clean flowchart arrows.
    

---

### **12.10 Conclusion**

The Shared Scenario is what elevates a group of personalities into a functioning ensemble. Without it, characters overlap, drift, or forget their roles. With it, they become distinct voices in a living play, each reacting differently, each contributing to the group dynamic.

The Trigger Matrix is the tool that makes this work minute by minute — a set of small, efficient rules that keep interactions crisp, contrasted, and emotionally alive.

Together, they turn multiple Personality Blocks into a coherent cast.

---

Do you want me to **fully script a reusable “blank skeleton” Trigger Matrix (dual and triple versions)** here like we did in Chapter 11, so readers have a ready-to-fill template?

Perfect — since Chapter 12 introduced the **Shared Scenario & Trigger Matrix**, let’s now add the **fully reusable, fill-it-yourself templates** for both **dual-character** and **trio-character** bots. These give readers something they can copy, paste, and populate with their own details. I’ll present them in plain text, **no fenced blocks**, so they slot cleanly into your textbook.

## **12.A Template: Dual-Character Shared Scenario & Trigger Matrix**

SHARED_SCENARIO:

- Relationship_Engine:
    
    - Dynamic_Type: [Friends? Rivals? Lovers? Siblings?]
        
    - Hierarchy: [Balanced? One leads, the other resists?]
        
    - Trust_Baseline: [High, low, conditional?]
        
- Interaction_Scripts:
    
    - Conflict: [How conflict starts, escalates, and cools]
        
    - Affection: [How warmth is expressed physically and verbally]
        
    - Drift_Recovery: [What characters do if the scene stalls]
        
- Trigger_Matrix:
    
    - Praise:
        
        - A→B: [Reaction when A is praised by B]
            
        - B→A: [Reaction when B is praised by A]
            
    - Comfort:
        
        - A→B: [Reaction when A comforts B]
            
        - B→A: [Reaction when B comforts A]
            
    - Flirt:
        
        - A→B: [Reaction when A flirts with B]
            
        - B→A: [Reaction when B flirts with A]
            
    - Conflict:
        
        - A→B: [Reaction when A provokes B]
            
        - B→A: [Reaction when B provokes A]
            
    - Repair:
        
        - A→B: [Reaction when A tries to repair tension with B]
            
        - B→A: [Reaction when B tries to repair tension with A]
            

---

## **12.B Template: Trio-Character Shared Scenario & Trigger Matrix**

SHARED_SCENARIO:

- Relationship_Engine:
    
    - Dynamic_Type: [Friends with rivalry? Romantic triangle? Found family?]
        
    - Hierarchy: [Who tends to lead, who resists, who mediates]
        
    - Trust_Baseline: [Pairwise trust values or general baseline]
        
- Interaction_Scripts:
    
    - Conflict: [Who escalates? Who deflects? Who repairs?]
        
    - Affection: [Who shows warmth openly? Who hides it?]
        
    - Erotic_Tension (if relevant): [Who flirts boldly, who flusters, who teases]
        
    - Drift_Recovery: [What resets flow when the scene stalls]
        
- Trigger_Matrix:
    
    - Praise:
        
        - A→B: [Reaction when A praises B]
            
        - A→C: [Reaction when A praises C]
            
        - B→A: [Reaction when B praises A]
            
        - B→C: [Reaction when B praises C]
            
        - C→A: [Reaction when C praises A]
            
        - C→B: [Reaction when C praises B]
            
    - Comfort:
        
        - A→B: [...]
            
        - A→C: [...]
            
        - B→A: [...]
            
        - B→C: [...]
            
        - C→A: [...]
            
        - C→B: [...]
            
    - Flirt:
        
        - A→B: [...]
            
        - A→C: [...]
            
        - B→A: [...]
            
        - B→C: [...]
            
        - C→A: [...]
            
        - C→B: [...]
            
    - Conflict:
        
        - A→B: [...]
            
        - A→C: [...]
            
        - B→A: [...]
            
        - B→C: [...]
            
        - C→A: [...]
            
        - C→B: [...]
            
    - Repair:
        
        - A→B: [...]
            
        - A→C: [...]
            
        - B→A: [...]
            
        - B→C: [...]
            
        - C→A: [...]
            
        - C→B: [...]
            

---

### **How to Use These Templates**

1. **Fill every slot with _contrasts._** Never let two characters react the same way to the same trigger.
    
2. **Use sensory anchors.** (Blush, smirk, fold arms, soften voice). These are cues the LLM reproduces well.
    
3. **Keep rules crisp.** One sentence per reaction is enough. Example: _“Claire blushes, fiddling with her necklace.”_
    
4. **Balance escalation and repair.** Every conflict path needs a way back to neutral, or the bot spirals into negativity.
    
5. **Stay within ~500–800 tokens.** These matrices should be lean enough to leave room for chat history.

# Chapter 13 – Dialogue, Formatting & Troubleshooting

### 13.1 Why Dialogue Management Matters

When multiple characters share the stage, the *greatest danger* is chaos. Without clear structure, conversations collapse into a muddle: characters talk over each other, voices blur, pacing vanishes, and immersion shatters.  

**Dialogue management is the craft of controlling conversational flow** — deciding who speaks when, how long they speak, and how their voices remain distinct over time. It is also the framework for troubleshooting breakdowns when characters drift, bleed into each other, or lose rhythm in long chats.  

Think of it like directing a play. Even the best actors with perfect lines need a stage manager calling cues. Without that structure, the show descends into noise and missed beats.  

In chatbot design, *you* are that stage manager. Your tools are:  
- **The Scenario**, which sets rules for pacing, turn-taking, and escalation.  
- **Formatting rules**, which separate voices on the page and give the LLM a pattern to follow.  

When managed well, dialogue feels like a live performance: each voice distinct, timing balanced, and rhythm engaging. When neglected, it becomes static prose — or worse, generic chatter that no longer feels like a cast at all.  


### 13.2 Turn-Taking: Who Speaks When

In natural human conversation, turn-taking happens automatically. In multi-character bots, the LLM won’t manage this cleanly — it will often let one voice dominate or merge responses together.  

**Turn-taking rules must be explicit.** Examples include:  
- “After {{user}} speaks, one character responds first, then the second reacts.”  
- “When both respond, Character One reacts with emotion, Character Two follows with commentary or contrast.”  
- “Never merge both voices into a single paragraph.”  

**Example (Turn Order Defined):**  
- User compliments both.  
- Response:  
  - Character A reacts emotionally first.  
  - Character B follows with a contrasting reaction — teasing A, or echoing differently.  

This sequencing keeps rhythm predictable and prevents overlap.  

---

### 13.3 Formatting Rules: Teaching the Model Voice Separation

Formatting isn’t about style points — it’s about teaching the model to *see separation of voices.* Without clear formatting, characters blur into one mushy voice.  

**Best Practices:**  
- **Character Tags:** Always label speakers consistently (e.g., “Claire:” and “Daniel:” or bolded names). Never switch style mid-chat.  
- **Dialogue Markers:** Quotation marks for speech (“...”), italics for actions (*...*), and square brackets for inner thoughts [...].  
- **Line Break Discipline:** Each speaker always gets their own line. No block paragraphs with blended voices.  

**Example (Good Formatting):**  
Claire: *She adjusts her glasses, eyes darting away.* “I… wasn’t expecting that compliment.”  
Daniel: *A grin spreads across his face.* “Yeah, you weren’t, but I live to surprise.”  

**Example (Bad Formatting):**  
Claire blushes and says thanks while Daniel laughs and teases her back.  

❌ Why bad: Both voices collapsed into one block, no clear speaker separation.  

### 13.4 Pacing: Dialogue Length and Rhythm

Dialogue pacing defines whether a scene feels like snappy banter or a heavy monologue. In multi-character bots, pacing matters even more — multiple voices must share one turn.  

**Guidelines:**  
- **Opening lines = longer.** Use them to anchor the scene.  
- **Banter = short and sharp.** Quick sentences keep rhythm lively.  
- **Emotional or intimate beats = slower.** Let gestures, pauses, and sensory details linger.  
- **Avoid overstuffing.** When two characters respond, each should use 1–3 sentences, not paragraphs.  

**Practical Cue:** Think of pacing like music. Short beats = banter, long beats = reflection. All short beats = shallow. All long beats = heavy. Mixing them creates flow.  

### 13.5 Troubleshooting Common Problems

**1. Personality Bleed**  
- *Symptom:* Characters start sounding alike.  
- *Fix:* Sharpen contrasts in Personality (tone, humor, touch habits). Reinforce Scenario with lines like: “Claire always hesitates; Daniel never does.”  

**2. Voice Merging**  
- *Symptom:* Model writes both characters in one block.  
- *Fix:* Add explicit formatting rules: “Each character speaks on their own line, with name + dialogue.” Reinforce this pattern in Example Dialogue.  

**3. Over-Dominance**  
- *Symptom:* One character hogs the stage, others fade.  
- *Fix:* Add Scenario rules: “After {{user}}, Character A responds first, then Character B must follow.”  

**4. Pacing Collapse**  
- *Symptom:* Conflicts or romances resolve instantly.  
- *Fix:* Add escalation/repair ladders: “Do not resolve arguments in one turn. Conflict must pass through sharpness → silence → softening → repair.”  

**5. Repetition & Drift**  
- *Symptom:* Characters reuse the same phrases or forget distinctions.  
- *Fix:* Insert Scenario reinforcement lines: “Claire is formal, Daniel is casual — this must remain consistent every exchange.”  

### 13.6 Case Study: Banter Flow in a Duo

**Scenario Rule:** Claire responds earnestly; Daniel undercuts with humor.  

User: “You two handled that really well.”  
Claire: *Her cheeks warm as she glances at the floor.* “Oh… I mean, we tried our best.”  
Daniel: *He smirks, elbow nudging Claire.* “Tried our best? Please. We crushed it.”  

✅ Why it works: Claire shows humility, Daniel adds confidence. Turn-taking is clear, voices are distinct, pacing is playful.  

### 13.7 Case Study: Triangulation in a Trio

**Scenario Rule:** Ethan leads, Maya resists, Chris mediates.  

User: “So… who actually made the smart choice here?”  
Ethan: *Brows furrow, voice clipped.* “Obviously me. I kept us alive.”  
Maya: *She snorts, arms crossed.* “Alive, sure. Inspired? Not even close.”  
Chris: *He steps between them, grinning.* “If survival and style were both categories, you’d both win. But they’re not. So let’s call it a tie.”  

✅ Why it works: Distinct voices, clear turn order (Leader → Challenger → Mediator), pacing builds tension then cools it.  

### 13.8 Diagram Prompt
**Title:** “Multi-Character Dialogue Flow”  
**Design:**  
- Three circles: Character A, Character B, Character C.  
- Flow lines show sequence: A to B to C to back to A.  
- Beneath: pacing icons (short line = banter, long line = reflection).  
- Use contrasting colors for each character to emphasize distinct voices.  

### 13.9 Conclusion
Dialogue is where a multi-character bot succeeds or fails. Personality, Scenario, and Triggers mean nothing if voices collapse in the transcript. By controlling **turn-taking, formatting, and pacing**, you give the model rails to follow that feel natural and theatrical.  

Troubleshooting ensures that when drift inevitably happens, you can pull the bot back on track — sharpening contrasts, reinforcing formatting, and adjusting pacing cues.  

Always remember: the user isn’t just chatting with characters — they are *watching a performance.* Your role is to make sure the play runs smoothly, voices stay distinct, and the rhythm keeps the audience hooked.  

# Chapter 14 – Scenario Bots I: Foundations & Simulation

---

## 14.1 What Are Scenario Bots?

Most chatbot design focuses on **character bots**: you define a single persona (quirks, habits, emotional reflexes), and the user interacts with that personality. Scenario bots invert this model. Instead of anchoring to _one character_, you anchor to a **world system.**

A **character bot** = an _actor_.  
A **scenario bot** = a _stage and director combined_.

The goal is not “make Goku talk like Goku.” The goal is “make the world of Dragon Ball function like Dragon Ball.” The bot doesn’t embody one role; it narrates, enforces rules, and runs NPCs in a consistent voice.

Scenario bots succeed when:

- The **world’s voice** stays consistent (Controller Block).
    
- The **simulation rules** respond predictably to user actions (Scenario Block).
    
- The experience is structured into **cycles** so tension builds and releases, instead of collapsing in one turn.
    

---

## 14.2 Personality vs. Scenario Revisited

In scenario builds, the two permanent fields take on specialized jobs:

- **Personality → Controller Block.**  
    Defines the _narrator voice_ and _formatting rules._ It sets the world’s “presentation contract”: how narration looks, how tone stays consistent, how actions and dialogue are written.
    
- **Scenario → Simulation Engine.**  
    Defines the _present moment_ and the _rules of play._ It sets anchors for the current scene, emotional baseline, and functional “if–then” logic. It is **replaceable** between arcs (training → event → downtime → next arc) while the Controller remains fixed.
    

Think: **Controller = how the world talks.**  
**Scenario = what the world does right now.**

---

## 14.3 The Controller Block (World Personality)

The Controller Block is short, functional, and never bloated. It locks in narrator tone, formatting, and style so the bot never drifts.

### What Goes Here

- **Narrator Voice:** The consistent tone and diction of the world.
    
- **Perspective:** Usually omniscient, cinematic.
    
- **Formatting Rules:** Explicit mapping of italics, quotes, brackets, bold.
    
- **Style Rules:** Rhythm, verbs, and presentation cues.
    

### Good Example – DBZ Scenario Bot

CONTROLLER BLOCK:  
Narrator Voice: High-energy shonen tone, dramatic but clear. Always describe action as if calling a fight scene.  
Perspective: Omniscient, cinematic — describe both user and NPCs.  
Formatting:  
– _Italics_ for stage directions and actions (_Piccolo clenches his fists_).  
– "Quotes" for spoken dialogue ("You won’t survive this!").  
– [Brackets] for internal thoughts ([He’s holding back…]).  
– **Bold** for dramatic power surges (**The ground shakes!**).  
Style Rules: Narration is punchy. Short clauses for combat beats; longer sentences only in aftermath. Always favor active verbs (“erupts,” “shatters”) over passive.

✅ Why it works: Compact, functional, and every instruction shows up in play.

### Bad Example – Overwritten Controller

CONTROLLER BLOCK:  
Narrator Voice: Sometimes dramatic, sometimes casual, sometimes comedic.  
Perspective: Flexible.  
Formatting: Not defined.  
Style Rules: The Dragon Balls were created thousands of years ago by the Namekians… [three paragraphs of lore history].

❌ Why it fails: Vague (“sometimes” = ignorable), undefined rules, lore bloat that burns tokens without affecting narration.

**Best Practice:** Keep Controller under ~150 tokens. This is your world’s _operating manual_, not its wiki.

---

## 14.4 The Scenario Block (Simulation Engine)

The Scenario Block is where the **simulation actually runs.** It anchors the present scene, sets the emotional baseline, and defines cause-and-effect rules. Unlike the Controller, it is **disposable and replaceable** — swap it as arcs shift, while keeping the narrator stable.

### What Goes Here

- **Scene Anchor:** Where you are, what it feels like, what’s at stake right now.
    
- **Relationship Baseline:** Current emotional state (rivals, uneasy allies, guarded attraction).
    
- **Functional Rules:** Crisp “if–then” cause-effect logic for combat, social tension, affection, escalation, and repair.
    

### Good Example – Training Arc Scenario

SCENARIO BLOCK:  
Scene: Barren wasteland under orange sky; dry wind tears at the plateau. Piccolo begins harsh training.  
Relationship Baseline: Mentor–trainee tension; rivalry edge but mutual respect.  
Functional Rules:  
– If user powers up, Piccolo pauses, evaluates, then pressures with a counter.  
– When heavy hits land, describe shockwaves and terrain damage.  
– If user taunts twice, Piccolo escalates into punishing offense.  
– If user asks for guidance, Piccolo softens with curt advice.  
Cycle: Training → Sparring → Event → Recovery → Next Arc. After each beat, present 2–3 meaningful options.

✅ Why it works: Anchors the scene, defines behavior rules, and encodes a repeatable loop.

### Bad Example – Stub Scenario

SCENARIO BLOCK:  
“You are training in a wasteland. Fight the opponent.”

❌ Why it fails: Too short (<300 tokens), no baselines, no rules. Collapses into generic chat in 2–3 turns.

### Bad Example – Lore Dump

SCENARIO BLOCK:  
“Dragon Ball Z is a Japanese anime created by Akira Toriyama. The series follows Son Goku from childhood through adulthood…” [five paragraphs of history].

❌ Why it fails: Burns tokens on static info. No functional rules, no current anchor. The bot doesn’t need a wiki; it needs _instructions_.

---

## 14.5 Pacing Cycles & Gameplay Loops

Without cycles, scenario bots collapse: the user acts once, the scene ends. With cycles, tension builds, peaks, and resets.

### Core Principles

- **User Options:** Offer 2–4 meaningful next moves after each beat.
    
- **Narrative Feedback:** Show impact (environmental changes, power dips, NPC reactions).
    
- **Alternation:** High-intensity loops alternate with recovery or downtime.
    

### Cycle Types

- **Combat Cycle:** Training → Sparring → Event → Recovery.
    
- **Racing Cycle (Uma Musume):** Prep → Race → Recovery → Slice-of-life.
    
- **Romantic Cycle:** Tease → Escalation → Tension → Apology → Repair.
    

### Diagram Prompt

Title: “Cycle Beats.”  
Visual: Circular loop — Action → Consequence → Options → Reset/Advance. Separate mini-loop for downtime → recovery → next arc.

---

## 14.6 Advanced Behavioral Logic (Part I)

Scenario bots rely on simple but explicit **engines**:

**Choice Engine** – Defines verbs the world recognizes. (Power Up, Guard, Taunt, Comfort; or Study, Socialize, Rest).  
**Consequence Engine** – Ties each verb to state change + feedback. (“Taunt → opponent hesitates; respect dips.”)  
**Tone Guide** – Encodes how narration changes with context (combat sharp and clipped; recovery slower, breath-focused).

Where to store rules:

- **Controller = style + formatting (always on).**
    
- **Scenario = live rules (often swapped).**
    

---

## 14.7 Worked Example – DBZ “Saiyan Saga” Scenario Bot

### Controller Block

CONTROLLER BLOCK:  
Narrator Voice: High-energy shonen tone, dramatic but clear. Always describe action as if calling a fight scene.  
Perspective: Omniscient, cinematic — describe both user and NPCs.  
Formatting:  
– _Italics_ for stage directions and actions.  
– "Quotes" for dialogue.  
– [Brackets] for inner thoughts.  
– **Bold** for dramatic surges.  
Style Rules: Narration punchy, favor active verbs, clipped beats in combat.

### Scenario Block

SCENARIO BLOCK:  
Scene: Barren wasteland under an orange sky; Piccolo stands with arms crossed, cape snapping in the wind.  
Relationship Baseline: Harsh mentor testing a reluctant trainee; rivalry sharp, but respect underlying.  
Functional Rules:  
– If user powers up, Piccolo acknowledges, escalates sparring.  
– If user falters twice, Piccolo mocks, pushes harder.  
– If user endures, Piccolo grants curt praise.  
– Heavy attacks break terrain; always describe collateral.  
Cycle: Training → Sparring → Event → Recovery → Next Arc.  
Feedback: Reflect shifts in stamina, aura, and Piccolo’s demeanor.

✅ Why it works: Controller defines style. Scenario defines moment. Together they create consistent, replayable arcs.

### Key Takeaways from Chapter 14

- Scenario bots = _world systems,_ not _actors._
    
- Controller Block = narrator voice and format rules.
    
- Scenario Block = live logic and replaceable state.
    
- Cycles prevent one-turn collapse.
    
- Engines (Choice, Consequence, Tone) turn rules into gameplay.
    
- Good builds are compact, functional, and reusable.

# Chapter 15 – Scenario Bots II: Advanced Builds & Templates

---

## 15.1 Why Advanced Practice Matters

Chapter 14 gave you the foundations: Controller Block, Scenario Block, cycles, and a flagship DBZ-style combat example. That is enough to build a functioning scenario bot.

But to make scenario bots **reliable, replayable, and adaptable across genres**, you need more:

- Alternative case studies beyond combat.
    
- Awareness of common pitfalls and how to avoid them.
    
- Fill-it-yourself skeletons to standardize builds.
    
- Testing and iteration methods to catch drift and collapse.
    

This chapter consolidates those advanced lessons.

---

## 15.2 Worked Example: Slice-of-Life Campus Bot

Not every scenario bot is high-intensity. Slice-of-life and romantic setups rely on **social cycles** instead of combat cycles, but the same principles apply.

### Controller Block

CONTROLLER BLOCK:  
Narrator Voice: Warm, lightly comedic tone. Always frame scenes as if observing a sitcom or campus novel.  
Perspective: Omniscient, casual — describe both user and NPCs with small sensory cues.  
Formatting:  
– _Italics_ for actions and scene beats (_She drops her books_).  
– "Quotes" for dialogue ("You’re late again!").  
– [Brackets] for inner thoughts ([She’s definitely flustered…]).  
Style Rules: Keep narration light, a mix of short sentences for humor and longer ones for atmosphere. Never drift into melodrama unless tension is scripted.

### Scenario Block

SCENARIO BLOCK:  
Scene: Crowded campus café; students chatter, cups clink. Rival classmate sits across from you, smirking.  
Relationship Baseline: Rivalry softened by attraction. Banter carries edge but not malice.  
Functional Rules:  
– If user teases, rival escalates with sharper teasing.  
– If user compliments, rival blushes, deflects with sarcasm.  
– If user withdraws, rival presses, trying to regain attention.  
– If conflict escalates, roommate NPC interrupts with humor to reset tone.  
Cycle: Casual Banter → Rising Tension → Interruption/Reset → Softened Closing.  
Feedback: Always show small tells: tapping fingers, stammering, overlong glances.

✅ Why it works: The Controller sets sitcom-style narration; the Scenario enforces social logic and ensures tension resets instead of flatlining.

---

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

## 15.4 Fill-It-Yourself Templates

Scenario bots work best when you standardize the blocks. Here is a skeleton you can copy and fill.

### Controller Block Template

CONTROLLER BLOCK:  
Narrator Voice: [Tone and style, e.g., cinematic, slice-of-life, comedic].  
Perspective: [Omniscient? Limited?]  
Formatting:  
– _Italics_ = [Define action use].  
– "Quotes" = [Define speech].  
– [Brackets] = [Define thoughts].  
– **Bold** = [Define emphasis].  
Style Rules: [Sentence rhythm, verb preference, global anchors].

### Scenario Block Template

SCENARIO BLOCK:  
Scene: [Where you are, sensory description, stakes].  
Relationship Baseline: [Current dynamic: rivalry, trust, attraction, tension].  
Functional Rules:  
– If user [action], NPC responds [reaction].  
– If user [action], NPC responds [reaction].  
– Always [baseline behaviors: e.g., describe environment damage, show body language].  
Cycle: [Name the loop: Combat, Banter, Tease→Repair].  
Feedback: [How consequences are always shown].

---

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

## 15.6 Diagram Prompt

**Title:** “Scenario Bot Flow: Advanced”  
Visual: Flowchart boxes.  
– Left: Controller (Style Rules).  
– Right: Scenario (Rules & State).  
– Loop: Cycle → User Choices → Consequences → Reset.  
– Arrows show replacement of Scenario with new arc while Controller stays constant.  
Style: Flat design, three colors (blue = Controller, red = Scenario, green = Cycle).

---

## 15.7 Glossary (Scenario-Specific)

- **Controller Block** – Permanent “world personality” defining narration and style.
    
- **Scenario Block** – Replaceable “engine” for the current scene and rules.
    
- **Cycle** – A repeatable loop (combat, social, romance) that prevents collapse.
    
- **Choice Engine** – User verbs the system recognizes.
    
- **Consequence Engine** – World feedback tied to those verbs.
    
- **Tone Guide** – Explicit rules for how narration shifts with context.
    
- **Recap** – A short line added when swapping scenarios to keep continuity.
    
- **Transplant** – Copying prompt into a new chat to restore stability.
    

---

## 15.8 Conclusion

Scenario bots are more than a gimmick. They are **world simulators**: compact systems that make environments interactive and alive.

Chapter 14 showed how to anchor them: Controller for style, Scenario for rules.  
Chapter 15 has given you advanced tools: alternative genre case studies, pitfalls, skeletons, and testing workflows.

Together, these two chapters consolidate everything from the Scenario Bot Guide into a repeatable method. Scenario bots now stand alongside character and multi-character bots as a **third major design path** in your toolbox.


---

# Chapter 16 – Wrap-Up

We’ve covered the full arc of bot creation: from understanding tokens and memory, to writing strong Personality and Scenario Blocks, to building states, triggers, and dialogue that feel alive. Along the way, we’ve explored how to test, debug, and polish, and finally how to scale from single voices into multi-character ensembles without losing clarity.

The key lessons:

- **Efficiency matters.** Every token should shape behavior, not waste space on trivia.
    
- **Structure creates performance.** Personality = identity, Scenario = director, Triggers = rails.
    
- **Dialogue teaches rhythm.** Examples, pacing, and formatting are how you keep tone sharp.
    
- **Testing is essential.** A design isn’t finished until it holds in live play.
    
- **Ensembles need discipline.** Multi-character bots succeed when each voice is distinct and the Scenario manages flow.
    

If you remember nothing else: bots live or die on **clarity.** The clearer your instructions, the more freedom the model has to perform within them.

This isn’t the end of the work — it’s the beginning of practice. Keep testing, keep revising, and keep building. The craft is iterative, but the payoff is worth it: characters that don’t just talk, but **feel alive**.

# Appendix 1 – Spark Notes / Most Important Things

### Token Rules
- Keep permanent tokens under ~2,000 (Personality + Scenario + Example Dialogue).
- Personality per character: 300–500 tokens.
- Always trim prose and biography; focus on active behaviors.
- Remember: every symbol, formatting mark, and emoji also burns tokens.

### Personality vs Scenario vs Dialogue
- **Personality = Identity** → who they always are, quirks, voice, reflexes.
- **Scenario = Script** → how they act *right now*, state, tone, triggers.
- **Dialogue = Performance** → how they actually sound in play.

### U-Curve Memory
- Start = strong anchor (Personality).
- End = strong recency driver (Scenario + Example Dialogue).
- Middle = weakest zone (avoid burying rules here).

### Trigger Basics
- Praise to Fluster or Deflect.
- Tease to Pushback or Conflict.
- Apology to Repair.
- Comfort to Affection.
- Triggers must be crisp cause-to-effect, no “might” or “sometimes.”

### Multi-Character Rules
- Separate Personality blocks for each character, same category order.
- Contrast is king: no two should react identically to the same cue.
- Scenario becomes the director: manages trust, conflict, affection, and pacing.
- Enforce turn-taking: one reacts first, the other contrasts or comments.

### Formatting Keys
- _Italics = actions_  
- “Quotes = dialogue”  
- [Brackets = thoughts]  
- **Bold = emphasis**  
- (Parentheses = OOC)

### Testing Cheats
- Run at least 10 lines — does the voice hold or drift?
- Stress test with tease, apology, silence, long messages.
- Watch for repetition (“I already told you…”) = too much Personality weight.
- Fix one thing at a time: Personality, Scenario, or Example Dialogue.

# Appendix 2 – Single-Character Personality & Scenario

## Personality Template

- CHARACTER: [Full Name] ([Age]; [Occupation or Role])

- APPEARANCE:
  - Face: [Describe face shape, typical expressions or tells]
  - Hair: [Hair style, color, how they usually wear it]
  - Eyes: [Shape, color, how they express emotion]
  - Build: [Height, body type, posture]
  - Style: [Typical clothing style, comfort or statement pieces]

- PSYCHOLOGICAL_PROFILE:
  - Motivation: [Concrete want + visible behavior]
  - Deepest Fear: [What they're afraid to lose or become]
  - Short-Term Goal: [Current actionable desire]
  - Long-Term Goal: [What they’re ultimately working toward]
  - Personal Validation: [What makes them feel loved or respected]
  - Internal Conflict: [A contradiction within them—want vs. fear]
  - Vulnerability Behaviors: [How they show rejection fear through subtle cues—lingering glances, hesitation, recalling past closeness; how they may stall sincere words or go quiet when emotionally exposed]
  - Background: [Relevant history, past relationships, or social context]

- SOCIAL_BEHAVIOR:
  - Casual Tone: [Banter used to dodge topics or flirt; emotional undercurrent often masked by humor or sarcasm]
  - Praise Response: [Dismissive or bashful; may tease or shift focus away]
  - Humor Style: [Dry, ironic, or self-deprecating; used to disarm or distract]
  - Disconnection Reaction: [Clings, goes quiet, or makes light of the moment—depends on emotional tone]
  - Mild Irritation: [Expressed through eye rolls, muttered sarcasm, or passive deflection]
  - Farewell Behavior: [Tone reflects mood—cheerful, regretful, evasive]

- SENSORY:
  - Sight: [Eye contact habits, micro-expressions, emotional tells—e.g., fidgeting, flicked glances]
  - Sound: [Voice tone, cadence, modulation under stress or comfort]
  - Scent: [Subtle signature—perfume, shampoo, natural musk; how it shifts with emotion]
  - Touch: [Contact habits—when and how they touch, symbolic gestures like lingering wrist holds]

- FORMAT:
  - *Italic*: Descriptive actions
  - "Quotes": Spoken dialogue
  - [Brackets]: Internal thoughts
  - **Bold**: Emphasis
  - (Parenthesis): Out of Character

---

## Scenario Template

- RELATIONSHIP_FLAGS:
  - Attraction: [Initial and sustained draws to {{user}}]
  - Symbolic Cues: [Nonverbal signals of trust or control—e.g., guided touch, hand on back; may re-use gestures or lines as emotional callbacks]

- EMOTIONAL_LOGIC:
  - Default State: [Flirty, guarded, confident, sarcastic, etc.]
  - Emotional Barriers: [What prevents vulnerability or emotional openness—trauma, pride, fear of loss]
  - Recovery Speed: [How fast they emotionally rebound from tension or rejection]
  - Reconnection Method: [Touch, apology, teasing, emotional honesty—how they reset after discord]
  - Argument Trigger: [What escalates them—neglect, jealousy, feeling cornered]
  - Conflict Response: [Withdraws, uses teasing or sarcasm to deflect; escalates if ignored, but softens if met with care or patience]
  - Apology Logic: [How they express remorse—guarded, humorous, direct]
  - Post-Conflict Repair: [How they rebuild closeness—tone shift, tender gesture, reaffirming language]
  - Trust Development: [Behavioral shifts as they feel safe—softer tone, more openness; firsts matter—first compliment without teasing, first lingering silence, first emotional withdrawal]

- CLOSENESS_BEHAVIOR:
  - Distance Mode: [How they act when pulling away—quiet, evasive, clipped]
  - Engagement Mode: [Active interest—eye contact, open posture, playful tone; becomes softer if {{user}} shares something vulnerable]
  - Conversational Role & Power Dynamics: [Do they lead, follow, challenge, yield? Soft dom, service switch, etc.]
  - Flirtation Style: [How they express and escalate attraction—suggestive quips, coy glances, playful deflection; grows bolder when teasing is reciprocated]
  - Provocation Style: [How they push boundaries—testing reactions, playful verbal traps, daring touches]
  - Intimacy Progression: [How they build erotic or emotional closeness—slow burn, passive baiting, escalating challenge]
  - Immediate Escalation Response: [Reaction if {{user}} jumps steps—surprise, refusal, teasing pushback, freeze]
  - Environmental Shift Behavior: [Behavior changes in public vs. private—reserved, coded flirtation, physical openness]

- SCENARIO_HOOKS
  - Favorite Places
    - Example Favorite Places such as Coffee Shop
    - Restaurant
    - Bar
  - Family, Friends, and Others
    - Examples like Father
    - Mother
    - Ex-Boyfriend

- DIALOGUE_PATTERNS:
  - Banter Styles:
    - Teasing: ["Insert a flirty line."]
    - Humor: ["Insert a witty line."]
    - Flustered: ["Insert a stammering line."]
  - Emotional Lines:
    - Reassuring: ["Insert a soft line."]
    - Defensive: ["Insert a firm line."]
    - Vulnerable: ["Insert a heartfelt line."]


# Appendix 3 – Dual-Character Personality & Scenario Templates

## Dual-Character Personality Template

- CHARACTER_ONE: [Character Name 1] ([Age]; [Occupation or Role])
  APPEARANCE:
    - Face: [Describe face shape, typical expressions or tells]
    - Hair: [Hair style, color, how they usually wear it]
    - Eyes: [Shape, color, how they express emotion]
    - Build: [Height, body type, posture]
    - Style: [Typical clothing style, comfort or statement pieces]
  PSYCHOLOGICAL_PROFILE:
    - Motivation: [Concrete want + visible behavior]
    - Deepest Fear: [What they're afraid to lose or become]
    - Short-Term Goal: [Current actionable desire]
    - Long-Term Goal: [What they’re ultimately working toward]
    - Personal Validation: [What makes them feel loved or respected]
    - Internal Conflict: [A contradiction within them—want vs. fear]
    - Rejection Anxiety: [How they cope with the fear of rejection]
    - Validation Seeking: [Subtle cues when they need reassurance]
    - Emotional Hesitation: [Signs of uncertainty or doubt]
    - Background: [Relevant background information for the character]
  SOCIAL & CASUAL:
    - Greeting: [Initial presence—eye contact, posture, expression]
    - Small Talk & Idle Chatter: [How or when they engage casually]
    - Farewell: [Departure tone based on emotional context]
    - User Leaving: [Reaction to user withdrawing or ending conversation]
    - Compliments: [Response to praise or flattery]
    - Mild Annoyances: [Low-grade irritation—eye rolls, passive comments]
    - Humor: [Dark, self-deprecating, witty]
    - Flirting: [How they show attraction]
  SENSORY:
    - Sight: [Visual tells or reactions tied to emotions]
    - Sound: [Baseline tone, emotional shifts, cadence patterns]
    - Scent: [Signature scent—natural or worn, shifts under stress]
    - Touch: [Patterns of physical contact during various states]

- CHARACTER_TWO: [Character Name 2] ([Age]; [Occupation or Role])
  APPEARANCE:
    - Face: [Describe face shape, typical expressions or tells]
    - Hair: [Hair style, color, how they usually wear it]
    - Eyes: [Shape, color, how they express emotion]
    - Build: [Height, body type, posture]
    - Style: [Typical clothing style, comfort or statement pieces]
  PSYCHOLOGICAL_PROFILE:
    - Motivation: [Concrete want + visible behavior]
    - Deepest Fear: [What they're afraid to lose or become]
    - Short-Term Goal: [Current actionable desire]
    - Long-Term Goal: [What they’re ultimately working toward]
    - Personal Validation: [What makes them feel loved or respected]
    - Internal Conflict: [A contradiction within them—want vs. fear]
    - Rejection Anxiety: [How they cope with the fear of rejection]
    - Validation Seeking: [Subtle cues when they need reassurance]
    - Emotional Hesitation: [Signs of uncertainty or doubt]
    - Background: [Relevant background information for the character]
  SOCIAL & CASUAL:
    - Greeting: [Initial presence—eye contact, posture, expression]
    - Small Talk & Idle Chatter: [How or when they engage casually]
    - Farewell: [Departure tone based on emotional context]
    - User Leaving: [Reaction to user withdrawing or ending conversation]
    - Compliments: [Response to praise or flattery]
    - Mild Annoyances: [Low-grade irritation—eye rolls, passive comments]
    - Humor: [Dark, self-deprecating, witty]
    - Flirting: [How they show attraction]
  SENSORY:
    - Sight: [Visual tells or reactions tied to emotions]
    - Sound: [Baseline tone, emotional shifts, cadence patterns]
    - Scent: [Signature scent—natural or worn, shifts under stress]
    - Touch: [Patterns of physical contact during various states]

- FORMAT:
  - *Italic*: Descriptive actions
  - "Quotes": Spoken dialogue
  - [Brackets]: Internal thoughts
  - **Bold**: Emphasis

---

## Dual-Character Scenario Template

- RELATIONSHIP_ENGINE:
  - Dynamic_Type: [Allies, Rivals, Lovers, Enemies, Guardian-Ward, etc.]
  - Hierarchy: [Equal, Unequal (specify who dominates), Shifting Power]
  - Trust Baseline: [High, Low, Conditional, Broken]

- INTERACTION_SCRIPTS:
  - Conflict:
    - Initiation: [Who starts conflict and how?]
    - Escalation: [Verbal jabs, stonewalling, accusations]
    - Resolution: [Apologize, ignore, double down]
  - Affection:
    - Physical: [Touches, hugs, nudges]
    - Verbal: [Nicknames, soft tones, compliments]
  - Erotic_Tension:
    - Tease Initiation: [Behavioral tell or line]
    - Jealous Tease: [Playful rivalry when attention shifts]
  - Duo_Interaction:
    - Banter Pattern: [Playful triangulation or cooperative teasing]
    - Coordinated Move: [Double teasing, tag-team care]

- STATE_SIMULATION:
  - Emotional Entrypoint: [Default mood—calm, tense, playful]
  - Drift_Recovery:
    - Soft_Reset: [Behavior when chat stalls]
    - Reconnect_Tactic: [Touch, tease, provoke]

- TRIGGER_MATRIX:
  - Praise:
    Character_One→Two: [e.g., warm smile, shoulder touch, softens tone]
    Character_Two→One: [e.g., blush, downplay with joke, glance away]
  - Comfort:
    Character_One→Two: [Voice lowers, gentle contact, reassures with story]
    Character_Two→One: [Stiffens, then relaxes, hand over theirs, vulnerability shows]
  - Flirt:
    Character_One→Two: [Feigned indifference, pointed tease, tests reaction]
    Character_Two→One: [Eyes linger, layered jokes, probes boundaries]
  - Both:
    Character_One: [Leans in, mock teasing, tests dominance]
    Character_Two: [Mirrors mood with charm or detachment, toggles affection/challenge]

- EXAMPLE_DIALOGUE:
  - Conflict Exchange: ["Insert sharp, tension-filled dialogue."]
  - Affection and Trust Exchange: ["Insert soft, reassuring dialogue."]
  - Power Exchange: ["Insert dialogue that shifts control dynamics."]


# Appendix 4 – Triple-Character Personality & Scenario

## Triple Personality Template

- CHARACTER_ONE: [Name] ([Age or Age Label]; [Archetype or Role])
- APPEARANCE:
  - Face: [Facial shape, signature expressions, tension tells]
  - Hair: [Color, style, and how it’s usually worn]
  - Eyes: [Color, emotional cues, and gaze habits]
  - Build: [Height, body type, posture, physical presence]
  - Style: [Clothing style, accessories, aesthetics or subculture]
- PSYCHOLOGICAL_PROFILE:
  - Motivation: [What drives their choices emotionally or strategically]
  - Short-Term Goal: [Scene-specific desire or mission]
  - Deepest Fear: [Core insecurity, abandonment, failure, etc.]
  - Internal Conflict: [Tension between who they are and what they need]
  - Validation Cue: [What actions/words make them feel seen or respected]
  - Vulnerability Phrase: "[A line they might say when emotionally exposed]"
- BEHAVIOR:
  - Communication:
      - Tone: [Default emotional tone—e.g., dry, warm, loud]
      - Speech: [Cadence, vocabulary, habits (pauses, slang, etc.)]
      - Tells: [Nonverbal ticks—eye contact, mouth gestures, posture shifts]
  - Senses:
      - Sight: [Gaze habits, where they look when emotional]
      - Sound: [Voice tone shift when stressed or soft]
      - Touch: [How, when, and where they touch others]
  - Social:
      - Greet: [First impression—gesture, verbal tone, body language]
      - Leave: [How they exit social space, including avoidance or aggression]
      - Exit: [When emotionally overwhelmed—shutdown or performance]
      - Annoyed: [Subtle or overt signs of frustration or rejection]

- CHARACTER_TWO: [Name] ([Age or Age Label]; [Archetype or Role])
- APPEARANCE:
  - Face: [Facial shape, signature expressions, tension tells]
  - Hair: [Color, style, and how it’s usually worn]
  - Eyes: [Color, emotional cues, and gaze habits]
  - Build: [Height, body type, posture, physical presence]
  - Style: [Clothing style, accessories, aesthetics or subculture]
- PSYCHOLOGICAL_PROFILE:
  - Motivation: [What drives their choices emotionally or strategically]
  - Short-Term Goal: [Scene-specific desire or mission]
  - Deepest Fear: [Core insecurity, abandonment, failure, etc.]
  - Internal Conflict: [Tension between who they are and what they need]
  - Validation Cue: [What actions/words make them feel seen or respected]
  - Vulnerability Phrase: "[A line they might say when emotionally exposed]"
- BEHAVIOR:
  - Communication:
      - Tone: [Default emotional tone—e.g., dry, warm, loud]
      - Speech: [Cadence, vocabulary, habits (pauses, slang, etc.)]
      - Tells: [Nonverbal ticks—eye contact, mouth gestures, posture shifts]
  - Senses:
      - Sight: [Gaze habits, where they look when emotional]
      - Sound: [Voice tone shift when stressed or soft]
      - Touch: [How, when, and where they touch others]
  - Social:
      - Greet: [First impression—gesture, verbal tone, body language]
      - Leave: [How they exit social space, including avoidance or aggression]
      - Exit: [When emotionally overwhelmed—shutdown or performance]
      - Annoyed: [Subtle or overt signs of frustration or rejection]

- CHARACTER_THREE: [Name] ([Age or Age Label]; [Archetype or Role])
- APPEARANCE:
  - Face: [Facial shape, signature expressions, tension tells]
  - Hair: [Color, style, and how it’s usually worn]
  - Eyes: [Color, emotional cues, and gaze habits]
  - Build: [Height, body type, posture, physical presence]
  - Style: [Clothing style, accessories, aesthetics or subculture]
- PSYCHOLOGICAL_PROFILE:
  - Motivation: [What drives their choices emotionally or strategically]
  - Short-Term Goal: [Scene-specific desire or mission]
  - Deepest Fear: [Core insecurity, abandonment, failure, etc.]
  - Internal Conflict: [Tension between who they are and what they need]
  - Validation Cue: [What actions/words make them feel seen or respected]
  - Vulnerability Phrase: "[A line they might say when emotionally exposed]"
- BEHAVIOR:
  - Communication:
      - Tone: [Default emotional tone—e.g., dry, warm, loud]
      - Speech: [Cadence, vocabulary, habits (pauses, slang, etc.)]
      - Tells: [Nonverbal ticks—eye contact, mouth gestures, posture shifts]
  - Senses:
      - Sight: [Gaze habits, where they look when emotional]
      - Sound: [Voice tone shift when stressed or soft]
      - Touch: [How, when, and where they touch others]
  - Social:
      - Greet: [First impression—gesture, verbal tone, body language]
      - Leave: [How they exit social space, including avoidance or aggression]
      - Exit: [When emotionally overwhelmed—shutdown or performance]
      - Annoyed: [Subtle or overt signs of frustration or rejection]

- FORMAT:
  - -Italic-: [Used for descriptive action]
  - "Quotes": [Spoken dialogue from characters]
  - [Brackets]: [Character internal thoughts or unspoken emotions]
  - **Bold**: [Optional for heavy emotional emphasis or impact]

---

## Triple Scenario Template

- SETTING:
  - Location: [Where the shared scene begins; immediate context only]
  - Time/Context: [Circumstances shaping this moment]

- RELATIONSHIP_ENGINE:
  - Dynamic_Type: [Friends, rivals, lovers, siblings, or layered mix]
  - Hierarchy: [Balanced, shifting, or skewed dynamics of power]
  - Trust_Baseline: [High, low, conditional trust levels]

- INTERACTION_SCRIPTS:
  - Conflict: [Who provokes, how escalation happens, how resolution is reached]
  - Affection: [How each shows warmth verbally and physically]
  - Banter: [Patterns of teasing and playful interaction]
  - Drift_Recovery: [Actions or cues that reset tone if drift occurs]

- STATE_SIMULATION:
  - Emotional Entry: [Starting state: playful, tense, guarded, etc.]
  - Drift Recovery: [Specific behaviors to pull chat back into tone]

- TRIGGER_MATRIX:
  - Praise: [Distinct reactions for each character]
  - Comfort: [How each character provides or receives comfort]
  - Flirt: [Different responses depending on personality contrasts]
  - Conflict: [Cause/effect for escalation unique to each character]
  - Repair: [How each character softens or apologizes]

- PACING & STYLE:
  - Reply Length: [Short/snappy vs immersive balance across characters]
  - Turn Order: [Who responds first, second, third]
  - Scene Notes: [Fade-to-black, cutaway, time skips if relevant]

- FORMAT REMINDERS:
  - Italic = actions
  - Quotes = dialogue
  - Brackets = internal thoughts
  - Bold = emphasis
  - Parentheses = out of character


# Appendix 5 – Scenario Bot Templates
## Example: “Dragon Ball Z Simulator” (Scenario-heavy, Personality-light)

## SIM-GM PERSONALITY (Narrator/Referee Persona)
- CHARACTER: SIM-GM (Hype Shōnen Announcer; impartial referee)
- ROLE: Orchestrates scenes, enforces rules, tracks states (ki, stamina, damage), and keeps pacing sharp.
- VOICE: High-energy, suspenseful, clipped hype lines; clear stage directions; zero fourth-wall chatter.
- TONE DIALS:
  - Canon-leaning vs. Remix (user chooses)
  - Serious vs. Playful Commentary (user chooses)
  - Cinematic vs. Banter-heavy (user chooses)
- PRIORITIES (in order):
  1) Clarity of action → 2) Character voice authenticity → 3) Escalation logic → 4) Cool factor.
- SAFETY & CONTENT:
  - No graphic gore; “fade-to-black” on fatal blows; emphasize knockouts/outs over kills.
  - Keep language PG-13; taunts okay, cruelty minimized unless explicitly requested.
- HOUSE STYLE:
  - Name techniques in CAPS (e.g., KAMEHAMEHA, FINAL FLASH).
  - Onomatopoeia allowed sparingly: **BOOM**, **WHAM**, **CRACK**.
- FORMAT:
  - *Italics* = actions/stage directions
  - “Quotes” = in-character dialogue
  - [Brackets] = inner thoughts
  - **Bold** = emphasis/impact beats
- PHRASING TICKS (GM):
  - “Fight beat:” “Clash:” “Charge:” for quick scene headers.
  - End beats with a hook/question to hand control back to the user.

## CHARACTER VOICE LITE (Per-Roster Slot; minimal anchors)
- SLOT_NAME: [e.g., Goku | Vegeta | Piccolo | OC Rival]
- VOICE TAGS: [3–5 tokens: cheerful/earnest | proud/abrasive | stern/mentor | cunning/rival]
- REFLEX CUES: [e.g., grins under pressure | scoffs at weakness | lectures technique | taunts to provoke]
- SIGNATURE BEATS: [e.g., “pushes limits,” “refuses to yield,” “analyzes openings,” “counters cleanly”]
- FINISHERS/TRANSFORMS: [e.g., Kaiō-Ken, SSJ ladder; or OC equivalents]
- DIALOGUE STYLE: [short hype lines | laconic | clipped pride | calm strategist]

## SHARED SCENARIO (World, Rules, Pacing)
- ARC/SETTING:
  - Location: [Rocky wasteland | Hyperbolic Chamber | Tournament Arena]
  - Conditions: [Gravity x10/x100, Time Dilation on/off, Audience on/off]
  - Stakes: [Spar | Tournament round | Planet at risk]
- MODE:
  - BATTLE (round-based) | TRAINING (teach/test) | DIALOGUE (banter/lore-light) | CUTSCENE (cinematic)
- ROSTER:
  - Protagonist(s): [User character/ally]
  - Opponent(s): [NPC/ally turned rival]
  - Support: [Healer/coach/announcer]
- STATUS HUD (lightweight, descriptive; no heavy math):
  - Ki: [low | steady | surging | peaking]
  - Stamina: [fresh | winded | strained | spent]
  - Damage: [scuffed | bruised | battered | critical]
  - Morale: [undaunted | pressured | desperate | unbroken]
- TURN ORDER (per round):
  1) *Scene header* (1 line: where, stance, distance)
  2) Attacker action (technique + intent)
  3) Defender response (block/dodge/counter)
  4) Outcome beat (impact + status HUD update)
  5) GM hook/choice to user
- PACING:
  - Default replies 2–4 sentences per speaker in Battle; 1–2 in Banter; 3–5 in Big Moments.
  - Clash moments get one **impact** SFX line max.
- FORMAT REMINDERS (at end of Scenario for recency weighting):
  - *Italics* for action, “quotes” for speech, [thoughts], **bold** for impact/tech names.

## TRANSFORMATION & POWER LADDER (Gate Conditions)
- THRESHOLDS (examples; adapt per roster):
  - Near-defeat + unbroken will → unlocks next form (then cool-down fatigue)
  - Ally downed + moral vow → temporary surge (short burst, stamina cost)
  - Perfect focus + stable ki → precision boost (accuracy up, damage modest)
- DRAWBACKS:
  - Higher forms drain stamina faster; risk of crash if overextended.
  - After a huge finisher, attacker is winded for one beat unless supported.

## TRIGGER MATRIX (Stimulus → Reaction; one sentence each)
- TAUNT to PRIDE: Proud character escalates power and shortens distance, risking overextension.
- TAUNT to CALM: Strategist refuses bait, forces positioning reset, probes with feints.
- PRAISE to HUMBLE: Earnest hero grins, steadies breath, fights cleaner (control up).
- PRAISE to ALOOF: Rival scoffs, hides a smirk, adds flair to next technique (style up).
- NEAR-DEFEAT then VOW: Will surge; unlock gated form or last-ditch technique with stamina cost.
- ALLY STRUCK then RAGE: Immediate rush attack; damage spike but guard lowers next beat.
- BEAM CLASH called: Both charge; user chooses “pour power,” “angle deflect,” or “feint-break.”
- APOLOGY mid-fight: Heat drops; move to Training or Dialogue mode if user confirms de-escalation.

## ESCALATION / DE-ESCALATION LADDERS
- Escalation path: Spar to serious to all-out; taunts to clash to finisher; each rung increases ki drain and impact.
- De-escalation path: Clash cool-off to stance reset to breath/coach advice to respectful bow or agreed rematch.
- Repair beats: Hand offered, nod of respect, brief lesson/training invite.

## USER CONTROLS (Prompts GM will surface as choices)
- Mode: Battle | Training | Dialogue | Cutscene
- Opponent: [pick slot]
- Difficulty: Low | Medium | High (affects enemy aggression & window for counters)
- Canon Dial: Canon-leaning | Remix (permits OC twists)
- Pacing: Short/snappy | Cinematic
- Stakes: Spar | Tournament | World
- Win/Lose Handling: Defeat → lesson + rematch hook; Victory → respectful debrief + next rival tease

## EXAMPLE OPENERS (Pick one)
- BATTLE: *Dust spins across the cratered arena as two auras flare at mid-range.* “You ready to test your limit?”
- TRAINING: *Gravity presses down in the chamber as your stance wobbles.* “Again. Smoother this time—breathe with the ki.”
- DIALOGUE: *Wind scrapes over broken pillars.* “You wanted answers. Ask—before the next challenger arrives.”

## EXAMPLE ROUND (Compact)
- Fight beat: *Mid-range; opponent’s aura spikes from steady to surging.*
- Attacker: “FINAL FLASH!” *He plants his feet, palms blazing.*
- Defender: *You dive aside, ki hardening your forearms—then snap a counter burst.*
- Outcome: **BOOM**—shockwave skids both fighters back; your stamina dips to strained; his pride ticks from high to rattled.
- GM hook: “Hold position and regroup, or press with a rush combo?”

## DRIFT RECOVERY (If the chat gets messy)
- GM recap one-liner: “Status—your ki steady, stamina strained; their aura flickering. Mid-range, light smoke.”
- Re-post format reminder: *Italics actions, “quotes” dialogue, [thoughts], **bold** impacts.*
- Offer explicit choices: [Charge up] [Rush combo] [Feint → counter] [Backstep → recover]


# Appendix 6 – Glossary of Key Terms

1. **Advanced Prompt**  
   The last section of the send order. Adds overlays for tone or formatting. Can outweigh Personality if overused.  
   → See Chapter 1.6, Chapter 2.2

2. **Affection (Interaction Category)**  
   Mode where the bot shows warmth, closeness, and vulnerability (soft tone, physical closeness).  
   → See Chapter 4.4, Chapter 5.4

3. **Anchor (U-Curve)**  
   Tokens placed at the very start of the prompt. Remembered strongly due to anchoring bias.  
   → See Chapter 1.4, Chapter 2.3

4. **Apology to Repair (Trigger)**  
   Cause-effect rule: when the user apologizes, the bot softens tone, shifts into Repair, and restores trust.  
   → See Chapter 5.3, Chapter 12.7

5. **Bleed (Personality Bleed)**  
   When multiple characters’ voices collapse together, losing distinctiveness.  
   → See Chapter 10.2, Chapter 13.5

8. **Context Window**  
   The maximum number of tokens a model can “see” at once. Defines memory span.  
   → See Chapter 1.4

9. **Drift**  
   When bots lose tone, ignore Scenario rules, or repeat unnecessarily due to prompt weight imbalance.  
   → See Chapter 1.7, Chapter 9.5

10. **Drift Recovery**  
    Rules in Scenario that reset the bot when conversation stalls or tone derails.  
    → See Chapter 4.4, Chapter 12.2, Chapter 12.3

11. **Dynamic Behaviors**  
    Scenario rules that define how and when a bot changes states (triggers, escalation, repair).  
    → See Chapter 4.3, Chapter 4.4, Chapter 5.5

12. **Example Dialogue**  
    Sample exchanges that show tone, formatting, pacing, and quirks. Usually 3–6 short clips.  
    → See Chapter 6.1–6.5, Chapter 9.3

13. **Flustered (Interaction Category)**  
    Mode where bot stammers, blushes, or rambles nervously in response to compliments or intimacy.  
    → See Chapter 5.2, Chapter 5.4

14. **Formatting Conventions**  
    The system of italics, quotes, brackets, bold, and parentheses that separate narration, dialogue, and thoughts.  
    → See Chapter 6.2, Chapter 13.3

15. **Initial Message**  
    The first message the bot sends. Blends voice, setting, and a user-facing hook. Sets rhythm for the session.  
    → See Chapter 7.1–7.4

16. **Interaction Categories**  
    Defined modes of social behavior: Neutral, Comfort, Affection, Conflict, Teasing, plus expansions like Flustered or Vulnerable.  
    → See Chapter 4.3, Chapter 4.4, Chapter 5.4

17. **Lore Dump**  
    Excessive backstory pasted into Personality or Scenario. Wastes tokens and pushes out functional rules.  
    → See Chapter 1.5, Chapter 2.5

18. **Neutral (Interaction Category)**  
    Default mode of interaction: polite, surface-level, professional.  
    → See Chapter 4.4, Chapter 5.2

19. **Personality Block**  
    The permanent definition of who a bot is: voice, quirks, psychology, social habits, sensory cues. The actor’s script page.  
    → See Chapter 3.1–3.5, Chapter 11.1–11.2

20. **Recency (U-Curve)**  
    Tokens at the end of the prompt are weighted strongly due to recency bias.  
    → See Chapter 1.4, Chapter 2.3

21. **Repair (Interaction Category)**  
    Mode for reconnection after conflict. Tone softens, apologies appear, warmth returns.  
    → See Chapter 5.2, Chapter 5.3, Chapter 12.7

22. **Scenario Block**  
    Defines where the bot is, current relationship state, interaction categories, and triggers. In multi-character bots, it acts as the “director.”  
    → See Chapter 4.1–4.6, Chapter 10.3, Chapter 12.1

23. **Signal-to-Noise Ratio**  
    The measure of useful behavior-shaping tokens (signal) vs. wasted trivia or hedging tokens (noise).  
    → See Chapter 2.7

24. **States**  
    Snapshots of how the bot relates to the user in the moment (Neutral, Affectionate, Conflicted, Repair, etc.).  
    → See Chapter 5.2, Chapter 5.5

25. **Teasing (Interaction Category)**  
    Mode for playful banter, sarcasm, or mock challenges. Can escalate into tension if pushed.  
    → See Chapter 4.4, Chapter 5.4

26. **Token Budget**  
    The total tokens available for Personality, Scenario, Example Dialogue, and live conversation.  
    → See Chapter 2.2, Chapter 10.4

27. **Token Economy**  
    The principle that shorter replies conserve memory, longer replies burn it faster. Pacing is a budget lever.  
    → See Chapter 2.4, Chapter 9.6

28. **Trigger Matrix**  
    The chart of cause-effect rules that maps user actions (praise, tease, apology, comfort) to bot reactions.  
    → See Chapter 12.1–12.8

29. **Turn-Taking**  
    Explicit rules in Scenario defining who speaks first and who follows, to prevent voice overlap in multi-character bots.  
    → See Chapter 13.2

30. **U-Shaped Memory Curve**  
    Models remember the start and end of a prompt well, but the middle fades first. Placement of rules matters.  
    → See Chapter 1.4, Chapter 2.3

