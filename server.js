const express = require("express");
const connection = require("./db-config");

const port = 3000;

const app = express();
app.use(express.json());

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  } else {
    console.log(
      `connected to database with threadId :  ${connection.threadId}`
    );
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to Express");
});

app.post("/create", (req,res) => {
  const { audio_path, audio_title } = req.body;
  connection.query(
    'INSERT INTO capsule(audio_path, audio_title) VALUES (?, ?)',
    [audio_path, audio_title],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('OOPS');
      } else {
        connection.query(
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



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`server is listening on ${port}`);
  }
});
