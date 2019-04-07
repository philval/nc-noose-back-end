//  TOPICS ROUTER
const express = require('express');

const topicsRouter = express.Router();
const { getTopics, postTopic } = require('../controllers/topics');
const { handle405 } = require('../errors');

topicsRouter
  .route('/')
  .get(getTopics)
  .post(postTopic)
  .all(handle405);

module.exports = topicsRouter;
