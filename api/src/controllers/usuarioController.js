import {
  deleteUsuario,
  getUsuarioEmail,
  getUsuarios,
  postUsuario,
  getUsuarioId,
  putUsuario,
} from "../models/usuario.js";

import { vEmail, vInput, vPhone } from "../utils/validators.js";

import status from "../utils/status.js";
import sendEmail from "../utils/email.js";

const usuarioController = () => {
  const get = async (req, res) => {
    const u = await getUsuarios();

    if (u != null) {
      return status(res, 200, "Lista de usuários retornada com sucesso!", u);
    }

    return status(res, 200, "Nenhum usuário cadastrado");
  };

  const getById = async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return status(res, 400, "Nenhum usuário encontrado");
    }

    const u = await getUsuarioId(id);

    if (!u) {
      return status(res, 404, "Nenhum usuário encontrado");
    }

    return status(res, 200, "Usuário", u);
  };

  const post = async (req, res) => {
    const { nome, email, senha, telefone, ativo } = req.body;

    const validate =
      vInput(nome) && vInput(senha) && vEmail(email) && vPhone(telefone);

    if (!validate) {
      return status(res, 400, "Preencha todos os campos são obrigatórios");
    }

    const u = await getUsuarioEmail(email);

    if (u) {
      return status(res, 409, "Já existe um usuário cadastrado com este email");
    }

    const newUser = await postUsuario({
      nome,
      email,
      senha,
      telefone,
      ativo,
      dataCriacao: new Date(),
    });

    if (!newUser) {
      return status(res, 500, "Erro ao cadastrar usuário. Tente novamente");
    }

    await sendEmail(
      email,
      "Boas vindas ao Léo Oficina Mecânica",
      `Olá, ${nome}. Seu email (${email}) foi cadastrado no sistema "Léo Oficina Mecânica". A sua senha é: ${senha}`
    );

    return status(res, 200, "Usuário cadastrado com sucesso");
  };

  const _delete = async (req, res) => {
    const { email, id } = req.query;

    if (!vEmail(email)) {
      return status(res, 400, "Email inválido");
    }

    if (!id) {
      return status(res, 400, "Id de usuário inválido");
    }

    const u = await getUsuarioEmail(email);

    if (!u) {
      return status(res, 404, "Usuário não encontrado");
    }

    const response = await deleteUsuario(id);

    if (!response) {
      return status(res, 500, "Ocorreu um erro ao deletar usuário");
    }

    return status(res, 200, "Usuário deletado com sucesso!");
  };

  const put = async (req, res) => {
    const { nome, email, telefone, ativo, idUsuario } = req.body;

    const validate = vInput(nome) && vEmail(email) && vPhone(telefone);

    if (!validate) {
      return status(res, 400, "Preencha toods os campos obrigatórios");
    }

    const u = await getUsuarioEmail(email);

    if (u && u.idUsuario !== idUsuario) {
      return status(res, 400, "Já existe um usuário cadastrado com este email");
    }

    await putUsuario({
      nome,
      email,
      telefone,
      ativo,
      idUsuario,
    });

    return status(res, 200, "Usuário atualizado com sucesso");
  };

  return {
    get,
    getById,
    post,
    delete: _delete,
    put,
  };
};

export default usuarioController;
