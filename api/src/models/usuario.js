import connection from "../config/db.js";

/* Model usuário - controle de quem acessa o sistema */
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

export const getUsuarioNome = (nome) => {
  return new Promise((resolve, reject) => {
    try {
      connection.connect();

      const query = `SELECT * FROM usuario WHERE nome LIKE ?`;

      connection.query(query, [nome], (err, result) => {
        if (err) {
          console.log("ERRO AO BUSCAR USUÁRIO PELO NOME: " + err);
          return reject(err);
        }

        resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const putUsuarioToken = (email, token) => {
  return new Promise((resolve, reject) => {
    try {
      connection.connect();

      const query = "UPDATE usuario SET token = ? WHERE email = ?";

      connection.query(query, [token, email], (err, result) => {
        if (err) return reject(err);

        resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};
