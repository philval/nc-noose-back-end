\c db_knews_test

SELECT
articles.author,
articles.title,
articles.article_id,
articles.topic,
articles.created_at,
articles.votes,
-- comments.article_id
-- comments.comment_id
COUNT(comments.comment_id) AS comment_count
FROM articles
LEFT JOIN comments
ON articles.article_id = comments.article_id
WHERE articles.article_id = 1
GROUP BY articles.article_id
ORDER BY comment_count ASC
;

--   * `comment_count` which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this
