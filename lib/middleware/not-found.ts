export default (req, res, next) => {
  const err = new Error("Not Found");
  req.status = 404;
  next(err);
};