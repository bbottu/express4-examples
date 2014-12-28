/*** IMPORTS ***/
//Standard modules
var fs = require('fs');
var path = require('path');
//Third-party modules
var express = require('express');
var app = express();
var imageMagick = require('gm').subClass({imageMagick: true});
var async = require('async');

//Directories where to store uploaded + resized images
var uploadedImagesDir = path.join(__dirname, '/uploads');
var resizedImagesDir = path.join(__dirname, '/uploads_resized');

//Custom module which handles the file upload
var multiFormUpload  = require('./multi-form-upload')(uploadedImagesDir, 52428800); //50MB


/*** CREATE NECESSAIRY DIRS ***/
fs.mkdir(uploadedImagesDir,function(err){
	if(err && err.code != 'EEXIST') console.log(err);
});

fs.mkdir(resizedImagesDir,function(err){
	if(err && err.code != 'EEXIST') console.log(err);
});


/*** ROUTES ***/
app.get('/', function(req, res){
	res.sendFile('public/form.html', { root: __dirname });
});

app.post('/form', multiFormUpload, function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<html><head></head><body>');
	res.write('<h3>Result</h3>');

	var file = req.files.datafile;
	if(file.toobig){
		res.write('<p>File was too big!</p>');
	} else {
		createImages(path.join(uploadedImagesDir, file.name), resizedImagesDir, req.body.title, file.extension, function(err){
			if(err){
				console.log(err);
				res.write('<p>Doh! Something went wrong while resizing.</p>');
			} else {
				res.write('<p>Succesfully saved resized images</p>');
			}
			res.write("<br/><a href='/'>Home</a>");
			res.write('</body></home>');
			res.end();
		});
	}
});

//Helper method which creates 3 versions of the given image
// 1. Image resized to max width or height of 1000. Aspect ratio is maintained
// 2. Thumbnail of 128x128 pixels
// 3. Thumbnail of 256x256 pixels
//Calls given callback when done
function createImages(oldImageLoc, newImagesDir, title, extension, finalCallback){
	async.parallel([
		function(callback){
			//Image resized to max width or height of 1000. Aspect ratio is maintained
	        imageMagick(oldImageLoc).resize(1000, 1000).write(path.join(newImagesDir, title+'.'+extension), callback);
	    },
	    function(callback){
	    	//Creates a thumbnail of 128x128 pixels
	        imageMagick(oldImageLoc).thumb(128, 128, path.join(newImagesDir, title+'128.'+extension), 100, 'center', callback);
	    },
	    function(callback){
	    	//Creates a thumbnail of 256x256 pixels
	        imageMagick(oldImageLoc).thumb(256, 256, path.join(newImagesDir, title+'256.'+extension), 100, 'center', callback);
	    }
	],
	function(err, results){ finalCallback(err) });
}


/*** START APP ***/
app.listen(3000);
console.log("App is listening on port 3000.");