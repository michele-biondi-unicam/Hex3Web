var config      = require('../../config');    // get our config file
var jwt         = require('jsonwebtoken');    // used to create, sign, and verify tokens
var User        = require('../../models/user');   // get our mongoose User model
var q           = require('q');  // Q promise

var db_utilities=require('../db-utilities');

var api_utilities = this;
module.exports = api_utilities; // Export to use it like a library

//======================== ERROR CODES =====================//
this.ERR_API_NOT_FOUND = 'ERR_API_NOT_FOUND';
this.ERR_API_WRONG_PSW = 'ERR_API_WRONG_PSW';
this.ERR_MISSING_DATA  = 'ERR_MISSING_DATA';

//========================= FUNCTIONS ======================//

/*
    function: addUser(name, password)
    Adds a user to the database
*/
this.addUser = function (username, name, surname, password, role) {
    return db_utilities.addUser({
        username: username,
        name: name,
        surname: surname,
        password: password,
        role: role
    });  // Returns a Promise
}

/*
    function login(name, psw)
    Permits the login
*/
this.login = function(username, psw) 
{ 
  var deferred = q.defer();
    
  // find the user
  User.findOne({ username: username})
      .then(function(user) 
        {
         if (!user) 
          { deferred.reject({code:this.ERR_API_NOT_FOUND,
                             msg:'user not found'});  
          } 
        else 
          {
            // check if password matches
            if (user.password != psw) 
              { deferred.reject({code:this.ERR_API_WRONG_PSW,
                                 msg:'Incorrect login info'}); 
              } 
            else 
              {
               // if user is found and password is right
               // create a token
               console.log( config.secret);
               var token = jwt.sign(user, 
                                    config.secret, 
                                    {expiresIn: 1440}
                                 );
               var result = {
                 'token': token,
                 'role': user.role
               };
               // return the information including token as JSON
               deferred.resolve(result);
          }   
        }
      })
     .catch(function(err)
        {
         // Other errors
         deferred.reject({code:"", msg:err}); 
        }); 
 return deferred.promise;
}
