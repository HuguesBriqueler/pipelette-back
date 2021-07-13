const express = require('express');
const routes = require('express').Router();
const db = require("../db-config");
const { authenticationToken } = require('../middleware/auth');

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
routes.use('/uploads', express.static('public/uploads'));

const playlistRoutes = require('./playlist');
routes.use('/playlists', playlistRoutes);

const multer = require('multer');

const upload = multer({ dest: __dirname + '/public/uploads/' });

const fs = require('fs');

routes.post('/capsule_upload', authenticationToken, upload.single('blob'), (req, res) => {
  fs.renameSync(req.file.path, `public/uploads/${req.file.filename}.wav`);

  const capsule = {
    audio_path: req.file.filename,
    audio_title: req.body.audio_title,
    user_id: req.tokenPayload.sub,
    playlist_id: req.body.playlistId,
  };

  db.query(
    "INSERT INTO capsule (audio_path, audio_title, user_id) VALUES (?, ?, ?)",
    [capsule.audio_path, capsule.audio_title, capsule.user_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(201).json({ ...capsule, id: result.insertId });
        if (capsule.playlist_id) {
          db.query(
            "INSERT INTO playlistCapsule (playlist_id, capsule_id) VALUES (?, ?)",
            [capsule.playlist_id, result.insertId],
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        } else {
          db.query(
            "INSERT INTO playlistCapsule (playlist_id, capsule_id) VALUES (1, ?)",
          [ result.insertId],
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    }
  );
});

module.exports = routes;