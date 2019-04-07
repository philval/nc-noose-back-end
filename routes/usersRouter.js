const express = require('express');

const usersRouter = express.Router();

const { getUsers, postUser, getUserByUsername } = require('../controllers/users');

usersRouter
  .route('/')
  .get(getUsers)
  .post(postUser);

usersRouter
  .route('/:username')
  .get(getUserByUsername);

module.exports = usersRouter;
