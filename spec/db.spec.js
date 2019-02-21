process.env.NODE_ENV = 'test'; // set ENV

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const connection = require('../db/connection');

describe('/api', () => {
  // reseed DB before every it block
  beforeEach('/api', () => connection.seed.run());

  // close connection after all it blocks have completed
  after(() => connection.destroy());

  describe('/topics', () => {
    it('GET: 200 an array of topic objects', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).to.be.an('array');
        expect(body.topics[0]).to.contain.keys('slug', 'description');
        expect(body.topics).to.have.length(2); // test data
      }));

    const postTopic = { slug: 'Heaven', description: 'Hell on Earth' };

    it('POST: 201 accepts a single topic object and responds with the posted topic', () => request
      .post('/api/topics')
      .send(postTopic)
      .expect(201)
      .then(({ body }) => {
        expect(body.topic).to.be.an('object');
        expect(body.topic).to.deep.equal(postTopic);
      }));
  });

  describe('/articles', () => {
    it('GET: 200 an array of article objects', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
      }));

    it('GET: 200 query returns articles by the username i.e. author', () => request
      .get('/api/articles/?author=butter_bridge')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        body.articles.forEach(article => expect(article.author).to.equal('butter_bridge'));
      }));

    it('GET: 200 query returns articles by topic', () => request
      .get('/api/articles/?topic=mitch')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        body.articles.forEach(article => expect(article.topic).to.equal('mitch'));
      }));

    it('GET: 200 query default sorts the articles by date desc', () => request
      .get('/api/articles/')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0].created_at).to.equal('2018-11-15T12:21:54.171Z');
      }));

    it('GET: 200 query sorts the articles by author default desc', () => request
      .get('/api/articles/?sort_by=author')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles.length).to.equal(10);
        // expect(body.articles[0].title).to.equal('Z');
        expect(body.articles[0].author).to.equal('rogersop');
      }));
    it('GET: 200 query sorts the articles by comment_count asc', () => request
      .get('/api/articles/?sort_by=comment_count&order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0].comment_count).to.equal('0');
      }));

    const postArticle = { title: 'Cats vs Dogs', body: 'Meow vs Woof', topic: 'cats', author: 'butter_bridge' };

    it('POST: 201 accepts body object and responds with the posted article', () => request
      .post('/api/articles/')
      .expect(201)
      .send(postArticle)
      .then(({ body }) => {
        expect(body.article).to.be.an('object');
        expect(body.article).to.contain.keys('title', 'body', 'topic', 'author');
        expect(body.article.author).to.equal('butter_bridge');
      }));
  });

  describe('/articles/:article_id', () => {
    it('GET: 200 query responds with a single article object', () => request
      .get('/api/articles/1')
      .expect(200)
      .then(({ body }) => {
        expect(body.article).to.be.an('object');
        expect(body.article).to.contain.keys(
          'article_id',
          'author',
          'title',
          'body',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
        expect(body.article.article_id).to.equal(1);
        expect(body.article.votes).to.equal(100);
        expect(body.article.comment_count).to.equal('13');
      }));

    it('PATCH: 200 increments the votes and responds with the updated article', () => request
      .patch('/api/articles/1')
      .send({ inc_votes: 42 })
      .expect(200)
      .then(({ body }) => {
        expect(body.article).to.be.an('object');
        expect(body.article).to.contain.keys(
          'article_id',
          'author',
          'title',
          'body',
          'topic',
          'created_at',
          'votes',
        );
        expect(body.article.article_id).to.equal(1);
        expect(body.article.votes).to.equal(142);
        expect(body.article.author).to.equal('butter_bridge');
      }));

    it('PATCH: 200 decrements the votes and responds with updated article', () => request
      .patch('/api/articles/1')
      .send({ inc_votes: -42 })
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).to.equal(1);
        expect(body.article.votes).to.equal(58);
      }));

    it('PATCH: 200 responds with unchanged article when votes = 0', () => request
      .patch('/api/articles/1')
      .send({ inc_votes: 0 })
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).to.equal(1);
        expect(body.article.votes).to.equal(100);
      }));

    it('DELETE: 204 responds with status and no content', () => request
      .delete('/api/articles/2')
      .expect(204)
      .then(({ body }) => {
        expect(body).to.deep.equal({});
      }));
  });

  describe('/articles/:article_id/comments', () => {
    it('GET: 200 query responds with an array of comments for given article_id', () => request
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).to.be.an('array');
        expect(body.comments[0]).to.contain.keys(
          'comment_id',
          'votes',
          'created_at',
          'author',
          'body',
        );
        expect(body.comments[0].article_id).to.equal(1);
      }));

    it('GET: 200 query responds with an array of comments for given article_id', () => request
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).to.be.an('array');
        expect(body.comments[0]).to.contain.keys(
          'comment_id',
          'votes',
          'created_at',
          'author',
          'body',
        );
        expect(body.comments[0].article_id).to.equal(1);
      }));

    it('GET: 200 query responds with an array of comments default order by Date desc', () => request
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).to.be.an('array');
        expect(body.comments[0].created_at).to.equal('2016-11-22T12:36:03.389Z');
      }));

    it('GET: 200 query responds with an array of comments sorted by votes asc', () => request
      .get('/api/articles/1/comments?sort_by=votes&order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).to.be.an('array');
        expect(body.comments[0].votes).to.equal(-100);
      }));

    it('GET: 200 query can be SORT BY author default asc', () => request
      .get('/api/articles/1/comments?sort_by=author')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).to.be.an('array');
        expect(body.comments[0].author).to.equal('icellusedkars');
      }));

    const postComment = { author: 'butter_bridge', body: 'This is a test comment' };

    it('POST: 201 accepts body object responds with the posted comment', () => request
      .post('/api/articles/2/comments')
      .expect(201)
      .send(postComment)
      .then(({ body }) => {
        expect(body.comment).to.be.an('object');
        expect(body.comment).to.contain.keys(
          'comment_id',
          'votes',
          'created_at',
          'author',
          'body',
        );
        expect(body.comment.article_id).to.equal(2);
        expect(body.comment.author).to.equal('butter_bridge');
      }));
  });

  describe('/comments/:comment_id', () => {
    it('PATCH: 200 increments the votes and responds with the updated comment', () => request
      .patch('/api/comments/3')
      .send({ inc_votes: 7 })
      .expect(200)
      .then(({ body }) => {
        expect(body.comment).to.be.an('object');
        expect(body.comment).to.contain.keys(
          'comment_id',
          'votes',
          'created_at',
          'author',
          'body',
        );
        expect(body.comment.comment_id).to.equal(3);
        expect(body.comment.votes).to.equal(107); // +100
      }));

    it('PATCH: 200 decrement the votes and responds with the updated comment', () => request
      .patch('/api/comments/4')
      .send({ inc_votes: -7 })
      .expect(200)
      .then(({ body }) => {
        expect(body.comment.comment_id).to.equal(4);
        expect(body.comment.votes).to.equal(-107); // -100
      }));

    it('PATCH: 200 responds with unchanged comment when votes = 0', () => request
      .patch('/api/comments/1')
      .send({ inc_votes: 0 })
      .expect(200)
      .then(({ body }) => {
        expect(body.comment.comment_id).to.equal(1);
        expect(body.comment.votes).to.equal(16); // +16
      }));

    // it('DELETE: 204 responds with status and no content', () => request
    //   .delete('/api/comments/7')
    //   .expect(204)
    //   .then(({ body }) => {
    //     expect(body).to.deep.equal({});
    //     expect(body).to.equal(1);
    //   }));
  });
});

/*

PATCH /api/comments/:comment_id
Request body accepts
an object in the form { inc_votes: newVote }

newVote will indicate how much the votes property in the database should be updated by
e.g.

{ inc_votes : 1 } would increment the current article's vote property by 1

{ inc_votes : -1 } would decrement the current article's vote property by 1

Responds with
the updated comment

*/

/*

Hi Phil, I hope you find this in the morning. I recall making a mistake when we were talking earlier.
`405` -> method not allowed (i.e. no POST on the `/api/articles/:article_id` endpoint)
`422` -> unprocessable entity (for instance, if a user tries to POST a topic, with a slug that already exists)

*/
