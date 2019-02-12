const apiRouter = require('express').Router(); // invoke
const { getTopics } = require('../controllers/topics');

apiRouter.get('/topics', getTopics);

module.exports = apiRouter;
