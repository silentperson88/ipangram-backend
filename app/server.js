// local environment variable
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// db connections
require('../config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

morgan.token('requestId', req => {
  return req.id;
});

// routes
require('./routes/index')(app);

app.get('/', (req, res) => {
  console.log('I am in');
  return res.status(200).send('<h4>Welcome to Ipangram App</h4>');
});

module.exports = app;
