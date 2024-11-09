import {
  deleteUsuario,
  getUsuarioEmail,
  getUsuarios,
  postUsuario,
  getUsuarioId,
  putUsuario,
} from "../models/usuario.js";

import {
  validarEmail,
  validarInput,
  validarTelefone,
} from "../utils/validators.js";

import enviarStatus from "../utils/enviarStatus.js";

const usuarioController = () => {
  return {
    getUsuarios: async (req, res) => {
      const u = await getUsuarios();

      if (u != null) {
        return enviarStatus(res, 200, "Usuários", u);
      }

      return enviarStatus(res, 200, "Nenhum usuário encontrado");
    },
    getUsuarioId: async (req, res) => {
      const { id } = req.query;

      if (!id) return enviarStatus(res, 400, "ID inválido");

      const u = await getUsuarioId(id);

      if (!u) return enviarStatus(res, 404, "Usuário não encontrado");

      return enviarStatus(res, 200, "Usuário", u);
    },
    postUsuario: async (req, res) => {
      const { nome, email, senha, telefone, ativo } = req.body;

      const v =
        validarInput(nome) &&
        validarInput(senha) &&
        validarEmail(email) &&
        validarTelefone(telefone);

      if (!v) {
        return enviarStatus(
          res,
          400,
          "Todos os campos são obrigatórios e precisam ser preenchidos"
        );
      }

      const u = await getUsuarioEmail(email);

      if (u)
        return enviarStatus(
          res,
          409,
          "Já existe um usuário cadastrado com este email"
        );

      const response = await postUsuario({
        nome,
        email,
        senha,
        telefone,
        ativo,
        dataCriacao: new Date(),
      });

      if (!response) {
        return enviarStatus(res, 500, "Ocorreu um erro ao cadastrar usuário");
      }

      return enviarStatus(res, 200, "Usuário cadastrado com sucesso");
    },
    deleteUsuario: async (req, res) => {
      const { email, id } = req.query;

      if (!validarEmail(email)) {
        return enviarStatus(res, 400, "Email inválido");
      }

      if (!id) {
        return enviarStatus(res, 400, "Id de usuário inválido");
      }

      const u = await getUsuarioEmail(email);

      if (!u) {
        return enviarStatus(res, 404, "Usuário não encontrado");
      }

      const response = await deleteUsuario(id);

      if (!response) {
        return enviarStatus(res, 500, "Ocorreu um erro ao deletar usuário");
      }

      return enviarStatus(res, 200, "Usuário deletado com sucesso!");
    },
    putUsuario: async (req, res) => {
      const { nome, email, telefone, ativo, idUsuario } = req.body;

      const v =
        validarEmail(email) && validarInput(nome) && validarTelefone(telefone);

      if (!v) {
        return enviarStatus(
          res,
          400,
          "Todos os campos são obrigatórios e precisam ser preenchidos"
        );
      }

      const u = await getUsuarioEmail(email);

      if (!u) {
        return enviarStatus(res, 404, "Usuário não encontrado");
      }

      await putUsuario({
        nome,
        email,
        telefone,
        ativo,
        idUsuario,
      });

      return enviarStatus(res, 200, "Usuário atualizado com sucesso");
    },
  };
};

export default usuarioController;
