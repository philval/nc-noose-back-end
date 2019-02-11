const { topicData, userData } = require('../data'); // index.js

exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest()) // implicit return
    .then(() => knex('topics').insert(topicData)) // implicit return
    .then(() => knex('users').insert(userData)); // implicit return
};
