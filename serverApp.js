var express          = require('express');
var flash            = require('connect-flash');
var passport         = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy   = require('passport-google-oauth20').Strategy;
var open             = require('open');

// required for binding webpack dev server
var proxy = require('proxy-middleware');

var url = require('url');

var app = express();
var port = 3000;

// FacebookStrategy will execute after calling 'passport.authorization('facebook')'
passport.use(new FacebookStrategy({
  clientID: '1505414496431853',
  clientSecret: '10a20b4913227b7e958700673680695a',
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'taggable_friends'],
},
function(accessToken, refreshToken, profile, cb) {
  // pass profile info to serialize user.
  var user = {};

  user.name = profile.name.familyName + profile.name.givenName
  // console.log(profile);
  return cb(null, user);
}));

// GoogleStratety

passport.use(new GoogleStrategy({
  clientID: '233632838066-oouvqgoijgaau2ovr09rbt79v68qlqa8.apps.googleusercontent.com',
  clientSecret: 'hKRt4539PraYNOe5tJkF0PLd',
  callbackURL: "http://localhost:3000/auth/google/callback"

},
function(accessToken, refreshToken, profile, cb) {
  var user = {name: profile.displayName};
  return cb(null, user);
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
  // console.log(req.user);
  if(req.user) {
    // res.json(req.user._json);
    res.json(req.user);
  }
  else
    res.send('');
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

// after authorization
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/'  }), function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
  //       
});

app.get('/logout', function(req, res) {
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
