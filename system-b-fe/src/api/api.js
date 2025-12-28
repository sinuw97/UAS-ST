import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function getProduk() {
    const response = await api.get("/produk");
    return response.data;
}

export async function getProdukById(id) {
    const response = await api.get("/produk/" + id);
    return response.data;
}
