import axios from "axios";

const URL_SYSTEM_A = "http://localhost:3000";

export const verifyTokenWithSystemA = async (token) => {
  return await axios.post(`${URL_SYSTEM_A}/auth/verify-token`, { token });
}