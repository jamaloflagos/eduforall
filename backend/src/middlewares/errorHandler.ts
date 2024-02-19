const { logEvents } = require('../middlewares/logger');
const errorHandler = (err: any, req: any, res: any, next: any): void  => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers}`, 'errLog.txt')

    const status = res.statusCode ? res.statusode : 500;
    console.log(status);
    res.status(status);
    res.json({message: err.message, isError: true});
}

module.exports = errorHandler;