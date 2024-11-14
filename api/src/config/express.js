import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const initExpress = () => {
  dotenv.config();

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    const message = `Servidor iniciado na porta http://localhost:${port}`;
    console.log(message);
  });

  return app;
};

export default initExpress;
