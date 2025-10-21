# 📘 Appendix C: Copy-Paste Templates

**Error Guard Starter**
`context.character = context.character || {};`
`context.character.personality = context.character.personality || "";`
`context.character.scenario    = context.character.scenario || "";`

**Everything Lorebook Starter**
`var lorebook = {`
`people: [],`
`places: [],`
`traits: [],`
`events: []`
`};`

**Weighted Choice Function**
`function weightedChoice(options) {`
`var roll = Math.random(), total = 0;`
`for (var i = 0; i < options.length; i++) {`
`total += options[i].chance;`
`if (roll < total) return options[i].text;`
`}`
`return "";`
`}`

---
