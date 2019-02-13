// ARTICLES CONTROLLER
const { getArticles } = require('../models/articles');

exports.getArticles = (req, res, next) => {
  getArticles()
    .then(articles => res.status(200).send({ articles }))
    .catch(err => console.log(err) || next(err));
};
