// ==QUICK REFERENCES FOR BASICS==
// Use the guide if you want explanations. This is if you know how to use them but need a quick reminder of syntax.

//== JAI API ==
//
// context.character
context.character.personality; // Character personality traits are to be added here.
context.character.scenario; // Scenario scene details are to be added here.
context.character.name // Actual name of character
context.character.chat_name //Nickname of character shown in chat
context.character.example_dialogs //Practice lines
//use += to add to personality/scenario. Example: context.character.personality += "They greet you warmly"
//
// context.chat
context.chat.last_message; // Contains the last user message(s) - Multiple if you for-loop it.
context.chat.message_count //Total messages exchanged. Good for iteration. Like "check all messages or half of them, etc..."
context.chat.first_message_date // When chat begun
context.chat.last_bot_message //When bot last replied. Could be good if they didn't talk in days so they respond 'ah its been a while' for example.


//== JavaScript Usefull functions that are safe==
Reference Page: 8/45
var name = thingy; //Create a variable. A piece of paper that has a name for indentification (name) and content (thingy) to use.
//Example: var last = context.chat.last_message.toLowerCase(); is a variable under the name of (last) that keeps the last message sent in lower cases.

.toLowerCase() //As name states. "Hello, HElLo, HELLO" -> hello
.indexOf("Word/Sentence here") !== -1; //If specific word/sentence is found. Ex: indexOf("hello") !== -1 searches if message contains hello
.trim() //Remove whitespace/spacebars from start and end of string. "   Hello world!   " -> "Hello world!"
Operators: + add, - remove, * multiply, / divide, ++ increase by 1, -- decrease by 1
Math.random() // random number generator. By default between 0 and under 1. [0,1) range.
  //Additional examples. Random integer (full number) generator. Math.floor(Math.random()* Range); so if set range to 3 then 0,1,2 are possible outputs.
Math.floor() // Round numbers down (Not remove decimals. Look at negative numbers) Ex: 5.95 -> 5, 5.00 -> 5 AND -5.05 -> -6 so its lowest whole number.
.length() //Returns how many elements are in the array/list. Say you got names_list = ["Maria", "Annabelle", "Gigi"]; then names_list.length() returns 4.
new Date() //
.getHours() //
Regex: You need a whole separate guide for that. A must-learn if you plan to get serious. Example: /\bhello\b/i.test(text)


console.log() //Debugging information
//Console.log examples
console.log("Last message was:", context.chat.last_message);
console.log("Total messages:", context.chat.message_count);
console.log("Current personality:", context.character.personality);


// == EXAMPLE FUNCTIONS THAT ARE COMMONLY USED ==
// Explanations found in Guide. Only starting page is provided as reference, scroll down for more

//Safe Matching for word recognition PAGE 10
//Single word Matching
if (padded.indexOf(" word ") !== -1) {
  //YOUR_CODE_HERE
}
//Multiple possible words matching - Multiple greetings/emotional detection/etc..
var multi_word_array = ["word1", "word2", "word3"];
for (var index = 0; i < multi_word_array.length; index++) {
  if (padded.indexOf(" " + multi_word_array[index] + " ") !== -1) {
    //YOUR_CODE_HERE
    break;
  }
}
// Multi-Words required. Like "Night and Forest" to describe the forest at night
if (padded.indexOf(" word1 ") !== -1 && padded.indexOf(" word2 ") !== -1) {
  //YOUR_CODE_HERE
}

//Emotional Progress OR delayed secret insertion and so forth based on message count. PAGE 12
// if (context.chat.message_count > 10) {
 context.character.personality += "-YOUR_TEXT_HERE-";
} //Advanced variant at page 14

//Fake memory remembering OR likes/dislikes PAGE 16
var last = context.chat.last_message.toLowerCase();
if (last.indexOf("my name is") !== -1) {
  var match = context.chat.last_message.match(/my name is (\w+)/i);
  if (match) {
    context.character.scenario += " Remember: the user's name is " +
      match[1] + ".";
  }
}

var last = context.chat.last_message.toLowerCase();
var likes = ["pizza", "music", "movies"];
var dislikes = ["spiders", "crowds"];
for (var i = 0; i < likes.length; i++) {
  if (last.indexOf(likes[i]) !== -1) {
    context.character.personality += ", remembers the user likes " +
      likes[i];
  }
}
for (var j = 0; j < dislikes.length; j++) {
  if (last.indexOf(dislikes[j]) !== -1) {
    context.character.personality += ", avoids mentioning " + dislikes[j];
  }
}

//Use context.character.personality += ", seems to remember details from earlier."; every once in a while to give it a more consistent tone if you want it ref. prev messages.

//Random event(s). To convert x% chance to decimal just do 0.x. Example 12.34% is 0.1234 or 45.55% is 0.4555. This one is 20% for example.
// One event
if (Math.random() < 0.2) {
  //YOUR_CODE_HERE
}
// Possible events -- EQUAL chance for each to happen. PAGE 19
var events = [
  " YOUR_TEXT_HERE",
  " YOUR_TEXT_HERE",
  " YOUR_TEXT_HERE"
];
if (Math.random() < 0.15) {
  var pick = events[Math.floor(Math.random() * events.length)];
  context.character.scenario += pick;
}

