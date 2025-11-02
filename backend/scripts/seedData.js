const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Models
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Skill = require('../models/Skill');
const Testimonial = require('../models/Testimonial');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Portfolio.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Skill.deleteMany({});
    await Testimonial.deleteMany({});

    console.log('Cleared existing data...');

    // Create admin user
    const adminUser = await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });

    console.log('Admin user created...');

    // Create portfolio info
    const portfolio = await Portfolio.create({
      personalInfo: {
        name: 'Kush Bhardwaj',
        title: 'Full Stack Developer',
        bio: 'Passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications.',
        email: 'kush@example.com',
        phone: '+1-234-567-8900',
        location: 'India',
        avatar: '/KB.jpg',
        resume: '/Kush_Bhardwaj_CV.pdf'
      },
      socialLinks: {
        github: 'https://github.com/Kush05Bhardwaj',
        linkedin: 'https://linkedin.com/in/kushbhardwaj',
        twitter: 'https://twitter.com/kushbhardwaj',
        website: 'https://kushbhardwaj.dev'
      },
      about: {
        description: 'I am a passionate full-stack developer with 3+ years of experience in building web applications. I specialize in React, Node.js, and modern JavaScript frameworks.',
        highlights: [
          '3+ years of development experience',
          'Full-stack web development',
          'Modern JavaScript frameworks',
          'UI/UX design principles',
          'Agile development methodologies'
        ],
        yearsOfExperience: 3
      }
    });

    console.log('Portfolio info created...');

    // Create skills
    const skills = [
      { name: 'React', category: 'frontend', proficiency: 90, icon: 'react', color: '#61DAFB' },
      { name: 'Next.js', category: 'frontend', proficiency: 85, icon: 'nextjs', color: '#000000' },
      { name: 'TypeScript', category: 'frontend', proficiency: 80, icon: 'typescript', color: '#3178C6' },
      { name: 'Node.js', category: 'backend', proficiency: 85, icon: 'nodejs', color: '#339933' },
      { name: 'Express.js', category: 'backend', proficiency: 80, icon: 'express', color: '#000000' },
      { name: 'MongoDB', category: 'database', proficiency: 75, icon: 'mongodb', color: '#47A248' },
      { name: 'PostgreSQL', category: 'database', proficiency: 70, icon: 'postgresql', color: '#336791' },
      { name: 'Git', category: 'tools', proficiency: 85, icon: 'git', color: '#F05032' },
      { name: 'Docker', category: 'tools', proficiency: 65, icon: 'docker', color: '#2496ED' },
      { name: 'AWS', category: 'cloud', proficiency: 60, icon: 'aws', color: '#FF9900' }
    ];

    await Skill.insertMany(skills);
    console.log('Skills created...');

    // Create projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard.',
        shortDescription: 'Modern e-commerce solution with React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
        images: ['/ecl.png'],
        liveUrl: 'https://ecommerce-demo.com',
        githubUrl: 'https://github.com/kush/ecommerce',
        category: 'web',
        featured: true,
        status: 'completed',
        order: 1
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.',
        shortDescription: 'Collaborative task management with real-time features',
        technologies: ['React', 'Socket.io', 'Node.js', 'PostgreSQL'],
        images: ['/Nexus.jpg'],
        liveUrl: 'https://taskapp-demo.com',
        githubUrl: 'https://github.com/kush/taskapp',
        category: 'web',
        featured: true,
        status: 'completed',
        order: 2
      },
      {
        title: 'Portfolio Website',
        description: 'A responsive portfolio website built with Next.js and TypeScript. Features include dynamic content management, blog functionality, and contact forms.',
        shortDescription: 'Modern portfolio with dynamic content management',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
        images: ['/Artistry.png'],
        liveUrl: 'https://kushbhardwaj.dev',
        githubUrl: 'https://github.com/kush/portfolio',
        category: 'web',
        featured: false,
        status: 'completed',
        order: 3
      }
    ];

    await Project.insertMany(projects);
    console.log('Projects created...');

    // Create experience
    const experiences = [
      {
        company: 'Cognifyz Technologies',
        position: 'Full Stack Developer',
        description: 'Developed and maintained web applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions.',
        responsibilities: [
          'Developed responsive web applications using React and TypeScript',
          'Built RESTful APIs with Node.js and Express',
          'Implemented database designs with MongoDB',
          'Collaborated with UI/UX designers to implement pixel-perfect designs',
          'Participated in code reviews and agile development processes'
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
        startDate: new Date('2022-01-15'),
        endDate: new Date('2023-12-30'),
        isCurrentJob: false,
        location: 'Remote',
        companyUrl: 'https://cognifyz.com',
        logo: '/cognifyz-1.png',
        order: 1
      },
      {
        company: 'Freelancer',
        position: 'Web Developer',
        description: 'Worked as a freelance web developer on Fiverr, delivering custom web solutions for various clients worldwide.',
        responsibilities: [
          'Built custom websites and web applications for clients',
          'Provided technical consultation and project planning',
          'Maintained long-term client relationships',
          'Delivered projects on time and within budget'
        ],
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress'],
        startDate: new Date('2021-06-01'),
        endDate: new Date('2021-12-31'),
        isCurrentJob: false,
        location: 'Remote',
        companyUrl: 'https://fiverr.com',
        logo: '/fiverr.png',
        order: 2
      }
    ];

    await Experience.insertMany(experiences);
    console.log('Experience created...');

    // Create testimonials
    const testimonials = [
      {
        name: 'John Smith',
        position: 'Project Manager',
        company: 'Tech Solutions Inc.',
        content: 'Kush delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are outstanding.',
        rating: 5,
        order: 1
      },
      {
        name: 'Sarah Johnson',
        position: 'Startup Founder',
        company: 'InnovateCorp',
        content: 'Working with Kush was a pleasure. He understood our requirements perfectly and delivered a robust task management solution that our team loves using.',
        rating: 5,
        order: 2
      },
      {
        name: 'Mike Davis',
        position: 'CTO',
        company: 'Digital Agency',
        content: 'Kush is a talented developer who brings both technical skills and creative problem-solving to every project. Highly recommended!',
        rating: 5,
        order: 3
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Testimonials created...');

    console.log('✅ Database seeded successfully!');
    console.log(`👤 Admin login: ${process.env.ADMIN_EMAIL || 'admin@portfolio.com'}`);
    console.log(`🔑 Admin password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
