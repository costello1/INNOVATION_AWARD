const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

const express = require("express");
const app = express();
const cors = require("cors");

// Configura il middleware CORS
app.use(cors({origin: true}));
app.use(express.json());

// Simula un database in memoria per memorizzare gli utenti e le risposte
const users = {};
let answers = {}; // Usa let invece di const per poter riassegnare

// Endpoint per controllare se un utente ha già risposto
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const user = users[userId];

  if (user) {
    res.json({hasSubmitted: user.hasSubmitted});
  } else {
    res.json({hasSubmitted: false});
  }
});

// Endpoint per aggiornare lo stato di un utente
app.post("/user/:id", (req, res) => {
  const userId = req.params.id;
  const {hasSubmitted} = req.body;

  users[userId] = {hasSubmitted};
  res.json({success: true});
});

// Endpoint per ottenere i risultati delle risposte
app.get("/answers", (req, res) => {
  res.json(answers);
});

// Endpoint per aggiornare le risposte
app.post("/answers", (req, res) => {
  const {answer} = req.body;

  if (answer === "RESET") {
    answers = {}; // Resetta le risposte
    res.json({success: true});
    return;
  }

  if (!answers[answer]) {
    answers[answer] = 0;
  }
  answers[answer] += 1;

  res.json({success: true});
});

// Endpoint per ripristinare lo stato di tutti gli utenti
app.post("/reset-users", (req, res) => {
  console.log("Resetting user states");
  for (const userId in users) {
    if (Object.prototype.hasOwnProperty.call(users, userId)) {
      users[userId].hasSubmitted = false;
      console.log(`Reset user ${userId}`);
    }
  }
  res.json({success: true});
});

// Esporta le funzioni di Express come funzioni di Firebase
exports.api = onRequest(app);
