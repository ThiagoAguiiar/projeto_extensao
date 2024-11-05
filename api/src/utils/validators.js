import { z } from "zod";

import bcrypt from "bcrypt";

const email = z.string().trim().email("Insira um email válido");
const input = z.string().trim().min(1, "Campo obrigatório");
const telefone = z.string().trim().min(15, "Telefone inválido").max(15);

export const validarEmail = (valor) => {
  return email.safeParse(valor).success;
};

export const validarInput = (valor) => {
  return input.safeParse(valor).success;
};

export const validarTelefone = (valor) => {
  return telefone.safeParse(valor).success;
};

export const verificarSenha = (senha, senhaHash) => {
  return bcrypt.compareSync(senha, senhaHash);
};

export const hashSenha = (senha) => {
  return bcrypt.hashSync(senha, 10);
};
