import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createWallet, getInfoSaldoById } from "./wallet.service.js";

// get user by email
export const getUserByEmailExPw = async (email) => {
  return await User.findOne({
    where: { email },
    attributes: { exclude: ['password'] }
  });
}

// get user by id
export const getuserByIdExPw = async (userId) => {
  return await User.findOne({
    where: { user_id: userId },
    attributes: { exclude: ['password'] }
  });
}

// get user by email inc pw
export const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email }
  });
}

// hash pw
export const hashedPassword = async (password) => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

// create user
export const createUser = async ({ name, email, hashedPw }) => {
  if (!name && !email && !hashedPw) {
    throw new Error("Nama, Emaail, dan Password harap di isi!")
  }

  // Cek wallet
  const cekWallet = await getInfoSaldoById(userId);
  if (!cekWallet) {
    await createWallet(userId);
  }

  return await User.create({
    name,
    email,
    password: hashedPw,
  });
};

// compare pw
export const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

// jwt generate
export const generateJwtToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
};