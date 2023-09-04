const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const whitelist = ["https://wizards-and-whiteboards-game-330d091e061a.herokuapp.com/", "http://localhost:3000"]

const corsOptions = {
    origin: whitelist,
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET, HEAD, POST, PUT"
}

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/htmlephant", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require("./controllers/userController");
app.use(userRoutes);

const npcRoutes = require("./controllers/npcController");
app.use(npcRoutes);

const algoRoutes = require("./controllers/algoController");
app.use(algoRoutes);

app.get("/", (req, res) => {
    res.send("Go away, I'm trying to eat my mac and cheese.")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



