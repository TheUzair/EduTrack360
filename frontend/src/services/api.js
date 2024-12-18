import axios from 'axios';
import ENDPOINTS from './endpoints';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchResource = (endpoint) => API.get(endpoint);
export const createResource = (endpoint, data) => API.post(endpoint, data);
export const updateResource = (endpoint, id, data) => API.put(`${endpoint}/${id}`, data);
export const deleteResource = (endpoint, id) => API.delete(`${endpoint}/${id}`);

export default API;
