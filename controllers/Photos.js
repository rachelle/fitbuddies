var express = require('express'); 
var mongoose = require('mongoose'); 

/* Source in Models */
var Photo = require('../models/Photo'); 
var User  = require('../models/User'); 

var router = express.Router(); 

/* GETS all users photos */
module.exports.renderPhotosIndex = function(req, res, next) { 
  Photo.find(function(err, photos) { 
    if (err) res.send('> ' + err); 
      res.render('./photos', 
        { 
          photos: photos, 
          user: req.user
        }); 
    }); 
}; 

/* Renders a new user Photo */
module.exports.renderPhotosNew = function(req, res) { 
  var photos = Photo.all
    res.render('./photos/new', {user: req.user, photos: photos}); 
}; 

/* Creates User Photo */
module.exports.renderPhotosCreate = function(req, res, next) { 
  var photo = new Photo({ 
    caption: req.body.caption, 
    image:   req.body.image, 
    upload:  req.body.upload, 
    user_id: req.user_id
  }); 
  console.log(req.body); 
  photo.save(function(err) { 
    if(err){res.send('> ' + err);}
    // req.user.photos.push(photo); 
    // req.user.save(); 
    res.redirect("/photos" + photo.id); 
  }); 
}; 

/* Edit Photo */
module.exports.renderPhotosEdit = function(req, res, next) { 
  var id = req.params.id; 
  var photo_id = req.params.id; 

  Photo.findById({_id: id}, function(err, photo) { 
    console.log('photo', photo); 
    if (err) res.send(err); 
      res.render(
        './photos/edit', { 
          photo: photo, 
          user: req.user
        }); 
    })
}; 

/* Updates Photo properties */
module.exports.renderPhotosUpdate = function(req, res, next) { 
  var id = req.params.id; 

  Photo.findById({_id: id}, function(err, photo) { 
    if(err) res.send(err); 
      if (req.body.image)   photo.image   = req.body.image; 
      if (req.body.upload)  photo.upload  = req.body.uplaod;
      if (req.body.caption) photo.caption = req.body.caption; 
      if (req.body.data_taken) photo.data_taken = req.body.date_taken; 
      if (req.body.comment) photo.comment = req.body.comment; 

      photo.save(function(err) {
        if (err) res.send(err); 
          res.redirect('/photos/' + id); 
      }); 
  }); 
}; 

/* Renders Photos Show */
module.exports.renderPhotosShow = function(req, res, next) { 
  var id = req.params.id; 

  Photo.findById({_id: id}, function(err, photo) { 
    console.log('photo', photo); 
    if(err) res.send(err); 
      res.render(
        './photos/show', { 
          photo: photo, 
          user: req.user
        }); 
  }); 
}; 

/* DELETES User Photo */
module.exports.deletePhoto = function(req, res) { 
  var id       = req.params.id; 
  var photo_id = req.params.id; 

  Photo.findByIdAndRemove({_id: id}, function(err) { 
    if (err) res.send(err); 
      res.redirect('/photos')
  }); 
}; 
