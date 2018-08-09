const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../db/knex');
require('dotenv').config();

// login USER
router.post('/', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  knex('users')
  .where('email', email)
  .first()
  .then(user => {
    if(user){
      let passwordGood = bcrypt.compareSync(password, user.password)
      if(passwordGood){
        let payload = {
          user_id: user.id,
          user_type: user.user_type
        }
        let token = jwt.sign(payload, process.env.JWT_KEY)
        res.cookie('token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          secure: router.get('env') === 'production'
        })
        res.status(200).send({user_type: user.user_type});
      }
    } else {
      throw new Error('Incorrect Email or Password')
    }
  })
  .catch((err) => {
    res.status(404).send({error: {message: err.message}})
  })
})

module.exports = router;
