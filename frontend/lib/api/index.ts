// Mock data
const mockSkills = [
  { id: '1', name: 'React', category: 'Frontend', level: 90, icon: 'react' },
  { id: '2', name: 'TypeScript', category: 'Frontend', level: 85, icon: 'typescript' },
  { id: '3', name: 'Next.js', category: 'Frontend', level: 88, icon: 'nextjs' },
  { id: '4', name: 'Node.js', category: 'Backend', level: 80, icon: 'nodejs' },
  { id: '5', name: 'MongoDB', category: 'Database', level: 75, icon: 'mongodb' },
  { id: '6', name: 'Express', category: 'Backend', level: 78, icon: 'express' },
  { id: '7', name: 'Tailwind CSS', category: 'Frontend', level: 92, icon: 'tailwind' },
  { id: '8', name: 'JavaScript', category: 'Frontend', level: 95, icon: 'javascript' },
];

const mockExperience = [
  {
    id: '1',
    company: 'Tech Company',
    position: 'Full Stack Developer',
    startDate: '2023-01-01',
    endDate: null,
    current: true,
    description: 'Developing modern web applications using React, Node.js, and MongoDB.',
    technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript']
  },
  {
    id: '2',
    company: 'Previous Company',
    position: 'Frontend Developer',
    startDate: '2022-01-01',
    endDate: '2022-12-31',
    current: false,
    description: 'Built responsive user interfaces and improved website performance.',
    technologies: ['React', 'JavaScript', 'CSS', 'HTML']
  }
];

const mockProjects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with modern design and functionality.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    featured: true,
    githubUrl: 'https://github.com/example/ecommerce',
    liveUrl: 'https://example-ecommerce.com',
    imageUrl: '/api/placeholder/600/400'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
    featured: true,
    githubUrl: 'https://github.com/example/taskapp',
    liveUrl: 'https://example-tasks.com',
    imageUrl: '/api/placeholder/600/400'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard with location-based forecasts.',
    technologies: ['React', 'JavaScript', 'OpenWeather API', 'Chart.js'],
    featured: true,
    githubUrl: 'https://github.com/example/weather',
    liveUrl: 'https://example-weather.com',
    imageUrl: '/api/placeholder/600/400'
  },
  {
    id: '4',
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing projects and skills.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    featured: true,
    githubUrl: 'https://github.com/example/portfolio',
    liveUrl: 'https://example-portfolio.com',
    imageUrl: '/api/placeholder/600/400'
  }
];

const mockTestimonials = [
  {
    id: '1',
    name: 'John Doe',
    position: 'Project Manager',
    company: 'Tech Corp',
    content: 'Excellent work quality and great communication throughout the project.',
    rating: 5,
    avatar: '/api/placeholder/150/150'
  },
  {
    id: '2',
    name: 'Jane Smith',
    position: 'CTO',
    company: 'StartupXYZ',
    content: 'Delivered high-quality code on time and exceeded our expectations.',
    rating: 5,
    avatar: '/api/placeholder/150/150'
  }
];

// Mock API functions that return promises with mock data
// Portfolio API
export const portfolioAPI = {
  get: async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return {
      name: 'Kush Bhardwaj',
      title: 'Full Stack Developer',
      bio: 'Passionate developer with expertise in modern web technologies.',
      email: 'kush@example.com',
      phone: '+1234567890'
    };
  },

  update: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Portfolio updated successfully' };
  },
};

// Projects API
export const projectsAPI = {
  getAll: async (params?: { featured?: boolean; category?: string; limit?: number }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let filteredProjects = mockProjects;
    
    if (params?.featured) {
      filteredProjects = filteredProjects.filter(p => p.featured);
    }
    
    if (params?.limit) {
      filteredProjects = filteredProjects.slice(0, params.limit);
    }
    
    return filteredProjects;
  },

  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProjects.find(p => p.id === id) || null;
  },

  create: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Project created successfully', id: Date.now().toString() };
  },

  update: async (id: string, data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Project updated successfully' };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Project deleted successfully' };
  },
};

// Experience API
export const experienceAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockExperience;
  },

  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockExperience.find(e => e.id === id) || null;
  },

  create: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Experience created successfully', id: Date.now().toString() };
  },

  update: async (id: string, data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Experience updated successfully' };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Experience deleted successfully' };
  },
};

// Skills API
export const skillsAPI = {
  getAll: async (params?: { category?: string }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let filteredSkills = mockSkills;
    
    if (params?.category) {
      filteredSkills = filteredSkills.filter(s => s.category === params.category);
    }
    
    return filteredSkills;
  },

  getGrouped: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const grouped = mockSkills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof mockSkills>);
    return grouped;
  },

  create: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Skill created successfully', id: Date.now().toString() };
  },

  update: async (id: string, data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Skill updated successfully' };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Skill deleted successfully' };
  },
};

// Testimonials API
export const testimonialsAPI = {
  getAll: async (params?: { limit?: number }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let filteredTestimonials = mockTestimonials;
    
    if (params?.limit) {
      filteredTestimonials = filteredTestimonials.slice(0, params.limit);
    }
    
    return filteredTestimonials;
  },

  create: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Testimonial created successfully', id: Date.now().toString() };
  },

  update: async (id: string, data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Testimonial updated successfully' };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Testimonial deleted successfully' };
  },
};
