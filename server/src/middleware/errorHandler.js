const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const payload = {
    message: err.message || 'Unexpected error',
  };

  if (err.details) {
    payload.details = err.details;
  }

  if (statusCode >= 500) {
    console.error('Internal error:', err);
  }

  res.status(statusCode).json(payload);
};

module.exports = errorHandler;


