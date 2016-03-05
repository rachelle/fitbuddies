var mongoose = require('mongoose'),  
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'); 

// require models
var User = require('./User'); 
var Photo = require('./Photo'); 

// define User Schema
var User = new mongoose.Schema({ 
  // the passport-local-mongoose module will automatically 
  // create a username and other fields for the hash
  username: String, 
  userPhoto: String, 
  name: String, 
  weight: Number, 
  height: Number, 
  admin: Boolean,

  photos: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref:  'Photo'
  }], 
}); 

/* Insert Passport Middleware */
User.plugin(passportLocalMongoose); 

/* Export Schema */
module.exports = mongoose.model('User', User); 