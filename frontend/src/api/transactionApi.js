/**
 * API service - All backend calls for transactions
 * Uses axios; base URL works with Vite proxy (/api -> localhost:5000)
 */
import axios from 'axios';

const API_BASE = '/api';

export const transactionApi = {
  // GET all transactions
  getAll: () => axios.get(`${API_BASE}/transactions`),

  // POST create new transaction
  create: (data) => axios.post(`${API_BASE}/transactions`, data),

  // DELETE transaction by id
  delete: (id) => axios.delete(`${API_BASE}/transactions/${id}`),
};
