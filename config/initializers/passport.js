'use strict';
const passport = require('passport');
const jwtbearer = require('../strategies/jwtbearer');

module.exports.init = initPassport;

function initPassport(app) {

    app.use(passport.initialize());
    // Bring in defined Passport Strategy
    jwtbearer();
};
