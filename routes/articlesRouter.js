const express = require('express');

const articlesRouter = express.Router();

const { getArticles, postArticle, getArticleByID, patchArticleByID, deleteArticleByID } = require('../controllers/articles');
const { getCommmentsByArticleID, postCommmentByArticleID } = require('../controllers/comments');
const { handle405 } = require('../errors');

articlesRouter
  .route('/')
  .get(getArticles)
  .post(postArticle)
  .all(handle405);

articlesRouter
  .route('/:article_id')
  .get(getArticleByID)
  .patch(patchArticleByID)
  .delete(deleteArticleByID)
  .all(handle405);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommmentsByArticleID)
  .post(postCommmentByArticleID)
  .all(handle405);

module.exports = articlesRouter;
