# NC Noose Backend

# About

NC Noose is a social news aggregation, web content rating, and discussion website. Think something along the lines of Reddit.

NC Noose has articles which are divided into topics. Each article has user curated ratings and can be voted up or down. Users can add or delete comments on an article. Comments can also be voted up or down.

The database is implemented in PSQL, and populated & queried using [Knex](https://knexjs.org).

FRONT-END DEMO [https://nc-noose.netlify.com/](https://nc-noose.netlify.com/)

FRONT-END REPO [https://github.com/philval/fe2-nc-knews/](https://github.com/philval/fe2-nc-knews/)

BACK-END DEMO [https://nc-noose.herokuapp.com/api/articles](https://nc-noose.herokuapp.com/api/articles)

BACK-END REPO [https://github.com/philval/BE2-NC-Knews](https://github.com/philval/BE2-NC-Knews)


### Prerequisites

- A local installation of Node (latest)

- a heroku account if deployed

- Postgres App for OSX.  Download from https://postgresapp.com/ and follow the instructions.

- a knexfile.js file in the project root folder as below.  DB_URL is the production DB URL sourced via heroku config:get (see package.json).

```javascript
const ENV = process.env.NODE_ENV || 'development';
const { DB_URL } = process.env;

const config = {
  development: {
    client: 'pg',
    connection: {
      database: 'db_knews_dev',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      database: 'db_knews_test',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: `${DB_URL}?ssl=true`,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};

module.exports = config[ENV];
```

## Setup

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

- Clone the repo from git : https://github.com/philval/BE2-NC-Knews

- Run : npm install

- To drop the Postgres dev & test databases (if they exist) and create new ones : npm run setup:dbs

- To seed the dev database : npm run seed

- To start the app : npm run dev

- The api is exposed at http://localhost:9090/

- Example : enter this URL into your browser : http://localhost:9090/api/articles

## Running the tests

To run the tests : npm run test

This changes the NODE_ENV to test, and re-seeds the database with test data - before running each test - as specified in db.spec.js


## Deployment

To do.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## API Description

```http
GET /api/topics
```

##### Responds with
- an array of topic objects, with the following properties:
  * `slug`
  * `description`

***

```http
POST /api/topics
```

##### Request body accepts
- an object containing the following properties:
  * `slug` which is unique
  * `description`

##### Responds with
- the posted topic object

***

```http
GET /api/articles
```

##### Responds with
- an `articles` array of article objects, each of which has the following properties:
  * `author` which is the `username` from the users table
  * `title`
  * `article_id`
  * `topic`
  * `created_at`
  * `votes`
  * `comment_count` which is the total count of all the comments with this article_id

##### accept queries
  * `author`, which filters the articles by the username value specified in the query
  * `topic`, which filters the articles by the topic value specified in the query
  * `sort_by`, which sorts the articles by any valid column (defaults to date)
  * `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)


```http
POST /api/articles
```

##### Request body accepts
- an object containing the following properties:
  * `title`
  * `body`
  * `topic`
  * `username`

##### Responds with
- the posted article

***

```http
GET /api/articles/:article_id
```

##### Responds with
- an article object,  which has the following properties:
  * `author` which is the `username` from the users table
  * `title`
  * `article_id`
  * `body`
  * `topic`
  * `created_at`
  * `votes`
  * `comment_count` which is the total count of all the comments with this article_id

***

```http
PATCH /api/articles/:article_id
```

##### Request body accepts
- an object in the form `{ inc_votes: newVote }`

  * `newVote` will indicate how much the `votes` property in the database will be updated by

  e.g.

  `{ inc_votes : 1 }` will increment the current article's vote property by 1

  `{ inc_votes : -1 }` will decrement the current article's vote property by 1

##### Responds with
- the updated article

***

```http
DELETE /api/articles/:article_id
```
#####
- delete the given article by `article_id`

##### Responds with
- status 204 and no content

***

```http
GET /api/articles/:article_id/comments
```

##### Responds with
- an array of comments for the given `article_id` of which each comment has the following properties:
  * `comment_id`
  * `votes`
  * `created_at`
  * `author` which is the `username` from the users table
  * `body`

##### Accepts queries
  * `sort_by`, which sorts the articles by any valid column (defaults to date)
  * `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)


```http
POST /api/articles/:article_id/comments
```

##### Request body accepts
- an object with the following properties:
  * `username`
  * `body`

##### Responds with
- the posted comment

***

```http
PATCH /api/comments/:comment_id
```
##### Request body accepts
- an object in the form `{ inc_votes: newVote }`

  * `newVote` will indicate how much the `votes` property in the database will be updated by

  e.g.

  `{ inc_votes : 1 }` will increment the current article's vote property by 1

  `{ inc_votes : -1 }` will decrement the current article's vote property by 1

##### Responds with
- the updated comment

***

```http
DELETE /api/comments/:comment_id
```

##### delete
- delete the given comment by `comment_id`

##### Responds with
- status 204 and no content


```http
GET /api/users
```

##### Responds with
- an array of user objects, each of which has the following properties:
  * `username`
  * `avatar_url`
  * `name`

***

```http
POST /api/users
```

##### Request body accepts
- an object containing the following properties:
  * `username`
  * `avatar_url`
  * `name`

##### Responds with
- the posted user

***

```http
GET /api/users/:username
```

##### Responds with
- a user object which has the following properties:
  * `username`
  * `avatar_url`
  * `name`

***

```http
GET /api
```
##### Responds with
- JSON describing all the available endpoints on the API