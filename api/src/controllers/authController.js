import { getFuncionarioEmail, getFuncionarioId, putFuncionario } from "../models/funcionarios.js";
import { criarToken } from "../utils/token.js";
import { vEmail, vInput, verifyPassword } from "../utils/validators.js";

import status from "../utils/status.js";

const authController = () => {
  const login = async (req, res) => {
    const { email, senha } = req.body;

    const validate = vEmail(email) && vInput(senha);

    if (validate) {
      // Busca funcionário com email e que esteja ativo
      const funcionario = await getFuncionarioEmail(email, true);

      // Se houver funcionário e a senha for válida
      if (
        funcionario != null &&
        verifyPassword(senha, funcionario.senha) &&
        funcionario.ativo
      ) {
        // Criação do token
        const tokenData = {
          email: funcionario.email,
          nome: funcionario.nome,
          id: funcionario.idFuncionario,
        };

        const token = criarToken(tokenData, "3h");

        funcionario.token = token;
        funcionario.ultimoLogin = new Date();

        // Salva o token e a data de último login no banco de dados
        await putFuncionario(funcionario);

        // Retorna para o frontend o token do funcionário
        return status(res, 200, "Login realizado com sucesso!", {
          token,
        });
      }

      return status(
        res,
        404,
        "Email ou senha inválido(s). Verifique suas credenciais e tente novamente."
      );
    }

    return status(
      res,
      404,
      "Email ou senha inválido(s). Verifique suas credenciais e tente novamente."
    );
  };

  // Remove o token do funcionário no banco
  const logout = async (req, res) => {
    const { id } = req.query;

    const funcionario = await getFuncionarioId(id);

    if (funcionario) {
      funcionario.token = null;
      await putFuncionario(funcionario);

      return status(res, 200, "Funcionário desconectado com sucesso!");
    }

    return status(res, 401, "Funcionário não encontrado.");
  };

  return {
    login,
    logout,
  };
};

export default authController;
