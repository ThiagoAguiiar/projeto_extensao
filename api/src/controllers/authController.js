import sendStatus from "../utils/sendStatus.js";

import { getUsuarioEmail, putUsuarioToken } from "../models/usuario.js";
import { validateEmail, validateInput, verifyPassword } from "../utils/validators.js";
import { createToken } from "../utils/saveToken.js";

const authController = () => {
  return {
    login: async (req, res) => {
      const { email, senha } = req.body;

      const status = validateEmail(email) && validateInput(senha);

      if (status) {
        const usuario = await getUsuarioEmail(email);

        if (usuario != null && verifyPassword(senha, usuario.senha)) {
          // Cria o token JWT
          const token = createToken(
            {
              email: usuario.email,
              nome: usuario.nome,
              id: usuario.idUsuario,
            },
            "3h"
          );

          // Salva o token JWT no banco de dados
          await putUsuarioToken(usuario.email, token);
          return sendStatus(res, 200, "Login realizado com sucesso!", { token });
        }

        return sendStatus(res, 404, "Email e/ou senha inválido(s)");
      }

      return sendStatus(res, 404, "Email e/ou senha inválido(s)");
    },
  };
};

export default authController;
