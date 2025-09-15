import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
};

// Cart API
export const cartAPI = {
  validate: (items) => api.post('/cart/validate', { items }),
};

// Orders API
export const ordersAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getById: (id) => api.get(`/orders/${id}`),
  verifyPayment: (paymentData) => api.post('/orders/verify-payment', paymentData),
};

// Contact API
export const contactAPI = {
  submit: (contactData) => api.post('/contact', contactData),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => api.get('/testimonials'),
  submit: (testimonialData) => api.post('/testimonials', testimonialData),
};

export default api;






