var bodyparser = require('body-parser');

/*
* Constructor to create a text-form-uploader middleware
*/
module.exports = bodyparser.urlencoded({extended: false});