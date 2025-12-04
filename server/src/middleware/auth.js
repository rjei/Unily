const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware to authenticate requests using Bearer token and attach req.user
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    // payload may contain { sub, email, role }
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role || 'pelanggan',
    };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticate;
