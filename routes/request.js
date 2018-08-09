const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const auth = require('../auth/auth');

// CREATE one dog
router.post('/', auth.checkForToken, auth.verifyToken, auth.authorizedUser, (req, res, next) => {
  let user_id = req.token.user_id;
  let dog_id = req.body.dog_id;
  let request_date = req.body.request_date;
  let request_time = req.body.request_time;
  let walker_id = req.token.user_id;

  knex('dogs')
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
