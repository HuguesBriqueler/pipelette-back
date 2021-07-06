const express = require('express');
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

const uploadRoutes = require('./upload');
routes.use('/upload', uploadRoutes);
routes.use('/uploads', express.static('uploads'));

const playlistRoutes = require('./playlist');
routes.use('/playlists', playlistRoutes);

const multer = require('multer');

const upload = multer({ dest: __dirname + '/public/uploads/' });

routes.post('/capsule_upload', upload.single('blob'), (req, res) => {
  console.log('Toto', req);
  console.log(req.file);
  res.send("Welcome to Express");
});

module.exports = routes;