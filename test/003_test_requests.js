process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');
const bcrypt = require('bcryptjs');

beforeEach((done) => {
  knex.migrate.rollback()
  .then(() => {
    knex.migrate.latest()
    .then(() => {
      return knex.seed.run()
      .then(() => {
        done();
      });
    });
  });
});

afterEach((done) => {
  knex.migrate.rollback()
  .then(() => {
    done();
  });
})

// GET ALL
describe('GET /api/requests', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/api/requests')
      .expect('Content-Type', /json/)
      .expect(200, done());
  });
});

// GET one
describe('GET /api/requests/:id', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/api/requests/1')
      .expect('Content-Type', /json/)
      .expect(200, done());
  });

  it('the server returns data on the requests with the given id', done => {
    request(app)
      .get('/api/requests/1')
      .end((err, res) => {
        expect(res.body).to.deep.equal([
          {
            id: 1,
            user_id: 1,
            dog_id: 1,
            request_date: '2018-10-09T07:00:00.000Z',
            request_time: '09:00:00',
            walker_id: null,
          }
        ]);
        done();
      });
    });
});

describe('POST /api/requests', () => {
  let newRequest = {
    user_id: 1,
    dog_id: 2,
    request_date: '2018/11/11',
    request_time: '11:11 am',
    walker_id: null,
  }

  it('responds with JSON', () => {
    request(app)
      .post('/api/requests')
      .type('form')
      .send(newRequest)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('adds the new user to the database', done => {
    request(app)
      .post('/api/requests')
      .type('form')
      .send(newRequest)
      .end((err, res) => {
        knex('requests')
        .select()
        .then(requests => {
          done();
        });
      });
  });
});

describe('Delete /api/requests/:id', () => {
  it('should return status 200 after DELETING given id', done => {
      request(app)
          .get('/api/requests/1')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});
