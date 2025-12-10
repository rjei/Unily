require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); // ✅ Wajib buat Midtrans
const chatRoutes = require("./routes/chatRoutes"); // ✅ Chat between buyers and sellers
const wishlistRoutes = require("./routes/wishlistRoutes"); // ✅ Wishlist management
// const profileRoutes = require("./routes/profileRoutes"); // ✅ Profile management - disabled temporarily

const errorHandler = require("./middleware/errorHandler");

const createApp = () => {
  const app = express();

  // ==================== 1. MIDDLEWARE ====================
  const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  // ==================== 2. HEALTH CHECK ====================

  app.get("/", (req, res) => {
    res.json({
      message: "🚀 Unily API Server is Running!",
      environment: process.env.NODE_ENV || "development",
    });
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // ==================== 3. REGISTER ROUTES ====================

  app.use("/api/auth", authRoutes); // Login/Register
  app.use("/api/sellers", sellerRoutes); // Fitur Seller
  app.use("/api/users", userRoutes); // Profil User
  app.use("/api/payments", paymentRoutes); // ✅ Integrasi Midtrans
  app.use("/api/chat", chatRoutes); // ✅ Chat between buyers and sellers
  app.use("/api/wishlist", wishlistRoutes); // ✅ Wishlist management
  // app.use("/api/profile", profileRoutes); // ✅ Profile management - Temporarily disabled

  // ==================== 4. ERROR HANDLING ====================

  // Handle 404
  app.use((req, res) => {
    res.status(404).json({
      error: "Not Found",
      path: req.path,
      method: req.method,
    });
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
