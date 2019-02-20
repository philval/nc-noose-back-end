const express = require('express');

const articlesRouter = express.Router();

const { getArticles, postArticle, getArticleByID, patchArticleByID, deleteArticleByID } = require('../controllers/articles');
const { getCommmentsByArticleID, postCommmentByArticleID } = require('../controllers/comments');

articlesRouter
  .route('/')
  .get(getArticles)
  .post(postArticle);

articlesRouter
  .route('/:article_id')
  .get(getArticleByID)
  .patch(patchArticleByID)
  .delete(deleteArticleByID);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommmentsByArticleID)
  .post(postCommmentByArticleID);

module.exports = articlesRouter;
