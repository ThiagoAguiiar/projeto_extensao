const enviarStatus = (res, status, message, data = null) => {
  return res.status(status).send({ data, message, status });
};

export default enviarStatus;
