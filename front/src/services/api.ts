import axios from 'axios';

const API_URL = import.meta.env.VITE_KEY;

const api = axios.create({
    baseURL: API_URL,
});

export const getAccounts = () => api.get('/account');
// export const saveAccount = (account) => api.post('/save', account);
// export const updateAccount = (id, account) => api.put(`/update/${id}`, account);
// export const deleteAccount = (id) => api.delete(`/delete/${id}`);
// export const deposit = (id, amount) => api.post(`/deposit/${id}`, { amount });
// export const withdraw = (id, amount) => api.post(`/withdraw/${id}`, { amount });
// export const transfer = (fromAccountId, toAccountId, amount) => api.post('/transfer', { fromAccountId, toAccountId, amount });
