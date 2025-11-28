const express = require('express');
const { getMe, getById } = require('../controllers/userController');
const asyncHandler = require('../middleware/asyncHandler');
const authenticate = require('../middleware/auth');
const { ownsResource } = require('../middleware/checker');

const router = express.Router();

// GET /api/users/me - authenticated user's profile
router.get('/me', authenticate, asyncHandler(getMe));

// GET /api/users/:userId - view user by id (must own resource or admin)
router.get('/:userId', authenticate, ownsResource, asyncHandler(getById));

module.exports = router;
