import connection from "../config/db.js";

/* [GET] */
export const getVeiculos = (ativo = null) => {
    return new Promise((resolve, reject) => {
        try {
            let query;

            query = `SELECT * FROM veiculo;`;
            //params.push(ativo);

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
export const getVeiculoPlaca = (placa) => {
    return new Promise((resolve, reject) => {
        try {
            let query;

            query = `SELECT * FROM veiculo WHERE placa = ?;`

            connection.query(query, [placa], (err, result) => {
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
export const putVeiculo = (veiculo) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "UPDATE veiculo SET ? WHERE placa = ?";

            connection.query(query, [veiculo, veiculo.placa], (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            });
        } catch (err) {
            reject(err);
        }
    });
};

/* [POST] */
export const postVeiculo = async (veiculo) => {
    return new Promise((resolve, reject) => {
        try {
            const query =
                "INSERT INTO veiculo(idCliente, modelo, placa, ano, motor, cor, frota) VALUES(?, ?, ?, ?, ?, ?, ?)";

            connection.query(
                query,
                [
                    veiculo.idCliente,
                    veiculo.modelo,
                    veiculo.placa,
                    veiculo.ano,
                    veiculo.motor,
                    veiculo.cor,
                    veiculo.frota
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
export const deleteVeiculo = (placa) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "DELETE FROM veiculo WHERE placa = ?";

            connection.query(query, [placa], (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            });
        } catch (err) {
            reject(err);
        }
    });
};
