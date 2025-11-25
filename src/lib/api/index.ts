// API Base URL - uses Next.js API routes
const API_BASE = '/api';

// Helper function for API calls
async function apiCall(endpoint: string, options?: RequestInit) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}
// Portfolio API
export const portfolioAPI = {
  get: async () => {
    const response = await apiCall('/portfolio');
    return response.data;
  },

  update: async (data: any) => {
    const response = await apiCall('/portfolio', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  },
};

// Projects API
export const projectsAPI = {
  getAll: async (params?: { featured?: boolean; category?: string; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.featured) queryParams.append('featured', 'true');
    if (params?.category) queryParams.append('category', params.category);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const queryString = queryParams.toString();
    const endpoint = `/projects${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiCall(endpoint);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiCall(`/projects/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiCall('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  },

  update: async (id: string, data: any) => {
    const response = await apiCall(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  },

  delete: async (id: string) => {
    const response = await apiCall(`/projects/${id}`, {
      method: 'DELETE',
    });
    return response;
  },
};

// Experience API
export const experienceAPI = {
  getAll: async () => {
    const response = await apiCall('/experience');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiCall(`/experience/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiCall('/experience', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  },

  update: async (id: string, data: any) => {
    const response = await apiCall(`/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  },

  delete: async (id: string) => {
    const response = await apiCall(`/experience/${id}`, {
      method: 'DELETE',
    });
    return response;
  },
};

// Skills API
export const skillsAPI = {
  getAll: async (params?: { category?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    
    const queryString = queryParams.toString();
    const endpoint = `/skills${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiCall(endpoint);
    return response.data;
  },

  getGrouped: async () => {
    const response = await apiCall('/skills');
    const skills = response.data;
    
    // Group skills by category on client side
    const grouped = skills.reduce((acc: any, skill: any) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
    
    return grouped;
  },

  create: async (data: any) => {
    const response = await apiCall('/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  },

  update: async (id: string, data: any) => {
    const response = await apiCall(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  },

  delete: async (id: string) => {
    const response = await apiCall(`/skills/${id}`, {
      method: 'DELETE',
    });
    return response;
  },
};

// Testimonials API
export const testimonialsAPI = {
  getAll: async (params?: { limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const queryString = queryParams.toString();
    const endpoint = `/testimonials${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiCall(endpoint);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiCall('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  },

  update: async (id: string, data: any) => {
    const response = await apiCall(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  },

  delete: async (id: string) => {
    const response = await apiCall(`/testimonials/${id}`, {
      method: 'DELETE',
    });
    return response;
  },
};
