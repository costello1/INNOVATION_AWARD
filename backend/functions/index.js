/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({origin: true}));
app.use(express.json());

// Simula un database in memoria per memorizzare gli utenti e le risposte
const users = {};
const answers = {};

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

  if (!answers[answer]) {
    answers[answer] = 0;
  }
  answers[answer] += 1;

  res.json({success: true});
});

// Esporta le funzioni di Express come funzioni di Firebase
exports.api = onRequest(app);
