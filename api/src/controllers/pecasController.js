import {
    deletePeca,
    getPecaId,
    getPecas,
    postPeca,
    putPeca,
  } from "../models/pecas.js";
  import {vInput, vNumber} from "../utils/validators.js"; 
  import status from "../utils/status.js";
  
  const pecasController = () => {
    const get = async (req, res) => {
      const u = await getPecas();
  
      if (u != null) {
        return status(res, 200, "Lista de peças retornada com sucesso!", u);
      }
  
      return status(res, 200, "Nenhuma peça cadastrada no estoque.");
    };
  
    const getById = async (req, res) => {
      const { idPeca } = req.query;
      if (!idPeca) {
        return status(res, 400, "Nenhuma peça encontrada no estoque");
      }
  
      const u = await getPecaId(idPeca);
  
      if (!u) {
        return status(res, 404, "Nenhuma peça encontrada no estoque.");
      }
  
      return status(res, 200, "Peça", u);
    };
  
    const post = async (req, res) => {
      const { idPeca, nome, quantidade, valor } = req.body;
  
      const validate = vNumber(quantidade) && vInput(nome) && vNumber(valor);
  
      if (!validate) {
        return status(res, 400, "Preencha todos os campos que são obrigatórios");
      }
  
      const u = await getPecaId(idPeca);
  
      if (u) {
        return status(res, 409, "Já existe uma peça cadastrada.");
      }
  
      const newPart = await postPeca({
        nome,
        quantidade,
        valor
      });
  
      if (!newPart) {
        return status(res, 500, "Erro ao cadastrar peça. Tente novamente");
      }
  
      return status(res, 200, "Peça cadastrada com sucesso");
    };
  
    const _delete = async (req, res) => {
      const { idPeca } = req.query;
  
      if (!idPeca) {
        return status(res, 400, "ID da peça é inválida");
      }
  
      const u = await getPecaId(idPeca);
  
      if (!u) {
        return status(res, 404, "Peça não encontrada");
      }
  
      const response = await deletePeca(idPeca);
  
      if (!response) {
        return status(res, 500, "Ocorreu um erro ao deletar a peça");
      }
  
      return status(res, 200, "Peça deletada com sucesso!");
    };
  
    const put = async (req, res) => {
      const { idPeca, nome, quantidade, valor } = req.body;
  
      const validate = vNumber(idPeca) && vNumber(quantidade) && vInput(nome) && vNumber(valor);
  
      if (!validate) {
        return status(res, 400, "Preencha todos os campos obrigatórios");
      }
  
      const u = await getPecaId(idPeca);
  
      if (u && u.idPeca !== idPeca) {
        return status(res, 400, "Já existe uma peça cadastrada com este ID.");
      }
  
      await putPeca({
        idPeca,
        nome,
        quantidade,
        valor
      });
  
      return status(res, 200, "Peça atualizada com sucesso");
    };
  
    return {
      get,
      getById,
      post,
      delete: _delete,
      put,
    };
  };
  
  export default pecasController;
  