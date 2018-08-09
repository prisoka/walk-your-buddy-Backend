const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const auth = require('../auth/auth');

/* GET all requests: listing. */
router.get('/', (req, res, next) => {
  knex('requests')
  .then((requests) => {
    let newReqsArr = requests.map(request => {
      delete request.created_at;
      delete request.updated_at;
      return request
    })
    res.status(200).send(newReqsArr)
  })
  .catch(err => {
    res.status(500).send({error: {message: 'Something went wrong!'}})
  })
});

// CREATE on request
router.post('/', auth.checkForToken, auth.verifyToken, auth.authorizedUser, (req, res, next) => {
  let user_id = req.token.user_id;
  let dog_id = req.body.dog_id;
  let request_date = req.body.request_date;
  let request_time = req.body.request_time;
  let walker_id = req.token.user_id;

  knex('requests')
  .insert({
    user_id: user_id,
    dog_id: dog_id,
    request_date: request_date,
    request_date: request_date,
    walker_id: walker_id
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

// id
// user_id
// dog_id
// request_date
// request_time
// walker_id
