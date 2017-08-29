'use strict';
var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');


router.post('/register', function(req, res, next) {
  userController.registerUser(req, res, next);
});

router.get('/login', function(req, res, next) {
  userController.loginUser(req, res, next);
});

module.exports = router;