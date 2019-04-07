const express = require('express');

const usersRouter = express.Router();
const { getUsers, postUser, getUserByUsername } = require('../controllers/users');
const { handle405 } = require('../errors');

usersRouter
  .route('/')
  .get(getUsers)
  .post(postUser)
  .all(handle405);

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .all(handle405);

module.exports = usersRouter;
