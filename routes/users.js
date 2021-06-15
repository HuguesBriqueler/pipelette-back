const db = require("../db-config");
const argon2 = require('argon2');

const userRoutes = require('express').Router();

userRoutes.get('/', (req, res) => {
  db.query('SELECT * from user', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    }
    else {
      res.status(200).json(results);
    }
  })
});

const validateInput = (req, res, next) => {
  // todo validate the inputs in req.body
  next();
}

userRoutes.post('/', validateInput, async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  user.password = await argon2.hash(user.password);

  db.query('INSERT INTO user (mail, password) VALUES (?, ?)', [user.email, user.password], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    }
    else {
      delete user.password;
      res.status(201).json({...user, id: results.insertId});
    }
  })
});

module.exports = userRoutes;
