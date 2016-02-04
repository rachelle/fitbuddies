var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var passportLocalMongoose = require('passport-local-mongoose'); 

/* Required models */
var User = require('./User'); 

/* Define User Schema */
var User = new mongoose.Schema({ 
  /* the passport-local-mongoose module */
  /* creates the username and email for the user */

  name: String, 
  weight: Number, 
  avatar: String, 
  height: String, 
  bio: String, 
  status: String, 
  image: String, 
}); 

User.plugin(passportLocalMongoose); 

module.exports = mongoose.model('User', User); 