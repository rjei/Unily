const express = require("express");
const {
  becomeSeller,
  getSellerProfile,
  getSellerProducts,
  followSeller,
  getFollowers,
  getFollowing,
} = require("../controllers/sellerController");
const asyncHandler = require("../middleware/asyncHandler");
const authenticate = require("../middleware/auth");

const router = express.Router();

// POST /api/sellers/become - Authenticated user becomes a seller
router.post("/become", authenticate, asyncHandler(becomeSeller));

// GET /api/sellers/:id - Get seller profile (public)
router.get("/:id", asyncHandler(getSellerProfile));

// GET /api/sellers/:id/products - Get seller's products (public)
router.get("/:id/products", asyncHandler(getSellerProducts));

// POST /api/sellers/:id/follow - Follow a seller (protected)
router.post("/:id/follow", authenticate, asyncHandler(followSeller));

// GET /api/sellers/:id/followers - Get seller's followers (public)
router.get("/:id/followers", asyncHandler(getFollowers));

// GET /api/users/:id/following - Get user's following list (public)
router.get("/users/:id/following", asyncHandler(getFollowing));

module.exports = router;
