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
        let payload = { user_id: user.id }
        let token = jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: '7days'
        })
        res.cookie('token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          secure: router.get('env') === 'production'
        })
        let userIsWalker = user.user_type === 'walker';
        res.status(200).send({userIsWalker: userIsWalker});
      }
    } else {
      throw new Error('Incorrect Email or Password')
    }
  })
  .catch((err) => {
    res.next(err)
  })
})
