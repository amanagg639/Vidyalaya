const ErrorMiddleware = (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.status).json({
    status: false,
    message: err.message,
  });
};

export default ErrorMiddleware;
