//============================== API ROUTES ==========================//
var express     = require('express');
var config      = require('../../config');    // get our config file

var api_utilities = require('./api-utilities');

var adminRoutes = express.Router(); 
var apiRoutes = express.Router();
module.exports = apiRoutes;

/* 
  Login of a user, params:
   { name:"", password:""}  
*/
apiRoutes.post('/authenticate', function(req, res)
           {
              var username = req.body.username;
              var psw  = req.body.password;
               // checking parameters
              if (!username || !psw)
                  {
                    return res.status(400).json({ success: false, 
                                                   code:     api_utilities.ERR_API_NOT_FOUND,
                                                   message: 'Bad Request. username and password required.' }); 
                  }
               // execution
              api_utilities.login(username, psw)
                    .then(function(result)
                      {
                        res.status(201).json({success: true, 
                                              message: 'Enjoy your token, ' + result.role + '!',
                                              data: {token: result.token,
                                                     role:result.role }});
                      })
                    .catch(function(err)
                      { res.status(400).json({ success: false, 
                                               code: err.code,
                                               message: err.msg 
                                              }); });
            });           



/*
  Signup of a user, params:
   { name:"", password:""}  
*/
apiRoutes.post('/signup', function(req, res)
            {
              var username = req.body.username;
              var name = req.body.name;
              var surname = req.body.surname;
              var psw  = req.body.password;
              var role = req.body.role;
              // parameters check
              if (!username || !psw || !role)
                  {
                    return res.status(400).json({ success: false, 
                                                  code:api_utilities.ERR_MISSING_DATA,
                                                  message: 'Bad Request. username, role and password required.' });
                  } 
               // execution    
              api_utilities.addUser(username, name, surname, psw, role)
                    .then(function(user)
                      {
                       res.status(201).json({ success: true , msg:"user saved", data:user});
                      })
                    .catch(function(err)
                      {
                         res.status(400).json({ success: false , 
                                                code:err.code,
                                                msg:err.msg, 
                                                data:""}); 
                      });
            });
