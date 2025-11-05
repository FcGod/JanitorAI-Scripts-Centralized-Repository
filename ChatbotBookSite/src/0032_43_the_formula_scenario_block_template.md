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
![scenario-block-stage-directions.png](../images/scenario-block-stage-directions.png)
