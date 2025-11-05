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
