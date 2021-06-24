const db = require("../db-config");
const playlistRoutes = require("express").Router();

// TEST GET
playlistRoutes.get("/", (req, res) => {
  db.query("SELECT * from playlist", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

// TEST POST
playlistRoutes.post("/", (req, res) => {
  const { title } = req.body;
  db.query(
    "INSERT INTO playlist(title) VALUES (?)",
    [title],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("OOPS");
      } else {
        db.query(
          "SELECT * FROM playlist WHERE id = ?",
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

// TEST DELETE
playlistRoutes.delete("/:id", (req, res) => {
  const playlistId = req.params.id;
  db.query("DELETE FROM playlist WHERE id = ?", [playlistId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting an playlist");
    } else {
      res.status(204).send("playlist deleted !");
    }
  });
});

module.exports = playlistRoutes;
