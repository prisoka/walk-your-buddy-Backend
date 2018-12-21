const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const auth = require('../auth/auth');

// setting up twilio
const accountSid = process.env.TWILIO_SID
const accountToken = process.env.TWILIO_TOKEN
const client = require('twilio')(accountSid, accountToken)

/* GET all requests: listing. */
router.get('/', auth.checkForToken, auth.verifyToken, auth.authorizedWalker, (req, res, next) => {
  let walker_id = req.token.user_id;

  knex('requests')
  .select(
    "u.first_name",
    "u.address_one",
    "u.address_two",
    "u.phone_number",
    "u.zip",
    "d.dog_name",
    "d.dog_photo_url",
    "r.id",
    "r.request_date",
    "r.request_time",
    "r.start_walk_time",
    "r.finish_walk_time",
    "r.walker_id"
  )
  .from('requests AS r')
  .where('r.walker_id', null)
  .orWhere('r.walker_id', walker_id)
  .join('users AS u', 'u.id', 'r.user_id')
  .join('dogs AS d', 'd.id', 'r.dog_id')
  .orderBy('r.request_date')
  .orderBy('r.request_time')
  .then((requests) => {
    let newReqArr = requests.map(request => {
      delete request.created_at;
      delete request.updated_at;
      return request
    })
    res.status(200).send(newReqArr)
  })
  .catch(err => {
    res.status(500).send({error: {message: 'Something went wrong!'}})
  })
});

// GET one request
router.get('/:id', (req, res, next) => {
  knex('requests')
  .where('id', req.params.id)
  .then((request) => {
    let newReqArr = request.map((request) => {
      delete request.created_at;
      delete request.updated_at;
      return request
    })
    res.send(newReqArr)
  })
  .catch((err) => {
    res.status(500).send({error: {message: 'Something went wrong!'}})
  })
})

// CREATE one request
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

// UPDATE request: add walker ID when walk is accepted
router.put('/:id', auth.checkForToken, auth.verifyToken, auth.authorizedWalker, (req, res, next) => {
  let user_id = req.body.user_id;
  let dog_id = req.body.dog_id;
  let request_date = req.body.request_date;
  let request_time = req.body.request_time;
  let start_walk_time = req.body.start_walk_time;
  let finish_walk_time = req.body.finish_walk_time;
  let walker_id = req.token.user_id;

  knex('requests')
  .where('id', req.params.id)
  .then((data) => {
    if(data.length){
      knex('requests')
      .update({
        user_id: user_id,
        dog_id: dog_id,
        request_date: request_date,
        request_time: request_time,
        start_walk_time: start_walk_time,
        finish_walk_time: finish_walk_time,
        walker_id: walker_id
      })
      .where('id', req.params.id)
      .returning('*')
      .then((result) => {
        return knex('requests')
        .select(
          "u.first_name",
          "u.address_one",
          "u.address_two",
          "u.phone_number",
          "u.zip",
          "d.dog_name",
          "d.dog_photo_url",
          "r.id",
          "r.request_date",
          "r.request_time",
          "r.start_walk_time",
          "r.finish_walk_time",
          "r.walker_id"
        )
        .from('requests AS r')
        .join('users AS u', 'u.id', 'r.user_id')
        .join('dogs AS d', 'd.id', 'r.dog_id')
        .where('r.id', req.params.id)
      })
      .then((result) => {
        let request = result[0]
        res.send(request)

        client.messages.create({
          // to: process.env.MY_PHONE_NUMBER,
          to: request.phone_number,
          from: process.env.MY_TWILIO_NUMBER,
          body: 'Ahoy from WYB: Your dog walking request has been accepted!'
        }, (err, data) => {
            if (err){
              console.log(err)
            } else {
              console.log(data)
            }
          })
      })
    }
  })
  .catch((err) => {
    next(err)
  })
})

