const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // Correct relative path from server/routes to server/models

// GET all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new project
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
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET a single project by ID
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT (Update) a project by ID
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

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

// DELETE a project by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Project.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;