var express = require('express');
var app = express();
var multiFormUpload  = require('./multi-form-upload')('./uploads', 52428800); //50MB

app.get('/', function(req, res){
	res.sendFile('public/form.html', { root: __dirname });
});

app.post('/form', multiFormUpload, function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<html><head></head><body>');
	res.write('<h3>Result</h3>');
	res.write('<p>Title: ' + req.body.title +'</p>');

	var file = req.files.datafile;
	if(file.toobig){
		res.write('<p>File was too big!</p>');
	} else {
		res.write('<p>File  \'' + file.originalname + '\' was saved as \'' + file.name + '\'</p>');
	}
	res.write("<br/><a href='/'>Home</a>");
	res.write('</body></home>');
	res.end();
});

app.listen(3000);
console.log("App is listening on port 3000.");