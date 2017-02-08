const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/connection');
const path = require('path');
var session = require('express-session');
var passport = require('passport');
const login = require('./routes/login');
var register = require('./routes/register');
require('./auth/setup');

connection.connect();

var sessionConfig = {
  secret: process.env.SECRET || 'super secret key goes here',
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000, //30 min
    secure: false
  }
}

const app = express();

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', login);
app.use('/register', register);

app.get('/loginStatus', function(req,res){
  res.send(req.isAuthenticated());
});

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var server = app.listen(3000, function() {
  console.log('Listening on port', server.address().port);
});
