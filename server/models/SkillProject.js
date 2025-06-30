// models/SkillProject.js (or wherever your SkillProject schema is)

const mongoose = require('mongoose');

const SkillProjectSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    // CHANGE THIS: Renamed from 'items' to 'achievements'
    // Also, the type is now an array of objects
    achievements: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            link: { // Optional link for individual achievements
                type: String,
                trim: true,
                default: null
            }
        }
    ],
    image: {
        type: String,
        trim: true,
        default: "https://via.placeholder.com/400x250/322050/FFFFFF?text=Image+Pending" // Good fallback
    },
    projectTitle: { // Renamed from projectTitle to 'title' for consistency if you prefer, or keep as is
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    // ADD THIS: New field for the certification link
    certificationLink: {
        type: String,
        trim: true,
        default: null
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('SkillProject', SkillProjectSchema);