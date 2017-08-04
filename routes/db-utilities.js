var User = require('../models/user');   // get our mongoose User model
var Stage = require('../models/stage'); // get our mongoose Stage model
var q = require('q');  // q promise

var db_utilities = this;
module.exports = db_utilities; // I export its methods so i can use it like a library


//========= ERROR CODE ====== //
var ERR_DB_DUPLICATE_KEY = '11000';

/*
    function : addUser(user)
    Adds a user to the database
*/
this.addUser = function (user) {
    var deferred = q.defer();

    // creates a user that has to respect the mongoose Schema
    var generatedUser = new User(user); 

    // save the sample user
    generatedUser.save()
        .then(function (user) {
            logger.debug('utente salvato ' + JSON.stringify(user));
            deferred.resolve(user);
        })
        .catch(function (err) {
            if (err.code == ERR_DB_DUPLICATE_KEY) {
                deferred.reject({
                    code: 'ERR_DB_DUPLICATE_KEY',
                    msg: 'questo utente esiste gia'
                });
            }
            else
            { logger.error('[addUser] ERROR: ' + err.message); }
            //deferred.reject(err.errmsg);
             deferred.reject({
                    code: 'ERR_VALIDATION_NOT_PASSED',
                    msg: err.message
                });
        });
    return deferred.promise;
};

/*
    function: addStage(stage)
    adds a stage to the database
*/
this.addStage = function(username, stage){
    var deferred = q.defer();

    //Creates a stage that has to respect the mongoose Schema
    var generatedStage = new Stage(stage);

    // save the sample stage
    generatedStage.save()
        .then(function (stage) {
            logger.debug('stage salvato ' + JSON.stringify(stage));
            deferred.resolve(stage);
        })
        .catch(function (err) {
            if (err.code == ERR_DB_DUPLICATE_KEY) {
                deferred.reject({
                    code: 'ERR_DB_DUPLICATE_KEY',
                    msg: 'questo stage esiste gia'
                });
            }
            else
            { logger.error('[addStage] ERROR: ' + err.message); }
            //deferred.reject(err.errmsg);
             deferred.reject({
                    code: 'ERR_VALIDATION_NOT_PASSED',
                    msg: err.message
                });
        });
    
    //Copies the new generated stage inside the professor
    User.findOneAndUpdate({username: username}, {$push : {"teachings.stages" : {
                                    company : generatedStage.company,
                                    description : generatedStage.description,
                                    professor: generatedStage.professor,
                                    _id: generatedStage._id } }}, 
                            {upsert: true}) 
        .then(function(){
            logger.debug("Professor updated too");
        })
        .catch(function(err){
            logger.debug("Error occurred while updating professor");
        });

    return deferred.promise;
};