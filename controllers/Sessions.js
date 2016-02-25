var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var router = express.Router();


// GET Login 
function sessionsNew  (req, res) {
  res.render('auth/login', {user : req.user});
};

//||||||||||||||||||||||||||--
// POST ACTUALLY LOGS IN DOUBLE CHECK THIS WITHOUT SESSIONS CREATE..
//||||||||||||||||||||||||||--
// POST User Login and Checks this without Sessions Create
function sessionsCreate (req, res, next) {
    req.session.save(function (err) {
      if (err) return next(err);
      res.redirect('/users/' + req.user.id);
    });
  };

//||||||||||||||||||||||||||--
// GET '/LOGOUT'
//||||||||||||||||||||||||||--
function sessionsDelete  (req, res) {
  req.session.destroy(function(err){
    res.redirect('/');
  })
};

// middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the login page
  res.redirect('/login');
}

//||||||||||||||||||||||||||--
// EXPORT FUNCTIONS
//||||||||||||||||||||||||||--
module.exports = {
  sessionsNew:     sessionsNew,
  sessionsCreate:  sessionsCreate,
  isLoggedIn:      isLoggedIn, 
  sessionsDelete:  sessionsDelete
};