//server.js

//modules =======================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOveride = require('method-override');

//configuration =================================


//config files
var db = require('/config/db');

//set our port
var port = process.env.PORT || 8080;

//connect to our mongoDB database
//(uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url)

//get all data/stuff pf the body (POST) parameters
//parse applications/json
app.use(bodyParser.json());


//parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json' }));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOveride('X-HTTP-Method-Override'));

//set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/src'));


//routes ===========================================
require('./routes')(app);

//shout to the user
console.log('Magic happens on port ' + port);


//expose app
exports = module.exports = app;