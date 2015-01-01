var express = require('express');
var app = express();
var bodyparser = require('body-parser');

var mongoose = require('mongoose');
var Person = require('./person.js');

mongoose.connect('mongodb://localhost/test');

app.use(bodyparser.urlencoded({extended: false}));

/*** SHOW MAIN PAGE ***/
app.get('/', function(req, res){
	res.sendFile('public/index.html', { root: __dirname });
});

/*** CREATING A PERSON ***/
app.get('/addPerson', function(req, res){
	res.sendFile('public/addPerson.html', { root: __dirname });
});

app.post('/api/persons', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h3>Saved the following person:</h3>');

	var person = {	firstName: req.body.firstName,
				  	lastName: req.body.lastName,
				 	email: req.body.email,
				 	age: req.body.age };
	(new Person(person)).save(function(err, person){
		endRes(res, err, person);
	});
});

/*** GETTING PERSONS ***/
app.get('/api/persons', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h3>Info about all persons</h3>');
	
	Person.find(function(err, persons){
		endRes(res, err, persons);
	});
});

app.get('/api/persons/:id', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h3>Info about person with ID: ' + req.params.id + '</h3>');
	
	Person.findById(req.params.id, function(err, person){
		endRes(res, err, person);
	});
});

/*** DELETING PERSONS ***/
//More RESTful-like: app.delete(...)
app.get('/api/persons/delete/:id', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h3>Info about deleted person: ' + req.params.id + '</h3>');
	
	Person.findByIdAndRemove(req.params.id, function(err, person){
		endRes(res, err, person);
	});
});

function endRes(res, err, personData){
	if(err) {
		res.write('<p>Something went wrong: ' + err.message + '</p>');
	} else {
		res.write('<p>' + JSON.stringify(personData) + '</p>');
	}
	res.write("<br/><a href='/'>Home</a>");
	res.end();
}

app.listen(3000);
console.log("App is listening on port 3000.");