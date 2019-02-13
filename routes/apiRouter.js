const apiRouter = require('express').Router(); // invoke

const { getTopics, postTopic } = require('../controllers/topics');

apiRouter.get('/topics', getTopics);
apiRouter.post('/topics', postTopic);

module.exports = apiRouter;
