const express = require("express");
const connection = require("./db-config");

const port = 8000;

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

app.get("/", (request, response) => {
  response.send("Welcome to Express");
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`server is listening on ${port}`);
  }
});
