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

  // get array of objects back
  describe('/topics', () => {
    it('GET responds with 200 and an array of topics', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).to.be.an('array');
        expect(body.topics[0]).to.contain.keys('slug', 'description');
        expect(body.topics).to.have.length(2); // test data !
      }));

    const topicData = { slug: 'Heaven', description: 'Hell on Earth' };

    it('POST responds with 201 and topic object', () => request
      .post('/api/topics')
      .send(topicData)
      .expect(201)
      .then(({ body }) => {
        expect(body.topic).to.be.an('object');
        expect(body.topic).to.deep.equal(topicData);
      }));
  });
});
