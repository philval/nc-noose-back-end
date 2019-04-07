// USERS CONTROLLER
const { getUsers, postUser, getUserByUsername } = require('../models/users');

exports.getUsers = (req, res, next) => {
  getUsers()
    .then(users => res.status(200).send({ users }))
    .catch(err => next(err));
};

exports.postUser = (req, res, next) => {
  postUser(req.body) // post contents from the body
    .then(([user]) => res.status(201).send({ user })) // Knex returns array
    .catch(err => next(err));
};

exports.getUserByUsername = (req, res, next) => {
  getUserByUsername(req.params)
    .then(([user]) => res.status(200).send({ user }))
    .catch(err => next(err));
};
