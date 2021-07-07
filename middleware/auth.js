const argon2 = require('argon2');
require("dotenv").config();
const jwt = require('jsonwebtoken');



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
      const token = jwt.sign({sub: req.db.id}, process.env.SECRET_TOKEN);
      const userId = req.db.id;
    res.status(200).json({token, userId});
    console.log('Password matched !');
    next();
  }
  else {
    res.sendStatus(400);
  }
}

const authenticationToken = (req, res, next) => {
  const authorization = req.get('Authorization');
  if(authorization == null) {
      res.sendStatus(401)
  }
  else {
    const token = authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.tokenpPayload = decoded;
        console.log('Access authorized');
        next();
    }
    catch(err) {
        console.log('Non authorized');
        res.sendStatus(401);
    }
  }
}


  module.exports = {
      hashPassword,
      validateInput,
      verifyPassword,
      authenticationToken,
    }