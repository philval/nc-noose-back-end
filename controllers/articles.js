// ARTICLES CONTROLLER
const { getArticles, postArticle, getArticlebyID, patchArticleByID, deleteArticleByID } = require('../models/articles');

exports.getArticles = (req, res, next) => {
  getArticles(req.query)
    .then(articles => res.status(200).send({ articles }))
    .catch(err => next(err));
};

exports.postArticle = (req, res, next) => {
  postArticle(req.body)
    .then(([article]) => res.status(201).send({ article })) // Knex returns an array
    .catch(err => next(err));
};

exports.getArticleByID = (req, res, next) => {
  getArticlebyID(req.params)
    .then(([article]) => res.status(200).send({ article }))
    .catch(err => next(err));
};

exports.patchArticleByID = (req, res, next) => {
  patchArticleByID(req.params, req.body)
    .then(([article]) => res.status(200).send({ article }))
    .catch(err => next(err));
};

exports.deleteArticleByID = (req, res, next) => {
  deleteArticleByID(req.params)
    .then((numberOfRows) => {
      if (numberOfRows === 1) res.sendStatus(204);
    })
    .catch(err => next(err));
};
