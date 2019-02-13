// TOPICS CONTROLLER
const { getTopics, addNewTopic } = require('../models/topics');

exports.getTopics = (req, res, next) => {
  getTopics()
    .then(topics => res.status(200).send({ topics }))
    .catch(err => console.log(err) || next(err));
};

exports.postTopic = (req, res, next) => {
  addNewTopic(req.body) // post contents from the body
    .then(([topic]) => res.status(201).send({ topic })) // Knex returns array
    .catch(err => console.log(err) || next(err));
};
