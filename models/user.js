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
        type : String,
        minlength: 5
    },
    role : {
        type : String,
        enum : ['admin', 'student', 'professor'],
        required : true
    },
    course : { // For students
        title : String,
        year: Date,
        courses : [{ //N.B it is an array
            name : String,
            code: Number, //Identificator of the course
            CFU : Number,
            passed : Boolean,
            vote : {type: Number, min: 18, max: 30}
        }]
    },
    teachings : { // For professors
        courses : [{ //N.B it is an array
            name : String,
            code: Number, //Identificator of the course
            CFU : Number,
            passed : Boolean,
            vote : {type: Number, min: 18, max: 30}
        }]
    }
}));

module.exports = User;