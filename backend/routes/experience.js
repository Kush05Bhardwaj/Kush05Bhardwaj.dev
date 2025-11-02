const express = require('express');
const Experience = require('../models/Experience');

const router = express.Router();

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find({ isActive: true })
      .sort({ order: 1, startDate: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single experience
// @route   GET /api/experience/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience || !experience.isActive) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create experience
// @route   POST /api/experience
// @access  Private (Admin)
router.post('/', async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private (Admin)
router.put('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    res.json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
