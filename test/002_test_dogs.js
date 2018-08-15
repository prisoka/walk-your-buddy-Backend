process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');

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
describe('GET /api/dogs', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/api/dogs')
      .expect('Content-Type', /json/)
      .expect(200, done());
  });

  //will have to attach AUTH/token to pass get all from specific user
  it('returns an array of all dogs objects when responding with JSON', done => {
    request(app)
      .get('/api/dogs')
      .end((err, res) => {
        expect(res.body).to.deep.equal([
          {
            id: 1,
            user_id: 1,
            dog_name: 'Aquila',
            dog_age: 1,
            dog_size: 'large',
            dog_photo_url: 'http://localhost:3000/images/aquila.JPG'
          },
          {
            id: 2,
            user_id: 1,
            dog_name: 'Bacon',
            dog_age: 5,
            dog_size: 'small',
            dog_photo_url: 'http://localhost:3000/images/fernanda-soares-668153-unsplash.jpg'
          }
        ]);
        done();
      });
    });
});

// GET one
describe('GET /api/dogs/:id', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/api/dogs/1')
      .expect('Content-Type', /json/)
      .expect(200, done());
  });

  it('the server returns data on the dogs with the given id', done => {
    request(app)
      .get('/api/dogs/1')
      .end((err, res) => {
        expect(res.body).to.deep.equal([
          {
            id: 1,
            user_id: 1,
            dog_name: 'Aquila',
            dog_age: 1,
            dog_size: 'large',
            dog_photo_url: 'http://localhost:3000/images/aquila.JPG'
          },
        ]);
        done();
      });
    });
});

describe('POST /api/dogs', () => {
  let newDog = {
    user_id: 1,
    dog_name: 'testing3',
    dog_age: 3,
    dog_size: 'giant'
  }

  it('responds with JSON', () => {
    request(app)
      .post('/api/dogs')
      .type('form')
      .send(newDog)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('adds the new user to the database', done => {
    request(app)
      .post('/api/dogs')
      .type('form')
      .send(newDog)
      .end((err, res) => {
        knex('dogs')
        .select()
        .then(dogs => {
          done();
        });
      });
  });
});
