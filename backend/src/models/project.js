const mongoose = require('mongoose');

const Schema = mongoose.Schema
const projectSchema = new Schema({
    week: {
        type: String,
        required: true
    },

    resource_link: {
        type: String,
        required: true
    },

    objective: {
        type: Array,
        required: true
    }
})

const Project = mongoose.model('project', projectSchema);
module.exports = Project