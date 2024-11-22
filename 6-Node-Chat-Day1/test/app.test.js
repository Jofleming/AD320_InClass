const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('GET /', () => {
  it('should return the home page', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('GET /chat', () => {
  it('should return the chat page', (done) => {
    request(app)
      .get('/chat')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('POST /join', () => {
  it('should add a new user and return the updated user list', (done) => {
    request(app)
      .post('/join')
      .send({ username: 'TestUser' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.usersOnline).to.include('TestUser');
        done();
      });
  });

  it('should not add a duplicate user', (done) => {
    request(app)
      .post('/join')
      .send({ username: 'Alice' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const count = res.body.usersOnline.filter(user => user === 'Alice').length;
        expect(count).to.equal(1);
        done();
      });
  });
});

describe('POST /send-message', () => {
  it('should send a message and return success', (done) => {
    request(app)
      .post('/send-message')
      .send({ username: 'TestUser', message: 'Hello, world!' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.be.true;
        done();
      });
  });

  it('should fail when username or message is missing', (done) => {
    request(app)
      .post('/send-message')
      .send({ username: 'TestUser' })  // Missing message
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.be.false;
        done();
      });
  });
});

describe('GET /get-users', () => {
  it('should return a list of online users', (done) => {
    request(app)
      .get('/get-users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('GET /get-messages', () => {
  it('should return a list of messages', (done) => {
    request(app)
      .get('/get-messages')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
