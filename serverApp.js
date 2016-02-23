var express = require('express');
var flash = require('connect-flash');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var open = require('open');

// required for binding webpack dev server
// var proxy = require('express-http-proxy');
var proxy = require('proxy-middleware');

var url = require('url');

var app = express();
var port = 3000;

// FacebookStrategt will execute after calling 'passport.authorization('facebook')'
passport.use(new FacebookStrategy({
  clientID: '1505414496431853',
  clientSecret: '10a20b4913227b7e958700673680695a',
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
},
function(accessToken, refreshToken, profile, cb) {
  // pass profile info to serialize user.
  return cb(null, profile);
}));

// set cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use('/assets', proxy(url.parse('http://localhost:8000/assets')));

app.use(express.static(__dirname + '/src/'))
.use(require('cookie-parser')())
.use(require('body-parser').urlencoded({ extended: true  }))
.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true  }))
.use(passport.initialize())
.use(passport.session());


passport.serializeUser(function(user, done) {
  console.log('serialize user');
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('deserialize user');
  done(null, obj);
});

app.get('/showInfo', function(req, res) {
  res.send(req.user);
});

app.get('/getUser', function(req, res) {
  console.log(req.user);
  if(req.user) {
    res.json(req.user._json);
  }
  else
    res.send('');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

// after authorization
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' })
  , function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/logout', function(req, res) {
  console.log(req.isAuthenticated());
  req.logout();
  res.clearCookie('connect.sid', { path: '/' });
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

module.exports = app;

// app.listen(port, () => {
//   console.log('App is listening on port ' + port);
//   open('http://localhost:' + port);
// });
