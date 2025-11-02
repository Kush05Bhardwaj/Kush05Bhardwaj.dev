const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: String,
  technologies: [{
    type: String,
    required: true
  }],
  images: [String],
  liveUrl: String,
  githubUrl: String,
  category: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'api', 'other'],
    default: 'web'
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better performance
ProjectSchema.index({ featured: -1, order: 1, createdAt: -1 });

module.exports = mongoose.model('Project', ProjectSchema);
