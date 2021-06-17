const db = require("../db-config");
const argon2 = require('argon2');
const userRoutes = require('express').Router();
const {
  validateInput,
  hashPassword,
  verifyPassword,
  authenticationToken
} = require('../middleware/auth.js');


// TEST
userRoutes.get('/', authenticationToken, (req, res) => {
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

// REGISTER
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


// LOGIN
userRoutes.post('/login', (req, res, next) => {
  console.log('Welcome on users/login route')
  const user = {
    email: req.body.email,
  };

  db.query('SELECT id, password FROM user WHERE email = ?', [user.email], (err, results) => {
    if(err) {
      res.sendStatus(500);
      console.log(err);
    } 
    else if(results.length === 1) {
      req.db = {
        id: results[0].id,
        password: results[0].password,
      };
      next();
    } 
    else {
      res.sendStatus(400)
    }
  })
}, verifyPassword);


module.exports = userRoutes;
