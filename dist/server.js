var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var open = require('open');

var app = express();
var port = 3000;

passport.use(new FacebookStrategy({
  clientID: '1505414496431853',
  clientSecret: '10a20b4913227b7e958700673680695a',
  callbackURL: "http://localhost:3000/"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(accessToken);
  console.log(profile);
}));

app.use('/', express.static('.'));

app.get('/Login', passport.authenticate('facebook'));

app.listen(port, () => {
  console.log('App is listening on port ' + port);
  // open('http://localhost:' + port);
});
