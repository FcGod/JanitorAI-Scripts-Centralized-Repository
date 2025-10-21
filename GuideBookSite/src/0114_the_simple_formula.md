## 🟡 The Simple Formula

You can check message count with two conditions:

var count = context.chat.message\_count;

if (count >= 5 && count <= 15) {
context.character.scenario += " They seem hesitant to share anything personal yet.";
}

Plain English:

* If message count is **between 5 and 15** → add this scene note
* Outside that range → nothing happens

---
