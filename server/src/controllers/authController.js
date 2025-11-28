const bcrypt = require('bcryptjs');
const userStore = require('../storage/userStore');
const { generateToken } = require('../utils/token');

const sanitizeUser = (user) => {
  if (!user) return null;
  const { passwordHash, password, ...rest } = user;
  return {
    id: rest.id,
    name: rest.name,
    email: rest.email,
    createdAt: rest.createdAt,
  };
};

const createError = (statusCode, message, details) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  if (details) {
    error.details = details;
  }
  return error;
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Signup attempt:', { name, email });
  const normalizedEmail = email.toLowerCase();

  const existingUser = await userStore.findByEmail(normalizedEmail);
  if (existingUser) {
    throw createError(409, 'Email already in use');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  await userStore.addUser(newUser);

  const token = generateToken({ sub: newUser.id, email: newUser.email });
  res.status(201).json({
    message: 'Account created successfully',
    user: sanitizeUser(newUser),
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  const user = await userStore.findByEmail(normalizedEmail);
  if (!user) {
    throw createError(401, 'Invalid email or password');
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    throw createError(401, 'Invalid email or password');
  }

  const token = generateToken({ sub: user.id, email: user.email });
  res.json({
    message: 'Logged in successfully',
    user: sanitizeUser(user),
    token,
  });
};

module.exports = {
  signup,
  login,
};


