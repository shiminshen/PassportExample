var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var open = require('open');

var app = express();
var port = 3000;

passport.use(new FacebookStrategy({
  clientID: '1505414496431853',
  clientSecret: '10a20b4913227b7e958700673680695a',
  callbackURL: "http://localhost:3000/",
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
},
function(accessToken, refreshToken, profile, cb) {
  return done(null, profile);
}));

app.use(express.static('.'))
.use(require('cookie-parser')())
.use(require('body-parser').urlencoded({ extended: true  }))
.use(require('express-session')({ secret: 'smshen', resave: true, saveUninitialized: true  }))
.use(passport.initialize())
.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.get('/showInfo', function(req, res) {
  
});

app.get('/login', passport.authenticate('facebook'));

app.get('/logout', function(req, res) {
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
