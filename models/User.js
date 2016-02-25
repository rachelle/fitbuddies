var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

/* Require Passport */
var passportLocalMongoose = require('passport-local-mongoose'); 

/* Required models */
var User = require('./User'); 

/* Define User Schema */
var User = new mongoose.Schema({ 
  username: String, 
  userPhoto: String, 
  name: String, 
  weight: Number, 
  height: Number
}); 

/* Insert Passport Middleware */
User.plugin(passportLocalMongoose); 

/* Export Schema */
module.exports = mongoose.model('User', User); 