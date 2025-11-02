import api from './client';

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

// Auth API
export const authAPI = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: LoginData & { role?: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

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

// Upload API
export const uploadAPI = {
  single: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  multiple: async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    const response = await api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
