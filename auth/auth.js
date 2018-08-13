const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtVerifyAsync } = require('./jsonwebTokenAsync');
require('dotenv').config();
const router = express.Router();

function checkForToken(req, res, next) {
  if (req.headers.authorization && req.headers.authorization !== "Bearer: not.avalid.token") {
    req.token = req.headers.authorization.split(" ")[1];
    next();
  } else if (req.cookies.token) {
    req.token = req.cookies.token
    next();
  } else {
    res.sendStatus(403);
  }
}

async function verifyToken(req, res, next) {
  try {
    const verifiedToken = await jwtVerifyAsync(req.token, process.env.JWT_KEY);
    req.token = verifiedToken
    next();
  } catch(err) {
    res.sendStatus(403);
  }
}

async function loggedIn(req, res, next) {
  if (req.token.loggedIn) {
    next();
  } else {
    res.sendStatus(403);
  }
}

function authorizedUser(req, res, next) {
  if (req.token.user_type === 'user') {
    next();
  } else {
    res.sendStatus(403);
  }
}

function authorizedWalker(req, res, next) {
  if (req.token.user_type === 'walker') {
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = {
  checkForToken,
  verifyToken,
  loggedIn,
  authorizedUser,
  authorizedWalker
}
