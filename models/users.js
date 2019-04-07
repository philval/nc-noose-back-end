// USERS MODEL
const connection = require('../db/connection');

exports.getUsers = () => {
  return connection
    .select('*')
    .from('users');
};

// newUser passed down from the controller
exports.postUser = (postUser) => {
  return connection
    .insert(postUser) // from req.body via body-parser
    .into('users')
    .returning('*');
};

exports.getUserByUsername = (reqParams) => {
  const { username } = reqParams;
  return connection
    .select('*')
    .from('users')
    .where('users.username', username);
};
