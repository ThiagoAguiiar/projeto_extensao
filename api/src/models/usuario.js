import connection from "../config/db.js";
import { hashSenha } from "../utils/validators.js";

/* [GET] */
export const getUsuarios = (ativo = null) => {
  return new Promise((resolve, reject) => {
    try {
      let query;
      let params = [];

      if (ativo == null) {
        query = `SELECT nome, email, ativo, telefone, idUsuario FROM usuario`;
      } else {
        query = `SELECT nome, email, ativo, telefone, idUsuario FROM usuario WHERE ativo = ?`;
        params.push(ativo);
      }

      connection.query(query, params, (err, result) => {
        if (err) return reject(err);

        // Mapeia o resultado para alterar o valor de ativo para booleano
        result = result.map((item) => {
          return { ...item, ativo: item.ativo === 1 };
        });

        return resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};

/* [GET] */
export const getUsuarioEmail = (email, ativo = null) => {
  return new Promise((resolve, reject) => {
    try {
      let query;
      let params = [email];

      if (ativo === null) {
        query = `SELECT idUsuario, nome, email, senha FROM usuario WHERE email = ?`;
      } else {
        query = `SELECT idUsuario, nome, email, senha FROM usuario WHERE email = ? AND ativo = ?`;
        params.push(ativo);
      }

      connection.query(query, params, (err, result) => {
        if (err) return reject(err);
        if (result.length > 0) {
          // Mapeia o resultado para alterar o valor de ativo para booleano
          result[0].ativo = result[0].ativo === 1;

          return resolve(result[0]);
        }

        return resolve(null);
      });
    } catch (err) {
      reject(err);
    }
  });
};

/* [GET] */
export const getUsuarioId = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT idUsuario, nome, email, ativo, telefone FROM usuario WHERE idUsuario = ?`;

      connection.query(query, [id], (err, result) => {
        if (err) return reject(err);
        if (result.length > 0) {
          // Mapeia o resultado para alterar o valor de ativo para booleano
          result[0].ativo = result[0].ativo === 1;
          return resolve(result[0]);
        }

        return resolve(null);
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
      const query = "UPDATE usuario SET ? WHERE email = ?";

      connection.query(query, [usuario, usuario.email], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};

/* [POST] */
export const postUsuario = async (usuario) => {
  return new Promise((resolve, reject) => {
    try {
      const query =
        "INSERT INTO usuario(nome, email, senha, telefone, ativo, dataCriacao) VALUES(?, ?, ?, ?, ?, ?)";

      connection.query(
        query,
        [
          usuario.nome,
          usuario.email,
          hashSenha(usuario.senha),
          usuario.telefone,
          usuario.ativo,
          usuario.dataCriacao,
        ],
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

/* [DELETE] */
export const deleteUsuario = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const query = "DELETE FROM usuario WHERE idUsuario = ?";

      connection.query(query, [id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};
