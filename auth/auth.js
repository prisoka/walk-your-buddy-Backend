const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtVerifyAsync } = require('./jsonwebTokenAsync');
const { TOKEN_SECRET } = process.env;
const router = express.Router();

function checkForToken(req, res, next) {
  if (!req.headers.auth || req.headers.auth == "Bearer: not.avalid.token") {
    res.sendStatus(403);
  } else {
    next();
  }
}

async function verifyToken(req, res, next) {
  try {
    let token = req.headers.auth.split(" ")[1];
    const verifiedToken = await jwtVerifyAsync(token, TOKEN_SECRET);
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

function authorized(req, res, next) {
  if (req.token.sub.id == req.params.id) {
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = {
  checkForToken,
  verifyToken,
  loggedIn,
  authorized
}
