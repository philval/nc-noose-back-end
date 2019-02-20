const express = require('express');

const topicsRouter = express.Router();

const { patchCommentByID, deleteCommentByID } = require('../controllers/comments');

topicsRouter
  .route('/:comment_id')
  .patch(patchCommentByID)
  .delete(deleteCommentByID);

module.exports = topicsRouter;
