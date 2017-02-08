var router = require('express').Router();
var User = require('../models/user');

router.post('/', function(req,res){
  User.findOne({username: req.body.username}, function(err, user){
    if(err){
      console.log('Error checking for existing user', err);
      return res.sendStatus(500);
    }
    if(user){
      return res.status(400).send('Username already taken');
    }
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });
    user.save(function(err){
      if(err){
        console.log('Error saving new user', err);
        res.sendStatus(500);
        return;
      }
      console.log('Created new user');

      //create a login session for the user

      res.sendStatus(201);//created
    });
  });
});



module.exports = router;
