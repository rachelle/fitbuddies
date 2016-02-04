var express = requires('express'); 
var router  = express.Router();

//||||||||||||||||||||||||||--
// REQUIRE PASSPORT
//||||||||||||||||||||||||||--
var passport       = require('passport'); 
var methodOverride = require('method-override');  

//||||||||||||||||||||||||||--
// REQUIRE MODEL
//||||||||||||||||||||||||||--
var User = require('../models/User'); 

/* Renders a new User */
function usersNew(req, res) { 
  res.render('auth/register'); 
}; 

/* Renders all users */
var usersIndex = function(req, res, next) { 
  User.find(function(err, users) { 
    if (err) res.json({ message: 'Could not find any Users'}); 
      res.render('./users', { 
        title: "Here are all the Users", 
        users: users, 
        user: req.user
      }); 
  }); 
}; 

/* Creates a new User */
function usersCreate(req, res) { 
  User.register(new User({ 
    username: req.body.username, 
    height:   req.body.height, 
    weight:   req.body.weight, 
    status:   req.body.status, 
    bio:      req.body.bio, 
    avatar:   req.body.avatar, 
    image:    req.body.image, 
  }), req.body.password, function (err, user) { 
    if (err) return res.render('auth/register', { user: user}); 
      passport.authenticate('local')(req, res, function () { 
      req.session.save(function (err) {

        if (err) { 
          return next(err); 
        } 

        res.redirect('/users/', + req.user.id); // id here?
      }); 
    }); 
  });
}; 

/* Renders users Profile */
var userShow = function(req, res, next) { 
  var id = req.params.id; 

  User.findById({_id: id}, function (err, user) { 
    if (err) { res.json({ message: 'Could not find User because ' + err }); 
    res.render( 
      './users/show', { 
       user: req.user
     }); 
  }); 
}; 

/* Renders User Edit */
var userEdit = function(req, res, next) { 
  var id = req.params.id; 

  User.findById({_id: id}, function (err, user) { 

  if (err) res.json({ message: 'Could not edit user because: ' + err }); 

  // API
  // res.json({user: user}); 
    res.render('./users/edit', { title: 'Edit User', user: user}); 
  }); 
}; 

/* Update functionality for User */
var userUpdate = function(req, res, next) { 
  var id = req.params.id; 

  User.findById({_id: id}, function(err, user) { 
    if (err) res.json({ message: 'Could not find user because: ' + err }); 

    if (req.body.height) user.height = req.body.height; 
    if (req.body.weight) user.weight = req.body.weight; 
    if (req.body.status) user.status = req.body.status; 
    if (req.body.bio)    user.bio    = req.body.bio; 
    if (req.body.name)   user.name   = req.body.name; 

    user.save(function(err) { 
      if (err) res.json({ message: 'User successfully updated'}); 
      res.redirect('/users/' + id); 
    }); 
  }); 
}; 

/* User has the option to delete their account */
var userDelete = function(req, res) { 
  var id = req.params.id; 

  User.findByIdAndRemove({_id: id}, function(err) { 

    if (err) res.send(err); 
    res.redirect('/')
  }); 
}; 

/* Export User Module */
module.exports = { 

  usersIndex:   usersIndex, 
  usersNew:     usersNew, 
  UsersCreate:  usersCreate, 
  userShow:     userShow, 
  userEdit:     userEdit, 
  userUpdate:   userUpdate, 
  userDelete:   userDelete
}; 