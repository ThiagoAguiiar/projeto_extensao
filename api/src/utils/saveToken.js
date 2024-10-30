import jwt from "jsonwebtoken";

export const createToken = (data, expires) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: expires });
};

export const saveTokenData = (token) => {
  // Armazena o token no banco de dados
};
