var express = require('express'); 
var http  = require('http'); 
var path = require('path'); 
var favicon = require('serve-favicon'); 
var logger = require('morgan'); 
var cookieParser = require('cookie-parser'); 
var methodOverride = require('method-override');
var mongoose = require('mongoose');  
var bodyParser = require('body-parser'); 
var methodOverride = require('method-override'); 

/* file upload with multer */
var multer = require('multer'); 


/* require modules for mongoose and passport */
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy; 
var routes = require('./routes/index'); 

var app = express();

// CONNECT to our mongo database
mongoose.connect('mongodb://localhost:27017/fitbuds');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); 

app.listen(process.env.PORT || 3000);

/* Source in models */
var User = require('./models/User'); 

//||||||||||||||||||||||||||--
// CREATE MONGO DB
//||||||||||||||||||||||||||--
var mongoURI = 'mongodb://localhost/fitbuds';
if (process.env.NODE_ENV === 'production') {
  mongoURI = process.env.MONGOLAB_URI
};


// Authorized Middleware 
app.use(require('express-session')({ 
  secret: 'Keyboard cat', 
  resave: false, 
  saveUninitialized: false
})); 

app.use(passport.initialize()); 
app.use(passport.session()); 


var User = require('./models/User'); 
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 
app.locals.title = 'FitBuds'

app.use('/', routes); 

/* Start the server*/
app.listen(); 
console.log('3000 is the the magic port'); 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;