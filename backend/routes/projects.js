const express = require('express');
const Project = require('../models/Project');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { featured, category, limit } = req.query;
    let query = { isActive: true };
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (category) {
      query.category = category;
    }
    
    let projects = Project.find(query).sort({ order: 1, createdAt: -1 });
    
    if (limit) {
      projects = projects.limit(parseInt(limit));
    }
    
    const result = await projects;
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || !project.isActive) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create project
// @route   POST /api/projects
// @access  Private (Admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
