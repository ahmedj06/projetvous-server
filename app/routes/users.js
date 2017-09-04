'use strict';
var express = require('express');
var router = express.Router();
var accountCtrl = require('../controllers/account');


router.post('/register', accountCtrl.register);
/*
router.post('/login', function(req, res, next) {
  userController.loginUser(req, res, next);
});
*/
module.exports = router;