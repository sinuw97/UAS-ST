import axios from "axios";

export const loginWithToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const response = await axios.post(
      "http://localhost:3000/auth/verify-token",
      { token }
    );

    if (response.data.valid) {
      return res.json({
        message: "Login success",
        user: response.data.user
      });
    }

    return res.status(401).json({ message: "Invalid token" });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}