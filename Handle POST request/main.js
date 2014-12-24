var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.get('/', function(req, res){
	res.sendFile('public/form.html', { root: __dirname });
});

app.use(bodyparser.urlencoded({extended: false}));

app.post('/form', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h3>Given POST parameters:</h3>');
	res.write('<p>First name: ' + req.body.firstName +'</p>');
	res.write('<p>Last name: ' + req.body.lastName +'</p>');
	res.write('<p>Email: ' + req.body.email +'</p>');
	res.end();
});

app.listen(3000);
console.log("App is listening on port 3000.");