import jwt from "jsonwebtoken";

// verifikasi token jwt
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. cek header
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // 2. ambil token
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // 3. verify
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 4. tempelin ke request
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };

    next(); // LANJUT ke controller
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
