const status = (res, status, message, data = null) => {
  return res.status(status).send({ data, message, status });
};

export default status;
