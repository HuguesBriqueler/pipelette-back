const argon2 = require('argon2');


const validateInput = (req, res, next) => {
    // todo validate the inputs in req.body
    next();
  };


const hashPassword = async (req, res, next) => {
    req.body.password = await argon2.hash(req.body.password);
    next();
  }

const verifyPassword = async (req, res, next) => {
  if(await argon2.verify(req.db.password, req.body.password)) {
    res.status(200);
    res.send('Access authorized')
  }
  else {
    res.sendStatus(400);
  }
}


  module.exports = {
      hashPassword,
      validateInput,
      verifyPassword,
    }