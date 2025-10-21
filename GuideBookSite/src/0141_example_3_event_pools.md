## 🟡 Example 3: Event Pools

var events = \[
" A phone rings suddenly in the distance.",
" Thunder rumbles faintly overhead.",
" Someone knocks at the door unexpectedly."
];

if (Math.random() < 0.15) {
var pick = events\[Math.floor(Math.random() \* events.length)];
context.character.scenario += pick;
}

Plain English:

* 15% of the time → grab a random “ambient beat” from the pool
* This creates a rotation of surprises

---
