import axios from "axios";
import { RegisterUser } from "../types/user";

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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const registerUser = async (user: RegisterUser) => {
  try {
    const response = await api.post("/users", user);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const loginUser = async (account: string, password: string) => {
  try {
    const response = await api.post("/users/login", {
      account,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const deposit = async (
  userId: number,
  notes: { denomination: number; quantity: number }[]
) => {
  try {
    const response = await api.post(`/users/${userId}/deposit`, notes);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const withdraw = async (
  userId: number,
  selectedNotes: { [denomination: number]: number }
) => {
  try {
    const response = await api.post(`/slots/withdraw/${userId}`, selectedNotes);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const fetchAvailableSlots = async () => {
  try {
    const response = await api.get("/slots/available-slots");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
