import axios from "axios";
import { RegisterUser } from "../types/user";

const API_URL = import.meta.env.VITE_KEY;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

export const getUsers = () => api.get("/users");
export const registerUser = (user: RegisterUser) => api.post("/users", user);

export const loginUser = (accountNumber: string, password: string) =>
  api.post("/users/login", { accountNumber, password });

export const deposit = (userId: number, amount: number) =>
  api.post(`/users/${userId}/deposit`, { amount });
