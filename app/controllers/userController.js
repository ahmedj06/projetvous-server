'use strict';

var User = require("../models/userModel");
var passport = require('../auth/passport');

exports.registerUser = function (args, res, next) {
  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * body Body_3 Created user object
   * no response value expected for this operation
   **/
  const email = args.body.email;
  const firstName = args.body.firstName;
  const lastName = args.body.lastName;
  const password = args.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' });
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
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
      profile: { firstName: firstName, lastName: lastName }
    });

    user.save(function (err, user) {
      if (err) { return next(err); }

      // Subscribe member to Mailchimp list
      // mailchimp.subscribeToNewsletter(user.email);

      // Respond with JWT if user was created

      let userInfo = setUserInfo(user);

      res.status(201).json({
        token: 'JWT ' + passport.generateToken(userInfo),
        user: userInfo
      });
    });
  });
}

exports.loginUser = function (args, res, next) {
  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * body Body_3 Created user object
   * no response value expected for this operation
   **/
  console.log("post du client " + args.body);


  User.findOne({
    email: args.body.email
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(args.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          res.status(200).json({
            token: 'JWT ' + passport.generateToken(user),
            user: user
          });
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
}

exports.logoutUser = function (args, res, next) {
  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * body Body_3 Created user object
   * no response value expected for this operation
   **/
  console.log("post du client " + args.body);
  res.json(args.body);
}

exports.roleAuthorization = function (role) {
  return function (req, res, next) {
    const user = req.user;

    User.findById(user._id, function (err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (foundUser.role == role) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    })
  }
}

// Set user info from request
function setUserInfo(request) {
  return {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
    role: request.role,
  };
}
