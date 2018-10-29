const express = require('express');
const app = express();
const db = require('./data/db.json');
const bodyParser = require('body-parser');
const faker = require('faker');

let userGeneratedEntries = [];

// support parsing of application/json type post data
app.use(bodyParser.json());

// Get the list of emotions
app.get('/api/v1/emotions', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'emotions retrieved successfully',
    emotions: db["emotions"]
  });
});

// Get individual entries
// /api/v1/entries - Get all the entries
// /api/v1/entries?emotion=${emotion} - To get specific entries for only certain emotions.
app.get('/api/v1/entries', (req, res) => {

  let hasEmotion = false;
  let emotionId = null;
  let entriesToSend = db["entries"];

  if (req.query.emotion) {

    // Must be a string of length greater than 1.
    if (typeof req.query.emotion !== "string" && req.query.emotion.length <= 0) {

      res.status(404).send({
        'message': 'Emotion must be given and a string'
      });

    } else {

      for (let i = 0; i < db["emotions"].length; i += 1) {

        if (db["emotions"][i]["emotion"].toLowerCase() === req.query.emotion) {
          hasEmotion = true;
          emotionId = db["emotions"][i]["id"];
          break;
        }
      }

    }

    // Emotion has to exist in the list of emotions or else a 404.
    if ( ! hasEmotion) {

      res.status(404).send({
        'message': 'No emotion ' + req.query.emotion + ' exists. Run /api/v1/emotions to get a list of emotions.'
      });

    } else {

      entriesToSend = db["entries"].filter((item) => {
        return item["emotion_id"] === emotionId;
      });

    }
  }

  res.status(200).send({
    success: 'true',
    message: 'emotions retrieved successfully',
    emotions: userGeneratedEntries.length >= 1 ? [].concat(entriesToSend, userGeneratedEntries) : entriesToSend
  });

});

// Get a new entry
app.post('/api/v1/entries', (req, res) => {
  
  let newEntry = {};

  if (typeof req.body["emotion_id"] === "undefined") {
    res.status(404).send({
      message: "When creating a new entry, a valid emotion_id is required. Get valid emotion ids by running get request at /api/v1/emotions"
    });
  } else {

    // Check if the emotion_id actually exists.
    let found = db["emotions"].find(function (emotion) {
      return emotion.id === req.body.emotion_id;
    });

    if (found == null) {
      res.status(404).send({
        message: "Not a valid emotion_id. Get valid emotion ids by running get request at /api/v1/emotions"
      });
    }

    let newEntry = {
      "emotion_id": req.body["emotion_id"],
      "id": faker.random.uuid(),
      "time": new Date(),
      "note": req.body.note && typeof req.body.note === "string" && req.body.note.length >= 1 ? req.body.note : ""
    };

    userGeneratedEntries.push(newEntry);

    res.status(200).send({
      success: 'true',
      message: 'entry successfully added',
      entry: newEntry
    });

  }

});

app.listen(3000, () => {
  console.log("Listening on 3000");
});

module.exports = app;
