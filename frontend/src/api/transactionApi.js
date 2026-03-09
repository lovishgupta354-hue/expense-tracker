import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://expense-backend-dkwv.onrender.com/api";

export const transactionApi = {
  getAll: () => axios.get(`${API_BASE}/transactions`),

  create: (data) => axios.post(`${API_BASE}/transactions`, data),

  delete: (id) => axios.delete(`${API_BASE}/transactions/${id}`),
};