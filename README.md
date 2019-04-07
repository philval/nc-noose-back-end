# NC Noose Backend

# About

NC Noose is a social news aggregation, web content rating, and discussion website. Think something along the lines of Reddit.

NC Noose has articles which are divided into topics. Each article has user curated ratings and can be voted up or down. Users can add or delete comments on an article. Comments can also be voted up or down.

The database is implemented in PSQL, and populated & queried using [Knex](https://knexjs.org).

LIVE DEMO [https://nc-noose.netlify.com/](https://nc-noose.netlify.com/)

FRONTEND REPO [https://github.com/philval/fe2-nc-knews/](https://github.com/philval/fe2-nc-knews/)

BACKEND REPO [https://github.com/philval/BE2-NC-Knews](https://github.com/philval/BE2-NC-Knews)

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

##### Should accept queries
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

  * `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current article's vote property by 1

  `{ inc_votes : -1 }` would decrement the current article's vote property by 1

##### Responds with
- the updated article

***

```http
DELETE /api/articles/:article_id
```
##### Should
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

  * `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current article's vote property by 1

  `{ inc_votes : -1 }` would decrement the current article's vote property by 1

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
- JSON describing all the available endpoints on your API XXXX


### Prerequisites

- A local installation of Node (latest)
- Postgres App for OSX.  Download from https://postgresapp.com/ and follow the instructions. XXXX


## setup

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

- Clone the repo from git : https://github.com/philval/BE2-NC-Knews

- Run : npm install

- To drop the Postgres dev & test databases (if they exist) and create new ones : npm run setup:dbs

- To seed the dev database : npm run seed

- To start the app : npm run dev

- The api is exposed at http://localhost:9090/

- Example : enter this URL into your browser : http://localhost:9090/api/articles
```

### Installing



End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
