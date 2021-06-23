const db = require("../db-config");

const capsuleRoutes = require("express").Router();

capsuleRoutes.get("/", (req, res) => {
  db.query("SELECT * from capsule", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

capsuleRoutes.get("/:id", (req, res) => {
  console.log(`New request : ${req}`);
  db.query(
    "SELECT audio_path, audio_title from capsule WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500);
      } else if (results[0]) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).send("Not found");
      }
    }
  );
});

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

capsuleRoutes.delete("/", (req, res) => {
  const capsuleId = req.params.id;
  db.query("DELETE FROM capsule", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting all capsules");
    } else {
      res.status(204).send("Capsules deleted!");
    }
  });
});

capsuleRoutes.put("/:id", (req, res) => {
  const capsuleId = req.params.id;
  const audio_path = req.body.audio_path;
  const audio_title = req.body.audio_title;
  db.query(
    "UPDATE capsule SET audio_path = ?, audio_title = ? WHERE id = ?",
    [audio_path, audio_title, capsuleId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updated capsule");
      } else {
        res.status(204).send("Capsule updated!");
      }
    }
  );
});

module.exports = capsuleRoutes;
