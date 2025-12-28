import jwt from "jsonwebtoken";

// verifikasi token jwt
export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required!" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    return res.status(200).json({
      valid: true,
      message: "OK",
      user: {
        id: decoded.id,
        name: decoded.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      valid: false,
      message: "Server error",
      error: error.message,
    });
  }
};