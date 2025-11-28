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
    role: rest.role || 'pelanggan',
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
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: 'pelanggan',
    createdAt: new Date().toISOString(),
  };

  let createdUser;
  try {
    createdUser = await userStore.addUser(newUser);

    if (createdUser && !createdUser.role) createdUser.role = newUser.role;
  } catch (err) {
    console.error('Error creating user in DB:', err);
    throw createError(500, 'Failed to create user');
  }
  const token = generateToken({ sub: createdUser.id, email: createdUser.email, role: createdUser.role || 'pelanggan' });
  res.status(201).json({
    message: 'Account created successfully',
    user: sanitizeUser(createdUser),
    token,
  });
};

// Signup untuk seller - role langsung 'penjual'
const signupSeller = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Signup Seller attempt:', { name, email });
  const normalizedEmail = email.toLowerCase();

  const existingUser = await userStore.findByEmail(normalizedEmail);
  if (existingUser) {
    throw createError(409, 'Email already in use');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: 'penjual',
    createdAt: new Date().toISOString(),
  };

  let createdUser;
  try {
    createdUser = await userStore.addUser(newUser);

    if (createdUser && !createdUser.role) createdUser.role = newUser.role;
  } catch (err) {
    console.error('Error creating user in DB:', err);
    throw createError(500, 'Failed to create user');
  }
  const token = generateToken({ sub: createdUser.id, email: createdUser.email, role: createdUser.role || 'penjual' });
  res.status(201).json({
    message: 'Account created successfully',
    user: sanitizeUser(createdUser),
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

  const token = generateToken({ sub: user.id, email: user.email, role: user.role || 'pelanggan' });
  res.json({
    message: 'Logged in successfully',
    user: sanitizeUser(user),
    token,
  });
};

// Login untuk seller - jika user belum penjual, upgrade ke penjual
const loginSeller = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  let user = await userStore.findByEmail(normalizedEmail);
  if (!user) {
    throw createError(401, 'Invalid email or password');
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    throw createError(401, 'Invalid email or password');
  }

  // Jika user belum penjual, upgrade ke penjual
  if (user.role !== 'penjual') {
    user = await userStore.updateRole(user.id, 'penjual');
  }

  const token = generateToken({ sub: user.id, email: user.email, role: user.role || 'penjual' });
  res.json({
    message: 'Logged in successfully',
    user: sanitizeUser(user),
    token,
  });
};

module.exports = {
  signup,
  signupSeller,
  login,
  loginSeller,
};


