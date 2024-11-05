import connection from "../config/db.js";
import enviarStatus from "../utils/enviarStatus.js";

import { decriptografarToken, verificarToken } from "../utils/token.js";

const authMiddleware = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token)
    return enviarStatus(
      res,
      401,
      "Token não encontrado. Realize o login para acessar esta rota."
    );

  token = token.replace("Bearer ", "");

  const decrypt = decriptografarToken(token);

  if (!decrypt) return enviarStatus(res, 401, "Token inválido");

  const query = `SELECT token FROM usuario WHERE email = ?`;

  connection.query(query, [decrypt.email], (err, result) => {
    if (err) {
      return enviarStatus(res, 500, "Erro interno do servidor.");
    }

    if (result.length === 0 || !verificarToken(result[0].token)) {
      return enviarStatus(res, 401, "Token inválido");
    }

    next();
  });
};

export default authMiddleware;
