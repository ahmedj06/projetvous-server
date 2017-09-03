var passportJWT = require("passport-jwt");
var User = require('../models/userModel');
var config = require('../../config');
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var jsonwebtoken = require('jsonwebtoken'); 


// Logique d'authentification JWT
module.exports.jwtLogin = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.get('jwt:secret');
  //opts.issuer = 'accounts.examplesoft.com';
  //opts.audience = 'yoursite.net';
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
}

/*
// Logique d'authentification Local de Passport
module.exports.locallogin =
  passport.use(new LocalStrategy(localOptions, function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

      user.comparePassword(password, function (err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

        return done(null, user);
      });
    });
  }));
  */

module.exports.generateToken =
  function(appmodel) {
    return jsonwebtoken.sign(appmodel, config.get("jwt:secret"), {
      expiresIn: 10080 // in seconds
    });
  }