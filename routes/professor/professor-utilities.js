var jwt = require('jsonwebtoken');        // used to create, sign, and verify tokens
var User = require('../../models/user');   // get our mongoose User model
var q = require('q');                   // Q promise
var config = require('../../config');        // get our config file

var db_utilities = require('../db-utilities');

var professor_utilities = this;
module.exports = professor_utilities;

//======================== ERROR CODES =====================//
this.ERR_API_NOT_FOUND = 'ERR_API_NOT_FOUND';
this.ERR_API_WRONG_PSW = 'ERR_API_WRONG_PSW';
this.ERR_MISSING_DATA  = 'ERR_MISSING_DATA';

//============ FUNCTIONS ===========//

/* 
    function:  checkToken(token)
    check if the token is valid, and if the user has the 'professor' role 
-   if it's professor, return the decoded data
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
        //  Checks if the user is professor
        var user_role = decoded._doc.role;
        logger.debug("Am i professor?  Role: "+ user_role);
        if (user_role == 'professor')
            { deferred.resolve(decoded);} // is professor, return the token
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

/*
    function: addStage(token, company, type, description)
    Adds a stage to the database
*/
this.addStage = function(token, company, description){
    var deferred = q.defer();

    if(token){
      jwt.verify(token, config.secret, function(err, decoded){
        if(err){
          logger.error('token expired or not authenticated: '+token);
          deferred.reject(false);
        } else {
          var professorUsername = decoded._doc.username;
          var result = db_utilities.addStage(professorUsername, {
            company : company ,
            description : description,
            professor: professorUsername
          });

          deferred.resolve(result);

        }
      });
    } else {
      logger.debug('no token provided');
      deferred.reject(false);
    }

    return deferred.promise;
};