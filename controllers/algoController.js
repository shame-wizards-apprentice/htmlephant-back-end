const express = require("express");
const db = require("../models");

const router = express.Router()

// Algorithm Seeds
const seedAlgo = [
    {
        "algorithm": "Write code to print the first character in a given string that is not a duplicate.",
        "question1": "A common whiteboard prompt will ask you to find the first NON-repeating character in a string. If I need to iterate through a string, what would I do?",
        "answers1": ["for (let i = 0; i < string.length); i++", "i=map(string.length)", "(console.log(string.indexOf('o')"],
        "correctAnswer1": "for (let i = 0; i < string.length); i++",
        "question2": "So you need a 'for loop' to return the first non-repeating character in a string, huh? I used to bullseye womp rats with a 'for loop' in my T-16. Anyway, given the 'food' array: ['taco', 'burger', 'pizza', 'spaghetti'], what would be returned from food.indexOf('burrito')?",
        "answers2": ["0", "5", "-1"],
        "correctAnswer2": "-1",
        "question3": "Are these qustions making you feel 'loopy'? Don't give up! How could I check if the first letter in the string 'tacocat' is 't'?",
        "answers3": ["if (string.indexOf(t)== 0{ return true}", "if (string.indexOf(1) == t){ return true}", "if(string.indexOf(i)==0){return true}"],
        "correctAnswer3": "if (string.indexOf(t)== 0{ return true}",
        "difficulty": "Medium",
        "argsAndOutput": {"args": "banana", "output": "b"}
    },
    {
        "algorithm": "Write code to reverse a given string.",
        "question1": "How do you split a string into an array?",
        "answers1": ["Use the .splice() method", "Ask it nicely", "Use the .split() method"],
        "correctAnswer1": "Use the .split() method",
        "question2": "Which method removes the last element in an array?",
        "answers2": ["The .shift() method", "The .pop() method", "Concatenation"],
        "correctAnswer2": "The .pop() method",
        "question3": "What is the correct syntax for a for loop?",
        "answers3": ["for(let i=0; i<=array.length; i++){<do something>}", "for(const i=0; i>array.length; i++){<do something>}", "while(nachos=notReady){<dosomething>}"],
        "correctAnswer3": "for(let i=0; i<=array.length; i++){<do something>}",
        "difficulty": "Easy",
        "argsAndOutput": {"args": "car", "output": "rac"}
    },
    {
        "algorithm": "Write code to remove the non-duplicate characters from a given string.",
        "question1": "What does the .filter() method do?",
        "answers1": ["Removes characters from a given array.", "Creates a new array with only the characters from the original array which meet a given condition.", "Makes a damn good cup of coffee."],
        "correctAnswer1": "Creates a new array with only the characters from the original array which meet a given condition.",
        "question2": "Is there a difference between == and === in Javascript?",
        "answers2": ["Yes; == compares two values but ignores the data types of those values. === returns true only if both the values and data types are the same.", "Yes; one is shorter.", "Nah man, they're the same."],
        "correctAnswer2": "Yes; == compares two values but ignores the data types of those values. === returns true only if both the values and data types are the same.",
        "question3": "What does indexOf() take in, and what does it return?",
        "answers3": ["My hat, if it knows what's good for it.", "It takes in a number and returns a string.", "It takes in string and returns a number."],
        "correctAnswer3": "It takes in string and returns a number.",
        "difficulty": "Hard",
        "argsAndOutput": {"args": "tacocat", "output": "taccat"}
    },
]

// Seed algorithms
router.get("/seedalgo", (req, res) => {
    db.Algo.insertMany(seedAlgo).then(data => {
        data ? res.status(200).send(`Congratulations! You have created: ${JSON.stringify(data, null, 2)}`) : res.status(404).send("You have FAILED!")
    }).catch(err => {
        err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Success!")
    });
});

// All algorithms
router.get("/api/algo", (req, res) => {
    db.Algo.find({}).then(data => {
        data ? res.json(data) : res.status(404).send("FOOL! You have lost the algorithms!")
    }).catch(err => {
        err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Success!")
    });
});

// One random algorithm
router.get("/api/random", (req, res) => {
    db.Algo.find({}).then(data => {
        if (data) {
            const randomAlgo = data[Math.floor(Math.random() * data.length)];
            res.json(randomAlgo);
        } else {
            res.status(404).send("FOOL! You have lost the algorithms!")
        }
    }).catch(err => {
        err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Success!")
    })
});

// One hard algorithm
router.get("/api/hard", (req, res) => {
    db.Algo.find({ difficulty: "Hard" }).then(data => {
        if (data) {
            const hardAlgo = data[Math.floor(Math.random() * data.length)];
            res.json(hardAlgo);
        } else {
            res.status(404).send("FOOL! You have lost the algorithms!")
        }
    }).catch(err => {
        err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Success!")
    })
});

// One medium algorithm
router.get("/api/medium", (req, res) => {
    db.Algo.find({ difficulty: "Medium" }).then(data => {
        if (data) {
            const medAlgo = data[Math.floor(Math.random() * data.length)];
            res.json(medAlgo);
        } else {
            res.status(404).send("FOOL! You have lost the algorithms!")
        }
    }).catch(err => {
        err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Success!")
    })
});

// One easy algorithm
router.get("/api/easy", (req, res) => {
    db.Algo.find({ difficulty: "Easy" }).then(data => {
        if (data) {
            const easyAlgo = data[Math.floor(Math.random() * data.length)];
            res.json(easyAlgo);
        } else {
            res.status(404).send("FOOL! You have lost the algorithms!")
        }
    }).catch(err => {
        err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Success!")
    })
});


module.exports = router;
