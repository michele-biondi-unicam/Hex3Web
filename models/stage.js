// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// setup stage model and pass it with module.exports
var Stage = mongoose.model('Stage', new Schema({
    company : String,
    type : String,
    description : String,
    professor: String
}));

module.exports = Stage;