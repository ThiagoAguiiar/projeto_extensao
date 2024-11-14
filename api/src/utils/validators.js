import { z } from "zod";

import bcrypt from "bcrypt";

const email = z.string().trim().email("Insira um email válido");
const input = z.string().trim().min(1, "Campo obrigatório");
const telefone = z.string().trim().min(15, "Telefone inválido").max(15);

export const vEmail = (valor) => {
  return email.safeParse(valor).success;
};

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
