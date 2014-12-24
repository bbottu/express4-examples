var express = require('express');
var app = express();
var logger = require('./logger');
var morgan = require('morgan');

app.use(morgan('common', {'stream': logger.stream}));

app.get('/', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<h3>Test page</h3>');
})

app.all('*', function(req, res){
	logger.warn(req.url+' does  not exist');

	res.writeHead(404, {'Content-Type': 'text/html'});
	res.end('<h3>Page not found</h3>');
});

app.listen(3000);
logger.info("App is listening on port 3000.");