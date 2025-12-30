import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUserDataByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const hashedPassword = async (password) => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

export const createUser = async ({ name, email, hashedPw }) => {
  return await User.create({
    name,
    email,
    hashedPw,
  });
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const generateJwtToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};