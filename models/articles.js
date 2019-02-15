// ARTICLES MODEL
const connection = require('../db/connection');

exports.getArticles = (queryParams) => {
  const { author, topic, sort_by, order } = queryParams;
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

exports.getArticlebyID = (queryParams) => {
  const { article_id } = queryParams;
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
  // .orderBy(sortColumn, sortOrder);
};

exports.patchArticleByID = (queryParams, reqBody) => {
  const { article_id } = queryParams;
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

exports.deleteArticleByID = (queryParams) => {
  const { article_id } = queryParams;
  console.log(article_id, '<< article_id');
  return connection('articles')
    .where('article_id', article_id)
    .delete();
};


// .decrement(decrementObj)
