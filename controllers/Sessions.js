var express = requires('express'); 
var passport = require('passport'); 
var User = require('../models/User'); 
var router = express.Router(); 

//||||||||||||||||||||||||||--
// GET '/LOGIN'
//||||||||||||||||||||||||||--
function sessionsNew(req, res) { 
  res.render('auth/login', { user: req.user }); 
}; 

//||||||||||||||||||||||||||--
// POST ACTUALLY LOGS IN DOUBLE CHECK THIS WITHOUT SESSIONS CREATE..
//||||||||||||||||||||||||||--
function sessionsCreate(req, res, next) { 
  req.session.save(function(err) { 
    if (err) return next(err); 
      res.redirect('/users/' + req.user.id); 
  }); 
}; 


//||||||||||||||||||||||||||--
// GET '/LOGOUT'
//||||||||||||||||||||||||||--
function sessionsDelete(req, res) { 
  req.session.destroy(function (err) { 
    res.redirect('/'); 
  })
}; 


//||||||||||||||||||||||||||--
// EXPORT FUNCTIONS
//||||||||||||||||||||||||||--
module.exports = { 
  sessionsNew: sessionsNew, 
  sessionsCreate: sessionsCreate, 
  sessionsDelete: sessionsDelete
}; 