// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
global.__base = __dirname + '/';
// configuration ===========================================

// config files
//var db = require('./config/db');
 mongoose.connect('mongodb://localhost/myapp',{useMongoClient:true});
// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.json({limit:'200mb', type:'application/json'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit:'200mb', type:'application/x-www-form-urlencoding', extended: true}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
//require('./app/routes')(app); // configure our routes
var router = require('./app/routerTest');
app.use('/api', router);
// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);
//console.log('Connected DB Object ' + JSON.stringify(db));

// expose app
exports = module.exports = app;
