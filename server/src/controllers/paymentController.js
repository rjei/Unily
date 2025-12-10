const midtransClient = require("midtrans-client");
const db = require("../db/connection");

// 1. Initialize Snap API (Buat Token Popup)
const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// 2. Initialize Core API (Buat Cek Status & Webhook)
const coreApi = new midtransClient.CoreApi({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

exports.createTransaction = async (req, res) => {
  try {
    const { orderId, grossAmount, customerDetails, itemDetails } = req.body;

    if (!orderId || !grossAmount) {
      return res.status(400).json({
        success: false,
        message: "orderId and grossAmount are required",
      });
    }

    // Validate Midtrans keys are loaded
    if (!process.env.MIDTRANS_SERVER_KEY || !process.env.MIDTRANS_CLIENT_KEY) {
      console.error("[Payment] MIDTRANS KEYS NOT CONFIGURED!");
      return res.status(500).json({
        success: false,
        message: "Payment service not configured properly",
      });
    }

    // A. Parameter Midtrans
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Math.round(grossAmount),
      },
      credit_card: { secure: true },
      customer_details: customerDetails || {
        first_name: "Guest",
        email: "guest@unily.ac.id",
      },
      item_details: itemDetails || [
        {
          id: "item-1",
          price: Math.round(grossAmount),
          quantity: 1,
          name: "Product",
        },
      ],
    };

    console.log(
      `[Payment] Creating transaction: ${orderId} - Rp ${grossAmount}`
    );

    // B. Minta Token dari Midtrans
    const transaction = await snap.createTransaction(parameter);

    // C. Kirim Token ke Frontend
    res.status(200).json({
      success: true,
      token: transaction.token,
      redirectUrl: transaction.redirect_url,
    });
  } catch (error) {
    console.error("[Payment] Create Error:", error.message);
    console.error("[Payment] Full Error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal membuat transaksi",
      error: error.message,
      details: error.ApiResponse?.error_messages || [],
    });
  }
};

exports.getTransactionStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Cek ke Midtrans
    const statusResponse = await coreApi.transaction.status(orderId);

    res.status(200).json({
      success: true,
      orderId: statusResponse.order_id,
      status: statusResponse.transaction_status,
      paymentType: statusResponse.payment_type,
    });
  } catch (error) {
    console.error("[Payment] Status Error:", error.message);
    res.status(500).json({ success: false, message: "Error checking status" });
  }
};

exports.handleWebhook = async (req, res) => {
  try {
    const notificationJson = req.body;

    // 1. Verifikasi Signature Midtrans
    const statusResponse = await coreApi.transaction.notification(
      notificationJson
    );

    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    console.log(`[Webhook] Order: ${orderId} | Status: ${transactionStatus}`);

    // 2. Tentukan Status Baru untuk Database
    let newDbStatus = null;

    if (transactionStatus == "capture") {
      if (fraudStatus == "accept") {
        newDbStatus = "paid";
      }
    } else if (transactionStatus == "settlement") {
      newDbStatus = "paid";
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      newDbStatus = "cancelled";
    } else if (transactionStatus == "pending") {
      newDbStatus = "pending";
    }

    // 3. Eksekusi SQL Update
    if (newDbStatus) {
      const idToUpdate = orderId.replace(/\D/g, "");

      const query = `UPDATE transactions SET status = $1 WHERE id_trx = $2`;
      const values = [newDbStatus, idToUpdate];

      await db.query(query, values);

      console.log(
        `✅ Database Updated: Transaction ${idToUpdate} set to '${newDbStatus}'`
      );
    }

    // 4. Balas OK ke Midtrans
    res.status(200).send("OK");
  } catch (error) {
    console.error("[Webhook] Processing Error:", error.message);
    res.status(500).send("Webhook Failed");
  }
};
