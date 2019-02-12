// TOPICS MODEL
const connection = require('../db/connection');

exports.getTopics = function () {
  return connection
    .select('*')
    .from('topics');
};
