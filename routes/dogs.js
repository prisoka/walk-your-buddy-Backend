const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* GET all dogs: listing. */
router.get('/', (req, res, next) => {
  knex('dogs')
  .then((dogs) => {
    let newDogsArr = dogs.map(dog => {
      delete dog.created_at;
      delete dog.updated_at;
      return dog
    })
    res.status(200).send(newDogsArr)
  })
  .catch(err => {
    res.status(500).send({error: {message: 'Something went wrong!'}})
  })
});

// GET one dog
router.get('/:dogid', (req, res, next) => {
  knex('dogs')
  .where('id', req.params.dogid)
  .then((dogs) => {
    let newDogsArr = dogs.map(dog => {
      delete dog.created_at;
      delete dog.updated_at;
      return dog
    })
    res.status(200).send(newDogsArr)
  })
  .catch(err => {
    res.status(500).send({error: {message: 'Something went wrong!'}})
  })
})

// CREATE one dog
router.post('/', (req, res, next) => {
  let dog_name = req.body.dog_name;
  let dog_age = req.body.dog_age;
  let dog_size = req.body.dog_size;


  knex('dogs')
  .insert({
    user_id: 1,
    dog_name: dog_name,
    dog_age: dog_age,
    dog_size: dog_size,

  })
  .returning('*')
  .then((result) => {
    let insertedRecord = result[0]
    res.send(insertedRecord)
  })
  .catch((err) => {
    next(err)
  })
})


// router.post('/', () => {
//   let user_id: ;
//   let dog_name: req.body.dog_name;
//   let dog_age: req.body.dog_age;
//   let dog_size: req.body.dog_size;
//
// })

// UPDATE one dog
// DELETE one dog

module.exports = router;
