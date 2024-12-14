import { z } from "zod";

import bcrypt from "bcrypt";

const email = z.string().trim().email("Insira um email válido");
const input = z.string().trim().min(1, "Campo obrigatório");
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}/, "Data inserida tem de estar no formato ISO 8601, yyyy-MM-dd")
const telefone = z.string().trim().min(15, "Telefone inválido").max(15);
const number = z.number();

export const vEmail = (valor) => {
  return email.safeParse(valor).success;
};

export const vNumber = (num) => {
  return number.safeParse(num).success
}

export const vDate = (valor) => {
  return date.safeParse(valor).success
}

export const vInput = (valor) => {
  return input.safeParse(valor).success;
};

export const vPhone = (valor) => {
  return telefone.safeParse(valor).success;
};

export const verifyPassword = (senha, senhaHash) => {
  return bcrypt.compareSync(senha, senhaHash);
};

export const hashSenha = (senha) => {
  return bcrypt.hashSync(senha, 10);
};
