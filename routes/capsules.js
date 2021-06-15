const db = require("../db-config");

const capsuleRoutes = require('express').Router();

capsuleRoutes.get("/", (req, res) => {
  res.send("Welcome to the Capsules page")
})

capsuleRoutes.post("/", (req,res) => {
  const { audio_path, audio_title } = req.body;
  db.query(
    'INSERT INTO capsule(audio_path, audio_title) VALUES (?, ?)',
    [audio_path, audio_title],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('OOPS');
      } else {
        db.query(
          'SELECT * FROM capsule WHERE id = ?',
          [results.insertId],
          (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).send('OOPS');
            } else {
              res.status(201).json(results[0]);
            }
          }
        );
      }
    }
  );
});

module.exports = capsuleRoutes;
