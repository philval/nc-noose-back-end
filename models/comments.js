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

exports.postCommmentsByArticleID = (reqParams, reqBody) => {
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
