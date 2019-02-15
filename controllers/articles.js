// ARTICLES CONTROLLER
const { getArticles, postArticle, getArticlebyID, patchArticleByID, deleteArticleByID } = require('../models/articles');

exports.getArticles = (req, res, next) => {
  const queryParams = req.query;
  getArticles(queryParams)
    .then(articles => res.status(200).send({ articles }))
    .catch(err => console.log(err) || next(err));
};

exports.postArticle = (req, res, next) => {
  postArticle(req.body)
    .then(([article]) => res.status(201).send({ article })) // Knex returns an array
    .catch(err => console.log(err) || next(err));
};

exports.getArticleByID = (req, res, next) => {
  const queryParams = req.params;
  getArticlebyID(queryParams)
    .then(([article]) => res.status(200).send({ article }))
    .catch(err => console.log(err) || next(err));
};

exports.patchArticleByID = (req, res, next) => {
  const queryParams = req.params;
  const reqBody = req.body;
  patchArticleByID(queryParams, reqBody)
    .then(([article]) => res.status(200).send({ article }))
    .catch(err => console.log(err) || next(err));
};

exports.deleteArticleByID = (req, res, next) => {
  const queryParams = req.params;
  deleteArticleByID(queryParams)
    .then(articles => res.status(204).send({ articles }))
    .catch(err => console.log(err) || next(err));
};

/* console.log(articles) || */
