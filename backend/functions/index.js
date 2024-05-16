const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({origin: true}));
app.use(express.json());

const users = {};
let answers = {};

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const user = users[userId];

  if (user) {
    res.json({hasSubmitted: user.hasSubmitted});
  } else {
    res.json({hasSubmitted: false});
  }
});

app.post("/user/:id", (req, res) => {
  const userId = req.params.id;
  const {hasSubmitted} = req.body;

  users[userId] = {hasSubmitted};
  res.json({success: true});
});

app.get("/answers", (req, res) => {
  res.json(answers);
});

app.post("/answers", (req, res) => {
  const {answer} = req.body;

  if (answer === "RESET") {
    answers = {};
    res.json({success: true});
    return;
  }

  if (!answers[answer]) {
    answers[answer] = 0;
  }
  answers[answer] += 1;

  res.json({success: true});
});

app.post("/reset-users", (req, res) => {
  for (const userId in users) {
    if (Object.prototype.hasOwnProperty.call(users, userId)) {
      users[userId].hasSubmitted = false;
    }
  }
  res.json({success: true});
});

exports.api = onRequest(app);
