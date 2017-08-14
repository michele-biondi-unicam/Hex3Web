// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// setup exam model and pass it with module.exports
var Exam = mongoose.model('Exam', new Schema({
    professor : String,
    examDate : Date,
    course : Schema.Types.ObjectId,
    courseTopic : String,
    notes : String,
    registeredStudents : [Schema.Types.ObjectId] //Array of ID
}));

module.exports = Exam;