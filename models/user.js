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
    passwordhash : String,
    role : {
        type : String,
        enum : ['admin', 'student', 'professor'],
        required : true
    },
    studyplan : { // For students
        title : String,
        year: Date,
        courses : [{ //N.B it is an array
            name : String,
            CFU : Number,
            passed : Boolean,
            vote : {type: Number, min: 18, max: 30}
        }],
        stage : { //N.B it is an array
            company : String,
            description : String,
            professor: String,
            start : Date,
            finish : Date,
            vote : {type: Number, min: 18, max: 30}
        }
    },
    teachings : { // For professors
        courses : [{ //N.B it is an array
            name : String,
            CFU : Number
        }],
        stages : [{ //N.B it is an array
            company : String,
            description : String,
            professor: String
        }]
    }
}));

module.exports = User;