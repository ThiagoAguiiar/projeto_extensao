import { z } from "zod";

import bcrypt from "bcrypt";

const email = z.string().trim().email("Insira um email válido");
const input = z.string().trim().min(1, "Campo obrigatório");

export const validateEmail = (valor) => {
  return email.safeParse(valor).success;
};

export const validateInput = (valor) => {
  return input.safeParse(valor).success;
};

export const verifyPassword = (senha, senhaHash) => {
  return bcrypt.compareSync(senha, senhaHash);
};

export const hashPassword = (senha) => {
  return bcrypt.hashSync(senha, 10);
};
