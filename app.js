const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const apiRouter = require('./routes/apiRouter.js');

app.use('/api', apiRouter);

app.use('/', (err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

module.exports = app;
