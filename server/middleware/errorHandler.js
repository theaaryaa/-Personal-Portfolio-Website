function notFoundHandler(req, res) {
  res.status(404).json({ message: "Resource not found" });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message });
}

module.exports = { notFoundHandler, errorHandler };
