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

    const topicData = { slug: 'Heaven', description: 'Hell on Earth' };

    it('POST: 201 a single topic object', () => request
      .post('/api/topics')
      .send(topicData)
      .expect(201)
      .then(({ body }) => {
        expect(body.topic).to.be.an('object');
        expect(body.topic).to.deep.equal(topicData);
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

    it.only('GET: 200 query articles by the username i.e. author', () => request
      .get('/api/articles/?author=butter_bridge')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        body.articles.forEach(article => expect(article.author).to.equal('butter_bridge'));
      }));
  });
});


/*
##### Should accept queries
  * `author`, which filters the articles by the username value specified in the query
  * `topic`, which filters the articles by the topic value specified in the query
  * `sort_by`, which sorts the articles by any valid column (defaults to date)
  * `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
  * 
*/
