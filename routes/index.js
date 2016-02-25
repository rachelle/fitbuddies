var express  = require('express'); 
var passport = require('passport');
var methodOverride = require('method-override');

/* Required Models */
var User = require('../models/User'); 
var db   = require('../models/db');

/* Router */
var router   = express.Router();


/* Required controllers */
var SessionsController = require('../controllers/Sessions');
var UsersController     = require('../controllers/Users');

/* Adding a root route */
router.get('/', function (req, res) {
  res.render('index', {user: req.user});
});


/*======================================
=            Authentication            =
======================================*/
var authenticateUser = passport.authenticate(
  'local', 
  {failureRedirect: '/login'
}); 

var isLoggedIn = function (req, res, next) { 
  if (!req.isAuthenticated()) {
    res.redirect('/login'); 
  }
    return next(); 
}; 


/*=============================
=            LOGIN            =
=============================*/
router.get('/login', SessionsController.sessionsNew); 
router.post('/login', authenticateUser, SessionsController.sessionsCreate); 

/*==============================
=            LOGOUT            =
==============================*/

router.get('/logout',    SessionsController.sessionsDelete);



/* renders user controller */
router.get('/auth/register',              UsersController.usersNew);
router.post('/auth/register',             UsersController.usersCreate);
router.get('/users',          isLoggedIn, UsersController.usersIndex);
router.get('/users/:id',      isLoggedIn, UsersController.userShow);
router.get('/users/:id/edit', isLoggedIn, UsersController.userEdit);
router.put('/users/:id',      isLoggedIn, UsersController.userUpdate);
router.delete('/users/:id',   isLoggedIn, UsersController.userDelete);

module.exports = router;