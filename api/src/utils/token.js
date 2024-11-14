import jwt from "jsonwebtoken";

export const criarToken = (data, expires) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: expires });
};

export const verificarToken = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
};

export const decriptografarToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};
