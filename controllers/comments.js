// COMMENTS CONTROLLER
const { getCommmentsByArticleID } = require('../models/comments');

exports.getCommmentsByArticleID = (req, res, next) => {
  const queryParams = req.params;
  getCommmentsByArticleID(queryParams)
    .then(comments => res.status(200).send({ comments }))
    .catch(err => console.log(err) || next(err));
};

// console.log(comments) ||
