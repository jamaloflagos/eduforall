require('dotenv').config();
const mongoose = require('mongoose');

const Connect_Mongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.log(err)
    }
}

module.exports = Connect_Mongo