const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  }
  // added for 4.17
  if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'Invalid token' });
  }
  next(error);
};

module.exports = {
  errorHandler,
};
