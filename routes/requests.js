const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const auth = require('../auth/auth');

/* GET all requests: listing. */
router.get('/', (req, res, next) => {
  knex('requests')
  .select(
    "u.first_name",
    "u.address_one",
    "u.address_two",
    "u.zip",
    "d.dog_name",
    "d.dog_photo_url",
    "r.id",
    "r.request_date",
    "r.request_time",
    "r.walker_id"
  )
  .from('requests AS r')
  .join('users AS u', 'u.id', 'r.user_id')
  .join('dogs AS d', 'd.id', 'r.dog_id')
  // .where('r.walker_id', 'IS', null)

  .then((requests) => {
    res.status(200).send(requests)
  })
  .catch(err => {
    res.status(500).send({error: {message: 'Something went wrong!'}})
  })
});

// GET one request
router.get('/:requestid', (req, res, next) => {
  knex('requests')
  .where('id', req.params.requestid)
  .then((request) => {
    let newReqArr = request.map((request) => {
      return request
    })
    res.send(newReqArr)
  })
  .catch((err) => {
    res.status(500).send({error: {message: 'Something went wrong!'}})
  })
})

// CREATE on request
router.post('/', auth.checkForToken, auth.verifyToken, auth.authorizedUser, (req, res, next) => {
  let user_id = req.token.user_id;
  let dog_id = req.body.dog_id;
  let request_date = req.body.request_date;
  let request_time = req.body.request_time;

  knex('requests')
  .insert({
    user_id: user_id,
    dog_id: dog_id,
    request_date: request_date,
    request_time: request_time,
    walker_id: null
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

// id
// user_id
// dog_id
// request_date
// request_time
// walker_id

// UPDATE one request
router.put('/:requestid', auth.checkForToken, auth.verifyToken, auth.authorizedWalker, (req, res, next) => {
  let user_id = req.body.user_id;
  let dog_id = req.body.dog_id;
  let request_date = req.body.request_date;
  let request_time = req.body.request_time;
  let walker_id = req.token.user_id;

  knex('requests')
  .where('id', req.params.requestid)
  .then((data) => {
    if(data.length){
      knex('requests')
      .update({
        user_id: user_id,
        dog_id: dog_id,
        request_date: request_date,
        request_time: request_time,
        walker_id: walker_id
      })
      .where('id', req.params.requestid)
      .returning('*')
      .then((result) => {
        let updatedRecord = result[0]
        res.send(updatedRecord)
      })
    }
  })
  .catch((err) => {
    next(err)
  })
})

module.exports = router;
