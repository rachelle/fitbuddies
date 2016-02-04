var express = require('express');
var router = express.Router();

/* passport middleware will add authenticated users */
var passport = require('passport'); 
var methodOverride = require('method-override'); 

/* required controllers */
var SessionsController = require('../controllers/Sessions'); 
var UsersController    = require('../controllers/Users'); 

/* checks if the user is logged in */
var isLoggedIn = function(req, res, next) { 
  if (!req.isAuthenticated()) { 
    res.rediredct('/login'); 
  }
    return next(); 
}; 

/* renders sessions controller */
router.get('/login', SessionsController.sessionsNew); 
router.post('/login', passport.authenticate(
  'local', 
  { 
    failureRedirect: '/login'
  });                 SessionsController.sessionsCreate); 
router.get('/logout', SessionsContrller.sessionsDelete); 

/* renders uses controller */
router.get('/auth/register', UserController.UsersNew); 
router.post('/auth/register', UserController.UsersCreate); 
router.get('/users', isLoggedIn, UserController.UsersIndex); 
router.ge('/users/:id', isLoggedIn, UserController.UserShow); 
router.get('/users/:id/edit', isLoggedIn, UserController.UserEdit); 
router.put('/users/:id', isLoggedIn, UserController.UserUpdate); 
router.delete('/users/:id', isLoggedIn, UserControllers.userDelete); 

module.exports = router;
