const routes = require('express').Router();

// define the index route
routes.get('/', (req, res) => {
  console.log('A new request just hit the API !');
  res.send("Welcome to Express");
});

const userRoutes = require('./users');
routes.use('/users', userRoutes);

const capsuleRoutes = require('./capsules');
routes.use('/capsules', capsuleRoutes);

module.exports = routes;