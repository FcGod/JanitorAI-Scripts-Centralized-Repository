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
