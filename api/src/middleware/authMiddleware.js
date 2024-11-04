import connection from "../config/db.js";
import sendStatus from "../utils/sendStatus.js";

import { decryptToken, verifyToken } from "../utils/token.js";

const authMiddleware = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) return sendStatus(res, 401, "Token não encontrado. Realize o login para acessar esta rota.");
  
  token = token.replace("Bearer ", "");

  const decrypt = decryptToken(token);

  if (!decrypt) return sendStatus(res, 401, "Token inválido");

  const query = `SELECT token FROM usuario WHERE email = ?`;

  connection.query(query, [decrypt.email], (err, result) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados:", err);
      return sendStatus(res, 500, "Erro interno do servidor.");
    }

    if (result.length === 0 || !verifyToken(result[0].token)) {
      return sendStatus(res, 401, "Token inválido");
    }

    next();
  });
};

export default authMiddleware;
