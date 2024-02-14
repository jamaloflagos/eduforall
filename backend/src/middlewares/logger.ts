const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (message: string, logFileName: string): Promise<void> => {
    const dateTime = format(new Date(), 'yyyy-mm-dd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromise.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromise.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err);
    }
}

const logger = (req: any, res: any, next: any): void => {
    logEvents(`${req.method} ${req.url} ${req.headers.origin}`, 'reqLogs.txt');
    next();
}

module.exports = { logger, logEvents };