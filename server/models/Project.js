const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    technologies: {
        type: [String], // Array of strings
        default: []
    },
    liveLink: {
        type: String,
        required: false // Not strictly required if you don't always have one
    },
    githubLink: {
        type: String,
        required: false // Not strictly required
    },
    image: {
        type: String,
        required: false // Could be required if all projects must have an image
    },
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;