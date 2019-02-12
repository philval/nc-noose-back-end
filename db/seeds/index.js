const {
  topicData, userData, articleData, commentData,
} = require('../data');

function timestampToDate(timestamp) {
  return new Date(timestamp);
}

function formatArticles(articles) {
  return articles.map(({ created_at, ...remainingArticle }) => {
    // article.created_at = timestampToDate(article.created_at);
    return { created_at: timestampToDate(created_at), ...remainingArticle };
  });
}

function getArticleIDforComment(comment, returnedArticles) {
  const foundArticle = returnedArticles.find(article => comment.belongs_to === article.title);
  return foundArticle.article_id;
}

// articleRows from returning('*')
function formatComments(comments, articleRows) {
  return comments.map(comment => ({ // make new object
    author: comment.created_by, // renamed
    article_id: getArticleIDforComment(comment, articleRows), // lookup
    votes: comment.votes, // same
    created_at: timestampToDate(comment.created_at), // convert date
    body: comment.body, // same
  }));
}

exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest()) // implicit return
    .then(() => {
      const topicsPromise = knex('topics').insert(topicData);
      const usersPromise = knex('users').insert(userData);
      return Promise.all([topicsPromise, usersPromise]); // explicit return
    })
    .then(() => {
      const formattedArticles = formatArticles(articleData);
      return knex('articles').insert(formattedArticles).returning('*'); // explicit return
    })
    .then((articleRows) => {
      const formattedComments = formatComments(commentData, articleRows);
      return knex('comments').insert(formattedComments); // explcit return
    });
};
