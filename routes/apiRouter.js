const apiRouter = require('express').Router(); // invoke

const { getTopics, postTopic } = require('../controllers/topics');
const { getArticles, postArticle } = require('../controllers/articles');

// TODO split routes

apiRouter.get('/topics', getTopics);
apiRouter.post('/topics', postTopic);

apiRouter.get('/articles', getArticles);
apiRouter.post('/articles', postArticle);

module.exports = apiRouter;
