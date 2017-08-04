var express = require('express');

var studentRoutes = express.Router();
module.exports = studentRoutes;

var student_utilities = require('./student-utilities');


//===================== MIDDLEWARE FOR AUTHENTICATION ====================//
// route middleware to verify a token
studentRoutes.use(function(req, res, next)
    {
      // check header or url parameters or post parameters for token
     var token = req.body.token || req.query.token || req.headers['x-access-token'];
     if (!token)
         {return res.status(403).send({ success: false,  message: 'No token provided.' });}
    
     student_utilities.checkToken(token)
     .then(function(decoded)
          {
             if (decoded)
                 {
                  /* I store the decoded user in the req, so I can use in the routes.
                     for instance, If I need the user_id of who is asking the req, I can "req.decoded" to retrieve it
                     Example:
                     server has the route /users/user_id
                     user '0001' wants its personal data, and makes a request to  http://myserver.it/users/0001 .
                     checktoken() verifies that the user is authenticated, and stores 'decoded' in the request.
                     Once in the route, I can check that req.decoded.user_id is equal to req.params.user_id,
                     so that the user that is asking data of 0001, is actually the user 0001
                  */
                  req.decoded = decoded;        
                  logger.debug('accesso studente autorizzato');
                  next(); /* Continue */
                 }
             else
                 { 
                  res.status(401).json({ success: false, message: 'You do not have the authorization to use this route' }); 
                  /* no next() so it stops here*/
                 }         
          }
     ).catch(function(err)
           { res.status(401).json({ success: false, message: 'token non valido' });  });

    });

//============================ STUDENT ROUTES ============================ //

studentRoutes.get('/course', function(req,res){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
     if (!token)
         {return res.status(403).send({ success: false,  message: 'No token provided.' });}
    
     student_utilities.getCourses(token)
        .then(function(course){
            res.status(201).json({
                success: true,
                msg: "ricevuti corsi studente",
                data: course
            });
        })
        .catch(function(err){
            res.status(400).json({
                success: false,
                msg: err.msg,
                code: err.code,
                data: ""
            });
        });
});