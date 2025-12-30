import axios from "axios";
import { putAccessToken } from "../utils/api.utils.js";

const BASE_URL = "http://localhost:3000";

export const login = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });

  // Krn axios gk lgsng return token
  const { token } = response.data;

  putAccessToken(token);

  return response.data;
};

export const register = async ({ name, email, password }) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, {
    name,
    email,
    password
  });

  return response.data;
}