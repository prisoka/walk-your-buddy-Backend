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
describe('GET /api/users', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200, done());
  });

  it('returns an array of all users objects when responding with JSON', done => {
    request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.body).to.deep.equal([{
          id: 1,
          user_type: 'user',
          email: 'user@gmail.com',
          password: bcrypt.hashSync('priscilla'),
          first_name: 'Priscilla',
          last_name: 'User',
          phone_number: '5105105511',
          address_one: '44 Tehama Street',
          address_two: '3rd floor',
          zip: 94105
        }, {
          id: 2,
          user_type: 'walker',
          email: 'walker@gmail.com',
          password: bcrypt.hashSync('priscilla'),
          first_name: 'Rodrigo',
          last_name: 'Walker',
          phone_number: '5105105511',
          address_one: '44 Tehama Street',
          address_two: '5th floor',
          zip: 94105
        }]);
        done();
      });
    });
});

// GET one
describe('GET /api/users/:id', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/api/users/1')
      .expect('Content-Type', /json/)
      .expect(200, done());
  });

  it('the server returns data on the users with the given id', done => {
    request(app)
      .get('/api/users/1')
      .end((err, res) => {
        expect(res.body).to.deep.equal([{
          id: 1,
          user_type: 'user',
          email: 'user@gmail.com',
          password: bcrypt.hashSync('priscilla'),
          first_name: 'Priscilla',
          last_name: 'User',
          phone_number: '5105105511',
          address_one: '44 Tehama Street',
          address_two: '3rd floor',
          zip: 94105
        }]);
        done();
      });
    });
});

describe('POST /api/users', () => {
  let newUser = {
    user_type: 'user',
    email: 'user2@gmail.com',
    password: bcrypt.hashSync('12345678'),
    first_name: 'Peter',
    last_name: 'Pan',
    phone_number: '3334445656',
    address_one: '44 Tehama Street',
    address_two: '3rd floor',
    zip: 94105
  }

  it('responds with JSON', () => {
    request(app)
      .post('/api/users')
      .type('form')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(200);
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

// update one
describe('PUT /api/users/:id', done => {
  let updatedUser = {
    id: 1,
    user_type: 'user',
    email: 'user_testing@gmail.com',
    password: bcrypt.hashSync('priscilla'),
    first_name: 'Priscilla Testing',
    last_name: 'User',
    phone_number: '5105105511',
    address_one: '44 Tehama Street',
    address_two: '3rd floor',
    zip: 94105
  };

  it('responds with JSON', done => {
    request(app)
      .put('/api/users/1')
      .type('form')
      .send(updatedUser)
      .expect('Content-Type', /json/)
      .expect(200, done());
  });

  it('updates the user in the database', () => {
    request(app)
      .put('/api/users/1')
      .type('form')
      .send(updatedUser)
      .end((err, res) => {
        knex('users')
          .where('id', 1)
          .first()
          .then(user => {
            expect(user.user_type).to.equal(updatedUser.user_type);
            expect(user.email).to.equal(updatedUser.email);
            expect(user.password).to.equal(updatedUser.password);
            expect(user.first_name).to.equal(updatedUser.first_name);
            expect(user.last_name).to.equal(updatedUser.last_name);
            expect(user.phone_number).to.equal(updatedUser.phone_number);
            expect(user.address_one).to.equal(updatedUser.address_one);
            expect(user.address_two).to.equal(updatedUser.address_two);
            expect(user.zip).to.equal(updatedUser.zip);
          });
      });
  });
});

describe('Delete /api/users/:id', () => {
  it('should return status 200 after DELETING given id', done => {
      request(app)
          .get('/api/users/1')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});
