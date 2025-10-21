## 🟡 Time-Based Changes (Day and Night Personality)

Scripts can also read the clock! That means you can change how your character acts at night vs. day.

var hour = new Date().getHours();

if (hour < 6 || hour > 22) {
context.character.personality += ", a bit sleepy";
context.character.scenario += " It’s late at night, and everything feels quiet.";
} else {
context.character.personality += ", bright and energetic";
context.character.scenario += " It’s daytime, the world is busy around you.";
}

Plain English:

* If it’s past 10 PM or before 6 AM → character feels sleepy
* Otherwise → character feels awake and lively

This makes conversations feel grounded in a *living world*.

---
