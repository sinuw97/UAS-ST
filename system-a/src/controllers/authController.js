import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

// register akun
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // cek email
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({
        message: "Email Already Exist",
      });
    }

    // enkripsi pw
    const hashedPassword = await bcrypt.hash(password, 12);

    // save
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // return
    return res.status(201).json({
      message: "Akun berhasil dibuat!"
    });
    
  } catch (error) {
    return res.status(500).json({
      message: "Server error: ",
      error: error.message,
    });
  }
}
// login akun
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //ambil data
    const userData = await User.findOne({ where: { email }});

    // cek email
    if (!userData) {
      return res.status(404).json({ message: "User tidak ditemukan!"});
    }

    // compare pw
    const decodedPw = await bcrypt.compare(password, userData.password);
    if (!decodedPw) {
      return res.status(401).json({
        message: "Password tidak cocok!"
      });
    }

    const token = jwt.sign(
      {
        id: userData.id,
        name: userData.name,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // kalau ada flag redirect=b maka redirect ke sistem-b
    if (req.query.redirect === "b") {
      return res.redirect("http://localhost:5173/callback?token="+token);
    }

    return res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
// verifikasi token jwt
export const verifyToken= async (req, res) => {
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
      }
    });
  } catch (error) {
    return res.status(500).json({
      valid: false,
      message: "Server error",
      error: error.message
    });
  }
}
// redirect ke system-a-fe
export const ssoLogin = async (req, res) => {
  try {
    // redirect ke halaman system-a-fe dgn flag redirect=b
    const redirectUrl = "http://localhost:5174?redirect=b";
    return res.redirect(redirectUrl);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}