var express  = require('express'), 
    passport = require('passport');
    methodOverride = require('method-override');

/* Required Models */
var User = require('../models/User'); 
var db   = require('../models/db');
var router   = express.Router();


/* Required controllers */
var SessionsController    = require('../controllers/Sessions');
var UsersController       = require('../controllers/Users');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

/* checks if the user is logged in */
var isLoggedIn = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login'); 
  }
    return next();
};

/* renders sessions controllers */
router.get('/login',  SessionsController.sessionsNew);
router.post('/login', passport.authenticate(
    'local',
    {
      failureRedirect: '/login'
    }),                SessionsController.sessionsCreate);
router.get('/logout',  SessionsController.sessionsDelete);


/* renders user controller */
router.get('/auth/register',              UsersController.usersNew);
router.post('/auth/register',             UsersController.usersCreate);
router.get('/users',          isLoggedIn, UsersController.usersIndex);
router.get('/users/:id',      isLoggedIn, UsersController.userShow);
router.get('/users/:id/edit', isLoggedIn, UsersController.userEdit);
router.put('/users/:id',      isLoggedIn, UsersController.userUpdate);
router.delete('/users/:id',   isLoggedIn, UsersController.userDelete);

module.exports = router;