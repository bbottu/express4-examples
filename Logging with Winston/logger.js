 var winston = require('winston');

//Create and configure logger
 var logger = new (winston.Logger)({
 	transports: [
 		new (winston.transports.Console)({
 			level: 'info',
			colorize: true,
			json: false
 		}),
 		new (winston.transports.File)({
 			level: 'info',
 			colorize: false,
 			json: false,
 			filename: './logs/winston.log',
 			maxsize: 52428800, //50MB
            maxFiles: 10
 		})
 	]
 });

//Export logger
 module.exports = logger;
 //Needed to do HTTP request logging with Morgan
 module.exports.stream = {
    write: function(message, encoding){
        logger.info(message.slice(0, -1));
    }
};