// server.js

// set up ========================
var express  = require('express');
var mongoose = require('mongoose');              // mongoose for mongodb
var morgan = require('morgan');                  // log requests to the console (express4)
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var dbURL = (process.env.MONGO_URL||'mongodb://localhost:27017')+'/palindrome';
var PORT = (process.env.APP_PORT||3000);               

var app      = express();                        // create our app w/ express
// configuration =================
console.log("Connecting to database "+dbURL);
mongoose.Promise = global.Promise;  
mongoose.connect(dbURL);     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// routes ======================================================================
require('./app/message/messageRoutes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(PORT);
console.log("App listening on port "+PORT);

module.exports = app;