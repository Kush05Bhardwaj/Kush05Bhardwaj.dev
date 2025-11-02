const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  personalInfo: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    bio: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    location: String,
    avatar: String,
    resume: String
  },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    website: String
  },
  about: {
    description: String,
    highlights: [String],
    yearsOfExperience: Number
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
