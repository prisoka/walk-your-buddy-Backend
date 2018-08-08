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
    res.send(newUserArr)
  })
  .catch(err => {
    res.status(500).send({error: {message: 'Something went wrong!'}})
  })
})

// id PK
// email - string (NN)
// password - text (NN)
// first_name - text (NN)
// last_name - text (NN)
// phone_number - number (NN)
// address_one - text (NN)
// address_two - text
// zip - number (NN)

// CREATE one user
router.post('/', (req, res, next) => {
  let user_type = req.body.user_type;
  let email = req.body.email;
  let password = req.body.password;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let phone_number = req.body.phone_number;
  let address_one = req.body.address_one;
  let address_two = req.body.address_two;
  let zip = req.body.zip;

  knex('users')
  .where('email', email)
  .first()
  .then((user) => {
    if(user) {
      throw new Error('This email already exists!')
    }

    let hashed = bcrypt.hashSync(password)

    knex('users')
    .insert({
      user_type: user_type,
      email: email,
      password: hashed,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      address_one: address_one,
      address_two: address_two,
      zip: zip
    })
    .returning('*')
    .then((result) => {
      let insertedRecord = result[0]
      res.send(insertedRecord)
    })
    // .then(function(user){
    //   var token = jwt.sign({ user: user.id },
    //                         'secret',
    //                         { expiresIn: 24 * 60 * 60 });
    //   res.send(200, {'token': myToken,
    //                  'user_id': user.id
    //                 });
    // });
  })
  .catch((err) => {
    next(err)
  })
})

// UPDATE one user
router.put('/:userid', (req, res, next) => {
  knex('users')
  .where('id', req.params.userid)
  .then((data) => {
    if(data.length) {
      knex('users')
      .update({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        address_one: req.body.address_one,
        address_two: req.body.address_two,
        zip: req.body.zip
      })
      .where('id', req.params.userid)
      .returning('*')
      .then((updateResult) => {
        console.log('updateResult', updateResult)
        res.send(updateResult[0])
      })
    }
  })
  .catch((err) => {
    next(err)
  })
})

// DELETE one user
router.delete('/:id', function(req, res, next) {
  const userId = req.params.id;

  knex('users')
    .where('id', userId)
    .then((row) => {
      if(!row) return next()
      knex('users')
        .del()
        .where('id', userId)
        .then(() => {
          res.send(`ID ${userId} Deleted`)
        })
        .catch((err) => {
          console.log("Hey, could not delete!")
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;
