// ARTICLES CONTROLLER
const { getArticles } = require('../models/articles');

exports.getArticles = (req, res, next) => {
  const queryParams = req.query;
  getArticles(queryParams)
    .then(articles => res.status(200).send({ articles }))
    .catch(err => console.log(err) || next(err));
};
