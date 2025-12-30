import axios from "axios";
const BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function getAccessToken() {
  return localStorage.getItem('token')
}

function putAccessToken(accessToken) {
  return localStorage.setItem('token', accessToken)
}

async function fetchDashboard() {
  const dashboard = await api.get("/dashboard");
  return dashboard.data.data;
}

export {
  api,
  getAccessToken,
  putAccessToken,
  fetchDashboard,
};