// Possible events -- WEIGHTED chance for each to happen. Higher weight/chance means higher chance to happen. PAGE 21
var options = [
  { chance: 0.6, text: " YOUR_TEXT_HERE" },
  { chance: 0.3, text: " YOUR_TEXT_HERE" },
  { chance: 0.1, text: " YOUR_TEXT_HERE" }
];
var roll = Math.random();
var total = 0;
for (var i = 0; i < options.length; i++) {
  total += options[i].chance;
  if (roll < total) {
    context.character.scenario += options[i].text;
    break;
  }
}

// Real life time awareness. So if its night for you, bot acts more sleepy too for example. PAGE 25
var hour = new Date().getHours(); //this gets current irl time.
if (hour < 6 || hour > 22) {
  context.character.personality += ", YOUR_TEXT_HERE";
  context.character.scenario += " YOUR_TEXT_HERE";
} else {
  context.character.personality += ", YOUR_TEXT_HERE";
  context.character.scenario += " YOUR_TEXT_HERE";
}

// == LOREBOOKS TEMPLATES ==
// SIMPLE

//Flat lorebook PAGE 27

var lore = [
 { key: "key1", text: " YOUR_TEXT_HERE" },
 { key: "key2", text: " YOUR_TEXT_HERE" },
 { key: "key3", text: " YOUR_TEXT_HERE" }
];
for (var i = 0; i < lore.length; i++) {
 if (padded.indexOf(" " + lore[i].key + " ") !== -1) {
 context.character.scenario += lore[i].text;
 break;
}

//Hierarchy Lorebook

  var lorebook = {
    category_1: [
      { key: "key1", text: " YOUR_TEXT_HERE" },
      { key: "key2", text: " YOUR_TEXT_HERE" }
    ],
    category_2: [
      { key: "key3", text: " YOUR_TEXT_HERE" },
      { key: "key4", text: " YOUR_TEXT_HERE" }
    ]
  };

  //Everything Lorebook Core

  var everything = {
    people: [
      { key: "key1", text: " They think fondly of their friend." },
      { key: "key2", text: " Tension sharpens their tone." }
    ],
    places: [
      { key: "key3", text: " The trees whisper with hidden life." },
      { key: "key4", text: " The streets buzz with distant noise." }
    ],
    moods: [
      { key: "happy", text: " Their steps feel light." },
      { key: "sad", text: " Each word feels slower." }
    ]
  };

  for (var group in everything) {
    var entries = everything[group];
    for (var i = 0; i < entries.length; i++) {
      if (padded.indexOf(" " + entries[i].key + " ") !== -1) {
        context.character.scenario += entries[i].text;
        break;
      }
    }
  }

for (var group in lorebook) {
  var entries = lorebook[group];
    for (var i = 0; i < entries.length; i++) {
      if (padded.indexOf(" " + entries[i].key + " ") !== -1) {
        context.character.scenario += entries[i].text;
        break;
      }
    }
}

// ==REACTION ENGINES==

//adaptive
  var score = 0;
  if (padded.indexOf(" insult ") !== -1) score += 2;
  if (padded.indexOf(" compliment ") !== -1) score -= 1;
  if (padded.indexOf(" thank ") !== -1) score -= 1;
  if (Math.random() < 0.2) score += 1; // occasional temper
  if (score >= 2) {
    context.character.personality += "YOUR_TEXT_HERE";
  } else if (score <= -1) {
    context.character.personality += ", apI
  }


// == CAPSTONE PROJECT PAGE 41 ==

  // CAPSTONE DEMO SCRIPT
  var last = context.chat.last_message.toLowerCase();
  var padded = " " + last + " ";
  var count = context.chat.message_count;
  var hour = new Date().getHours();
  // --- Weighted emotion reaction ---
  var mood = "neutral";
  if (padded.indexOf(" happy ") !== -1) mood = "happy";
  if (padded.indexOf(" sad ") !== -1) mood = "sad";
  if (Math.random() < 0.1) mood = "tired"; // small random variance
  // --- Basic pacing ---
  if (count < 10) {
    context.character.personality += ", polite and measured.";
  } else if (count < 25) {
    context.character.personality += ", more relaxed now.";
  } else {
    context.character.personality += ", speaks freely and openly.";
  }
  // --- Time-based tone ---
  if (hour < 6 || hour > 22) {
    context.character.scenario += " It's quiet and dark outside.";
  } else {
    context.character.scenario += " Sunlight glows across the room.";
  }
  // --- Simple lorebook system ---
  var lore = [
    { key: "forest", text: " The trees hum softly in the breeze." },
    { key: "river", text: " A soft current ripples nearby." },
    { key: "storm", text: " Thunder murmurs far in the distance." }
  ];
  for (var i = 0; i < lore.length; i++) {
    if (padded.indexOf(" " + lore[i].key + " ") !== -1) {
      context.character.scenario += lore[i].text;
      break;
    }
  }
  // --- Adaptive twist based on mood ---
  if (mood === "happy") {
    context.character.scenario += " Everything feels alive and bright.";
  } else if (mood === "sad") {
    context.character.scenario += " The world feels muted and slow.";
  } else if (mood === "tired") {
    context.character.scenario += " Each sound echoes a bit too long.";
  }
  // --- Random world events ---
  if (Math.random() < 0.05) {
    var events = [
      " A bell rings somewhere unseen.",
      " The lights flicker for a moment.",
      " A shadow passes silently by."
    ];
    var e = events[Math.floor(Math.random() * events.length)];
    context.character.scenario += e;
  }
