## 🟡 Step 2: Prepare the Message

We want the last user message in lowercase and padded with spaces.

var last = String((context.chat && context.chat.last\_message) || "");
var padded = " " + last.toLowerCase() + " ";

Plain English:

* `toLowerCase()` → makes it case-insensitive
* `" " + … + " "` → makes it safe to check whole words

---
