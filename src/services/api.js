import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    const message = error.response?.data?.detail || 'An error occurred';
    toast.error(message);
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  getCurrentUser: () => api.get('/api/auth/me'),
  refreshToken: () => api.post('/api/auth/refresh'),
};

// Users API
export const usersAPI = {
  getUsers: (params) => api.get('/api/users', { params }),
  getUser: (userId) => api.get(`/api/users/${userId}`),
  updateCurrentUser: (userData) => api.put('/api/users/me', userData),
  getUserStats: () => api.get('/api/users/stats/overview'),
};

// Events API
export const eventsAPI = {
  getEvents: (params) => api.get('/api/events', { params }),
  getEvent: (eventId) => api.get(`/api/events/${eventId}`),
  createEvent: (eventData) => api.post('/api/events', eventData),
  updateEvent: (eventId, eventData) => api.put(`/api/events/${eventId}`, eventData),
  deleteEvent: (eventId) => api.delete(`/api/events/${eventId}`),
  rsvpToEvent: (eventId, rsvpData) => api.post(`/api/events/${eventId}/rsvp`, rsvpData),
  getEventRSVPs: (eventId) => api.get(`/api/events/${eventId}/rsvps`),
  updateRSVP: (rsvpId, rsvpData) => api.put(`/api/events/rsvps/${rsvpId}`, rsvpData),
  cancelRSVP: (rsvpId) => api.delete(`/api/events/rsvps/${rsvpId}`),
};

// Blog API
export const blogAPI = {
  getBlogPosts: (params) => api.get('/api/blog', { params }),
  getBlogPost: (postId) => api.get(`/api/blog/${postId}`),
  createBlogPost: (postData) => api.post('/api/blog', postData),
  updateBlogPost: (postId, postData) => api.put(`/api/blog/${postId}`, postData),
  deleteBlogPost: (postId) => api.delete(`/api/blog/${postId}`),
  getBlogStats: () => api.get('/api/blog/stats/overview'),
};

// Newsletter API
export const newsletterAPI = {
  subscribe: (subscriptionData) => api.post('/api/newsletter/subscribe', subscriptionData),
  unsubscribe: (email) => api.post('/api/newsletter/unsubscribe', { email }),
  getSubscribers: (params) => api.get('/api/newsletter/subscribers', { params }),
  getNewsletterStats: () => api.get('/api/newsletter/stats'),
  deleteSubscriber: (subscriberId) => api.delete(`/api/newsletter/subscribers/${subscriberId}`),
};

// Projects API
export const projectsAPI = {
  getProjects: (params) => api.get('/api/projects', { params }),
  getProject: (projectId) => api.get(`/api/projects/${projectId}`),
  createProject: (projectData) => api.post('/api/projects', projectData),
  updateProject: (projectId, projectData) => api.put(`/api/projects/${projectId}`, projectData),
  deleteProject: (projectId) => api.delete(`/api/projects/${projectId}`),
  getFeaturedProjects: () => api.get('/api/projects/featured/list'),
  getProjectStats: () => api.get('/api/projects/stats/overview'),
};

// Contact API
export const contactAPI = {
  sendMessage: (messageData) => api.post('/api/contact', messageData),
  getMessages: (params) => api.get('/api/contact', { params }),
  markMessageAsRead: (messageId) => api.put(`/api/contact/${messageId}/read`),
  deleteMessage: (messageId) => api.delete(`/api/contact/${messageId}`),
  getContactStats: () => api.get('/api/contact/stats'),
};

export default api;