const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  responsibilities: [String],
  technologies: [String],
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  isCurrentJob: {
    type: Boolean,
    default: false
  },
  location: String,
  companyUrl: String,
  logo: String,
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
ExperienceSchema.index({ order: 1, startDate: -1 });

module.exports = mongoose.model('Experience', ExperienceSchema);
