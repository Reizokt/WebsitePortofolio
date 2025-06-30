const express = require('express');
const router = express.Router();
const SkillProject = require('../models/SkillProject'); // Import the SkillProject model

// GET all skill projects
router.get('/', async (req, res) => {
    try {
        const skillProjects = await SkillProject.find().sort({ createdAt: -1 }); // Get all, sorted by creation date
        res.json(skillProjects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// You can add POST, PUT, DELETE routes here if you need to manage skills via API later
// For now, we'll focus on GET and seeding.

module.exports = router;