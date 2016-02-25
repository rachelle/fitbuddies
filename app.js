var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var multer = require('multer'); 

// Require modules for mongoose and passport
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(flash()); 

// auth middleware
app.use(require('express-session')({ 
  secret: 'Keyboard cat', 
  resave: false, 
  saveUninitialized: false
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 

app.locals.title = 'FitBuds';

app.use('/', routes); 

// passport configurations
var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// create mongoURI
var mongoURI = 'mongodb://localhost/fitbuds';
if (process.env.NODE_ENV === 'production') {
  mongoURI = process.env.MONGOLAB_URI
};

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fitbuds');

app.post('/api/photos', function(req, res) {
  
  var serverPath = '/images/' + req.files.userPhoto.name;

    require('fs').rename(
      req.files.userPhoto.path,
      '/Users/mark/code/examples/file-upload/upload-example-app/public' + serverPath,
      function(error) {
        if(error) {
          res.send({
            error: 'Ah crap! Something bad happened'
          });
          
          return;
        }
        
        res.send({
          path: serverPath
        });
      }
    );
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

// start the server
app.listen(); 
console.log('3000 is the the magic port'); 

module.exports = app;