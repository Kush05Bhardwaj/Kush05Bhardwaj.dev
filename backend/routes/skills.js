const express = require('express');
const Skill = require('../models/Skill');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    const skills = await Skill.find(query).sort({ category: 1, order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get skills grouped by category
// @route   GET /api/skills/grouped
// @access  Public
router.get('/grouped', async (req, res) => {
  try {
    const skills = await Skill.aggregate([
      { $match: { isActive: true } },
      { $sort: { category: 1, order: 1 } },
      {
        $group: {
          _id: '$category',
          skills: { $push: '$$ROOT' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create skill
// @route   POST /api/skills
// @access  Private (Admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
