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
