const { topicData } = require('../data'); // index.js

exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest()) // implicit return
    .then(() => knex('topics').insert(topicData).returning('*'));
};
