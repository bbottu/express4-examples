var path = require('path');
var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');

//Set render engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'templates'))

//Routing
app.get('/', function(req, res){
	res.render('home', {dateParam: new Date().toLocaleString()});
});

app.listen(3000);
console.log("App is listening on port 3000.");