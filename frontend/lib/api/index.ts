import api from './client';

// Portfolio API
export const portfolioAPI = {
  get: async () => {
    const response = await api.get('/portfolio');
    return response.data;
  },

  update: async (data: any) => {
    const response = await api.post('/portfolio', data);
    return response.data;
  },
};

// Projects API
export const projectsAPI = {
  getAll: async (params?: { featured?: boolean; category?: string; limit?: number }) => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/projects', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

// Experience API
export const experienceAPI = {
  getAll: async () => {
    const response = await api.get('/experience');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/experience/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/experience', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/experience/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/experience/${id}`);
    return response.data;
  },
};

// Skills API
export const skillsAPI = {
  getAll: async (params?: { category?: string }) => {
    const response = await api.get('/skills', { params });
    return response.data;
  },

  getGrouped: async () => {
    const response = await api.get('/skills/grouped');
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/skills', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/skills/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/skills/${id}`);
    return response.data;
  },
};

// Testimonials API
export const testimonialsAPI = {
  getAll: async (params?: { limit?: number }) => {
    const response = await api.get('/testimonials', { params });
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/testimonials', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/testimonials/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/testimonials/${id}`);
    return response.data;
  },
};
