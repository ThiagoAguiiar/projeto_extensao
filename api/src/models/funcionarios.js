import connection from "../config/db.js";
import { hashSenha } from "../utils/validators.js";

/* [GET] */
export const getFuncionarios = (ativo = null) => {
  return new Promise((resolve, reject) => {
    try {
      let query;
      let params = [];

      if (ativo == null) {
        query = `SELECT nome, email, ativo, telefone, idFuncionario, especializacao FROM funcionarios`;
      } else {
        query = `SELECT nome, email, ativo, telefone, idFuncionario, especializacao FROM funcionarios WHERE ativo = ?`;
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
export const getFuncionarioEmail = (email, ativo = null) => {
  return new Promise((resolve, reject) => {
    try {
      let query;
      let params = [email];

      if (ativo === null) {
        query = `SELECT idFuncionario, nome, email,ativo, senha FROM funcionarios WHERE email = ?`;
      } else {
        query = `SELECT idFuncionario, nome, email,ativo, senha FROM funcionarios WHERE email = ? AND ativo = ?`;
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
export const getFuncionarioId = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT idFuncionario, nome, email, ativo, telefone FROM funcionarios WHERE idFuncionario = ?`;

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
export const putFuncionario = (funcionario) => {
  return new Promise((resolve, reject) => {
    try {
      const query = "UPDATE funcionarios SET ? WHERE email = ?";

      connection.query(query, [funcionario, funcionario.email], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};

/* [POST] */
export const postFuncionario = async (funcionario) => {
  return new Promise((resolve, reject) => {
    try {
      const query =
        "INSERT INTO funcionarios(nome, email, senha, telefone, ativo, dataCriacao) VALUES(?, ?, ?, ?, ?, ?)";

      connection.query(
        query,
        [
          funcionario.nome,
          funcionario.email,
          hashSenha(funcionario.senha),
          funcionario.telefone,
          funcionario.ativo,
          funcionario.dataCriacao,
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
export const deleteFuncionario = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const query = "DELETE FROM funcionarios WHERE idFuncionario = ?";

      connection.query(query, [id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};
