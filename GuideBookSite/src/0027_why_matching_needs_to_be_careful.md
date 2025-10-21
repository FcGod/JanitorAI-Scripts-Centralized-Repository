## 🟡 Why Matching Needs to Be Careful

At first glance, you might think:

> “Just check if the user’s message contains the word!”

But computers are picky. Look at this:

* User types: **“Hello there!”**
* If we only check for lowercase **“hello”**, we’ll miss it.
* If we check for **“hell”**, we might accidentally match **“shells.”**

That’s why we need **safe matching**.

---
