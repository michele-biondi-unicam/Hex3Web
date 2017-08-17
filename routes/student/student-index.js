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

/*
    Gets available courses
*/
studentRoutes.get('/getAvailableCourses', function(req, res){
    student_utilities.getAvailableCourses()
    .then(function(courses){
        res.status(201).json({ success: true , msg:"These are the available courses", data:courses});
    })
    .catch(function(err){
        res.status(400).json({ success: false , 
            code:err.code,
            msg:err.msg, 
            data:""}); 
    });
});

/*
    Gets student courses
*/

studentRoutes.get('/getStudentCourses', function(req, res){
    var token = req.param('token');

    student_utilities.getStudentCourses(token)
    .then(function(studentCourses){
        res.status(201).json({ success: true , msg:"These are the student Courses", data:studentCourses});
    })
    .catch(function(err){
        res.status(400).json({ success: false , 
            code:err.code,
            msg:err.msg, 
            data:""}); 
    });

});

/*
    Adds Course to student
*/

studentRoutes.post('/subscribeCourse', function(req,res){
    var token = req.body.token;
    var courseId = req.body.courseId;

    // check parameters
    // check parameters 
    if( !token || !courseId){
        return res.status(400).json({ success: false, 
                                                  code:student_utilities.ERR_MISSING_DATA,
                                                  message: 'Bad Request. You need a ourse ID to subscribe to a course'});
    }

    student_utilities.subscribeCourse(token, courseId)
    .then(function(resultId){
        res.status(201).json({ success: true , msg:"added course to student", data: resultId});
    })
    .catch(function(err){
        res.status(400).json({ success: false , 
            code:err.code,
            msg:err.msg, 
            data:""}); 
    });
});