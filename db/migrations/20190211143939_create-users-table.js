exports.up = function (knex, Promise) {
  // console.log('creating users table...');
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.string('username').primary();
    usersTable.string('name').notNullable();
    usersTable.string('avatar_url');
  });
};

exports.down = function (knex, Promise) {
  // console.log('dropping users table...');
  return knex.schema.dropTable('users');
};

/*
- Each user should have:

  * `username` which is the primary key & unique
  * `avatar_url`
  * `name`
*/