// UPDATE request: add "start_walk_time" when walking starts
router.put('/:id/start_walk', auth.checkForToken, auth.verifyToken, auth.authorizedWalker, (req, res, next) => {
  let user_id = req.body.user_id;
  let dog_id = req.body.dog_id;
  let request_date = req.body.request_date;
  let request_time = req.body.request_time;
  let start_walk_time = req.body.start_walk_time;
  let finish_walk_time = req.body.finish_walk_time;
  let walker_id = req.token.user_id;

  knex('requests')
  .where('id', req.params.id)
  .then((data) => {
    if(data.length){
      knex('requests')
      .update({
        user_id: user_id,
        dog_id: dog_id,
        request_date: request_date,
        request_time: request_time,
        start_walk_time: start_walk_time,
        finish_walk_time: finish_walk_time,
        walker_id: walker_id
      })
      .where('id', req.params.id)
      .returning('*')
      .then((result) => {
        return knex('requests')
        .select(
          "u.first_name",
          "u.address_one",
          "u.address_two",
          "u.phone_number",
          "u.zip",
          "d.dog_name",
          "d.dog_photo_url",
          "r.id",
          "r.request_date",
          "r.request_time",
          "r.start_walk_time",
          "r.finish_walk_time",
          "r.walker_id"
        )
        .from('requests AS r')
        .join('users AS u', 'u.id', 'r.user_id')
        .join('dogs AS d', 'd.id', 'r.dog_id')
        .where('r.id', req.params.id)
      })
      .then((result) => {
        let request = result[0]
        res.send(request)

        client.messages.create({
          // to: process.env.MY_PHONE_NUMBER,
          to: request.phone_number,
          from: process.env.MY_TWILIO_NUMBER,
          body: 'Ahoy from WYB: ' + request.dog_name + " is enjoying a walk outside!"
        }, (err, data) => {
            if (err){
              console.log(err)
            } else {
              console.log(data)
            }
          })
      })
    }
  })
  .catch((err) => {
    next(err)
  })
})

// UPDATE request: add "finish_walk_time" when walking finishes
router.put('/:id/finish_walk', auth.checkForToken, auth.verifyToken, auth.authorizedWalker, (req, res, next) => {
  let user_id = req.body.user_id;
  let dog_id = req.body.dog_id;
  let request_date = req.body.request_date;
  let request_time = req.body.request_time;
  let start_walk_time = req.body.start_walk_time;
  let finish_walk_time = req.body.finish_walk_time;
  let walker_id = req.token.user_id;

  knex('requests')
  .where('id', req.params.id)
  .then((data) => {
    if(data.length){
      knex('requests')
      .update({
        user_id: user_id,
        dog_id: dog_id,
        request_date: request_date,
        request_time: request_time,
        start_walk_time: start_walk_time,
        finish_walk_time: finish_walk_time,
        walker_id: walker_id
      })
      .where('id', req.params.id)
      .returning('*')
      .then((result) => {
        return knex('requests')
        .select(
          "u.first_name",
          "u.address_one",
          "u.address_two",
          "u.phone_number",
          "u.zip",
          "d.dog_name",
          "d.dog_photo_url",
          "r.id",
          "r.request_date",
          "r.request_time",
          "r.start_walk_time",
          "r.finish_walk_time",
          "r.walker_id"
        )
        .from('requests AS r')
        .join('users AS u', 'u.id', 'r.user_id')
        .join('dogs AS d', 'd.id', 'r.dog_id')
        .where('r.id', req.params.id)
      })
      .then((result) => {
        let request = result[0]
        res.send(request)

        client.messages.create({
          // to: process.env.MY_PHONE_NUMBER,
          to: request.phone_number,
          from: process.env.MY_TWILIO_NUMBER,
          body: 'Ahoy from WYB: ' + request.dog_name + " is back home!"
        }, (err, data) => {
            if (err){
              console.log(err)
            } else {
              console.log(data)
            }
          })
      })
    }
  })
  .catch((err) => {
    next(err)
  })
})

// DELETE one request
router.delete('/:id', function(req, res, next) {
  const requestId = req.params.id;

  knex('requests')
    .where('id', requestId)
    .then((row) => {
      if(!row) return next()
      knex('requests')
        .del()
        .where('id', requestId)
        .then(() => {
          // res.send(`ID ${requestId} Deleted`)
          res.send({})
        })
        .catch((err) => {
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;
