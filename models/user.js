// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// setup user model and pass it with module.exports
var User = mongoose.model('User', new Schema({
    name : { type: String, unique:true ,required:true },
    email : String,
    password : String,
    admin : {type:Boolean, default:false}
}));

module.exports = User;