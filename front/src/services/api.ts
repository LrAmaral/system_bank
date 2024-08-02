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
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const registerUser = async (user: RegisterUser) => {
  try {
    const response = await api.post("/users", user);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const loginUser = async (accountNumber: string, password: string) => {
  try {
    const response = await api.post("/users/login", {
      accountNumber,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deposit = async (userId: number, amount: number) => {
  try {
    const response = await api.post(`/users/${userId}/deposit`, { amount });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
