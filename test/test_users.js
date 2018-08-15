process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');

beforeEach(done => {
  Promise.all([
    knex('users').insert({
        user_type: 'user',
        email: 'user@gmail.com',
        password: '12345678',
        first_name: 'Priscilla',
        last_name: 'User',
        phone_number: 5105105511,
        address_one: '44 Tehama Street',
        address_two: '3rd floor',
        zip: 94105
      }),
    knex('users').insert({
        user_type: 'walker',
        email: 'walker@gmail.com',
        password: '12345678',
        first_name: 'Rodrigo',
        last_name: 'Walker',
        phone_number: 5105105511,
        address_one: '44 Tehama Street',
        address_two: '5th floor',
        zip: 94105
    })
  ])
  .then(() => done())
  .catch((err)=>{
    console.log(err)
  })
})

// GET ALL
describe('GET /api/users', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /api/users/:id', () => {
  it('responds with JSON', done => {
      request(app)
          .get('/api/users')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});

afterEach((done) => {
  knex('users')
  .del()
  .then(() => {
    return done()
  })
  .catch((err) => {
    console.log(err)
  })
});

describe('POST /api/users', () => {
  let newUser = {
    user_type: 'user',
    email: 'user2@gmail.com',
    password: '12345678',
    first_name: 'Peter',
    last_name: 'Pan',
    phone_number: 3334445656,
    address_one: '44 Tehama Street',
    address_two: '3rd floor',
    zip: 94105
  }

  it('responds with JSON', done => {
    request(app)
      .post('/api/users')
      .type('form')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('adds the new user to the database', done => {
    request(app)
      .post('/api/users')
      .type('form')
      .send(newUser)
      .end((err, res) => {
        knex('users')
        .select()
        .then(users => {
          done();
        });
      });
  });
});
