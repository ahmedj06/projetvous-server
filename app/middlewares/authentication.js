'use strict';

const passport = require('passport');


/**
 *  Checks if a user is authenticated or not
 */
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({ message: 'Unauthorized' });
}

function jwtAuthentication(req, res, next) {
  return passport.authenticate('jwt', { session: false });
}


module.exports.ensured = ensureAuthenticated;
module.exports.jwt = jwtAuthentication;

