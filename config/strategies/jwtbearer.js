'use strict';

const passport = require('passport');
const passportJWT = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../../app/models/user');
const config = require('../');

function buildJWTStrategy() {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.jwt.secret;

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
};

module.exports = buildJWTStrategy;