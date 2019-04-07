const express = require('express');

const commentsRouter = express.Router();
const { patchCommentByID, deleteCommentByID } = require('../controllers/comments');
const { handle405 } = require('../errors');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentByID)
  .delete(deleteCommentByID)
  .all(handle405);

module.exports = commentsRouter;
