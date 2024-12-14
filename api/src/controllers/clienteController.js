import {
    deleteCliente,
    getClienteEmail,
    getClientes,
    postCliente,
    getClienteId,
    putCliente,
  } from "../models/clientes.js";
  import { vEmail, vInput, vPhone } from "../utils/validators.js"; 
  import status from "../utils/status.js";
  import sendEmail from "../utils/email.js";
  
  const clienteController = () => {
    const get = async (req, res) => {
      const u = await getClientes();
  
      if (u != null) {
        return status(res, 200, "Lista de clientes retornada com sucesso!", u);
      }
  
      return status(res, 200, "Nenhum cliente cadastrado");
    };
  
    const getById = async (req, res) => {
      const { id } = req.query;
  
      if (!id) {
        return status(res, 400, "Nenhum cliente encontrado");
      }
  
      const u = await getClienteId(id);
  
      if (!u) {
        return status(res, 404, "Nenhum cliente encontrado");
      }
  
      return status(res, 200, "Cliente", u);
    };
  
    const post = async (req, res) => {
      const { nome, email, telefone, endereco } = req.body;
  
      const validate =
        vInput(nome) && vEmail(email) && vPhone(telefone) && vInput(endereco);
  
      if (!validate) {
        return status(res, 400, "Preencha todos os campos são obrigatórios");
      }
  
      const u = await getClienteEmail(email);
  
      if (u) {
        return status(res, 409, "Já existe um cliente cadastrado com este email");
      }
  
      const newUser = await postCliente({
        nome,
        email,
        telefone,
        dataCriacao: new Date(),
        endereco: endereco
      });
  
      if (!newUser) {
        return status(res, 500, "Erro ao cadastrar cliente. Tente novamente");
      }
  
      await sendEmail(
        email,
        "Boas vindas ao Léo Oficina Mecânica",
        `Olá, ${nome}. Seu email (${email}) foi cadastrado no sistema "Léo Oficina Mecânica".`/*  A sua senha é: ${senha} */
      );
  
      return status(res, 200, "Cliente cadastrado com sucesso");
    };
  
    const _delete = async (req, res) => {
      const { email, id } = req.query;
  
      if (!vEmail(email)) {
        return status(res, 400, "Email inválido");
      }
  
      if (!id) {
        return status(res, 400, "Id de cliente inválido");
      }
  
      const u = await getClienteEmail(email);
  
      if (!u) {
        return status(res, 404, "Cliente não encontrado");
      }
  
      const response = await deleteCliente(id);
  
      if (!response) {
        return status(res, 500, "Ocorreu um erro ao deletar cliente");
      }
  
      return status(res, 200, "Cliente deletado com sucesso!");
    };
  
    const put = async (req, res) => {
      const { nome, email, telefone, idCliente, endereco } = req.body;
  
      const validate = vInput(nome) && vEmail(email) && vPhone(telefone) && vInput(endereco);
  
      if (!validate) {
        return status(res, 400, "Preencha todos os campos obrigatórios");
      }
  
      const u = await getClienteEmail(email);
  
      if (u && u.idCliente !== idCliente) {
        return status(res, 400, "Já existe um cliente cadastrado com este email");
      }
  
      await putCliente({
        nome,
        email,
        telefone,
        idCliente,
        endereco
      });
  
      return status(res, 200, "Cliente atualizado com sucesso");
    };
  
    return {
      get,
      getById,
      post,
      delete: _delete,
      put,
    };
  };
  
  export default clienteController;
  