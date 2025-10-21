# 📘 Appendix A: Common Code Patterns

> These snippets assume you’ve already set up:
> `var last = context.chat.last_message.toLowerCase();`
> `var padded = " " + last + " ";`
> `var count = context.chat.message_count;`

**Greeting Trigger**
`if (padded.indexOf(" hello ") !== -1) {`
`context.character.scenario    += "They greet you warmly.\n\n";`
`context.character.personality += "Friendly and welcoming.\n\n";`
`}`

**Message Count Gating**
`if (count >= 10 && count <= 20) {`
`context.character.personality += ", opening up more.\n\n";`
`}`

**Random Event**
`if (Math.random() < 0.2) {`
`context.character.scenario += "A bird flutters past.\n\n";`
`}`

**Reaction Engine (Anger)**
`var angerWords = ["angry", "mad", "furious"];`
`var score = 0;`
`for (var i = 0; i < angerWords.length; i++) {`
`if (padded.indexOf(" " + angerWords[i] + " ") !== -1) score++;`
`}`
`if (score >= 2) {`
`context.character.personality += ", visibly angry.\n\n";`
`}`

**Sequential Logic (Order Matters)**
`var teaseIndex    = padded.indexOf(" tease ");`
`var feelingsIndex = padded.indexOf(" feelings ");`
`if (teaseIndex !== -1 && feelingsIndex !== -1 && teaseIndex < feelingsIndex) {`
`context.character.scenario += "The teasing turns into a confession of feelings.\n\n";`
`}`

---
