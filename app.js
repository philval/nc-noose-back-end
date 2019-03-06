const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter.js');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use('/api', apiRouter);

app.use('/', (err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

module.exports = app;
