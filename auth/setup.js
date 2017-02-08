var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');



passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, findAndComparePassword))

//user -> userID
passport.serializeUser(function(user, done){
  console.log('Serializing user');
  done(null, user.id);
});

//userID -> user
passport.deserializeUser(function(id, done){
  console.log('deserializing user');
  User.findById(id, function(err, user){
    if(err){
      console.log("error deserializing user", err);
      return done(err);
    }
    done(null, user);
  })
});

function findAndComparePassword(username, password, done){
  console.log('finding and comparing passwords');
  User.findOne({username: username}, function(err, user){
    if(err){
      console.log('Error finding', username);
      return done(err);
    }
    if (user){
      console.log('Found a user with username', username);
      user.comparePassword(password, function(err, match){
        if(err){
          console.log('Error comparing passwords');
          done(err);
        }else{
          if(match){
            console.log('Passwords matched');
            done(null, user);
          }else{
            console.log('Passwords did not match');
            done(null, false);
          }
        }
      });
    }else{
    //false here means the user did not pass validation
    //and should not be logged in
    return done(null, false);
    }
  });
}
