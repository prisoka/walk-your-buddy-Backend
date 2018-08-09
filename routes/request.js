const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const auth = require('../auth/auth');

// CREATE one dog
router.post('/', auth.checkForToken, auth.verifyToken, auth.authorizedUser, (req, res, next) => {
  let user_id = req.token.user_id;
  let dog_id = req.body.dog_id;
  let booking_date = req.body.booking_date;
  let booking_time = req.body.booking_time;
  let walker_id = req.token.user_id;

  knex('dogs')
  .insert({
    user_id: user_id,
    dog_id: dog_id,
    booking_date: booking_date,
    booking_date: booking_date,
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
// booking_date
// booking_time
// walker_id
