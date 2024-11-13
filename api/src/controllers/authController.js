import { getUsuarioEmail, putUsuario } from "../models/usuario.js";
import { criarToken } from "../utils/token.js";

import { vEmail, vInput, verifyPassword } from "../utils/validators.js";
import status from "../utils/status.js";

const authController = () => {
  const login = async (req, res) => {
    const { email, senha } = req.body;

    const validate = vEmail(email) && vInput(senha);

    if (validate) {
      // Busca usuário com email e que esteja ativo
      const usuario = await getUsuarioEmail(email, true);

      // Se houver usuário e a senha for válida
      if (usuario != null && verifyPassword(senha, usuario.senha)) {
        // Criação do token
        const tokenData = {
          email: usuario.email,
          nome: usuario.nome,
          id: usuario.idUsuario,
        };

        const token = criarToken(tokenData, "3h");

        usuario.token = token;
        usuario.ultimoLogin = new Date();

        // Salva o token e a data de último login no banco de dados
        await putUsuario(usuario);

        // Retorna para o frontend o token do usuário
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

  return {
    login,
  };
};

export default authController;
