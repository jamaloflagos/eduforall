const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
}, {
    timeStamps: true,
    versionKey: false
})

const User = mongoose.model('user', userSchema);

module.exports = User