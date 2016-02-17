var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var passportLocalMongoose = require('passport-local-mongoose'); 

/* Required models */
var User = require('./User'); 

/* Define User Schema */
var User = new mongoose.Schema({ 
  /* the passport-local-mongoose module */
  /* creates the username and email for the user */
  username: String, 
  name: String, 
  weight: Number, 
  height: Number
}); 

User.plugin(passportLocalMongoose); 

module.exports = mongoose.model('User', User); 