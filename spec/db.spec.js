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

    it('POST: 201 a single topic object and responds posted topic', () => request
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

    it('GET: 200 query default sorts the articles by date asc', () => request
      .get('/api/articles/')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0].created_at).to.equal('1974-11-26T12:21:54.171Z');
      }));

    it('GET: 200 query sorts the articles by author desc', () => request
      .get('/api/articles/?sort_by=author&order=desc')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0].author).to.equal('rogersop');
      }));
    it('GET: 200 query sorts the articles by comment_count asc', () => request
      .get('/api/articles/?sort_by=comment_count&order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0].comment_count).to.equal('0');
        expect(body.articles[body.articles.length - 1].comment_count).to.equal('13'); // as its ASC
      }));

    const articleData = { title: 'Cats vs Dogs', body: 'Meow vs Woof', topic: 'cats', author: 'butter_bridge' };

    it('POST: 201 accepts body object and responds with posted article', () => request
      .post('/api/articles/')
      .expect(201)
      .send(articleData)
      .then(({ body }) => {
        expect(body.article).to.be.an('object');
        expect(body.article).to.contain.keys('title', 'body', 'topic', 'author');
        expect(body.article.author).to.equal('butter_bridge');
      }));
  });
});

/*

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

*/

/*

Mitch [3:36 PM]
Hey @channel,
It is really important that in your controllers, you are wrapping your data in objects:
`res.status(200).send({ articles })` if you are responding with articles,
and `res.status(200).send({ topic })` if you are responding with a single topic object
Just something you need to be aware of before we review your code :slightly_smiling_face:

Paul R - NC [3:53 PM]
and please destructure single items from the arrays that they are in
- e.g. getting an article by id should send:

`{ article: { title: 'hello, etc... } }`

rather than: `{ article: [ { title: 'hello, etc... } ] }`
i.e. you shouldn’t have to keep putting `[0]` in your tests for single items :slightly_smiling_face:


*/
