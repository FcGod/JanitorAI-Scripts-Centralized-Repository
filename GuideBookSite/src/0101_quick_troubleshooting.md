## 🟡 Quick Troubleshooting

* **“My script does nothing”** → You probably used an unsupported feature (e.g., `.includes`)
* **“It’s repeating the same trait a lot”** → Add a check (`if (!context.character.personality.includes("trait"))`)
* **“It’s too slow”** → Cut down loops or break earlier
* **“It forgot what I told it”** → Remember: fake memory by writing into `scenario`

---
