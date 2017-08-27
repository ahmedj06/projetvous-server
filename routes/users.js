var express = require('express');
var router = express.Router();
var User = require("../models/user")

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('Request URL: User GET');
  res.json({ message: 'You are running dangerously low on beer!' });
});

// Create endpoint /api/users for POSTS
router.post(function(req, res) {
  console.log('Request URL: User POST');
  res.json({ message: 'User added to the locker!'});
});

module.exports = router;
