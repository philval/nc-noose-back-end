const { topicData, userData, articleData } = require('../data'); // index.js

function timestampToDate(timestamp) {
  return new Date(timestamp);
}

function formatArticles(articles) {
  return articles.map((article) => {
    article.created_at = timestampToDate(article.created_at);
    return article;
  });
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
      return knex('articles').insert(formattedArticles); // explicit return
    });
};
