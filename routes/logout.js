const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// logout USER
router.get('/', function(req, res){
  console.log('hello!!!!')
  res.cookie('token', 'DELETED', {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: router.get('env') === 'production'
  })
  res.status(200).send({});
});

module.exports = router;
