import connection from "../config/db.js";
import status from "../utils/status.js";

import { decriptografarToken, verificarToken } from "../utils/token.js";

const authMiddleware = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token)
    return status(
      res,
      401,
      "Token não encontrado. Realize o login para acessar esta rota."
    );

  token = token.replace("Bearer ", "");

  const decrypt = decriptografarToken(token);

  if (!decrypt) return status(res, 401, "Token inválido");

  const query = `SELECT token FROM usuario WHERE email = ?`;

  connection.query(query, [decrypt.email], (err, result) => {
    if (err) {
      return status(res, 500, "Erro interno do servidor.");
    }

    if (result.length === 0 || !verificarToken(result[0].token)) {
      return status(res, 401, "Token inválido");
    }

    next();
  });
};

export default authMiddleware;
