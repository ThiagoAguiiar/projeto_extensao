import {
  deleteFuncionario,
  getFuncionarioEmail,
  getFuncionarios,
  postFuncionario,
  getFuncionarioId,
  putFuncionario,
} from "../models/funcionarios.js";
import { vDate, vEmail, vInput, vPhone } from "../utils/validators.js";
import status from "../utils/status.js";
import sendEmail from "../utils/email.js";

const funcionarioController = () => {
  const get = async (req, res) => {
    const u = await getFuncionarios();

    if (u != null) {
      return status(res, 200, "Lista de funcionários retornada com sucesso!", u);
    }

    return status(res, 200, "Nenhum funcionário cadastrado");
  };

  const getById = async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return status(res, 400, "Nenhum funcionário encontrado");
    }

    const u = await getFuncionarioId(id);

    if (!u) {
      return status(res, 404, "Nenhum funcionário encontrado");
    }

    return status(res, 200, "Funcionário", u);
  };

  const post = async (req, res) => {
    const { nome, especializacao, dataContratacao, email, senha, telefone, ativo } = req.body;

    const validate =
      vInput(nome) && vInput(senha) && vEmail(email) && vPhone(telefone) && vDate(dataContratacao) && vInput(especializacao);

    if (!validate) {
      return status(res, 400, "Preencha todos os campos que são obrigatórios");
    }

    const u = await getFuncionarioEmail(email);

    if (u) {
      return status(res, 409, "Já existe um funcionário cadastrado com este email");
    }

    const newUser = await postFuncionario({
      nome,
      especializacao,
      dataContratacao,
      email,
      senha,
      telefone,
      ativo,
      dataCriacao: new Date(),
    });

    if (!newUser) {
      return status(res, 500, "Erro ao cadastrar funcionário. Tente novamente");
    }

    await sendEmail(
      email,
      "Boas vindas ao Léo Oficina Mecânica",
      `Olá, ${nome}. Seu email (${email}) foi cadastrado no sistema "Léo Oficina Mecânica". A sua senha é: ${senha}`
    );

    return status(res, 200, "Funcionário cadastrado com sucesso");
  };

  const _delete = async (req, res) => {
    const { email, id } = req.query;

    if (!vEmail(email)) {
      return status(res, 400, "Email inválido");
    }

    if (!id) {
      return status(res, 400, "Id de funcionário inválido");
    }

    const u = await getFuncionarioEmail(email);

    if (!u) {
      return status(res, 404, "Funcionário não encontrado");
    }

    const response = await deleteFuncionario(id);

    if (!response) {
      return status(res, 500, "Ocorreu um erro ao deletar funcionário");
    }

    return status(res, 200, "Funcionário deletado com sucesso!");
  };

  const put = async (req, res) => {
    const { nome, especializacao, email, telefone, ativo, idFuncionario } = req.body;

    const validate = vInput(nome) && vEmail(email) && vPhone(telefone) && vInput(especializacao);

    if (!validate) {
      return status(res, 400, "Preencha toods os campos obrigatórios");
    }

    const u = await getFuncionarioEmail(email);

    if (u && u.idFuncionario !== idFuncionario) {
      return status(res, 400, "Já existe um funcionário cadastrado com este email");
    }

    await putFuncionario({
      nome,
      especializacao,
      email,
      telefone,
      ativo,
      idFuncionario,
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

export default funcionarioController;
