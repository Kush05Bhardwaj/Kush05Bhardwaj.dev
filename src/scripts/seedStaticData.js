/**
 * Seed Script - Populate Database with Static Data
 * 
 * This script populates the MongoDB database with all the static data
 * from your portfolio components.
 * 
 * Run with: node frontend/scripts/seedStaticData.js
 */

const mongoose = require('mongoose');

// MongoDB URI - using the connection string directly
const MONGODB_URI = 'mongodb+srv://kush2012bhardwaj:Raidenkush05Ei21@cluster0.7fvgxjw.mongodb.net/portfolio?retryWrites=true&w=majority';

// Define Schemas
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: Number, required: true, min: 1, max: 100 },
  category: { type: String, required: true, enum: ['frontend', 'backend', 'database', 'tools', 'cloud', 'mobile', 'other'] },
  icon: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  description: String,
  responsibilities: [String],
  technologies: [String],
  startDate: { type: Date, required: true },
  endDate: Date,
  isCurrentJob: { type: Boolean, default: false },
  location: String,
  companyUrl: String,
  logo: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: String,
  technologies: [String],
  images: [String],
  liveUrl: String,
  githubUrl: String,
  category: { type: String, enum: ['web', 'mobile', 'desktop', 'api', 'other'], default: 'web' },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['completed', 'in-progress', 'planned'], default: 'completed' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  company: String,
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  avatar: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create Models
const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

// Static Data
const skills = [
  { name: "Python", proficiency: 80, category: "backend", order: 1, isActive: true },
  { name: "Machine Learning", proficiency: 55, category: "other", order: 2, isActive: true },
  { name: "Java", proficiency: 40, category: "backend", order: 3, isActive: true },
  { name: "HTML", proficiency: 90, category: "frontend", order: 4, isActive: true },
  { name: "CSS", proficiency: 60, category: "frontend", order: 5, isActive: true },
  { name: "JavaScript", proficiency: 70, category: "frontend", order: 6, isActive: true },
  { name: "React", proficiency: 65, category: "frontend", order: 7, isActive: true },
  { name: "Node.js", proficiency: 60, category: "backend", order: 8, isActive: true },
  { name: "TypeScript", proficiency: 60, category: "frontend", order: 9, isActive: true },
  { name: "Next.js", proficiency: 50, category: "frontend", order: 10, isActive: true },
  { name: "Tailwind CSS", proficiency: 50, category: "frontend", order: 11, isActive: true },
  { name: "MongoDB", proficiency: 75, category: "database", order: 12, isActive: true },
  { name: "Git & GitHub", proficiency: 80, category: "tools", order: 13, isActive: true },
  { name: "AI Integration (LLMs, APIs)", proficiency: 60, category: "other", order: 14, isActive: true },
  { name: "AWS", proficiency: 50, category: "cloud", order: 15, isActive: true },
];

const experiences = [
  {
    position: "Student",
    company: "KR Mangalam University",
    description: "I am a student at KR Mangalam University. I am pursuing B.Tech in Computer Science.",
    startDate: new Date("2024-08-01"),
    isCurrentJob: true,
    logo: "/kr.png",
    responsibilities: ["Pursuing B.Tech in Computer Science", "Learning software development", "Building projects"],
    technologies: [],
    order: 1,
    isActive: true,
  },
  {
    position: "Web Developer Intern",
    company: "Cognifyz Technologies",
    description: "I worked as a Web Dev Intern at Cognifyz Technologies.",
    startDate: new Date("2025-05-01"),
    isCurrentJob: true,
    logo: "/cognifyz-1.png",
    responsibilities: ["Web development", "Frontend development", "React.js development"],
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    order: 2,
    isActive: true,
  },
  {
    position: "Freelancer",
    company: "Fiverr",
    description: "I am a freelancer on Fiverr. I provide services like web development and web design.",
    startDate: new Date("2024-04-01"),
    isCurrentJob: true,
    logo: "/fiverr.png",
    responsibilities: ["Web development", "Web design", "Client communication"],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    order: 3,
    isActive: true,
  },
];

const projects = [
  {
    title: "Personal Portfolio",
    shortDescription: "Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js and TypeScript",
    images: ["/cv.png"],
    liveUrl: "#",
    technologies: ["JavaScript", "React", "TypeScript", "Tailwind CSS"],
    featured: true,
    category: "web",
    status: "completed",
    order: 1,
    isActive: true,
  },
  {
    title: "ECL Parcel",
    shortDescription: "Logistics Website",
    description: "A comprehensive logistics and parcel tracking website",
    images: ["/ecl.png"],
    liveUrl: "https://www.eclparcel.in/",
    technologies: ["JavaScript", "React", "Next.js", "Tailwind CSS"],
    featured: true,
    category: "web",
    status: "completed",
    order: 2,
    isActive: true,
  },
  {
    title: "Nexus",
    shortDescription: "Nexus - Personal AI Assistant with Local LLM Integration",
    description: "An AI-powered personal assistant with local LLM integration for privacy and performance",
    images: ["/Nexus.jpg"],
    githubUrl: "https://github.com/Kush05Bhardwaj/Nexus-Personal-AI-Assistant-with-Local-LLM-Integration",
    technologies: ["Python", "AI", "Machine Learning"],
    featured: true,
    category: "other",
    status: "completed",
    order: 3,
    isActive: true,
  },
  {
    title: "Artistry",
    shortDescription: "Artistry AI Redesign",
    description: "An AI-powered design tool with LLM integration",
    images: ["/Artistry.jpg"],
    liveUrl: "#",
    technologies: ["JavaScript", "React", "TypeScript", "Tailwind CSS", "Python", "LLM"],
    featured: true,
    category: "other",
    status: "completed",
    order: 4,
    isActive: true,
  },
];

const testimonials = [
  {
    name: "Ravi Kant",
    position: "COO",
    company: "ECL Parcel",
    content: "Kushagra is a very talented and hardworking individual. He is very passionate about his work and always delivers on time. I highly recommend him.",
    rating: 5,
    order: 1,
    isActive: true,
  },
];

// Seed Function
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Seed Skills
    console.log('📊 Seeding Skills...');
    const createdSkills = await Skill.insertMany(skills);
    console.log(`✅ Created ${createdSkills.length} skills\n`);

    // Seed Experience
    console.log('💼 Seeding Experience...');
    const createdExperience = await Experience.insertMany(experiences);
    console.log(`✅ Created ${createdExperience.length} experience entries\n`);

    // Seed Projects
    console.log('🚀 Seeding Projects...');
    const createdProjects = await Project.insertMany(projects);
    console.log(`✅ Created ${createdProjects.length} projects\n`);

    // Seed Testimonials
    console.log('💬 Seeding Testimonials...');
    const createdTestimonials = await Testimonial.insertMany(testimonials);
    console.log(`✅ Created ${createdTestimonials.length} testimonials\n`);

    // Summary
    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📈 Summary:');
    console.log(`   - Skills: ${createdSkills.length}`);
    console.log(`   - Experience: ${createdExperience.length}`);
    console.log(`   - Projects: ${createdProjects.length}`);
    console.log(`   - Testimonials: ${createdTestimonials.length}`);
    console.log('\n✨ You can now view and manage this data in the admin panel!');
    console.log('🔗 Admin Panel: http://localhost:3000/admin/login\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
