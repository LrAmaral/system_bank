import axios from "axios";
import { RegisterUser } from "../lib/register";

const API_URL = import.meta.env.VITE_KEY;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = async (user: RegisterUser) => {
  try {
    const response = await api.post("/users", user);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getCPFUser = async (cpf: string) => {
  try {
    const response = await api.get(`/users/cpf/${cpf}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const transferFunds = async (transferData: {
  senderId?: string;
  recipientCpf: string;
  amount: number;
}) => {
  try {
    const response = await api.post("/users/transfer", transferData);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const fetchUser = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
};

export const loginUser = async (account: string, password: string) => {
  try {
    const response = await api.post("/users/login", { account, password });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deposit = async (
  userId: number,
  notes: { denomination: number; quantity: number }[],
  currency: string
) => {
  try {
    const response = await api.post(`/users/${userId}/deposit`, notes, {
      params: { currency },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const withdraw = async (
  userId: number,
  selectedNotes: { [denomination: number]: number }
) => {
  try {
    const response = await api.post(`/slots/withdraw/${userId}`, selectedNotes);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchAvailableSlots = async () => {
  try {
    const response = await api.get("/slots/available-slots");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchTransactions = async (userId: number) => {
  try {
    const response = await api.get(`/transactions/user/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("Error response data:", error.response?.data);
    console.error("Error response status:", error.response?.status);
    console.error("Error response headers:", error.response?.headers);
  } else {
    console.error("Unexpected error:", error);
  }
  throw error;
};
