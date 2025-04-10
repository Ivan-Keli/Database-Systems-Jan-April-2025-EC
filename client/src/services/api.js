import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Schools API
export const schoolsApi = {
  getAll: () => apiClient.get('/schools'),
  getById: (id) => apiClient.get(`/schools/${id}`),
  create: (data) => apiClient.post('/schools', data),
  update: (id, data) => apiClient.put(`/schools/${id}`, data),
  delete: (id) => apiClient.delete(`/schools/${id}`),
};

// Resources API
export const resourcesApi = {
  getAll: () => apiClient.get('/resources'),
  getById: (id) => apiClient.get(`/resources/${id}`),
  create: (data) => apiClient.post('/resources', data),
  update: (id, data) => apiClient.put(`/resources/${id}`, data),
  delete: (id) => apiClient.delete(`/resources/${id}`),
};

// Suppliers API
export const suppliersApi = {
  getAll: () => apiClient.get('/suppliers'),
  getById: (id) => apiClient.get(`/suppliers/${id}`),
  create: (data) => apiClient.post('/suppliers', data),
  update: (id, data) => apiClient.put(`/suppliers/${id}`, data),
  delete: (id) => apiClient.delete(`/suppliers/${id}`),
};

// Distributions API
export const distributionsApi = {
  getAll: () => apiClient.get('/distributions'),
  getById: (id) => apiClient.get(`/distributions/${id}`),
  create: (data) => apiClient.post('/distributions', data),
  update: (id, data) => apiClient.put(`/distributions/${id}`, data),
  delete: (id) => apiClient.delete(`/distributions/${id}`),
};

export default {
  schoolsApi,
  resourcesApi,
  suppliersApi,
  distributionsApi
};
