var express = require('express');
var router = express.Router();

//||||||||||||||||||||||||||--
// REQUIRE PASSPORT
//||||||||||||||||||||||||||--
var passport = require('passport');
var methodOverride = require('method-override');

//||||||||||||||||||||||||||--
// REQUIRE MODEL
//||||||||||||||||||||||||||--
var User    = require('../models/User');


/* renders a new user */
function usersNew  (req, res) {
  res.render('auth/register');
};


/* renders all users */
var usersIndex = function(req, res, next){
  User.find(function(err, users) {
    if (err) res.json({ message: 'Could not find any users'}); 
      res.render('./users', {
        title: "Here all the users", 
        users: users,
        user: req.user
      });
  });
};

/* creates a new user */
function usersCreate (req, res) {
  User.register(new User({
    username: req.body.username,
    name: req.body.name,
    height: req.body.height, 
    status: req.body.status,
    image: req.body.image,
    avatar: req.body.avatar,
    weight: req.body.weight,
    
    url:    req.body.url,
  }), req.body.password, function(err, user) {
    // if (err) { console.log(err); return res.render('auth/register', {user: user}); }
    if (err) return res.render('auth/register', {user: user});
      passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        
        res.redirect('/users/' + req.user.id); //+ id here?
      });
    });
  });
};

/* render users profile */
var userShow = function(req, res, next){
  var id = req.params.id;

  User.findById({_id:id}, function(error, user){
    if (error) res.json({message: 'Could not find user because ' + error});
    res.render(
      './users/show', {
        user: req.user
      });
  });
};

/* user is able to edit their profile */
var userEdit = function(req, res, next){
  var id = req.params.id;

  User.findById({_id:id}, function(error, user){
//     if(error) res.json({message: 'Could not find user because ' + error});
//     res.render(
//       './users/edit', {
//         user: req.user
//       });
//   });
// };

  if(error) res.json({message: 'Could not edit user because: ' + error});
    // API
    // res.json({pirate: pirate});
    res.render('./users/edit', {title: "Edit User", user: user});
   });
}

/* user can update their profile */
var userUpdate = function(req, res, next) {
  var id = req.params.id;

  User.findById({_id: id}, function(error, user) {
    if (error) res.json({message: 'Could not find user because ' + error});
    if (req.body.height) user.height = req.body.height;
    if (req.body.name) user.name = req.body.name;
    if (req.body.weight) user.weight = req.body.weight;
    if (req.body.status) user.status = req.body.status;
   
    user.save(function(error) {
      if (error) res.json({message: 'User successfully updated'});
      res.redirect('/users/' + id);
    });
  });
};

/* user has the option to delete their account */
var userDelete = function(req,res){
  var id = req.params.id;

  User.findByAndRemove({_id: id}, function(error){
    if (error) res.send(error);
    res.redirect('/')
  });
};


/* exports user module */
module.exports = {

  usersIndex:    usersIndex,
  usersNew:      usersNew,
  usersCreate:   usersCreate,
  userShow:      userShow,
  userEdit:      userEdit,
  userUpdate:    userUpdate,
  userDelete:    userDelete

};
