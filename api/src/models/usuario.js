import connection from "../config/db.js";
import { hashPassword } from "../utils/validators.js";

/* [GET] */
export const getUsuarios = () => {
  return new Promise((resolve, reject) => {
    try {
      connection.connect();

      const query = `SELECT nome, email, ativo, telefone, idUsuario FROM usuario`;

      connection.query(query, (err, result) => {
        if (err) {
          console.log("ERRO AO BUSCAR USUÁRIOS: " + err);
          return reject(err);
        }

        result = result.map((item) => {
          return { ...item, ativo: item.ativo === 1 };
        });

        resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};

/* [GET] */
export const getUsuarioEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      connection.connect();

      const query = `SELECT idUsuario, nome, email, senha FROM usuario WHERE email = ?`;

      connection.query(query, [email], (err, result) => {
        if (err) return reject(err);

        if (result.length > 0) resolve(result[0]);

        resolve(null);
      });
    } catch (err) {
      reject(err);
    }
  });
};

/* [PUT] */
export const putUsuario = (usuario) => {
  return new Promise((resolve, reject) => {
    try {
      connection.connect();

      const query = "UPDATE usuario SET ? WHERE email = ?";

      connection.query(query, [usuario, usuario.email], (err, result) => {
        if (err) return reject(err);

        resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const postUsuario = async (usuario) => {
  return new Promise((resolve, reject) => {
    try {
      connection.connect();

      const query =
        "INSERT INTO usuario(nome, email, senha, telefone, ativo) VALUES(?, ?, ?, ?, ?)";

      connection.query(
        query,
        [
          usuario.nome,
          usuario.email,
          hashPassword(usuario.senha),
          usuario.telefone,
          usuario.ativo,
        ],
        (err, result) => {
          if (err) return reject(err);

          resolve(result);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
