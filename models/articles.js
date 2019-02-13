// ARTICLES MODEL
const connection = require('../db/connection');

exports.getArticles = (queryParams) => {
  // console.log(queryParams, '<< queryParams ');
  const { author, topic } = queryParams;
  // console.log(author, '<< author');
  // console.log(topic, '<< topic');
  const whereConditions = {};
  if (author) whereConditions['articles.author'] = author;
  if (topic) whereConditions['articles.topic'] = topic;
  // console.log(whereConditions, '<< whereConds');

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
    .groupBy('articles.article_id');
};

/*

\c db_knews_dev

SELECT
articles.author,
articles.title,
articles.article_id,
articles.topic,
articles.created_at,
articles.votes,
COUNT(comments.comment_id) AS comment_count
FROM articles
LEFT JOIN comments
ON articles.article_id = comments.article_id
GROUP BY articles.article_id
;

`comment_count` which is the total count of all the comments with this article_id
- you should make use of knex queries in order to achieve this

*/
