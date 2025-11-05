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
![trigger-map.png](../images/trigger-map.png)
