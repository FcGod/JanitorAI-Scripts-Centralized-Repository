## 🟡 Step 5: Add Time-of-Day Flavor

Let’s make night feel sleepy, day feel lively.

var hour = new Date().getHours();

if (hour < 6 || hour > 22) {
context.character.personality += ", a bit sleepy.";
context.character.scenario += " It's late at night, and everything feels quiet.";
} else {
context.character.personality += ", alert and energetic.";
context.character.scenario += " The world outside is lively.";
}

Plain English:

* Early morning / late night → sleepy
* Daytime → energetic

---
