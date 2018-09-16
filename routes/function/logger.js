const fs = require('fs')
      logDir = 'log'
      winston = require('winston')
require('winston-daily-rotate-file')


if(!fs.existsSync(logDir)) fs.mkdirSync(logDir)

//const logFileName = path.join(__dirname,'/../',logDir,'/loginfile.log')

let transport = new(winston.transports.DailyRotateFile)({
    filename:'application-%DATE%.log',
    datePattern : 'YYYY-MM-DD',
    zippedArchive: true
})

transport.on('rotate', function(oldFilename,newFilename){

});

let logger = winston.createLogger({
    transports:[
        transport
    ]
});

module.exports = logger;