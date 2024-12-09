import connection from "../config/db.js";

/* [GET] */
export const getClientes = (ativo = null) => {
  return new Promise((resolve, reject) => {
    try {
      let query;
      let params = [];

      if (ativo == null) {
        query = `SELECT nome, email, telefone, idCliente, endereco FROM cliente`;
      } else {
        query = `SELECT nome, email, telefone, idCliente, endereco FROM cliente WHERE ativo = ?`;
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
export const getClienteEmail = (email, ativo = null) => {
  return new Promise((resolve, reject) => {
    try {
      let query;
      let params = [email];

      if (ativo === null) {
        query = `SELECT idCliente, nome, email FROM cliente WHERE email = ?`;
      } else {
        query = `SELECT idCliente, nome, email FROM cliente WHERE email = ? AND ativo = ?`;
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
export const getClienteId = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT idCliente, nome, email, telefone, endereco FROM cliente WHERE idCliente = ?`;

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
export const putCliente = (cliente) => {
  console.log(cliente)
  return new Promise((resolve, reject) => {
    try {
      const query = "UPDATE cliente SET ? WHERE email = ?";

      connection.query(query, [cliente, cliente.email], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};

/* [POST] */
export const postCliente = async (cliente) => {
  return new Promise((resolve, reject) => {
    try {
      const query =
        "INSERT INTO cliente(nome, email, telefone, dataCriacao, endereco) VALUES(?, ?, ?, ?, ?)";

      connection.query(
        query,
        [
          cliente.nome,
          cliente.email,
          cliente.telefone,
          cliente.dataCriacao,
          cliente.endereco
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
export const deleteCliente = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const query = "DELETE FROM cliente WHERE idCliente = ?";

      connection.query(query, [id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};
