'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/wyb_db',
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/wyb_test',
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
