import jwt from "jsonwebtoken";

export const createToken = (data, expires) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: expires });
};

export const verifyToken = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
};

export const decryptToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};