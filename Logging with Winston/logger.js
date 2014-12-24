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
 			maxsize: 1024, //1KB
            maxFiles: 5
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