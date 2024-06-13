const mongoose = require('mongoose');

const Schema = mongoose.Schema
const assignmentSchema = new Schema({
    assignment: {
        type: String,
        required: true
    }
})
