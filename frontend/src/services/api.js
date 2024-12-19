import axios from 'axios';
import ENDPOINTS from './endpoints';

const BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchResource = (endpoint) => API.get(endpoint);
export const createResource = (endpoint, data) => API.post(endpoint, data);
export const updateResource = (endpoint, id, data) => API.put(`${endpoint}/${id}`, data);
export const deleteResource = (endpoint, id) => API.delete(`${endpoint}/${id}`);

export default API;
