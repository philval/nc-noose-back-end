// npm run migrate:make create_topics_table

exports.up = function (knex, Promise) {
  console.log('creating topics table...');
  return knex.schema.createTable('topics', (topicsTable) => {
    topicsTable.string('slug').primary();
    topicsTable.string('description');
  });
};

exports.down = function (knex, Promise) {
  console.log('dropping topics table...');
  return knex.schema.dropTable('topics');
};


/*
- Each topic should have:
  * `slug` field which is a unique string that acts as the table's primary key
  * `description` field which is a string giving a brief description of a given topic
*/
