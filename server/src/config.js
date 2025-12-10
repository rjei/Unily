const dotenv = require("dotenv");
const path = require("path");

// IMPORTANT: Load server/.env FIRST, then root .env for fallback
// Server .env has priority for backend config (DB, JWT, etc.)
const serverEnvPath = path.resolve(__dirname, "../.env");
const rootEnvPath = path.resolve(__dirname, "../../.env");

// Load server/.env first (highest priority)
const serverResult = dotenv.config({ path: serverEnvPath });
if (serverResult.error) {
  console.error("❌ Failed to load server/.env from:", serverEnvPath);
  console.error(serverResult.error);
} else {
  console.log("✅ Loaded server/.env successfully");
}

// Load root .env as fallback (for Vite vars if needed)
dotenv.config({ path: rootEnvPath });

const requiredEnvs = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
requiredEnvs.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ CRITICAL: Environment variable ${key} is missing!`);
  } else {
    console.log(`✅ ${key}=${process.env[key]}`);
  }
});

module.exports = {
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT, 10) || 5432,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,

  // Server
  port: parseInt(process.env.PORT, 10) || 4000,
  nodeEnv: process.env.NODE_ENV || "development",

  // JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,

  // Midtrans
  midtrans: {
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  },
};
