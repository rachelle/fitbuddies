var mongoose = require('mongoose'); 
    mongoose.connect('mongodb://localhost:27017/fitbuds'); 


    var User = require('.models/User'); 

    var newUsers; 

    newUsers = [
    { 
      email: katy@katy.com  
      password: katy
    ]
  }