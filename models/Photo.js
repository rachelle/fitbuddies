var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

/* Require User Model */
var User = require('./User'); 

/* Define Photo Schema */
var Photo = new mongoose.Schema({ 
  image: String, 
  upload: String, 
  caption: String, 
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }
}); 

/* Export Schema */
module.exports = mongoose.model('Photo', Photo); 
