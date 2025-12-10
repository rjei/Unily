const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middleware/auth"); 

/**
 * POST /api/payments/create-transaction
 * Membuat Token Snap (Butuh Login)
 */
router.post("/create-transaction", auth, paymentController.createTransaction);

/**
 * GET /api/payments/status/:orderId
 * Cek Status Transaksi (Butuh Login)
 */
router.get("/status/:orderId", auth, paymentController.getTransactionStatus);

/**
 * POST /api/payments/webhook
 * Menerima Notifikasi dari Midtrans (Public / Tanpa Login)
 */
router.post("/webhook", paymentController.handleWebhook);

module.exports = router;