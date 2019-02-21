// COMMENTS CONTROLLER
const { getCommmentsByArticleID, postCommmentByArticleID, patchCommentByID, deleteCommentByID } = require('../models/comments');

exports.getCommmentsByArticleID = (req, res, next) => {
  getCommmentsByArticleID(req.params, req.query)
    .then(comments => res.status(200).send({ comments }))
    .catch(err => console.log(err) || next(err));
};

exports.postCommmentByArticleID = (req, res, next) => {
  postCommmentByArticleID(req.params, req.body)
    .then(([comment]) => res.status(201).send({ comment }))
    .catch(err => console.log(err) || next(err));
};

exports.patchCommentByID = (req, res, next) => {
  patchCommentByID(req.params, req.body)
    .then(([comment]) => res.status(200).send({ comment }))
    .catch(err => console.log(err) || next(err));
};

exports.deleteCommentByID = (req, res, next) => {
  deleteCommentByID(req.params)
  // confirmation = 1 i.e. row deleted
    .then(confirmation => console.log(confirmation) || res.status(204).send(confirmation))
    .catch(err => console.log(err) || next(err));
};

// console.log(comments) ||
