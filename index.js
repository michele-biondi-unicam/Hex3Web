// ===== LOAD PACKAGES ======= //

var express = require('express');
// Initialize express
var app = express();

var bcrypt = require('bcrypt'); // hashing password on the database
var bodyParser = require("body-parser"); // get POST parameters
var morgan = require('morgan');    // automatic log of HTTP requests
var q = require('q');          // Q promise
var mongoose = require('mongoose'); // High-level mongodb interface
// Use q promise with mongoose
mongoose.Promise = require('q').Promise;

// Configuration file
var config = require('./config');

//================LOGGING==============//
var winston = require('winston');
var fs = require('fs');

// creates the log directory if it does not exist
if (!fs.existsSync(config['log-dir']))
{ fs.mkdirSync(config['log-dir']); }

var tsFormat = () => (new Date()).toLocaleDateString();
global.logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: config['log-level']
            /*  Selects log level
               { error:0, warn:1, info:2, verbose:3, debug:4, silly:5 }
            */
        }),
        new (winston.transports.File)({
            filename: `${config['log-dir']}/errors.log`,
            timestamp: tsFormat,
            level: 'error'
            /* I save errors on a file
            */
        })
    ]
});

// ===== SERVER INITIALIZE ====== //

/* 
    MIDDLEWARE
  if I make requests from a different domain of the server, I have to grant the access to that specific domain.
  Example.  I have deployed my server on http://myserver1.it
  But I send requests from http://myserver2.it  In this case I should enable 'myserver2.it' as granted domain.
  in the rule 'Access-Control-Allow-Origin'.  If I use '*', I enable any domain.
*/
app.use(function(req, res, next){

  res.setHeader('Access-Control-Allow-Origin', '*');                                            //granted domains
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); //granted headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');             //granted http verbs
  next();
});

// port number , defaults to 8080 if environment port not set.
var port = process.env.PORT || 8080;

// Connects to database using the latest mongoose connection logic
mongoose.connect(config.database, {
    useMongoClient: true
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));  // dev is the level of log (development)


//=============== ROUTES =============//

/*
    ADMIN ROUTES
*/
var adminRoutes = require('./routes/admin/admin-index');
app.use('/admin', adminRoutes);   // put /admin as prefix

/*
    STUDENT ROUTES
*/
var studentRoutes = require('./routes/student/student-index');
app.use('/student', studentRoutes);   // put /student as prefix

/*
    PROFESSOR ROUTES
*/
var professorRoutes = require('./routes/professor/professor-index');
app.use('/professor', professorRoutes);   // put /professor as prefix

/*
    API ROUTES
*/
var apiRoutes = require('./routes/api/api-index');
app.use('/api', apiRoutes);   // put /api as prefix

// root for the user (index.html is here)
app.use(express.static(__dirname + '/app'));

// server starts to listen to requests at the specified port 
var server = app.listen(port);
logger.debug("Server listening at http://localhost:" + port);
logger.debug("Log level: " + config['log-level']);