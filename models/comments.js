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
