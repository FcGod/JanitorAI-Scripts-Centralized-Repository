## 🟢 Level 6: Scenario Lorebook (personality + scene)

```js
const lorebook = [
  { keywords: ["godfather"], personality: ", calculating and powerful", scenario: "The Godfather is in a tense meeting." },
  { keywords: ["family"],    personality: ", loyal to family above all", scenario: "The mafia family spreads through the city." }
];

for (const entry of lorebook) {
  if (entry.keywords.some(k => lastMessages.includes(` ${k} `))) {
    context.character.personality += entry.personality;
    context.character.scenario    += entry.scenario;
  }
}
```

---
