const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// ==== DATABASE HANDLER  ====
const databaseUrl = process.env.DATABASE_URL;

let dbConfig = {};

if (databaseUrl) {
  const url = new URL(databaseUrl);
  dbConfig = {
    dbHost: url.hostname,
    dbPort: Number(url.port) || 5432,
    dbName: url.pathname.substring(1),
    dbUser: url.username,
    dbPassword: url.password,
  };
} else {
  dbConfig = {
    dbHost: process.env.DB_HOST,
    dbPort: Number(process.env.DB_PORT),
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
  };
}

// Log untuk debug Railway
console.log("=== ENV CHECK ===");
console.log("MIDTRANS_SERVER_KEY:", process.env.MIDTRANS_SERVER_KEY ? "OK" : "MISSING");
console.log("MIDTRANS_CLIENT_KEY:", process.env.MIDTRANS_CLIENT_KEY ? "OK" : "MISSING");
console.log("IS_PROD:", process.env.MIDTRANS_IS_PRODUCTION);
console.log("=================");

module.exports = {
  dbHost: dbConfig.dbHost,
  dbPort: dbConfig.dbPort,
  dbName: dbConfig.dbName,
  dbUser: dbConfig.dbUser,
  dbPassword: dbConfig.dbPassword,
  databaseUrl: databaseUrl,

  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || "development",

  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

  midtrans: {
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  },
};
