var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h3>Given GET parameters:</h3>');
	for(key in req.query) {
		if (req.query.hasOwnProperty(key)) {
			res.write('<p>' + key + ' : ' + req.query[key] + '</p>');
		}
	}
	res.end();
})

app.listen(3000);
console.log("App is listening on port 3000.");