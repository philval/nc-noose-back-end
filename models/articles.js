// ARTICLES MODEL
const connection = require('../db/connection');

exports.getArticles = (reqParams) => {
  const { author, topic, sort_by, order } = reqParams;
  const whereConditions = {};
  if (author) whereConditions['articles.author'] = author;
  if (topic) whereConditions['articles.topic'] = topic;

  const sortColumn = sort_by || 'articles.created_at'; // default
  const sortOrder = order || 'asc'; // default

  return connection
    .select(
      'articles.author',
      'articles.title',
      'articles.article_id',
      'articles.topic',
      'articles.created_at',
      'articles.votes',
    )
    .from('articles')
    .where(whereConditions)
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .count('comments.comment_id as comment_count') // knex count after join !
    .groupBy('articles.article_id')
    .orderBy(sortColumn, sortOrder);
};

// newTopic passed down from the controller
exports.postArticle = (newArticle) => {
  return connection
    .insert(newArticle)
    .into('articles')
    .returning('*'); // NB more columns than posted object
};

exports.getArticlebyID = (reqParams) => {
  const { article_id } = reqParams;
  return connection
    .select(
      'articles.author',
      'articles.title',
      'articles.article_id',
      'articles.topic',
      'articles.created_at',
      'articles.votes',
    )
    .from('articles')
    .where('articles.article_id', article_id)
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .count('comments.comment_id as comment_count')
    .groupBy('articles.article_id');
};

exports.patchArticleByID = (reqParams, reqBody) => {
  const { article_id } = reqParams;
  const votesNumber = reqBody.inc_votes;

  if (votesNumber > 0) {
    return connection('articles')
      .where('article_id', article_id)
      .increment('votes', votesNumber)
      .returning('*');
  }

  if (votesNumber < 0) {
    return connection('articles')
      .where('article_id', article_id)
      .decrement('votes', -votesNumber) // must be +ve
      .returning('*');
  }
  return connection('articles')
    .returning('*');
};

exports.deleteArticleByID = (reqParams) => {
  const { article_id } = reqParams;
  return connection('articles')
    .where('article_id', article_id)
    .delete();
};
