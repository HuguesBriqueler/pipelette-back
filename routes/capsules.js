const db = require("../db-config");

const capsuleRoutes = require("express").Router();

capsuleRoutes.post("/", (req, res) => {
  const { audio_path, audio_title } = req.body;
  db.query(
    "INSERT INTO capsule(audio_path, audio_title) VALUES (?, ?)",
    [audio_path, audio_title],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("OOPS");
      } else {
        db.query(
          "SELECT * FROM capsule WHERE id = ?",
          [results.insertId],
          (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).send("OOPS");
            } else {
              res.status(201).json(results[0]);
            }
          }
        );
      }
    }
  );
});

capsuleRoutes.delete("/:id", (req, res) => {
  const capsuleId = req.params.id;
  db.query("DELETE FROM capsule WHERE id = ?", [capsuleId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting an capsule");
    } else {
      res.status(204).send("Capsule deleted!");
    }
  });
});

module.exports = capsuleRoutes;
