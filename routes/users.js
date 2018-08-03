const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcryptjs');

/* GET all users: listing. */
router.get('/', (req, res, next) => {
  knex('users')
  .then((users) => {
    let newUserArr = users.map(user => {
      delete user.created_at;
      delete user.updated_at;
      return user
    })
    res.status(200).send(newUserArr)
  })
  .catch(err => {
    res.status(500).send({error: {message: 'Something went wrong!'}})
  })
});

// GET one user
router.get('/:userid', (req, res, next) => {
  knex('users')
  .where('id', req.params.userid)
  .then((user) => {
    let newUserArr = user.map((user) => {
      delete user.created_at;
      delete user.updated_at;
      return user;
    })
    console.log('the specific user', newUserArr)
    res.send(newUserArr)
  })
})

// CREATE one user
// UPDATE one user
// DELETE one user

module.exports = router;
