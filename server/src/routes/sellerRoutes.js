const express = require('express');
const { becomeSeller } = require('../controllers/sellerController');
const asyncHandler = require('../middleware/asyncHandler');
const authenticate = require('../middleware/auth');

const router = express.Router();

// POST /api/sellers/become - Authenticated user becomes a seller
router.post('/become', authenticate, asyncHandler(becomeSeller));

module.exports = router;
