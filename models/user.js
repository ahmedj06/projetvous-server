// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    surname: String,
    email: String,
    password: String,
    location: String
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);