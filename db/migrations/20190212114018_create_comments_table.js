exports.up = function (knex, Promise) {
  // console.log('creating comments table...');
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary(); // ok
    commentsTable.string('author').references('users.username'); // map created_by > author
    commentsTable.integer('article_id').references('articles.article_id'); // map belongs_to > article_id & lookup function
    commentsTable.integer('votes').defaultTo(0); // ok
    commentsTable.timestamp('created_at').defaultTo(knex.fn.now()); // new POSTS
    commentsTable.text('body').notNullable(); // ok
  });
};

exports.down = function (knex, Promise) {
  // console.log('dropping comments table...');
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
