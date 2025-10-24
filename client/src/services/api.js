import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Don't redirect automatically, let components handle it
      console.warn('Authentication required');
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
};

// Stories API calls
export const storiesAPI = {
  getAll: (params) => api.get('/stories', { params }),
  getById: (id) => api.get(`/stories/${id}`),
  create: (storyData) => api.post('/stories', storyData),
  update: (id, storyData) => api.put(`/stories/${id}`, storyData),
  delete: (id) => api.delete(`/stories/${id}`),
  getUserStories: (userId) => api.get(`/users/${userId}/stories`),
};

// Paragraphs API calls
export const paragraphsAPI = {
  getByStory: (storyId) => api.get(`/paragraphs/${storyId}`),
  create: (paragraphData) => api.post('/paragraphs', paragraphData),
  update: (id, paragraphData) => api.put(`/paragraphs/${id}`, paragraphData),
  delete: (id) => api.delete(`/paragraphs/${id}`),
};

// Votes API calls
export const votesAPI = {
  vote: (paragraphId, vote) => api.post('/votes', { paragraphId, vote }),
  getVotes: (paragraphId) => api.get(`/votes/${paragraphId}`),
  getUserVote: (paragraphId) => api.get(`/votes/user/${paragraphId}`),
};

// AI API calls
export const aiAPI = {
  generate: (storyId, prompt) => api.post('/ai/generate', { storyId, prompt }),
  summarize: (storyId) => api.post('/ai/summarize', { storyId }),
  moderate: (content) => api.post('/ai/moderate', { content }),
};

// Users API calls
export const usersAPI = {
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
};

export default api;
