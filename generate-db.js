const faker = require('faker');
const emotions = require('./emotions.json');
const fs = require('fs');
const currentFolder = __dirname;

function generateEntries() {

  // `time`	TEXT NOT NULL,
  // `emoji`	TEXT NOT NULL,
  // `latitude`	REAL,
  // `longitude`	REAL,
  // `note`	TEXT

  let notes = [];

  var note;

  for ( let i = 0; i < 1000; i += 1) {

    note = {
      "id": faker.random.uuid(),
      "time": faker.date.between(faker.date.past(), faker.date.future()),
      "emotion_id": Math.floor(Math.random() * 23) + 1,
      "latitude": faker.address.latitude(),
      "longitude": faker.address.longitude(),
      "note": faker.lorem.sentences()
    };

    notes.push(note);
  }

  return notes;
}

(function () {

  const filePath = currentFolder + "/data/db.json";

  const fileContent = JSON.stringify({
    "emotions": emotions,
    "entries": generateEntries()
  });

  fs.writeFile(filePath, fileContent, (err) => {
      if (err) throw err;
      console.log("The file was succesfully saved!");
  });

}());
