import { api } from "../utils/api.utils.js";

export const dashboard = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};

export const chartSaldo = async () => {
  const response = await api.get("/dashboard/chart");
  return response.data;
}