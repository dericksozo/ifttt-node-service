const express = require('express');
const app = express();
const db = require('./db.json');

// Alright, it's gonna be an API for hypothetical emotion tracking application.
// /emotions

// Get all emotions
// Get a specific emotion based on id
// Get all emotions of a specific emotion id
// Create a new emotion by POSTING.

app.get('/api/v1/emotions', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'emotions retrieved successfully',
    emotions: db
  })
});


app.listen(3000, () => {
  console.log("Listening on 3000");
});
