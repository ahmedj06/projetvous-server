'use strict';

var User = require("../../models/userModel");

exports.registerUser = function(args, res, next) {
  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * body Body_3 Created user object
   * no response value expected for this operation
   **/
  if(!args.body.email || !args.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new User({
      email: args.body.email,
      password: args.body.password
    });

    //  Création de l'utilisateur
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'Email déja utilisé'});
      }
      res.json({ success: true, message: 'Créé ! ' });
    });
  }
}

exports.loginUser = function(args, res, next) {
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

exports.logoutUser = function(args, res, next) {
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

