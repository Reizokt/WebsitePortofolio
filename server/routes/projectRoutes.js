const express = require('express');
const router = express.Router();
const Project = require('../models/Project.js'); // Import the Project model

// GET all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }); // Get all projects, sorted by creation date descending
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new project (For adding projects, typically admin functionality)
router.post('/', async (req, res) => {
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        technologies: req.body.technologies,
        liveLink: req.body.liveLink,
        githubLink: req.body.githubLink,
        image: req.body.image
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject); // 201 Created status
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400 Bad Request for validation errors
    }
});

// GET a single project by ID (Optional, if you have project detail pages)
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT (Update) a project by ID (Typically admin functionality)
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Update fields if they exist in the request body
        if (req.body.title != null) project.title = req.body.title;
        if (req.body.description != null) project.description = req.body.description;
        if (req.body.technologies != null) project.technologies = req.body.technologies;
        if (req.body.liveLink != null) project.liveLink = req.body.liveLink;
        if (req.body.githubLink != null) project.githubLink = req.body.githubLink;
        if (req.body.image != null) project.image = req.body.image;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a project by ID (Typically admin functionality)
router.delete('/:id', async (req, res) => {
    try {
        const result = await Project.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;