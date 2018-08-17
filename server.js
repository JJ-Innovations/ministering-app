//server.js

//modules =======================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOveride = require('method-override');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
require('./models/user');
require('./passport');

//configuration =================================

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//config files
var db = require('./config/db');

//set our port
var port = process.env.PORT || 8080;

//connect to our mongoDB database
//(uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url, { useNewUrlParser: true});

//get all data/stuff pf the body (POST) parameters
//parse applications/json
app.use(bodyParser.json());


//parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json' }));

app.use(cors());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOveride('X-HTTP-Method-Override'));

//set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/src'));

//Initilize Passport before the routes
app.use(passport.initialize());

//routes ===========================================
require('./routes')(app);

//error-handlers
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });

app.listen(port);

//shout to the user
console.log('Magic happens on port ' + port);


//expose app
exports = module.exports = app;