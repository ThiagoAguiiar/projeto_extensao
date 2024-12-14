import {
    deleteVeiculo,
    getVeiculoPlaca,
    getVeiculos,
    postVeiculo,
    putVeiculo,
  } from "../models/veiculos.js";
  import {vInput} from "../utils/validators.js"; 
  import status from "../utils/status.js";
  
  const veiculoController = () => {
    const get = async (req, res) => {
      const u = await getVeiculos();
  
      if (u != null) {
        return status(res, 200, "Lista de veículos retornada com sucesso!", u);
      }
  
      return status(res, 200, "Nenhum veículo cadastrado");
    };
  
    const getByPlate = async (req, res) => {
      const { plate } = req.query;
      if (!plate) {
        return status(res, 400, "Nenhum veículo encontrado");
      }
  
      const u = await getVeiculoPlaca(plate);
  
      if (!u) {
        return status(res, 404, "Nenhum veículo encontrado");
      }
  
      return status(res, 200, "Veículo", u);
    };
  
    const post = async (req, res) => {
      const { idCliente, nomeProp, placa, modelo, ano, motor, frota } = req.body;

      console.log(req.body)
  
      const validate = vInput(placa) && vInput(modelo) && vInput(motor) && vInput(frota) && vInput(nomeProp);
  
      if (!validate) {
        return status(res, 400, "Preencha todos os campos que são obrigatórios");
      }
  
      const u = await getVeiculoPlaca(placa);
  
      if (u) {
        return status(res, 409, "Já existe um veiculo cadastrado com esta placa");
      }
  
      const newVehicle = await postVeiculo({
        idCliente,
        nomeProp,
        placa,
        modelo,
        ano,
        motor,
        frota
      });
  
      if (!newVehicle) {
        return status(res, 500, "Erro ao cadastrar veiculo. Tente novamente");
      }
  
      return status(res, 200, "Veículo cadastrado com sucesso");
    };
  
    const _delete = async (req, res) => {
      console.log(req.body)
      const { placa } = req.query;
  
      if (!placa) {
        return status(res, 400, "Placa do veículo é inválida");
      }
  
      const u = await getVeiculoPlaca(placa);
  
      if (!u) {
        return status(res, 404, "Veiculo não encontrado");
      }
  
      const response = await deleteVeiculo(placa);
  
      if (!response) {
        return status(res, 500, "Ocorreu um erro ao deletar veículo");
      }
  
      return status(res, 200, "Veículo deletado com sucesso!");
    };
  
    const put = async (req, res) => {
      console.log(req.body)
      const { idCliente, placa, modelo, ano, motor, frota } = req.body;
  
      const validate = vInput(placa) && vInput(modelo) && vInput(motor) && vInput(frota);
  
      if (!validate) {
        return status(res, 400, "Preencha todos os campos obrigatórios");
      }
  
      const u = await getVeiculoPlaca(placa);
  
      if (u && u.placa !== placa) {
        return status(res, 400, "Já existe um veículo cadastrado com esta placa");
      }
  
      await putVeiculo({
        idCliente,
        placa,
        modelo,
        ano,
        motor,
        frota
      });
  
      return status(res, 200, "Veículo atualizado com sucesso");
    };
  
    return {
      get,
      getByPlate,
      post,
      delete: _delete,
      put,
    };
  };
  
  export default veiculoController;
  