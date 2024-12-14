import connection from "../config/db.js";

/* [GET] */
export const getPecas = () => {
    return new Promise((resolve, reject) => {
        try {
            let query;

            query = `SELECT * FROM pecas;`;

            connection.query(query, (err, result) => {
                if (err) return reject(err);

                return resolve(result);
            });
        } catch (err) {
            reject(err);
        }
    });
};

/* [GET] */
export const getPecaId = (idPeca) => {
    return new Promise((resolve, reject) => {
        try {
            let query;

            query = `SELECT * FROM pecas WHERE idPeca = ?;`

            connection.query(query, [idPeca], (err, result) => {
                if (err) return reject(err);

                if (result.length > 0) {
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
export const putPeca = (peca) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "UPDATE pecas SET ? WHERE idPeca = ?";

            connection.query(query, [peca, peca.idPeca], (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            });
        } catch (err) {
            reject(err);
        }
    });
};

/* [POST] */
export const postPeca = async (peca) => {
    return new Promise((resolve, reject) => {
        try {
            const query =
                "INSERT INTO pecas(nome, quantidade, valor) VALUES(?, ?, ?)";

            connection.query(
                query,
                [
                    peca.nome,
                    peca.quantidade,
                    peca.valor,
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
export const deletePeca = (idPeca) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "DELETE FROM pecas WHERE idPeca = ?";

            connection.query(query, [idPeca], (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            });
        } catch (err) {
            reject(err);
        }
    });
};
