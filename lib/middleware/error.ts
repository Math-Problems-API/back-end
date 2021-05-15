export default (err, req, res, next) => {
  const status = req.status || 500;

  res.status(status);

  console.log(err);

  res.send({
    status,
    message: err.message,
  });
};