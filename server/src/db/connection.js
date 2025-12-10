const { Pool } = require("pg");
require("dotenv").config(); // Load .env langsung di sini

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "unily_db",
  user: process.env.DB_USER || "superadmin",
  password: process.env.DB_PASSWORD || "passwordAdmin123",
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err);
  process.exit(-1);
});

// Export 'query' wrapper supaya controller tinggal panggil db.query()
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool, // Export pool asli kalau butuh transaksi complex
};
