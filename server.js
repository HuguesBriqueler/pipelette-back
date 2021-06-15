const express = require("express");

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

// add routes
const routes = require('./routes');
app.use(routes);

module.exports = app;
