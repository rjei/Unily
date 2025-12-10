const express = require("express");
const { getChatHistory, startChat } = require("../controllers/chatController");
const asyncHandler = require("../middleware/asyncHandler");
const authenticate = require("../middleware/auth");

const router = express.Router();

// GET /api/chat/history/:sellerId - Get chat history
router.get("/history/:sellerId", authenticate, asyncHandler(getChatHistory));

// POST /api/chat/start - Start new chat
router.post("/start", authenticate, asyncHandler(startChat));

module.exports = router;
