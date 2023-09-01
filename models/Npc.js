const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NpcSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Manatee Joe"
    },
    flavorDialogue: {
        type: [[String]],
        required: true,
    },
    usefulDialogue: {
        type: [[String]],
        required: true,
    }
});

const Npc = mongoose.model("Npc", NpcSchema)
module.exports = Npc;