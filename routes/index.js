const express = require('express');
const routes = require('express').Router();
const db = require("../db-config");

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

const fs = require('fs');

routes.post('/capsule_upload', upload.single('blob'), (req, res) => {
  console.log('Toto', req);
  console.log(req.file);
  fs.renameSync(req.file.path, `routes/public/uploads/${req.file.filename}.wav`);

  res.send("Welcome to Express");

  const capsule = {
    audio_path: req.file.path,
    audio_title: req.file.filename,
  }

  db.query(
    "INSERT INTO capsule (audio_path, audio_title) VALUES (?, ?)",
    [capsule.audio_path, capsule.audio_title],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        res.status(201).json({ ...capsule, user_id: results.insertId });
      }
    }
  );
});

module.exports = routes;