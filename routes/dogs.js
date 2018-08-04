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
