const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const auth = require('../auth/auth');
const multer  = require('multer')
const upload = multer({ dest: 'public/images' })

/* GET all dogs: listing. */
router.get('/', auth.checkForToken, auth.verifyToken, (req, res, next) => {
  let user_id = req.token.user_id;
  knex('dogs')
  .where('user_id', user_id)
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
router.post('/', auth.checkForToken, auth.verifyToken, auth.authorizedUser, upload.single('dog_photo'), (req, res, next) => {
  let user_id = req.token.user_id;
  let dog_name = req.body.dog_name;
  let dog_age = req.body.dog_age;
  let dog_size = req.body.dog_size;
  let dog_photo_url = req.file.path;

  dog_photo_url = `${process.env.REACT_APP_API_URL}/${dog_photo_url.replace('public/', '')}`

  knex('dogs')
  .insert({
    user_id: user_id,
    dog_name: dog_name,
    dog_age: dog_age,
    dog_size: dog_size,
    dog_photo_url: dog_photo_url
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

module.exports = router;
