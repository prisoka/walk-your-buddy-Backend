'use strict';

const env = process.env.NODE_ENV

if(env === 'production'){
  require('dotenv').config({path: './.env.production'});
} else {
  require('dotenv').config({path: './.env.development'});
}

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
