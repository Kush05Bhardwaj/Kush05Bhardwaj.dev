const express = require('express');
const Portfolio = require('../models/Portfolio');

const router = express.Router();

// @desc    Get portfolio info
// @route   GET /api/portfolio
// @access  Public
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ isActive: true });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create/Update portfolio info
// @route   POST /api/portfolio
// @access  Private (Admin)
router.post('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ isActive: true });
    
    if (portfolio) {
      // Update existing portfolio
      portfolio = await Portfolio.findByIdAndUpdate(
        portfolio._id,
        req.body,
        { new: true, runValidators: true }
      );
    } else {
      // Create new portfolio
      portfolio = await Portfolio.create(req.body);
    }
    
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update portfolio info
// @route   PUT /api/portfolio/:id
// @access  Private (Admin)
router.put('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
