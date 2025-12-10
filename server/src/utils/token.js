const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

  return jwt.sign(payload, secret, { expiresIn });
};

module.exports = { generateToken };