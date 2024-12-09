import initExpress from "./config/express.js";
import RFuncionario from "./routes/RotaFuncionarios.js";
import RCliente from "./routes/RotaClientes.js";
import RVeiculo from './routes/RotaVeiculos.js'

const app = initExpress();

RFuncionario(app);
RCliente(app)
RVeiculo(app)
