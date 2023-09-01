const express = require("express");
const db = require("../models");

const router = express.Router()

// NPC Seeds
const seedData = [
    {
        name: "Joe",
        flavorDialogue: [["Oh, jeez.", "I love cats I love every kind of cat", "Always be coding."], ["Do you want to buy my book? It's called 101 Manatee Jokes.", "I know my fonts, and Papyrus is the worst font.", "You can't come back from the Land of Sam's Canned Ham Yams, man."], ["HEY, JERKWAD--Ooops, sorry! That was my cat.", "Do you want to have a man bun contest?", "Hey, do you have any birdwatching tips? I'm really into birdwatching lately."]],
        usefulDialogue: [["Welcome! You are entering a world of magic---well, magic that is made up of data, computer science and algorithms. I swear, it's a lot cooler than it sounds. I am Joe, the Dev Wizard, and this is Castle Full Stack. One day, perhaps you will possess all the knowledge held in these walls, but for now, let's focus on one thing: algorithms. Seek out the Wizard Assistants in the castle, and they will share their coding knowledge with you. Each Wiz will present you with a question. If you answer correctly, they will give you a salmon. Why a salmon, you ask? Because I used to be a marine biologist, and I find them soothing. When you have collected three salmon, return to me and test what you have learned--but, BE WARNED! If you return without sufficient salmon to complete my task, I shall not be amused. Good luck, and remember the most important thing: Always Be Coding.", "You're just in time for a reading from my book, 101 Manatee Jokes. What's a manatee's favorite drink? Bet you can't guess.", "EARL GREY MANA-TEA! Ah-HA, what a knee-slapper. Anyway, I had my doubts, but you have earned the right to 'Enscribe' your code upon the tablet below. But be warned! If you do not follow my directions, your answer will be wrong and you shall be doomed forevermore to wander the Land of the Lost Closing Parentheses. Now gaze upon the tablet, and follow my rules three: Do not wrap your function in curly brackets, do not write 'function', and whatever you do, DO NOT type '=>'. If you do, it will break, and I am just a sprite, so there is nothing I can do to help you. If your challenge is 'Write code to add two numbers together', your answer should be 'return a+b'.", "You did it! Snaps for you, and remember, Always Be Coding.", "Not quite. I'm muting the room so you can try again."], ["You again, huh? You know the drill. Don't talk to me till you have three salmon.", "How many times do I have to tell you? Go away!", "Wow, didn't expect you back here. Here's your algorithm. Remember, if the question is 'Write code to add two numbers together', your answer should be 'return a+b'. There's nothing I can do to help if you break it, so follow directions and you'll be fine.", "Nice work, man! Just think, three months ago you'd never even see an HTML tag, and just look at you now!", "I don't think you've always been coding."], ["Welcome back! If you get three salmon, maybe I'll show you a picture of my cat.", "Hey, just because we're cool now doesn't mean you can push it. Get three salmon first.", "Final question! Remember, don't break it. If the question is `Write code to add two numbers together', your answer should be 'return a+b'. I'm counting on you.", "Hey, nice job! As a prize for completing the final challenge, I present you with the ultimate gift: A joe.joe email address.", "You're good, but not good enough. Try again, man."]]

    },
    {
        name: "Aslan",
        flavorDialogue: [["Hey, hey!", "For the love of god", "Keep up the good work!"], ["Did you see Zac's awesome fire room yet? How come he gets an awesome fire room and I get this lame room full of dirt?", "Go away, I'm making a Joe collage for Funky Background Friday.", "*holds up scissors* Joe is going to lose the man bun contest."], ["Hurry up! Zac's dog is going to eat your salmon.", "I've got some opinions on fonts myself, but I'd rather not say.", "Hey. Can I tell you a secret? *whispers* I don't like cats."]],
        usefulDialogue: [["Hey, hey! Welcome to my room. Would you like a salmon? I'd love to give it to you, but first I have a very important question.", "You got it! Go and see the rest of the team, and keep up the good work!", "C'mon, man, you know better than THAT. No salmon for you.", "Sorry, man, I'm all out of salmon."], ["Welcome back, man! I've got another salmon for you, if you can answer this question.", "Nice job! Salmon for you!", "Nope. I'm not mad, I'm just disappointed.", "That was my last salmon. Maybe next time!"], ["You again! Here's your third question. I'm rooting for you!", "Great work, man! Keep it up!", "Nah, no salmon for you, dude.", "That was it. No more salmon. You'll have to go see someone else."]]
    },
    {
        name: "Zac",
        flavorDialogue: [["Howdy!", "Have you heard of yams? Then boy, have I got a treat for you. CANNED yams.", "Wanna try out my new sticks?"], ["Get outta here, I'm trying to eat my nefarious fish. It's like fish, but it's nefarious.", "Allright, so canned yams are okay, but hear me out. Canned yams--no, listen--with HAM. Think about it.", "Do I have a man bun? It's a mystery."], ["Hey, don't tell anyone, but....*whispers* I like Papyrus.", "I'll do anything for a good Star Wars reference.", "This here's my partner Sam. Our business is simple: Sam's Canned Ham Yams. It's gonna be huge."]],
        usefulDialogue: [["Oh hey, didn't hear you come in! I was busy pounding the skins! Anyway, you're just in time. I've got a salmon for you, but Billie--you know my dog, Billie? She ate your salmon. Answer this question, and she'll give it back.", "You got it right! Hi-hats off to you, man. If you go see Denis next, make sure he's had his mac and cheese or you're not gonna like what happens.", "Ah, not quite. Gosh, now I'm gonna have to take Billie to the vet.", "I don't have any more salmon for ya, man."], ["Hey, welcome back! Listen to this: *insert killer drum solo here* Anyway...", "Right on, man! You're so close, just gotta get a few more salmon!", "Looks like it wasn't a salmon after all, just a bunch of nefarious fish.", "I already told you, Billie ate the salmon. Go see someone else."], ["Howdy, howdy! Back again, eh? Well, I'll surely stump ya this time!", "Boo-yah! Right again! You're on a roll, buddy!", "Oh, c'mon. You made it this far, you can do better than THAT.", "Ain't got no more salmon, friend."]]
    },
    {
        name: "Denis",
        flavorDialogue: [["You can't judge a book by its cover. For example, this book looks innocent enough...but it's actually my new book, 102 Manatee Jokes. Don't tell Joe.", "*appears silently*", "You know, it is what it is."], ["I know who's going to win the man bun contest. I'm not saying, though.", "I don't wanna hear any more about the ham yams!", "..."], ["You've gotta crack a few eggs to make an omelete, that's what I always say.", "What's this cat doing in my burger?", "Wanna know another secret? Zac doesn't have a dog."], ["I've been around the world a few times, and I know the real worst font. Is it Papyrus? Who's to say.", "Cats? Tacos? Six to one, half a dozen to another in my book.", "Hey, guess what? Aslan doesn't like cats."]],
        usefulDialogue: [["Hey there! I've got some mac and cheese in the oven, so we'll make this quick.", "Great work! Here's your salmon. Now, back to my mac and cheese.", "Nope. Try again. Be quick!", "That was my only salmon. There's no such thing as a free lunch, man. Not even my mac and cheese."], ["Man, I was JUST about to eat this mac and cheese! Ugh, allright, here's your next question.", "That's right! Nice work. You might get out of here in one piece after all.", "Nope, wrong. Cutting corners won't help you here.", "If you want another salmon, you're all out of luck. Go see Aslan, but don't mention his man bun."], ["Ugh, SERIOUSLY?! I have this mac and cheese here, which remains UNEATEN, but I guess I'm asking you questions now!", "Wow, good work! Here's my last salmon, for real this time.", "Nope, wrong. Guess I'm feeding my salmon to Zac's dog after all.", "No more salmon! Looks like you're up the creek without a paddle."]]
    }
]

// Seed NPCs
router.get("/seednpc", (req, res) => {
    db.Npc.create(seedData).then(data => {
        data ? res.status(200).send(`Congratulations! You have created: ${JSON.stringify(data, null, 2)}`) : res.status(404).send("You have FAILED!")
    }).catch(err => {
        err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Success!")
    });
});

// All NPC characters
router.get("/api/npc", (req, res) => {
    db.Npc.find({}).then(data => {
        data ? res.json(data) : res.status(404).send("You have FAILED!")
    }).catch(err => {
        err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Success!")
    });
});

module.exports = router;


