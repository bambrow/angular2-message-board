// 'npm run build' runs the front-end code and watches for changes
// 'npm start' runs the server-side code

// holds the code on each request reaching our server

// starts our express.js on the server
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// use mongoose for mongodb
var mongoose = require('mongoose');

// dispatched to the right route
// the reference of app.js file on routes folder
// forwards the requests there
var appRoutes = require('./routes/app');

var messageRoutes = require('./routes/messages');
var userRoutes = require('./routes/user');

// create the app with express.js
var app = express();

// connect to the certain database
// port 27017 for mongodb
mongoose.connect('admin:admin@ds149134.mlab.com:49134/angular2-message-board');

// view engine setup
// views folder
app.set('views', path.join(__dirname, 'views'));
// view engine, how do we parse the files on the server
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// extract the body of our request if it was sent
// extract any extra data, for example, to parse cookies
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// set up the static directory, the public folder
// the public folder is the only folder accessible from the outside
app.use(express.static(path.join(__dirname, 'public')));

// to prevent any CORS error
// Cross Origin RequestS, it is useful if you have two different servers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// forward the request to appRoutes
app.use('/message', messageRoutes);
app.use('/auth', userRoutes);

app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index'); // always render the angular2 application
});

// exports the app
module.exports = app;
