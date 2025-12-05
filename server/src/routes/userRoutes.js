const express = require('express');
const { getMe, getById, getAllUsers, deleteUser, updateUser } = require('../controllers/userController');
const asyncHandler = require('../middleware/asyncHandler');
const authenticate = require('../middleware/auth');
const { ownsResource, isAdmin } = require('../middleware/checker');

const router = express.Router();


router.get('/me', authenticate, asyncHandler(getMe));


router.get('/', authenticate, isAdmin, asyncHandler(getAllUsers));


router.get('/:userId', authenticate, ownsResource, asyncHandler(getById));


router.delete('/:userId', authenticate, isAdmin, asyncHandler(deleteUser));

router.put('/:userId', authenticate, isAdmin, asyncHandler(updateUser));

module.exports = router;
