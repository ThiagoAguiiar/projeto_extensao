import connection from "../config/db.js";
import { hashSenha } from "../utils/validators.js";

/* [GET] */
export const getFuncionarios = (ativo = null) => {
  return new Promise((resolve, reject) => {
    try {
      let query;
      let params = [];

      if (ativo == null) {
        query = `SELECT nome, email, ativo, telefone, idFuncionario, especializacao, dataContratacao FROM funcionarios`;
      } else {
        query = `SELECT nome, email, ativo, telefone, idFuncionario, especializacao, dataContratacao FROM funcionarios WHERE ativo = ?`;
        params.push(ativo);
      }

      connection.query(query, params, (err, result) => {
        if (err) return reject(err);
        // Mapeia o resultado para alterar o valor de ativo para booleano e 
        // converte a data de yyyy-MM-ddT00:00:00Z (ISO 8601) -> dd/MM/aaaa
        result = result.map((item) => {
          const formatDate = (isoDate) => {
            const date = new Date(isoDate);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          };

          return { ...item, ativo: item.ativo === 1, dataContratacao: item.dataContratacao ? formatDate(item.dataContratacao) : null };
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
      const query = `SELECT idFuncionario, nome, especializacao, email, ativo, telefone FROM funcionarios WHERE idFuncionario = ?`;

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
      const query = "UPDATE funcionarios SET ? WHERE idFuncionario = ?";

      connection.query(query, [funcionario, funcionario.idFuncionario], (err, result) => {
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
        "INSERT INTO funcionarios(nome, especializacao, dataContratacao, email, senha, telefone, ativo, dataCriacao) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";

      connection.query(
        query,
        [
          funcionario.nome,
          funcionario.especializacao,
          funcionario.dataContratacao,
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
