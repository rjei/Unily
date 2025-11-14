const express = require('express');
const { signup, login } = require('../controllers/authController');
const asyncHandler = require('../middleware/asyncHandler');
const validateBody = require('../middleware/validateBody');

const router = express.Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      message: 'Email is invalid',
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

router.post(
  '/login',
  validateBody([
    {
      field: 'email',
      required: true,
      validator: (value) => emailPattern.test(value),
      message: 'Email is invalid',
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

module.exports = router;


