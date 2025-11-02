const express = require('express');
const Testimonial = require('../models/Testimonial');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    let testimonials = Testimonial.find({ isActive: true })
      .populate('projectRelated', 'title')
      .sort({ order: 1, createdAt: -1 });
    
    if (limit) {
      testimonials = testimonials.limit(parseInt(limit));
    }
    
    const result = await testimonials;
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private (Admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (Admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
