import sendStatus from "../utils/sendStatus.js";

import { getUsuarioEmail, putUsuarioToken } from "../models/usuario.js";
import { validateEmail, validateInput, verifyPassword } from "../utils/validators.js";
import { createToken } from "../utils/token.js";

const authController = () => {
  return {
    login: async (req, res) => {
      const { email, senha } = req.body;

      const status = validateEmail(email) && validateInput(senha);

      if (status) {
        const usuario = await getUsuarioEmail(email);

        if (usuario != null && verifyPassword(senha, usuario.senha)) {
          const tokenData = {
            email: usuario.email,
            nome: usuario.nome,
            id: usuario.idUsuario,
          };

          const token = createToken(tokenData, "3h");
          await putUsuarioToken(usuario.email, token);

          return sendStatus(res, 200, "Login realizado com sucesso!", {
            token,
          });
        }

        return sendStatus(
          res,
          404,
          "Email ou senha inválido(s). Verifique suas credenciais e tente novamente."
        );
      }

      return sendStatus(
        res,
        404,
        "Email ou senha inválido(s). Verifique suas credenciais e tente novamente."
      );
    },
  };
};

export default authController;
