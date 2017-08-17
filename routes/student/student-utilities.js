var jwt = require('jsonwebtoken');        // used to create, sign, and verify tokens
var User = require('../../models/user');   // get our mongoose User model
var Course = require('../../models/course'); // get our mongoose Course model
var Exam = require('../../models/exam'); // get our mongoose Exam model
var Stage = require('../../models/stage'); // get our mongoose Stage model
var q = require('q');                   // Q promise
var config = require('../../config');        // get our config file

var db_utilities = require('../db-utilities');

var student_utilities = this;
module.exports = student_utilities;

//======================== ERROR CODES =====================//
this.ERR_API_NOT_FOUND = 'ERR_API_NOT_FOUND';
this.ERR_API_WRONG_PSW = 'ERR_API_WRONG_PSW';
this.ERR_MISSING_DATA  = 'ERR_MISSING_DATA';

//============ FUNCTIONS ===========//

/* 
    function:  checkToken(token)
    check if the token is valid, and if the user has the 'student' role 
-   if it's student, return the decoded data
-   else return false
*/
this.checkToken = function(token) 
{
   var deferred = q.defer();
  // decode token
  if (token) 
   {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) 
        {
         logger.error('token expired or not authenticated: '+token);
         deferred.reject(false);   
        } 
      else 
      {
        //  Checks if the user is student
        var user_role = decoded['_doc'].role;
        logger.debug("Am i student?  Role: "+ user_role);
        if (user_role == 'student')
            { deferred.resolve(decoded);} // is student, return the token
        else
            {
             logger.error('[checkToken] unauthorized access attempt');
             deferred.resolve(false);
            }
      }
    });

  }   
 else 
  { //  there is no token
    logger.debug('no token provided');
    deferred.reject(false);
  }
 return deferred.promise;
};

/* function getAvailableCourses(token)
      returns all the available courses for the student
*/

this.getAvailableCourses = function () {
  var deferred = q.defer();
  Course.find()
  .then(function(courses){
    deferred.resolve(courses);
  })
  .catch(function(err){
    logger.error("Error occurred while getting the available courses");
    deferred.reject(false);
  });


  return deferred.promise;
};

/*  function getStudentCourses(token)
      returns all the courses of the student
*/

this.getStudentCourses = function(token){
  var deferred = q.defer();
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        logger.error('token expired or not authenticated: ' + token);
        deferred.reject(false);
      } else {
        var username = decoded._doc.username;
        User.findOne({username: username})
          .then(function (student) {
            deferred.resolve(student.studyplan.courses);
          })
          .catch(function (err) {
            logger.error("Error occurred while getting the courses");
            deferred.reject(false);
          });
      }
    });
  } else {
    logger.debug('no token provided by student');
    deferred.reject(false);
  }

  return deferred.promise;
};

/* function subscribeCourse(token,courseId)
    makes the student subscribe to a course
*/

this.subscribeCourse = function(token, courseId){
  var deferred = q.defer();

  if(token){
    jwt.verify(token, config.secret, function (err, decoded){
      if (err) {
        logger.error('token expired or not authenticated: ' + token);
        deferred.reject(false);
      } else {
        
        var username = decoded._doc.username;
        db_utilities.addCourseToStudent(username,courseId)
        .then(function(id){
          deferred.resolve(id);
        })
        .catch(function(err){
          deferred.reject(false);
        });
      }
    });
  } else {
    logger.debug('no token provided by student');
    deferred.reject(false);
  }

  return deferred.promise;
};