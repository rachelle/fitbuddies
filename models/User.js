var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var passportLocalMongoose = require('passport-local-mongoose'); 

/* Required models */
var User = require('./User'); 

/* Define User Schema */
var User = new mongoose.Schema({ 
  // the passport-local-mongoose module will automatically 
  // create a username and other fields for the hash
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