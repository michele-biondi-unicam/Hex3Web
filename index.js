// ===== LOAD MODULES ======= //
 // express.js server
var express = require('express');
var app = express();
var morgan = require('morgan');

// ===== CONFIGURATION ====== //
var port = process.env.PORT || 8080; // Defaults to 8080 if environment port not set

// use morgan to log requests to the console
// COMMENT IT ON RELEASE
app.use(morgan('dev'));

// Loads default page (index.html)
app.use(express.static(__dirname));

var server = app.listen(port);
console.log("Server listening at http://localhost:" + port);