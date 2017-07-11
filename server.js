// ===== LOAD MODULES ======= //

 // express.js server
var express = require('express');
var app = express();

// ===== CONFIGURATION ====== //

 // port number , defaults to 8080 if environment port not set.
var port = process.env.PORT || 8080; 

 // folder where index.html is located
app.use(express.static(__dirname));

 // server starts to listen to requests at the specified port 
var server = app.listen(port);
console.log("Server listening at http://localhost:" + port);