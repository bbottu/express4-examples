/*** GLOBAL VAR WHICH STORES PATH TO ROOT SCRIPT ***/
global.__base = __dirname + '/';

/*** IMPORTS ***/
var express = require('express');
var app = express();
var verify_jwt = require('express-jwt');
var config = require('./config');

/*** SEND FILES ***/
app.get('/', function(req, res){
	res.sendFile('public/form.html', { root: __dirname });
});

/*** API ***/
app.use('/api/protected', verify_jwt({secret: config.token.secret}));
app.use('/api/protected', function (err, req, res, next) {
  if(err){
    res.status(401).json(err);
  } else {
    next();
  }
});
//Add more routes in routes.js or split it up in multiple files
app.use('/api', require(__base + 'lib/routes'));

/*** START SERVER ***/
app.listen(3000);
console.log("App is listening on port 3000.");