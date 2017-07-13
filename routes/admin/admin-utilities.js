var jwt = require('jsonwebtoken');        // used to create, sign, and verify tokens
var User = require('../../models/user');   // get our mongoose User model
var q = require('q');                   // Q promise
var config = require('../../config');        // get our config file

var db_utilities = require('../db-utilities');

var admin_utilities = this;
module.exports = admin_utilities;

//============ FUNCTIONS ===========//

/*
    function: addDefaultUser()
    Adds the default admin
*/
this.addDefaultUser = function () {
    var default_name = config['default-admin-name'];
    var default_psw = config['default-admin-psw'];
    return db_utilities.addUser({
        name: default_name,
        password: default_psw,
        admin: true
    });  // N.B returns a promise 

}

/*
    function: getAllUsers()
    Gets the list of all users
*/
this.getAllUsers = function () {
    var deferred = q.defer();
    User.find({})
        .then(function (users) {
            logger.debug("getAllUsers " + JSON.stringify(users));
            deferred.resolve(users);
        })
        .catch(function (err) {
            logger.error('[getAllUsers] ' + err);
            deferred.reject({ code: "", msg: err });
        });
    return deferred.promise;
}



/* 
    function:  checkToken(token)
    check if the token is valid, and if the user has the 'Admin' role 
-   if it's admin, return the decoded data
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
        //  Checks if the user is admin
        var is_admin = decoded['_doc'].admin;
        logger.debug("Am i admin?  "+is_admin);
        if (is_admin)
            { deferred.resolve(decoded);} // is admin, return the token
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
}

