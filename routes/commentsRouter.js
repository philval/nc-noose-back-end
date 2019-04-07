const express = require('express');

const commentsRouter = express.Router();

const { patchCommentByID, deleteCommentByID } = require('../controllers/comments');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentByID)
  .delete(deleteCommentByID);

module.exports = commentsRouter;
