import { verifyTokenWithSystemA } from "../services/auth.service.js";

export const loginWithToken = async (req, res) => {
  try {
    const { token } = req.body;

    console.log("TOKEN DITERIMA B:", token);
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const response = await verifyTokenWithSystemA(token);

    return res.status(200).json({
      message: "Login success",
      user: response.data.user,
    });
  } catch (error) {
    console.error(
      "LOGIN WITH TOKEN ERROR:",
      error.response?.data || error.message
    );

    return res.status(401).json({
      message: "Login failed",
      error: error.response?.data || error.message,
    });
  }
};
