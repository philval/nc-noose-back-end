const apiRouter = require('express').Router(); // invoke

const { getTopics, postTopic } = require('../controllers/topics');
const { getArticles, postArticle, getArticleByID, patchArticleByID, deleteArticleByID } = require('../controllers/articles');

// TODO split routes

apiRouter.get('/topics', getTopics);
apiRouter.post('/topics', postTopic);

apiRouter.get('/articles', getArticles);
apiRouter.post('/articles', postArticle);

apiRouter.get('/articles/:article_id', getArticleByID);
apiRouter.patch('/articles/:article_id', patchArticleByID);
apiRouter.delete('/articles/:article_id', deleteArticleByID);

module.exports = apiRouter;
