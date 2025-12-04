const express = require('express');
const { signup, signupSeller, login, loginSeller } = require('../controllers/authController');
const asyncHandler = require('../middleware/asyncHandler');
const validateBody = require('../middleware/validateBody');

const router = express.Router();
const emailPattern = /^[^\s@]+@students\.usu\.ac\.id$/i;

router.post(
  '/signup',
  validateBody([
    {
      field: 'name',
      required: true,
      validator: (value) => String(value).trim().length >= 3,
      message: 'Name must be at least 3 characters',
    },
    {
      field: 'email',
      required: true,
      validator: (value) => emailPattern.test(value),
      message: 'Email must be a students.usu.ac.id address',
    },
    {
      field: 'password',
      required: true,
      validator: (value) => String(value).length >= 6,
      message: 'Password must be at least 6 characters',
    },
  ]),
  asyncHandler(signup),
);

// Signup khusus seller - role langsung 'penjual'
router.post(
  '/signup-seller',
  validateBody([
    {
      field: 'name',
      required: true,
      validator: (value) => String(value).trim().length >= 3,
      message: 'Name must be at least 3 characters',
    },
    {
      field: 'email',
      required: true,
      validator: (value) => emailPattern.test(value),
      message: 'Email must be a students.usu.ac.id address',
    },
    {
      field: 'password',
      required: true,
      validator: (value) => String(value).length >= 6,
      message: 'Password must be at least 6 characters',
    },
  ]),
  asyncHandler(signupSeller),
);

router.post(
  '/login',
  validateBody([
    {
      field: 'email',
      required: true,
      validator: (value) => emailPattern.test(value),
      message: 'Email must be a students.usu.ac.id address',
    },
    {
      field: 'password',
      required: true,
      validator: (value) => String(value).length >= 6,
      message: 'Password must be at least 6 characters',
    },
  ]),
  asyncHandler(login),
);

// Login khusus seller - jika belum penjual, upgrade ke penjual
router.post(
  '/login-seller',
  validateBody([
    {
      field: 'email',
      required: true,
      validator: (value) => emailPattern.test(value),
      message: 'Email must be a students.usu.ac.id address',
    },
    {
      field: 'password',
      required: true,
      validator: (value) => String(value).length >= 6,
      message: 'Password must be at least 6 characters',
    },
  ]),
  asyncHandler(loginSeller),
);

module.exports = router;


