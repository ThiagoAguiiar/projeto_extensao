import enviarStatus from "../utils/enviarStatus.js";
import { getUsuarioEmail, putUsuario } from "../models/usuario.js";
import { criarToken, decriptografarToken } from "../utils/token.js";

import {
  validarEmail,
  validarInput,
  verificarSenha,
} from "../utils/validators.js";

const authController = () => {
  return {
    login: async (req, res) => {
      const { email, senha } = req.body;

      const status = validarEmail(email) && validarInput(senha);

      if (status) {
        // Busca usuário com email e que esteja ativo
        const usuario = await getUsuarioEmail(email, true);

        // Se houver usuário e a senha for válida
        if (usuario != null && verificarSenha(senha, usuario.senha)) {
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
          return enviarStatus(res, 200, "Login realizado com sucesso!", {
            token,
          });
        }

        return enviarStatus(
          res,
          404,
          "Email ou senha inválido(s). Verifique suas credenciais e tente novamente."
        );
      }

      return enviarStatus(
        res,
        404,
        "Email ou senha inválido(s). Verifique suas credenciais e tente novamente."
      );
    },
  };
};

export default authController;
