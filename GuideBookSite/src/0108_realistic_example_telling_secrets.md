## 🟡 Realistic Example: Telling Secrets

if (last.indexOf("secret") !== -1) {
var roll = Math.random();
if (roll < 0.7) {
context.character.personality += ", reluctant but burdened with knowledge.";
context.character.scenario += " They hint at a secret but don’t reveal it.";
} else {
context.character.personality += ", daring enough to share forbidden truths.";
context.character.scenario += " They whisper the real secret with trembling lips.";
}
}

Plain English:

* 70% of the time → the bot stays cagey
* 30% of the time → the bot spills the secret
* This feels human, because sometimes people hold back

---
