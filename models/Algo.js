const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlgoSchema = new Schema({
    algorithm: {
        type: String,
        required: true,
        unique: true
    },
    question1: {
        type: String,
        required: true,
    },
    answers1: {
        type: [String],
        required: true
    },
    correctAnswer1: {
        type: String,
        required: true
    },
    question2: {
        type: String,
        required: true,
    },
    answers2: {
        type: [String],
        required: true
    },
    correctAnswer2: {
        type: String,
        required: true
    },
    question3: {
        type: String,
        required: true,
    },
    answers3: {
        type: [String],
        required: true
    },
    correctAnswer3: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        default: "Easy"
    },
    argsAndOutput: {
        type: Object,
        required: true
    }
});

const Algo = mongoose.model("Algo", AlgoSchema)
module.exports = Algo;
