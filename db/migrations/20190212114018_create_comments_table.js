exports.up = function (knex, Promise) {
  console.log('creating comments table...');
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable.string('author').references('users.username');
    commentsTable.integer('article_id').references('articles.article_id');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.date('created_at').notNullable();
    commentsTable.text('body').notNullable();
  });
};

exports.down = function (knex, Promise) {
  console.log('dropping comments table...');
  return knex.schema.dropTable('comments');
};
/*

* Each comment should have:
  * `comment_id` which is the primary key
  * `author` field that references a user's primary key (username)
  * `article_id` field that references an article's primary key
  * `votes` defaults to 0
  * `created_at` defaults to the current date
  * `body`

  * */
