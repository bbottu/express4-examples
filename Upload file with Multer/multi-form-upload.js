var fs = require('fs');
var multer  = require('multer');

/*
* Constructor to create a multi-form-uploader middleware
* Input:
* 	dir: directory where to store the uploaded files
*	maxFileSize: max file size of the uploaded files
*/
module.exports = function(dir, maxFileSize){
	return multer({
		dest: dir,
		rename: function (fieldname, filename) {
			return filename.replace(/\W+/g, '-').toLowerCase() + '_' + (new Date()).toISOString()
		},
		limits: {
			fileSize: maxFileSize
		},
		onFileSizeLimit: function (file) {
			file.toobig = true;
			fs.unlink('./' + file.path); // delete the partially written file
		}
	})
};