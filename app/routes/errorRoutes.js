'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
});

module.exports = router;