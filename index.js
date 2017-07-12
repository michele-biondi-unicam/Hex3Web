// ===== LOAD PACKAGES ======= //

var express = require('express');
// Initialize express
var app = express();


var bodyParser = require("body-parser"); // get POST parameters
var morgan      = require('morgan');    // automatic log of HTTP requests
var mongoose = require('mongoose'); // High-level mongodb interface


// Configuration file
var config = require('./config'); 

//================LOGGING==============//
var winston = require('winston');
var fs = require('fs');

// creates the log directory if it does not exist
if (!fs.existsSync(config['log-dir'])) 
   {  fs.mkdirSync(config['log-dir']); }

var tsFormat = () => (new Date()).toLocaleDateString();
global.logger = new (winston.Logger)({
    transports:[
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

// ===== CONFIGURATION ====== //

 // port number , defaults to 8080 if environment port not set.
var port = process.env.PORT || 8080;

// Connects to database using the new mongoose connection logic
mongoose.connect(config.database, {
  useMongoClient: true
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));  // dev is the level of log (development)


//=============== ROUTES =============//
app.post('/', function(req, res) {
    res.send('Ciao! benvenuto nelle API POST del tutorial JWT su http://localhost:' + port);
});





 // folder where index.html is located
app.use(express.static(__dirname + '/app'));

 // server starts to listen to requests at the specified port 
var server = app.listen(port);
console.log("Server listening at http://localhost:" + port);
console.log("Log level: " + config['log-level']);