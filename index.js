const express = require('express');
const app = express();
const db = require('./data/db.json');
const bodyParser = require('body-parser');

app.get('/api/v1/emotions', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'emotions retrieved successfully',
    emotions: db["emotions"]
  });
});

app.get('/api/v1/entries', (req, res) => {

  let hasEmotion = false;
  let emotionId = null;

  let entriesToSend = db["entries"];

  if (req.query.emotion) {

    for (let i = 0; i < db["emotions"].length; i += 1) {

      console.log(db["emotions"][i]["emotion"].toLowerCase());
      console.log(req.query.emotion);

      if (db["emotions"][i]["emotion"].toLowerCase() === req.query.emotion) {
        hasEmotion = true;
        emotionId = db["emotions"][i]["id"];
        break;
      }
    }

    if ( ! hasEmotion) {
      res.status(404).send({
        'message': 'No emotion ' + req.query.emotion + ' exists'
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
    emotions: entriesToSend
  });

});

app.listen(3000, () => {
  console.log("Listening on 3000");
});

module.exports = app;
