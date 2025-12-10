const dotenv = require("dotenv");
const path = require("path");

// Load backend .env (server/.env) FIRST
const serverEnvPath = path.resolve(__dirname, "../.env");
const rootEnvPath = path.resolve(__dirname, "../../.env");

dotenv.config({ path: serverEnvPath });
dotenv.config({ path: rootEnvPath });

/**
 * SUPPORT BOTH: DATABASE_URL (Railway/Supabase) & Individual vars (Docker)
 */
const databaseUrl = process.env.DATABASE_URL;

// Parse DATABASE_URL jika ada (untuk Railway/Supabase)
let dbConfig = {};
if (databaseUrl) {
  const url = new URL(databaseUrl);
  dbConfig = {
    dbHost: url.hostname,
    dbPort: Number(url.port) || 5432,
    dbName: url.pathname.slice(1), // Remove leading '/'
    dbUser: url.username,
    dbPassword: url.password,
  };
} else {
  // Fallback ke individual env vars (untuk Docker)
  dbConfig = {
    dbHost: process.env.DB_HOST,
    dbPort: Number(process.env.DB_PORT) || 5432,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
  };
}

// Check JWT_SECRET (always required)
if (!process.env.JWT_SECRET) {
  console.error("❌ Missing ENV: JWT_SECRET");
}

module.exports = {
  // DATABASE (dari DATABASE_URL atau individual vars)
  dbHost: dbConfig.dbHost,
  dbPort: dbConfig.dbPort,
  dbName: dbConfig.dbName,
  dbUser: dbConfig.dbUser,
  dbPassword: dbConfig.dbPassword,
  databaseUrl: databaseUrl, // Keep original URL for connection pooling

  // SERVER
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || "development",

  // JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

  // Midtrans
  midtrans: {
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  },
};
