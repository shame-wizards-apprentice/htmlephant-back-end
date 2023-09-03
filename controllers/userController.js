const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");

const router = express.Router()

// User signup
router.post("/signup", (req, res) => {
    db.User.create({
        "username": req.body.username,
        "password": bcrypt.hashSync(req.body.password, 10),
        "character": req.body.character,
        "level": 1,
        "health": 3,
        "keys": 0
    }).then(data => {
        if (data) {
            const token = jwt.sign({
                username: data.username,
                id: data._id
            },
                config.secret,
                {
                    expiresIn: "2h"
                });
            res.json({ user: data, token })
        } else {
            res.status(404).send("You have no power here!")
        }
    }).catch(err => {
        err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Abandon all hope, ye who enter here.")
    });
});

// Login 
router.post("/login", (req, res) => {
    db.User.findOne({ username: req.body.username }).then(data => {
        if (!data) {
            res.status(404).send("IMPOSTER!")
        } else if (bcrypt.compareSync(req.body.password, data.password)) {
            const token = jwt.sign({
                username: data.username,
                id: data._id
            },
                config.secret,
                {
                    expiresIn: "2h"
                });
            res.json({
                user: data, token
            })
        } else {
            res.status(401).send("We don't serve your kind here.")
        }
    }).catch(err => {
        err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Success!")
    });
});


// Authenticate
router.get("/vip", (req, res) => {
    let tokenData = authenticateMe(req);
    if (tokenData) {
        db.User.findOne({
            _id: tokenData.id
        }).then(data => {
            res.json(data)
        }).catch(err => {
            err ? res.status(500).send(`FOOL! Due to your idiocy, ${err}`) : res.status(200).send("Success!")
        })
    }
});

// User by ID
router.get("/api/user/:id", (req, res) => {
    db.User.findOne({
        _id: req.params.id
    }).then(data => {
        data ? res.json(data) : res.status(404).send("You have no power here!")
    }).catch(err => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.status(200).send("Success!")
    })
})

// Level up
router.put("/levelup/:id", (req, res) => {
    db.User.updateOne({
        _id: req.params.id
    }, {
        $inc: {
            level: 1,
        },
        $set: {
            health: 3,
            keys: 0
        }
    }, (err, data) => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.json(data)
    })
})

// Level down
router.put("/leveldown/:id", (req, res) => {
    db.User.updateOne({
        _id: req.params.id
    }, {
        $inc: {
            level: -1
        }
    }, (err, data) => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.json(data)
    })
})

// Health down
router.put("/healthdown/:id", (req, res) => {
    db.User.findOne({
        _id: req.params.id
    }).then(response => {
        response.health <= -1 ? res.send("Oops, you're dead") : db.User.updateOne({
            _id: req.params.id
        }, {
            $inc: {
                health: -1
            }
        }, (err, data) => {
            err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.json(data)
        })
    })

})

// Increment keys
router.put("/keyup/:id", (req, res) => {
    db.User.findOne({
        _id: req.params.id
    }).then(response => {
        response.keys === 3 ? res.send("Too many keys") : db.User.updateOne({
            _id: req.params.id
        }, {
            $inc: {
                keys: 1
            }
        }, (err, data) => {
            err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.json(data)
        })
    })
})

// Remove all keys
router.put("/nokeys/:id", (req, res) => {
    db.User.updateOne({
        _id: req.params.id
    }, {
        $set: {
            keys: 0
        }
    }, (err, data) => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.json(data)
    })
})


// Reset health/keys
router.put("/reset/:id", (req, res) => {
    db.User.updateOne({
        _id: req.params.id
    }, {
        health: 3,
        keys: 0
    }).then(data => {
        res.json(data)
    }).catch(err => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.status(200).send("Success!")
    })
})

// Reset level
router.put("/level1/:id", (req, res) => {
    db.User.updateOne({
        _id: req.params.id
    }, {
        level: 1,
        health: 3,
        keys: 0
    }).then(data => {
        res.json(data)
    }).catch(err => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.status(200).send("Success!")
    })
})

// Switch to cat
router.put("/switchtocat/:username", (req, res) => {
    db.User.updateOne({
        username: req.params.username
    }, {
        character: "Cat"
    }).then(data => {
        res.json(data)
    }).catch(err => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.status(200).send("Switched to cat!")
    })
})

// Switch to manatee
router.put("/switchtomanatee/:username", (req, res) => {
    db.User.updateOne({
        username: req.params.username
    }, {
        character: "Manatee"
    }).then(data => {
        res.json(data)
    }).catch(err => {
        err ? res.status(500).send(`Due to your idiocy, ${err.message}`) : res.status(200).send("Switched to manatee!")
    })
})


// Token authentication
const authenticateMe = (req) => {
    let token = false;

    if (!req.headers) {
        token = false
    }
    else if (!req.headers.authorization) {
        token = false;
    }
    else {
        token = req.headers.authorization.split(" ")[1];
    }
    let data = false;
    if (token) {
        data = jwt.verify(token, config.secret, (err, data) => {
            if (err) {
                return false;
            } else {
                return data
            }
        })
    }
    return data;
}


module.exports = router;

