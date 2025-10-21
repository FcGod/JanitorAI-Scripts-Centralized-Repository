## 🟡 Trick 2: Storing Interests (Likes and Dislikes)

We can also detect hobbies, foods, or other favorites.

var last = context.chat.last\_message.toLowerCase();
var likes = \["pizza", "movies", "music", "hiking"];
var dislikes = \["spiders", "loud noises", "crowds"];

for (var i = 0; i < likes.length; i++) {
if (last.indexOf(likes\[i]) !== -1) {
context.character.personality += ", remembers the user likes " + likes\[i];
context.character.scenario += " They bring up " + likes\[i] + " as a friendly topic.";
}
}

for (var j = 0; j < dislikes.length; j++) {
if (last.indexOf(dislikes\[j]) !== -1) {
context.character.personality += ", remembers the user dislikes " + dislikes\[j];
context.character.scenario += " They avoid mentioning " + dislikes\[j] + ".";
}
}

Plain English:

* If the user says they like pizza → the bot remembers and might mention it
* If they say they dislike spiders → the bot avoids that topic
* These get added into personality and scenario as notes

---
