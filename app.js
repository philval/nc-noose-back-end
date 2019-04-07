const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter.js');
const { handle400 } = require('./errors');

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use('/api', apiRouter);

app.use('/', (err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

// return knex errors if possible
app.use((err, req, res, next) => {
  console.log(err); // XXXX
  handle400(err, req, res, next);
});

// non existent route
app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Page not found' });
});

module.exports = app;
