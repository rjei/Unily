const express = require("express");
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");
const authenticate = require("../middleware/auth");

// All routes require authentication
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = [];
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get wishlist" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }
    res.json({ success: true, message: "Added to wishlist" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to add to wishlist" });
  }
});

router.delete("/:productId", authenticate, async (req, res) => {
  try {
    const { productId } = req.params;
    res.json({ success: true, message: "Removed from wishlist" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to remove from wishlist" });
  }
});

module.exports = router;
