'use strict';

const User = require("../models/user");
const token = require('../helpers/token');

/**
 *  Module exports
 */
module.exports.register = registerUser;


function registerUser(req, res, next) {

  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' });
  }

  // Return error if full name not provided
  if (!firstname || !lastname) {
    return res.status(422).send({ error: 'You must enter your full name.' });
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err); }

    // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

    // If email is unique and password was provided, create account
    let user = new User({
      email: email,
      password: password,
      profile: { firstname: firstname, lastname: lastname }
    });

    user.save(function (err, user) {
      if (err) { return next(err); }
      let userInfo = setUserInfo(user);
      
      res.status(201).json({
        token: 'JWT ' + token.generate(userInfo),
        user: userInfo
      });
    });
  });
}

// Set user info from request
function setUserInfo(request) {
  return {
    _id: request._id,
    firstname: request.profile.firstname,
    lastname: request.profile.lastname,
    email: request.email,
    role: request.role,
  };
}
