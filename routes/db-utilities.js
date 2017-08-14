var User = require('../models/user');   // get our mongoose User model
var Stage = require('../models/stage'); // get our mongoose Stage model
var Course = require('../models/course'); // get our mongoose Course model
var Exam = require('../models/exam'); // get our mongoose Exam model

var q = require('q');  // q promise

var db_utilities = this;
module.exports = db_utilities; // I export its methods so i can use it like a library


//========= ERROR CODE ====== //
var ERR_DB_DUPLICATE_KEY = '11000';

//========= FUNCTIONS ======= //
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
            logger.debug('user saved ' + JSON.stringify(user));
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
            logger.debug('stage saved ' + JSON.stringify(stage));
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
    
    //Copies the new generated stage inside the professor that created it.
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

/* Function addCourse(username, course)
    adds a course to the database
*/
this.addCourse = function(username, course){
    var deferred = q.defer();

    //Creates a course that has to respect the mongoose Schema
    var generatedCourse = new Course(course);

    generatedCourse.save()
    .then(function(course){
        logger.debug('course saved ' + JSON.stringify(course));
        deferred.resolve(course);
    })
    .catch(function (err) {
            if (err.code == ERR_DB_DUPLICATE_KEY) {
                deferred.reject({
                    code: 'ERR_DB_DUPLICATE_KEY',
                    msg: 'questo corso esiste gia'
                });
            }
            else
            { logger.error('[addCourse] ERROR: ' + err.message); }
            //deferred.reject(err.errmsg);
             deferred.reject({
                    code: 'ERR_VALIDATION_NOT_PASSED',
                    msg: err.message
                });
    });

    //Copies the new generated course inside the professor that created it.
    User.findOneAndUpdate({username: username}, {$push : {"teachings.courses" : {
                                    topic : generatedCourse.topic,
                                    CFU : generatedCourse.CFU,
                                    professor: generatedCourse.professor,
                                    _id: generatedCourse._id } }}, 
                            {upsert: true}) 
        .then(function(){
            logger.debug("Professor updated too");
        })
        .catch(function(err){
            logger.debug("Error occurred while updating professor");
        });

    return deferred.promise;
};

/* Function addExam(username, exam)
    adds an exam to the database
*/
this.addExam = function(username, exam){
    var deferred = q.defer();

    //Creates an exam that has to respect the mongoose Schema
    var generatedExam = new Exam(exam);

    generatedExam.save()
    .then(function(exam){
        logger.debug('exam saved ' + JSON.stringify(exam));
        deferred.resolve(exam);
    })
    .catch(function (err) {
            if (err.code == ERR_DB_DUPLICATE_KEY) {
                deferred.reject({
                    code: 'ERR_DB_DUPLICATE_KEY',
                    msg: 'questo appello esiste gia'
                });
            }
            else
            { logger.error('[addExam] ERROR: ' + err.message); }
            //deferred.reject(err.errmsg);
             deferred.reject({
                    code: 'ERR_VALIDATION_NOT_PASSED',
                    msg: err.message
                });
    });

    //Copies the new generated exam inside the professor that created it.
    User.findOneAndUpdate({ username: username }, {
        $push: {
            "teachings.exams": {
                examDate : generatedExam.examDate,
                course : generatedExam.course,
                courseTopic: generatedExam.courseTopic,
                notes : generatedExam.notes,
                _id: generatedExam._id
            }
        }
    },
        { upsert: true })
        .then(function () {
            logger.debug("Professor updated too");
        })
        .catch(function (err) {
            logger.debug("Error occurred while updating professor");
        });

    return deferred.promise;
};