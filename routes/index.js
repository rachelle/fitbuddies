var express  = require('express'); 
var passport = require('passport');
var router   = express.Router();
var multer   = require('multer'); 
var upload   = multer({dest: './images/'})

// required models
var User = require('../models/User'); 
var Photo = require('../models/Photo'); 
var db   = require('../models/db');

// required controllers 
var SessionsController = require('../controllers/Sessions');
var UsersController    = require('../controllers/Users');
var PhotosController   = require('../controllers/Photos');  

// adding a root route
router.get('/', function (req, res) {
  res.render('index', {user: req.user});
});

// middleware to make sure a user is logged in 
var isLoggedIn = function (req, res, next) { 
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated()) {
    return next(); 
  // if they aren't redirect them to the login page
  }
  res.redirect('/login'); 
};

// renders sessions controller
router.get('/login',    SessionsController.sessionsNew);
router.post('/login',   passport.authenticate(
    'local',
    {
      failureRedirect: '/login'
    }),                SessionsController.sessionsCreate);
router.get('/logout',  SessionsController.sessionsDelete);


// render photos controller
router.get('/photos',          isLoggedIn, PhotosController.renderPhotosIndex);
router.get('/photos/new',      isLoggedIn, PhotosController.renderPhotosNew); 
router.post('/photos',         isLoggedIn, PhotosController.renderPhotosCreate);
router.post('/photos/upload',  isLoggedIn, PhotosController.callMe); 
router.get('/photos/:id/edit', isLoggedIn, PhotosController.renderPhotosEdit);
router.put('/photos/:id',      isLoggedIn, PhotosController.renderPhotosUpdate); 
router.get('/photos/:id',      isLoggedIn, PhotosController.renderPhotosShow);
router.delete('/photos/:id',   isLoggedIn, PhotosController.deletePhoto);

// render users controller
router.get('/auth/register',              UsersController.usersNew);
router.post('/auth/register',             UsersController.usersCreate);
router.get('/users',          isLoggedIn, UsersController.usersIndex);
router.get('/users/:id',      isLoggedIn, UsersController.userShow);
router.get('/users/:id/edit', isLoggedIn, UsersController.userEdit);
router.put('/users/:id',      isLoggedIn, UsersController.userUpdate);
router.delete('/users/:id',   isLoggedIn, UsersController.userDelete);

module.exports = router;