const {
  topicData, userData, articleData, commentData,
} = require('../data');

const { formatArticles, formatComments } = require('./utils/utils');

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
      return knex('comments').insert(formattedComments); // explicit return
    });
};
