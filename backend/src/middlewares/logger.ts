const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const path = require('path');
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents =  async(message: string, logFileName: string) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
        
    } catch (error) {
        console.log(error);
    }
}

const logger = (req:any, res: any, next: any) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.txt');
    next()
}

module.exports = { logEvents, logger }