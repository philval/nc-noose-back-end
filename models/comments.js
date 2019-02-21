// COMMENTS MODEL
const connection = require('../db/connection');

exports.getCommmentsByArticleID = (reqParams, reqQuery) => {
  const { article_id } = reqParams;
  const { comment_id, author, votes, created_by, body, sort_by, order } = reqQuery;
  const whereConditions = {};
  if (comment_id) whereConditions['comments.comment_id'] = comment_id;
  if (author) whereConditions['comments.author'] = author;
  if (votes) whereConditions['comments.votes'] = votes;
  if (created_by) whereConditions['comments.created_by'] = created_by;
  if (body) whereConditions['comments.body'] = body;

  const sortColumn = sort_by || 'comments.created_at'; // default
  const sortOrder = order || 'desc'; // default

  /*
  - an array of comments for the given `article_id` of which each comment should have the following properties:
  * `comment_id`
  * `votes`
  * `created_at`
  * `author` which is the `username` from the users table
  * `body`

##### Accepts queries
  * `sort_by`, which sorts the articles by any valid column (defaults to date)
  */

  return connection
    .select(
      'comment_id',
      'created_at',
      'author',
      'article_id',
      'body',
      'votes',
    )
    .from('comments')
    .where('article_id', article_id)
    .orderBy(sortColumn, sortOrder)
    .limit('10');
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
