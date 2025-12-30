import {
  createUser,
  hashedPassword,
  getUserByEmailExPw,
  comparePassword,
  getUserByEmail,
  generateJwtToken,
} from "../services/user.service.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      return res.status(402).json({
        status: "failed",
        message: "Mohon semua field di isi",
      });
    }

    // cek email
    const existingEmail = await getUserByEmailExPw(email);

    if (existingEmail) {
      return res.status(409).json({
        status: "failed",
        message: "Email Already Exist",
      });
    }

    // enkripsi pw
    const hashedPw = await hashedPassword(password);

    // save
    await createUser({
      name,
      email,
      hashedPw,
    });

    // return
    return res.status(201).json({
      status: "success",
      message: "Akun berhasil dibuat!",
    });
  } catch (error) {
    console.log("ERROR CREATE AKUN: ", error.message);
    return res.status(500).json({
      message: "Server error:",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User tidak ditemukan!" });
    }

    const decoded = await comparePassword(password, user.password);
    if (!decoded) {
      return res.status(401).json({
        status: "failed",
        message: "Password tidak cocok!",
      });
    }

    // jwt
    const token = generateJwtToken(user);

    console.log("TOKEN DITERIMA:", token);
    console.log("SECRET LOGIN:", process.env.SECRET_KEY);

    // kalau ada flag redirect=b maka redirect ke sistem-b
    if (req.query.redirect === "b") {
      return res.redirect("http://localhost:5174/callback?token=" + token);
    }

    // login pakai sistem A
    return res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error:",
      error: error.message,
    });
  }
};

// controller utk handle redirect=b
export const ssoLogin = async (req, res) => {
  try {
    // redirect ke halaman system-a-fe dgn flag redirect=b
    const redirectUrl = "http://localhost:5173?redirect=b";
    return res.redirect(redirectUrl);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// controller utk verifikasi token dipanggil sistem b
export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token tidak ada" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    return res.status(200).json({
      message: "Token valid",
      user: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Token tidak valid",
      error: error.message,
    });
  }
};
