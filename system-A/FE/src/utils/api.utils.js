import axios from "axios";
const BASE_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: BASE_URL
});

export function getAccessToken() {
  return localStorage.getItem("token");
}

export function putAccessToken(accessToken) {
  return localStorage.setItem("token", accessToken);
}

export function removeAccessToken() {
  localStorage.removeItem("token");
};

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);