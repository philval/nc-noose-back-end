// COMMENTS CONTROLLER
const { getCommmentsByArticleID, postCommmentsByArticleID } = require('../models/comments');

exports.getCommmentsByArticleID = (req, res, next) => {
  getCommmentsByArticleID(req.params)
    .then(comments => res.status(200).send({ comments }))
    .catch(err => console.log(err) || next(err));
};

exports.postCommmentsByArticleID = (req, res, next) => {
  postCommmentsByArticleID(req.params, req.body)
    .then(([comment]) => res.status(201).send({ comment }))
    .catch(err => console.log(err) || next(err));
};

// console.log(comments) ||
