import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getAccessToken() {
  return localStorage.getItem("token");
}

export function putAccessToken(accessToken) {
  return localStorage.setItem("token", accessToken);
}

// Utk rute yg pakai token jwt
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

export async function getProduk() {
  const response = await api.get("/produk");
  return response.data;
}

export async function getProdukById(id) {
  const response = await api.get("/produk/" + id);
  return response.data;
}
