const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  }
  // added for 4.17
  if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'Invalid token' });
  }
  if (error.name === 'CastError') {
    response.status(400).json({ error: 'Incorrect ID' });
  }
  next(error);
};

// added for 4.20
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
