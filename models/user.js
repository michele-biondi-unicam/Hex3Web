// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// setup user model and pass it with module.exports
var User = mongoose.model('User', new Schema({
    username : { 
        type: String, 
        unique: true,
        required: true 
    },
    name : String,
    surname : String,
    //TODO Replace password in the future with hash
    password : {
        type: String,
        minlength: 8
    },
    role : {
        type: String,
        enum: ['admin', 'student', 'professor'],
        required: true
    }
}));

module.exports = User;