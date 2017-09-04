'use strict';

const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authenticationCtrl');
const accountCtrl = require('../controllers/accountCtrl');

router.post('/register', accountCtrl.register);

/**
 *  Stateless authentication
 */
router.post('/signin', authCtrl.signin);
router.get('/signout', authCtrl.signout);


module.exports = router;
