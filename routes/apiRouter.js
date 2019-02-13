const apiRouter = require('express').Router(); // invoke

const { getTopics, postTopic } = require('../controllers/topics');
const { getArticles } = require('../controllers/articles');

apiRouter.get('/topics', getTopics);
apiRouter.post('/topics', postTopic);

apiRouter.get('/articles', getArticles);

module.exports = apiRouter;
