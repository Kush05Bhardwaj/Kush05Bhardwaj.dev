const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'database', 'tools', 'cloud', 'mobile', 'other']
  },
  proficiency: {
    type: Number,
    min: 1,
    max: 100,
    default: 50
  },
  icon: String,
  color: String,
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
SkillSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Skill', SkillSchema);
