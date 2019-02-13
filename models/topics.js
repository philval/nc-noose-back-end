// TOPICS MODEL
const connection = require('../db/connection');

exports.getTopics = () => {
  return connection
    .select('*')
    .from('topics');
};

// newTopic passed down from the controller
exports.addNewTopic = (newTopic) => {
  return connection
    .insert(newTopic) // from req.body via body-parser
    .into('topics')
    .returning('*');
};
