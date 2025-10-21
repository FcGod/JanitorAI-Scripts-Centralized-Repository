## 🟢 Level 5: Simple Lorebook (with Priorities)

```js
const lorebook = [
  { keywords: ["godfather", "damien"], priority: 10, personality: ", a calculating and charismatic leader" },
  { keywords: ["mafia", "family"],     priority:  5, personality: ", part of a powerful crime family" }
];

const activated = lorebook.filter(entry =>
  entry.keywords.some(k => lastMessages.includes(` ${k} `))
);

if (activated.length) {
  activated.sort((a, b) => b.priority - a.priority);
  context.character.personality += activated[0].personality;
}
```

Plain English:  
Checks across recent messages so multi-turn mentions still activate the same lore.

---
