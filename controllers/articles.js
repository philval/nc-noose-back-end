// ARTICLES CONTROLLER
const { getArticles, addNewArticle, getArticlebyID } = require('../models/articles');

exports.getArticles = (req, res, next) => {
  const queryParams = req.query;
  getArticles(queryParams)
    .then(articles => /* console.log(articles) || */ res.status(200).send({ articles }))
    .catch(err => console.log(err) || next(err));
};

exports.postArticle = (req, res, next) => {
  addNewArticle(req.body)
    .then(([article]) => res.status(201).send({ article })) // Knex returns an array
    .catch(err => console.log(err) || next(err));
};

exports.getArticleByID = (req, res, next) => {
  const queryParams = req.params;
  getArticlebyID(queryParams)
    .then(([article]) => res.status(200).send({ article }))
    .catch(err => console.log(err) || next(err));
};

/* console.log(articles) || */
