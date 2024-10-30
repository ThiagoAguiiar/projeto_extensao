const sendStatus = (res, status, mensagem, data = null) => {
  return res.status(status).send({ data, mensagem, status });
};

export default sendStatus;
