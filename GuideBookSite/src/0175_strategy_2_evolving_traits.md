## 🟡 Strategy 2: Evolving Traits

Replace or upgrade personality notes as time goes on.

Example code:

if (padded.indexOf(" trust ") !== -1) {
if (count < 15) {
context.character.personality += ", cautious about trust.\n\n";
} else {
context.character.personality += ", openly trusting now.\n\n";
}
}

📖 **Plain English:**
The same keyword (“trust”) means **different things** early vs. later in the chat.

---
