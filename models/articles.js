// ARTICLES MODEL
const connection = require('../db/connection');

exports.getArticles = () => {
  // return console.log('hello from the model');
  return connection
    .select('*')
    .from('articles');
};
