'use strict';

const User = require("../models/user");
const token = require('../helpers/token');

/**
 *  Module exports
 */
module.exports.signin = signinUser;
module.exports.signout = signoutUser;


function signinUser(req, res, next) {
    /**
     * Create user
     * This can only be done by the logged in user.
     *
     * body Body_3 Created user object
     * no response value expected for this operation
     **/
    console.log("post du client " + req.body);


    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    res.status(200).json({
                        token: 'JWT ' + token.generate(user),
                        user: user
                    });
                } else {
                    res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
    });
}

function signoutUser(req, res, next) {
    req.logout();
    res.send({ success: true, message: 'The user has successfully logged out!'});
}