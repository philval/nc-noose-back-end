// COMMENTS MODEL
const connection = require('../db/connection');

exports.getCommmentsByArticleID = (queryParams) => {
  const { article_id } = queryParams;
  return connection
    .select(
      'comment_id',
      'author',
      'article_id',
      'votes',
      'created_at',
      'body',
    )
    .from('comments')
    .where('article_id', article_id);
};

exports.postCommmentByArticleID = (reqParams, reqBody) => {
  const { article_id } = reqParams;
  const { author, body } = reqBody;
  const newComment = {
    article_id,
    author,
    body,
  };
  return connection
    .insert(newComment)
    .into('comments')
    .returning('*');
};

exports.patchCommentByID = (reqParams, reqBody) => {
  const { comment_id } = reqParams;
  const votesNumber = reqBody.inc_votes;

  if (votesNumber > 0) {
    return connection('comments')
      .where('comment_id', comment_id)
      .increment('votes', votesNumber)
      .returning('*');
  }

  if (votesNumber < 0) {
    return connection('comments')
      .where('comment_id', comment_id)
      .decrement('votes', -votesNumber) // +ve
      .returning('*');
  }

  return connection('comments')
    .returning('*');
};

exports.deleteCommentByID = (reqParams) => {
  const { comment_id } = reqParams;
  return connection('comments')
    .where('comment_id', comment_id)
    .delete();
};
