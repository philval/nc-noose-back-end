const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter.js');

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use('/api', apiRouter);

app.use('/', (err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(404).send({ msg: err.msg || 'not found' });
});

app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Page not found' });
});

module.exports = app;
