# 📘 Glossary of Key Terms

- **Append (`+=`)** → Adding text onto the end of an existing field, instead of replacing it. Example: `personality += ", happy"` adds without deleting what was already there.
- **Sandbox (Boundary)** → The controlled environment where scripts run. It enforces limits (older JavaScript/ES5, short strings, lean loops).
- **Context Guards** → A short snippet at the start of a script that ensures `personality` and `scenario` exist, preventing crashes.
- **Dynamic Lore** → Lore that changes depending on time, message count, probability, or other triggers.
- **Event Lore** → Story beats or ambient details that happen at certain counts, randomly, or independently of user input.
- **Everything Lorebook** → A modular structure for organizing lore entries into categories like people, places, traits, and events.
- **Gating** → Unlocking traits, events, or lore only when message count passes certain thresholds (min/max).
- **Hybrid Emotional States** → When two or more emotions blend into a mixed mood (e.g., excited + scared = nervous excitement).
- **indexOf** → The safe ES5 method to check if a string contains a word. Example: `padded.indexOf(" happy ") !== -1`.
- **Keywords** → Words that trigger specific lore entries or reactions.
- **Lorebook** → A collection of entries that add personality/scene details based on triggers.
- **Negation** → Detecting when a word is canceled by “not” or “don’t.” Example: “not happy” ≠ happy.
- **Padded input** → Adding spaces before and after text (`" " + text + " "`) so word checks are safe (avoids matching “hat” inside “that”).
- **Personality** → The part of the character definition that describes *who they are.* Scripts can append to it during conversation.
- **Polarity** → Positive/negative scoring in reaction engines (e.g., love = +2, hate = –2).
- **Probability** → Adding randomness with `Math.random()`, making some responses happen only sometimes.
- **Reaction Engine** → A script that scores multiple words (and sometimes polarity/negation) to determine emotional states, rather than a simple on/off trigger.
- **Scenario** → The part of the character definition that describes *what’s happening around them.* Scripts can append events, places, or lore here.
- **Sequential Logic** → Checking if two or more words appear in a specific order (e.g., “tease” → “feelings”).
- **Shifts** → Variants of a lore entry that change based on secondary keywords (e.g., “magic” with “stars” = light magic; “magic” with “shadows” = dark magic).

---
