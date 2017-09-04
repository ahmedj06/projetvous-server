'use strict';

const jsonwebtoken = require('jsonwebtoken');
const config = require("../../config");

function generateToken(payload) {
  return jsonwebtoken.sign(payload, config.jwt.secret, {
    expiresIn: 10080 // in seconds
  })
}
module.exports.generate = generateToken;