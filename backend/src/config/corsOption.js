const whitelist = ['https://eduforall.vercel.app', 'http://localhost:3000']
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Origin not allowed!"))
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    optionsSuccessStatus: 200
}

module.exports = corsOptions 