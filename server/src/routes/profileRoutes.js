const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../middleware/asyncHandler");

// Profile routes (all require authentication)
router.get("/", authenticate, asyncHandler(profileController.getProfile));
router.put("/", authenticate, asyncHandler(profileController.updateProfile));
router.post(
  "/photo",
  authenticate,
  asyncHandler(profileController.uploadPhoto)
);

// Address routes
router.get(
  "/addresses",
  authenticate,
  asyncHandler(profileController.getAddresses)
);
router.post(
  "/addresses",
  authenticate,
  asyncHandler(profileController.addAddress)
);
router.put(
  "/addresses/:id",
  authenticate,
  asyncHandler(profileController.updateAddress)
);
router.delete(
  "/addresses/:id",
  authenticate,
  asyncHandler(profileController.deleteAddress)
);

// Payment & Bank routes
router.get(
  "/payment-methods",
  authenticate,
  asyncHandler(profileController.getPaymentMethods)
);
router.get(
  "/bank-accounts",
  authenticate,
  asyncHandler(profileController.getBankAccounts)
);
router.post(
  "/bank-accounts",
  authenticate,
  asyncHandler(profileController.addBankAccount)
);

module.exports = router;

module.exports = router;
