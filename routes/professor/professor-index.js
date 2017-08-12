var express = require('express');

var professorRoutes = express.Router();
module.exports = professorRoutes;

var professor_utilities = require('./professor-utilities');

//===================== MIDDLEWARE FOR AUTHENTICATION ====================//
// route middleware to verify a token
professorRoutes.use(function(req, res, next)
    {
      // check header or url parameters or post parameters for token
     var token = req.body.token || req.query.token || req.headers['x-access-token'];
     if (!token)
         {return res.status(403).send({ success: false,  message: 'No token provided.' });}
    
     professor_utilities.checkToken(token)
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
                  logger.debug('accesso professore autorizzato');
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

//============================ PROFESSOR ROUTES ============================ //

/* 
    Creates a stage
*/
professorRoutes.post('/addStage',function(req,res){
    
    var token = req.body.token;
    var company = req.body.company;
    var description = req.body.description;

    // check parameters 
    if( !token || !company || !description){
        return res.status(400).json({ success: false, 
                                                  code:professor_utilities.ERR_MISSING_DATA,
                                                  message: 'Bad Request. You need a token, a company name, a type and a description'});
    }

    professor_utilities.addStage(token, company, description)
    .then(function(stage){
        res.status(201).json({ success: true , msg:"stage saved", data:stage});
    })
    .catch(function(err){
        res.status(400).json({ success: false , 
                               code:err.code,
                               msg:err.msg, 
                               data:""}); 
    });
});

/* 
    Creates a course
*/
professorRoutes.post('/addCourse',function(req,res){
    
    var token = req.body.token;
    var topic = req.body.topic;
    var CFU = req.body.CFU;

    // check parameters 
    if( !token || !topic || !CFU){
        return res.status(400).json({ success: false, 
                                                  code:professor_utilities.ERR_MISSING_DATA,
                                                  message: 'Bad Request. You need a token, a topic and CFU'});
    }

    professor_utilities.addCourse(token, topic, CFU)
    .then(function(course){
        res.status(201).json({ success: true , msg:"course saved", data:course});
    })
    .catch(function(err){
        res.status(400).json({ success: false , 
                               code:err.code,
                               msg:err.msg, 
                               data:""}); 
    });
});

/* 
    Creates an exam
*/
professorRoutes.post('/addExam',function(req,res){
    
    var token = req.body.token;
    var examDate = req.body.examDate;
    var course = req.body.course;
    var notes = req.body.notes;

    // check parameters 
    if( !token || !examDate || !course || !notes){
        return res.status(400).json({ success: false, 
                                                  code:professor_utilities.ERR_MISSING_DATA,
                                                  message: 'Bad Request. You need an examDate a course ID and notes'});
    }

    professor_utilities.addExam(token, examDate, course, notes)
    .then(function(exam){
        res.status(201).json({ success: true , msg:"exam saved", data:course});
    })
    .catch(function(err){
        res.status(400).json({ success: false , 
                               code:err.code,
                               msg:err.msg, 
                               data:""}); 
    });
});

/*
    Gets the stages
*/

professorRoutes.get('/getStages', function(req,res){
    var token = req.param('token');
    logger.debug("This is the token: " + token);
    professor_utilities.getStages(token)
    .then(function(stages){
        res.status(201).json({ success: true , msg:"These are your stages", data:stages});
    })
    .catch(function(err){
        res.status(400).json({ success: false , 
                               code:err.code,
                               msg:err.msg, 
                               data:""}); 
    });
});

/*
    Gets the courses
*/

professorRoutes.get('/getCourses', function(req,res){
    var token = req.param('token');
    logger.debug("This is the token: " + token);
    professor_utilities.getCourses(token)
    .then(function(courses){
        res.status(201).json({ success: true , msg:"These are your courses", data:courses});
    })
    .catch(function(err){
        res.status(400).json({ success: false , 
                               code:err.code,
                               msg:err.msg, 
                               data:""}); 
    });
});