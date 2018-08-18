'use strict';
require('dotenv').config({path: './.env.development'});

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
