import {
  comparePassword,
  createUser,
  generateJwtToken,
  getUserDataByEmail,
  hashedPassword,
} from "../services/authService.js";
import jwt from "jsonwebtoken";
// register akun
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // cek email
    const existingEmail = await getUserDataByEmail(email);
    if (existingEmail) {
      return res.status(409).json({
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
    return res.status(500).json({
      message: "Server error: ",
      error: error.message,
    });
  }
};

// login akun
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //ambil data
    const userData = await getUserDataByEmail(email);

    // cek email
    if (!userData) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    // compare pw
    const decodedPw = await comparePassword(password, userData.password);
    if (!decodedPw) {
      return res.status(401).json({
        message: "Password tidak cocok!",
      });
    }

    const token = generateJwtToken(userData);

    // kalau ada flag redirect=b maka redirect ke sistem-b
    if (req.query.redirect === "b") {
      return res.redirect("http://localhost:5173/callback?token=" + token);
    }

    // login pakai sistem A
    return res.status(200).json({
      status: 'success',
      token
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// redirect ke system-a-fe
export const ssoLogin = async (req, res) => {
  try {
    // redirect ke halaman system-a-fe dgn flag redirect=b
    const redirectUrl = "http://localhost:5174?redirect=b";
    return res.redirect(redirectUrl);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const authMe = async (req, res) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    return res.status(200).json({
      authenticated: true,
      user: {
        id: decoded.id,
        name: decoded.name,
      },
    });
  } catch (error) {
    return res.status(401).json({ authenticated: false });
  }
};
