const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

//ensure that each time a user is saved we hash the password first
userSchema.pre('save', function(done){
  var user = this;

  if(user.isModified('password')){
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash){
      if(err){
        console.log('Error hashing password', err);
        return done(err);
      }
      user.password = hash;
      done();
    });
  }
  done();
});

userSchema.methods.comparePassword = function(password, done){
  var user = this;

  bcrypt.compare(password, user.password, function(err, match){
    if(err){
      console.log('Error comparing passwords', err);
      return done(err);
    }
    done(null, match);
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;
