\c db_knews_test

SELECT
comment_id,
author,
article_id,
votes,
created_at
-- comments.article_id,
-- comments.comment_id,
-- COUNT(comments.comment_id) AS comment_count
FROM comments
-- LEFT JOIN articles
-- ON articles.article_id = comments.article_id
WHERE article_id = 1
-- GROUP BY articles.article_id
-- ORDER BY comment_count ASC
ORDER BY votes DESC
LIMIT 10
;

--   * `comment_count` which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this
