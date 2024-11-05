import { getUsuarioEmail, getUsuarios, postUsuario } from "../models/usuario.js";
import { validateEmail, validateInput, validateTelefone } from "../utils/validators.js";

import sendStatus from "../utils/sendStatus.js";

const adminController = () => {
  return {
    getUsuarios: async (req, res) => {
      const u = await getUsuarios();

      if (u != null) {
        return sendStatus(res, 200, "Usuários", u);
      }

      return sendStatus(res, 200, "Nenhum usuário encontrado");
    },
    postUsuario: async (req, res) => {
      const { nome, email, senha, telefone, ativo } = req.body;

      const v = validateInput(nome) && validateInput(senha) && validateEmail(email) && validateTelefone(telefone);

      if (!v) {
        return sendStatus(res, 400, "Todos os campos são obrigatórios e precisam ser preenchidos");
      }
      
      const u = await getUsuarioEmail(email);

      if(u) return sendStatus(res, 409, "Já existe um usuário cadastrado com este email");

      const response = await postUsuario({
        nome,
        email,
        senha,
        telefone,
        ativo,
      });

      if (!response) {
        return sendStatus(res, 500, "Ocorreu um erro ao cadastrar usuário");
      }

      return sendStatus(res, 200, "Usuário cadastrado com sucesso");
    },
  };
};

export default adminController;
