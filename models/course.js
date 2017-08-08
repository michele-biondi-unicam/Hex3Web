// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// setup course model and pass it with module.exports
var Course = mongoose.model('Course', new Schema({
        topic : String,
        CFU : Number,
        professor : String
}));

module.exports = Course;