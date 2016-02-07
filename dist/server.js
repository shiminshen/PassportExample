var express = require('express');
var flash = require('connect-flash');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var open = require('open');

var app = express();
var port = 3000;

passport.use(new FacebookStrategy({
  clientID: '1505414496431853',
  clientSecret: '10a20b4913227b7e958700673680695a',
  callbackURL: "http://localhost:3000/login/",
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}));

app.use(express.static('.'))
.use(require('cookie-parser')())
.use(require('body-parser').urlencoded({ extended: true  }))
.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true  }))
.use(passport.initialize())
.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});

app.get('/showInfo', function(req, res) {
});

app.get('/login', passport.authenticate('facebook', {failureRedirect: '/failed'})
, function (req, res) {
  console.log('Login success!');
  console.log(req.user);
  res.redirect('/');
});

app.get('/logout', function(req, res) {
  console.log(req.isAuthenticated());
  console.log(req.user);
  req.logout();
  res.clearCookie('connect.sid', { path: '/' });
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log('App is listening on port ' + port);
  // open('http://localhost:' + port);
});
