const db = require("../db-config");
const argon2 = require('argon2');
const userRoutes = require('express').Router();
const { validateInput } = require('../middleware/auth.js');
const { hashPassword } = require('../middleware/auth.js');
const { verifyPassword } = require('../middleware/auth.js');


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


userRoutes.post('/', validateInput, hashPassword, (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  db.query('INSERT INTO user (email, password) VALUES (?, ?)', [user.email, user.password], (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      delete user.password;
      res.status(201).json({...user, id: results.insertId});
    }
  })
});

userRoutes.post('/login', (req, res, next) => {
  console.log('Welcome on users/login route')
  const user = {
    email: req.body.email,
  };

  db.query('SELECT password FROM user WHERE email = ?', [user.email], (err, results) => {
    if(err) {
      res.sendStatus(500);
      console.log(err);
    } 
    else if(results.length === 1) {
      req.db = {
        password: results[0].password
      };
      next();
    } 
    else {
      res.sendStatus(400)
    }
  })
}, verifyPassword);


module.exports = userRoutes;
